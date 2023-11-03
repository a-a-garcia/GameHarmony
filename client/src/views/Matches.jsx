import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import '../index.css'
import axios from 'axios';

const Matches = () => {
  const [ matches, setMatches ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/matches')
      .then((response) => {
        console.log(response.data)
        setMatches(response.data);
      })
      .catch((error) => {
        // Handle API request errors here
        console.error(error);
      });
  }, [])
  


  return (
    <div className="--matches-page">
        <Nav />
        <div className="--matches-card">
          <div className="--matches-card-header">
            <h2>Your Matches</h2>
          </div>
          <div className="--matches-holder">
            { matches.map((match) => {
              return (
                <div className="--matches-card-body">
                  <div className="--matches-card-right-side">
                    <h3>{match.title}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default Matches