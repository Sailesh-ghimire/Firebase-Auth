import { NextApiRequest, NextApiResponse } from "next"

import { auth } from "@/lib/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      const token = await user.getIdToken()

      res.status(200).json({ user, token })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
