import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main'
import Recommender from './views/Recommender';
import Matches from './views/Matches';
import { RecommenderProvider } from './components/RecommenderContext';

function App() {

  return (
    <RecommenderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/recommender" element={<Recommender />}></Route>
          <Route path="/matches" element={<Matches />}></Route>
        </Routes>
      </BrowserRouter>
    </RecommenderProvider>
  )
}

export default App
