import axios from "axios"

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/login", { email, password })

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to login")
  }
}

export default login
