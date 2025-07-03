import { useSession } from 'next-auth/react'
import ProfileForm from './profile-form'
import styles from './user-profile.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function UserProfile() {

  // Moved auth session to server-side using getServerSideProps rather than having a flicker on the client-side
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // console.log(session, status)

  // useEffect(() => {
  //   // Redirect away if NOT auth
  //   if (!session || status !== 'authenticated') {
  //     router.replace('/auth')
  //   }
  // }, [session, status])

  // if (status === 'loading') {
  //   return <p className={styles.profile}>Loading...</p>
  // }

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  )
}

export default UserProfile
