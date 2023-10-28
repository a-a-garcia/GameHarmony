import React from 'react'
import '../index.css'
import Nav from '../components/Nav'
import Hero from '../components/Hero'

const Main = () => {
  return (
    <div>
        {/* Currently, things are rendering on App.jsx, until backend is setup */}
      <Nav />
      <Hero />
    </div>
  )
}

export default Main