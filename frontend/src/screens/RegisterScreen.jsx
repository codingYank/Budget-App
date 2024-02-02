import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { Field, Form, Formik } from 'formik'

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect')  || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const onSubmit = async (e) => {
    console.log(e)
    if (e.password !== e.confirmPassword) {
      toast.error("Passwords don't match")
      return
    } else {
      try {
        const res = await register(e).unwrap()
        dispatch(setCredentials({...res}))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <div>
      <Formik onSubmit={onSubmit} initialValues={{name: '', email: '', password: '', confirmPassword: ''}}>
        <Form  className='form'>
          <div className='form-content'>
            <label htmlFor='name'>Name</label>
            <Field id='name' name='name' />
          </div>
          <div className='form-content'>
            <label htmlFor='email'>Email</label>
            <Field id='email' type='email' name='email' />
          </div>
          <div className='form-content'>
            <label htmlFor='password'>Password</label>
            <Field type='password' id='password' name='password' />
          </div>
          <div className='form-content'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Field type='password' id='confirmPassword' name='confirmPassword' />
          </div>
          <button className='primary-btn' type='submit' disabled={isLoading}>Register</button>
          <Link to={'/login'}>Login</Link>  
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterScreen