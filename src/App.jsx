import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SigninCardOverlay } from './components'

import {
  AboutUsPage,
  BranchAboutUsPage,
  BranchMenuPage,
  BranchOrdersPage,
  BranchPage,
  HomePage,
  NotFoundPage,
  ResetPasswordPage,
  RestaurantAboutUsPage,
  RestaurantPage,
  RestaurantsPage,
  SearchPage,
  SigninPage,
  SignupPage,
} from './pages'
import { AuthWrapper } from './layout'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <SigninCardOverlay />

      <div className="w-screen flex flex-col ">
        <div className="container mx-auto">
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <AuthWrapper>
                    <HomePage />
                  </AuthWrapper>
                }
              />

              <Route exact path="/signin" element={<SigninPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
              <Route exact path="/resetpass" element={<ResetPasswordPage />} />
              <Route exact path="/about" element={<AboutUsPage />} />
              <Route exact path="/search" element={<SearchPage />} />

              {/* auth routes */}
              <Route
                exact
                path="/restaurants"
                element={
                  <AuthWrapper>
                    <RestaurantsPage />
                  </AuthWrapper>
                }
              />

              <Route
                exact
                path="/restaurant/:restaurant_slug"
                element={
                  <AuthWrapper>
                    <RestaurantPage />
                  </AuthWrapper>
                }
              />
              <Route
                exact
                path="/restaurant/about/:restaurant_slug"
                element={
                  <AuthWrapper>
                    <RestaurantAboutUsPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/branch/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/branch/menu/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchMenuPage />
                  </AuthWrapper>
                }
              />

              <Route
                path="/branch/orders/:branch_slug"
                element={
                  <AuthWrapper>
                    <BranchOrdersPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/branch/about/:branch_slug"
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
