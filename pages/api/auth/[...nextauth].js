import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

export const authOptions = {
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

        const usersCollection = client.db(process.env.mongodb_database).collection('users')
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

        // used in the callback, this is the token object
        return { email: user.email, role: 'foodie' }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
  // pages: {
  //   signIn: '/auth',
  // },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
