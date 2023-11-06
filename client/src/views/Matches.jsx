import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import '../index.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


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
  
  const deleteMatch = (matchId) => {
    axios.delete(`http://localhost:8000/api/matches/delete/${matchId}`)
      .then(response => {
        setMatches(matches.filter(match => match._id !== matchId));
      })
      .catch((error) => {
        // Handle API request errors here
        console.error(error);
      });
  }

  return (
    <div>
        <Nav />
        <div className="--matches-card">
          <div className="--matches-card-header">
            <h2>Your Matches</h2>
          </div>
          <div className="--matches-holder">
            { matches.length == 0 ? 
              <div className="--matches-empty --matches-card-body">Loading matches... or you don't have any!</div> :
            matches.map((match) => {
              return (
                <div key={match._id} className="--matches-card-body">
                  <div className="--matches-card-left-side">
                    <img src={match.coverArt} onClick={() => window.open(`${match.igdbUrl}`)}/>
                  </div>
                  <div className="--matches-card-right-side">
                    <h3 onClick={() => window.open(`${match.igdbUrl}`)}>{match.title}</h3>
                    <hr></hr>
                    {match.note ? 
                    <div className="--matches-note">
                    {match.note}
                    </div> :
                    <div className="--matches-note-nonexisting">
                      Click below to add a note!
                    </div>
                    }
                    <div className="--matches-card-buttons">
                      <Link to={`/matches/note/${match._id}`}><button className="--matches-btn1">Add/Edit Note</button></Link>
                      <button onClick={() => deleteMatch(match._id)}>Unmatch</button>
                    </div>
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