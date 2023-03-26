import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { loginPopUpMsgAtom } from '../recoil/atoms/loginAtom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { isMobilePhone } from 'validator'
import { signinApi } from '../api'

export default function SigninCard() {
  let location = useLocation()

  const loginPopUpMsg = useRecoilValue(loginPopUpMsgAtom)
  return (
    <div class="max-w-2xl mx-auto">
      <div class="bg-white  rounded-lg">
        <Formik
          initialValues={{
            phone: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {}

            if (!values.phone) {
              errors.phone = 'Required'
            } else if (!isMobilePhone(values.phone)) {
              errors.phone = 'Invalid phone number'
            }

            if (!values.password) {
              errors.password = 'Required'
            }

            return errors
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await signinApi(values)
            if (res) {
              setSubmitting(false)
              if (res.status === 200) {
                resetForm()
                localStorage.setItem('customer_token', res?.data?.token)
                if (location.pathname === '/signin') {
                  setTimeout(() => (window.location.href = '/'), 3000)
                } else {
                  setTimeout(() => window.location.reload(), 1000)
                }
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <h3 class="text-xl font-medium text-gray-900 ">
                Sign up to our platform
              </h3>
              {loginPopUpMsg && <p>{loginPopUpMsg}</p>}
              <div>
                <label
                  for="phone"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Your phone number
                </label>
                <Field
                  name="phone"
                  id="phone"
                  placeholder="98XXX98XXX"
                  type="tel"
                  class="form-field"
                />
                <ErrorMessage
                  className="form-field-err"
                  name="phone"
                  component="small"
                />
              </div>

              <div>
                <label
                  for="password"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Your password
                </label>
                <Field
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  class="form-field"
                />
                <ErrorMessage
                  className="form-field-err"
                  name="password"
                  component="small"
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="bg-orange-50 border accent-orange-600 border-gray-300 focus:ring-3 focus:ring-orange-300 h-4 w-4 rounded "
                      required=""
                    />
                  </div>
                  <div class="text-sm ml-3">
                    <label for="remember" class="font-medium text-gray-900 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/resetpass"
                  class="text-sm text-orange-600 hover:underline ml-auto "
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-gradient-to-br from-orange-400
			to-orange-500 focus:ring-4 focus:ring-orange-300 font-medium
			rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Login to your account
              </button>
              <div class="text-sm font-medium text-gray-500 ">
                Not registered?{' '}
                <Link to="/signup" class="text-orange-600 hover:underline ">
                  Create account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
