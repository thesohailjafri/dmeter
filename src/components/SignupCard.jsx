import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { isMobilePhone } from 'validator'
import { signupApi } from '../api'

export default function SignupCard() {
  let navigate = useNavigate()

  return (
    <div class="max-w-2xl mx-auto">
      <div class="bg-white  rounded-lg">
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors = {}

            if (!values.firstname) {
              errors.firstname = 'Required'
            }

            if (!values.lastname) {
              errors.lastname = 'Required'
            }

            if (!values.phone) {
              errors.phone = 'Required'
            } else if (!isMobilePhone(values.phone)) {
              errors.phone = 'Invalid phone number'
            }

            if (!values.password) {
              errors.password = 'Required'
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required'
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = 'Passwords do not match'
            }

            return errors
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await signupApi(values)
            if (res) {
              setSubmitting(false)
              if (res.status === 200) {
                resetForm()
                setTimeout(() => navigate('/signin'), 2500)
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <h3 class="text-xl font-medium text-gray-900 ">
                Sign up to our platform
              </h3>
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6">
                <div>
                  <label
                    for="firstname"
                    class="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Your firstname
                  </label>
                  <Field
                    type="firstname"
                    name="firstname"
                    placeholder="John"
                    className="form-field"
                  />
                  <ErrorMessage
                    className="form-field-err"
                    name="firstname"
                    component="small"
                  />
                </div>

                <div>
                  <label
                    for="lastname"
                    class="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Your lastname
                  </label>
                  <Field
                    name="lastname"
                    id="lastname"
                    placeholder="Doe"
                    className="form-field"
                  />
                  <ErrorMessage
                    className="form-field-err"
                    name="lastname"
                    component="small"
                  />
                </div>
              </div>
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
                  for="email"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Your email (optional)
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@exam.ple"
                  class="form-field"
                />
                <ErrorMessage
                  className="form-field-err"
                  name="email"
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
              <div>
                <label
                  for="confirmPassword"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Confirm password
                </label>
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  class="form-field"
                />
                <ErrorMessage
                  className="form-field-err"
                  name="confirmPassword"
                  component="small"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-gradient-to-br from-orange-400
                to-orange-500 focus:ring-4 focus:ring-orange-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Register your account
              </button>
              <div class="text-sm font-medium text-gray-500 ">
                Already have accout?{' '}
                <Link to="/signin" class="text-orange-600 hover:underline ">
                  Sign-in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
