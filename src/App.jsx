import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header, MainContainer, LoginCardOverlay } from './components'

import {
  BranchAboutUsPage,
  BranchMenuPage,
  BranchOrdersPage,
  BranchPage,
  NotFoundPage,
} from './pages'

const App = () => {
  const fetchData = async () => {
    // await getAllFoodItems().then((data) => {
    //   dispatch({
    //     type: actionType.SET_FOOD_ITEMS,
    //     foodItems: data,
    //   })
    // })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen min-h-screen flex flex-col ">
        <div className="container mx-auto">
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <LoginCardOverlay />

            <Routes>
              <Route exact path="/" element={<MainContainer />} />
              <Route path="/branch/:branch_slug" element={<BranchPage />} />
              <Route path="/menu/:branch_slug" element={<BranchMenuPage />} />
              <Route
                path="/orders/:branch_slug"
                element={<BranchOrdersPage />}
              />
              <Route
                path="/about/:branch_slug"
                element={<BranchAboutUsPage />}
              />

              <Route exact path="/notfound" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default App
