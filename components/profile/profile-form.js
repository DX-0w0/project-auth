import { useRef } from 'react'
import classes from './profile-form.module.css'

function ProfileForm(props) {
  const { onChangePassword } = props

  const oldPasswordRef = useRef()
  const newPasswordRef = useRef()

  async function submitHandler(event) {
    event.preventDefault()

    const enteredOldPassword = oldPasswordRef.current.value
    const enteredNewPassword = newPasswordRef.current.value

    // Optional validation
    const isSuccess = await onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    })

    if(isSuccess){
      oldPasswordRef.current.value = ''
      newPasswordRef.current.value = ''
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
