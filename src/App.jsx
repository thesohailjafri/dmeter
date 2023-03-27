import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MainContainer } from './components'

import {
  AboutUsPage,
  BranchAboutUsPage,
  BranchMenuPage,
  BranchOrdersPage,
  BranchPage,
  HomePage,
  NotFoundPage,
  ResetPasswordPage,
  SigninPage,
  SignupPage,
} from './pages'
import { AuthWrapper } from './layout'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen min-h-screen flex flex-col ">
        <div className="container mx-auto">
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/resetpass" element={<ResetPasswordPage />} />
              <Route path="/about" element={<AboutUsPage />} />

              {/* auth routes */}
              <Route
                path="/branch/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/menu/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchMenuPage />
                  </AuthWrapper>
                }
              />

              <Route
                path="/orders/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchOrdersPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/about/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchAboutUsPage />
                  </AuthWrapper>
                }
              />
              {/* render={() => (
                        <AuthWrapper>
                            <HomePage />
                        </AuthWrapper>
                    )} */}
              {/* auth routes */}

              <Route exact path="/notfound" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default App
