import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

export default NextAuth({
  providers: [
    Credentials({
      // name: 'Credentials',
      // credentials: {
      //   email: {
      //     label: 'Email',
      //     type: 'email',
      //     placeholder: 'email@example.com',
      //   },
      //   password: { label: 'Password', type: 'password' },
      // },
      async authorize(credentials) {
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          client.close()
          throw new Error('Could not login. Try again')
        }

        client.close()
        return { email: user.email }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // pages: { 
  //   signIn: '/auth',
  // },
})
