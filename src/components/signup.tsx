import { useEffect, useState } from "react"
import router from "next/router"

import { signupSchema } from "@/lib/validation"
import { z } from "zod"

import { useAuth } from "../context/AuthContext"

const SignupForm = () => {
  const { signup } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      router.replace("/")
      history.replaceState(null, '', '/');
    } else {
      setLoading(false)
    }
  }, [user])

  const handleSignup = async () => {
    try {
      signupSchema.parse({ email, password })

      await signup(email, password)
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map((e) => e.message).join(", "))
      } else {
        setError(error.message)
      }setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-6 hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default SignupForm
