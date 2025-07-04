// /api/user/change-password

import { connectToDatabase } from '../../../lib/db'
import { hashPassword, verifyPassword } from '../../../lib/auth'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { getSession } from 'next-auth/react'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getServerSession(req, res, authOptions)

  // Protect API from unauthenticated access
  if (!session) {
    res.status(401).json({ message: 'not authenticated!' })
    return
  }

  const userEmail = session.user.email
  const data = req.body
  const { oldPassword, newPassword } = data

  const client = await connectToDatabase()
  const usersCollection = client.db().collection('users')
  const user = await usersCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    client.close()
    return
  }

  const currentPassword = user.password
  const isSamePassword = await verifyPassword(oldPassword, currentPassword)

  if (!isSamePassword) {
    res.status(403).json({ message: 'Invalid password' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  )

  console.log('result', result)
  client.close()
  res.status(200).json({ message: 'Password updated' })
}

export default handler
