import { getSession, useSession } from 'next-auth/react'
import AuthForm from '../components/auth/auth-form'
import { useRouter } from 'next/router'

function AuthPage() {
  // const { data: session, status } = useSession()
  // const router = useRouter()

  // if (session) {
  //   router.replace('/')
  // }

  // if (status === 'loading') {
  //   return <p>Loading ...</p>
  // }

  return <AuthForm />
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log('a-session', session)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default AuthPage
