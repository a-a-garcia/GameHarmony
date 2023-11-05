import React, {useEffect, useState} from 'react'
import pixelHeart from '../assets/pixel-heart.png';
import { useRecommender } from './RecommenderContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecommenderForm = () => {
    const { userChosenGame, updateUserChosenGame, updateUserChosenGameCover} = useRecommender();
    const [ userInput, setUserInput ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    
    let apiUrl = 'http://localhost:8080/https://api.igdb.com/v4/games';

    const headers = {
                  'Client-ID': 'zj74j7i1ryan48mzoicj7n5afxxvps',
                  'Authorization': 'Bearer zbea1o83yeu6apme6xrxgd6f04ts29',
                  'Accept': 'application/json',
                  'X-Requested-With' : 'XMLHttpRequest'
    };

    let requestData = `fields name, cover, url, similar_games;
    where name = "${userInput}";`
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      if (document.getElementById('--hero-form-input').value.length < 1) {
        setError('Please enter a game name.')
        return;
      }


      axios.post(apiUrl, requestData, { headers })
        .then((response) => {
          if (response.data.length === 0) {
            setError('That game could not be found. Try - 1) Check spelling, 2) Enter the full title of the game (no abbreviations), 3) Change the letter casings of the words in the title.')
          } else {
            updateUserChosenGame(response.data[0]);
            // console.log(userChosenGame) this will be undefined because of React's asynchronous nature. Use a useEffect to perform actions based on the updated 'userChosenGame' state.
          }
        })
        .catch((error) => {
          // Handle API request errors here
          console.error(error);
        });
      }
      
    useEffect(() => {
      if (userChosenGame) {
        let coverId = userChosenGame.cover

        apiUrl = 'http://localhost:8080/https://api.igdb.com/v4/covers';

        requestData = `fields image_id;
        where id=${coverId};`

        axios.post(apiUrl, requestData, { headers })
          .then((response) => {
            const coverArtId = response.data[0].image_id;
            const coverArtUrl = `https://images.igdb.com/igdb/image/upload/t_720p/${coverArtId}.jpg`
            updateUserChosenGameCover(coverArtUrl);
            navigate('/recommender')
          })
          .catch((error) => {
            // Handle API request errors here
            console.error(error);
          });
      }
    }, [userChosenGame])



      return (
        <div>
        <div className="--recommender-form-text-container">
                <img src={pixelHeart} alt="" srcset="" className='--hero-pixel-heart-img'/>
                <h1>Welcome to GameHarmony!</h1>
                <h2>Ready to fall for a new game?</h2>
                <p>Start by entering the name of a game you like below:</p>
                {error ? 
                  <div className="--validation-errors">ERROR: {error}</div>
                : null}
                <form className='--hero-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter a game name" onChange={(e) => setUserInput(e.target.value)} id="--hero-form-input" />
                    <button type="submit">GO!</button>
                </form>
        </div>
    </div>
  )
}

export default RecommenderForm