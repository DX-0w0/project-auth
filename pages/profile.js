import { getSession } from 'next-auth/react'
import UserProfile from '../components/profile/user-profile'

function ProfilePage() {
  return <UserProfile />
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  // console.log('p-session', session)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default ProfilePage
