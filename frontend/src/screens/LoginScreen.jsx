import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const onSubmit = async (e) => {
    try {
      const res = await login(e).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div>
      <Formik onSubmit={onSubmit} initialValues={{ email: "", password: "" }}>
        <Form className="form">
          <div className="form-content">
            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" />
          </div>
          <div className="form-content">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
          </div>
          <button className="primary-btn" type="submit" disabled={isLoading}>
            Login
          </button>
          <Link to={"/register"}>Register</Link>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginScreen
