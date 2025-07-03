// /api/user/change-password

import { getSession } from 'next-auth/react'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession(req)

  // Protect API from unauthenticated access
  if (!session) {
    res.status(401).json({ message: 'not authenticated!' })
    return
  }

  const data = req.body
  const { oldPassword, newPassword } = data
}

export default handler
