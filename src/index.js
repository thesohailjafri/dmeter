import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { RecoilRoot } from 'recoil'
import AxiosInterpector from './AxiosIntercepter'

ReactDOM.render(
  <Router>
    <AxiosInterpector>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </AxiosInterpector>
  </Router>,
  document.getElementById('root'),
)
