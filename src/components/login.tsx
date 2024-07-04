import { useEffect, useState } from "react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import { loginSchema } from "@/lib/validation"
import { z } from "zod"

import { useAuth } from "../context/AuthContext"

const LoginForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      router.replace('/', undefined, { shallow: true });
      history.replaceState(null, '', '/');
    } else {
      setLoading(false)
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      loginSchema.parse({ email, password })

      await login(email, password)
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map((e) => e.message).join(", "))
      } else {
        setError(error.message)
      }
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

  const handleSignup = () => {
    router.replace("/signup")
  }
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <button
          type="button"
          onClick={handleSignup}
          className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context
  const token = (req as any).cookies.authToken

  if (token) {
    res.writeHead(302, { Location: "/" })
    res.end()
  }

  return { props: {} }
}

export default LoginForm
