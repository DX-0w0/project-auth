import { useRef, useState } from 'react'
import classes from './auth-form.module.css'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  console.log('response', response)
  console.log('data', data)

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

async function signInUser(email, password, router) {
  const result = await signIn('credentials', {
    redirect: false,
    email: email,
    password: password,
  })

  console.log('signin result: ', result)
  if (!result.ok) {
    alert(result.error || 'something went wrong')
  } else {
    // store the session, so when reload SPA session is not lost
    router.replace('/profile')
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  async function submitHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    if (isLogin) {
      signInUser(enteredEmail, enteredPassword, router)
    } else {
      //create a new user
      try {
        const result = await createUser(enteredEmail, enteredPassword)
        console.log('create user', result)
        signInUser(enteredEmail, enteredPassword, router)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
