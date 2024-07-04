// components/ProtectedRoute.tsx
import { useEffect } from "react"
import { useRouter } from "next/router"

import { useAuth } from "@/context/AuthContext"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")

    if (!authToken) {
      router.replace("/login")
    }
  }, [user, loading, router])
  if (!user) {
    return null
  }
  return <>{children}</>
}

export default ProtectedRoute
