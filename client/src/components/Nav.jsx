import React from 'react'
import logo from '../assets/GameHarmony-logos_transparent.png';
import '../index.css';

const Nav = () => {
  return (
    <nav>
        <img src={logo} alt="GameHarmony Logo" id="logo" />
        <a id="--nav-link">Profile</a>
    </nav>
  )
}

export default Nav