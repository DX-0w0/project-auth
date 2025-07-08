# Next Auth

Two methods

1. Server-side sessions
   1. - Store unique id on server, send it to client
   2. - Client send id along with request to protected resources
2. Authentication tokens
   1. - Create by not store, "permission tokens" on server, send it to client
   2. - Client send token along with request to protected resources
   3. JWT (JSON Web Tokens) most common

SPA work with tokens instead of sessions

## JWT

1. issuer data
2. custom data
3. secret signing key

- By combining all 3 creates a JWT signature (string) but not encrypted
- Only signing server is able to verify incoming token

`npm i next-auth`
[Example](https://next-auth.js.org/getting-started/example)

- use `npm i bcryptjs` to encrypted plain text password to encrypted version
- Using a `catchall route file` since next auth provides build-in routes. The full list [REST API](https://next-auth.js.org/getting-started/rest-api). Export the `NextAuth({})` function and add additional configuration options [Options](https://next-auth.js.org/configuration/options)
- [Providers](https://next-auth.js.org/providers/credentials)

## Sign In

- use the `import { signIn } from 'next-auth/react'` method to [sign-in method](https://next-auth.js.org/getting-started/client#signin)

## Router
import { useRouter } from 'next/router' for /pages (Legacy)
import { useRouter } from 'next/navigation' /app (App Router)

## Session
- use server-side to check auth of session rather than on client side, this will rid of the page load flicker 
- use the `import { useSession } from 'next-auth/react'` to gain access to the {data, status} (client side only)
- use the `import { getSession } from 'next-auth/react'` (client or server side) doesn't track live sessions changes (snapshot)
- use preferred `import { getServerSession } from 'next-auth'` for api route handlers works for app router and page router.
- Add additional keys onto the session object use the callback property in the NextAuth({}) function in the `/api/auth/[...nextauth].js` file
- 1. The authorize(credentials) return a token object to be used in the callback of jwt(), the credentials args comes from the signIn() 2nd args  
- 2. jwt({ token, user }) return the token to be used in the session()
- 3. session({ session, token }) to allow to add additional keys on the return session = useSession() / getSession() and it value are those of the tokens set in the return of authorize()

## NextAuth
- NextAuth(authOptions), the [authOptions](https://next-auth.js.org/configuration/options) 

## Api Routes
- use validation to protect endpoints like changing password, make sure the user is authenticated

## When deploy to production using auth
- in the .env file / on the vercel hosting site set the env variable `NEXTAUTH_URL` 
```
NEXTAUTH_URL="https://your-production-domain.com"
```