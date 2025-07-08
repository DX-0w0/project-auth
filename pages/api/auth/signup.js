import { connectToDatabase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  const data = req.body
  const { email, password } = data

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res
      .status(422)
      .json({
        message:
          'Invalid Input, need valid email and/or password must be 7 characters or more',
      })
    client.close()
    return
  }

  const client = await connectToDatabase()
  const db = client.db(process.env.mongodb_database)

  const count = await db.collection('users').countDocuments()
  // console.log('Total users:', count)

  
  if (count === 50) {
    res.status(422).json({ message: 'Cannot create anymore accounts. Database has been capped.' })
    client.close()
    return
  }

  const existingUser = await db.collection('users').findOne({ email: email })

  if (existingUser) {
    res.status(422).json({ message: 'User exists already' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  })

  res.status(201).json({ message: 'Created User' })
  client.close()
}

export default handler
