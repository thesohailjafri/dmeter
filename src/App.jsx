import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header, MainContainer } from './components'

import { BranchPage } from './pages'

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
      <div className="w-screen min-h-screen flex flex-col bg-primary">
        <div className="container mx-auto">
          <Header />
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route exact path="/" element={<MainContainer />} />
              <Route path="/branch/:slug" element={<BranchPage />} />
              <Route exact path="/notfound" element={<BranchPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default App
