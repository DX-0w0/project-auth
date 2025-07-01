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
https://next-auth.js.org/getting-started/example

- use `npm i bcryptjs` to encrypted plain text password to encrypted version