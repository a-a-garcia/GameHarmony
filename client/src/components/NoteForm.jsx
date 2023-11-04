import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NoteForm = () => {
    const [match, setMatch] = useState({});
    const { matchId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/matches/${matchId}`)
            .then(res => {
                console.log(res);
                setMatch(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const cancel = () => {
        navigate('/matches');
    }

  return (
    <div>
        <div className="--noteform-card">
            <div className="--noteform-card-header">
                <h2>Add a Note</h2>
            </div>
            <div className="--noteform-holder">
                <div className="--noteform-card-body">
                    <h3>{match.title}</h3>
                    <img src={match.coverArt}></img>
                    <textarea placeholder="What are your thoughts...?"></textarea>
                    <div className="--noteform-buttons">
                        <button className='--matches-btn1'>Submit</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteForm