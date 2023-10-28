import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main'
import Recommender from './components/Recommender';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/recommender" element={<Recommender />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
