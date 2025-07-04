import { useSession } from 'next-auth/react'
import ProfileForm from './profile-form'
import styles from './user-profile.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function UserProfile() {
  // Moved auth session to server-side using getServerSideProps rather than having a flicker on the client-side
  const { data: session, status } = useSession()
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

  const date = new Date(session.expires).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  async function changePasswordHandler(passwordData) {
    //  {oldPassword, newPassword} = passwordData
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'something went wrong')
      }

      console.log('change-password result:', data)

      alert('Password changed')
      return true
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <p>Email: {session.user.email}</p>
      <p>Session Expires: {date}</p>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  )
}

export default UserProfile
