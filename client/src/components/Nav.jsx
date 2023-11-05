import React from 'react'
import logo from '../assets/GameHarmony-logos_transparent.png';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Nav = (props) => {
  const { goToMatches } = props;
  const navigate = useNavigate();

  const returnToMain = () => {
    navigate('/');
  }

  return (
    <nav>
        <img src={logo} alt="GameHarmony Logo" id="logo" />
        { goToMatches ? 
          <a className="--nav-link" onClick={goToMatches}>Your Matches</a> :
          <a className="--nav-link" onClick={returnToMain}>Home</a>
        }
    </nav>
  )
}

export default Nav