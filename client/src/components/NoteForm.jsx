import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NoteForm = () => {
    const [match, setMatch] = useState({});
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState({});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/matches/note/${matchId}`, {note})
            .then(res => {
                console.log(res.data);
                navigate('/matches');
            })
            .catch(err => setErrors({note: err.response.data.errors.note.message}));
    }

  return (
    <div>
        <div className="--noteform-card">
            <div className="--noteform-card-header">
                <h2>Add/Edit Note</h2>
            </div>
            <div className="--noteform-holder">
                <div className="--noteform-card-body">
                    <h3>{match.title}</h3>
                    <img src={match.coverArt}></img>
                    { errors.note ?
                        <div className='--validation-errors'>ERROR: {errors.note}</div>
                    : null }
                    <form onSubmit={handleSubmit}>
                        <textarea onChange={(e) => setNote(e.target.value)} placeholder="What are your thoughts...?" defaultValue={match.note}></textarea>
                        <div className="--noteform-buttons">
                            <button className='--matches-btn1'>Submit</button>
                            <button onClick={cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteForm