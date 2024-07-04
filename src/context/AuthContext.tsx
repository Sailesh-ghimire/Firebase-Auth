import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"

import { auth } from "@/lib/firebaseConfig"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"

interface AuthContextProps {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  signup: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken()
        localStorage.setItem("authToken", token)
        setUser(user)
      } else {
        localStorage.removeItem("authToken")
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredential.user)
      const token = await userCredential.user.getIdToken()
      localStorage.setItem("authToken", token)
      router.replace("/")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const handleSignup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user
      setUser(user)

      const token = await user.getIdToken()
      localStorage.setItem("authToken", token)

      router.replace("/")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const logout = async () => {
    await auth.signOut()
    setUser(null)
    localStorage.removeItem("authToken")
    router.replace("/login")
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signup: handleSignup, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
