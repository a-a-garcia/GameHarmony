import React from 'react'
import '../index.css'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const goToMatches = () => {
    navigate('/matches');
  }

  return (
    <div>
      <Nav goToMatches={goToMatches} />
      <Hero />
    </div>
  )
}

export default Main