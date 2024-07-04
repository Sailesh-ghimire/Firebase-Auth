import Image from "next/image"
import { useRouter } from "next/router"

import { useAuth } from "@/context/AuthContext"
import ProtectedRoute from "@/hoc/protectedRoute"

export default function Home() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const renderAvatar = () => {
    if (user?.photoURL) {
      return (
        <Image
          src={user.photoURL}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
      )
    } else {
      const initials = "IMG"
      return (
        <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 bg-gray-200 text-red-600">
          <span className="text-xl font-bold">{initials}</span>
        </div>
      )
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Welcome to the Page!
          </h2>

          <div className="flex items-center justify-center mb-6">
            {renderAvatar()}

            <div className="ml-4">
              <p className="text-lg font-medium text-gray-800">
                {user?.email || "Guest"}{" "}
              </p>
              <p className="text-sm text-gray-600">Member since June 2023</p>
            </div>
          </div>

          <p className="text-center text-gray-600 mb-4">
            You have successfully logged in. Enjoy exploring our platform!
          </p>

          <button
            onClick={() => logout()}
            className="w-full bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-red-600 focus:outline-none"
          >
            Log Out
          </button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
