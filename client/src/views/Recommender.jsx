import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import Nav from '../components/Nav'
import recommenderGraphicSvg from '../assets/recommender-graphic.svg'
import pixelHeartGif from '../assets/pixel-heart-gif.gif';
import { ReactSVG } from 'react-svg'
import { useRecommender } from '../components/RecommenderContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Recommender = () => {
        const { userChosenGame, userChosenGameCover, updateUserChosenGame, updateUserChosenGameCover, randomGameId, updateRandomGameId } = useRecommender();
        const [ showInfoModal, setShowInfoModal ] = useState(false);
        const [ confirmGame, setConfirmGame ] = useState(false);
        const [ repeatAnimation, setRepeatAnimation ] = useState(false);
        const [ showMatchModal, setShowMatchModal ] = useState(false);
        const navigate = useNavigate();
        
        function handleDislikeClick () {
                updateUserChosenGame(null);
                updateUserChosenGameCover(null);
                updateRandomGameId(null);
                navigate('/')
        }

        function handleLikeClick() {
                if (confirmGame) {
                        setShowMatchModal(true);
                } else {
                        let randomGameIndex = Math.floor(Math.random() * userChosenGame.similar_games.length);
                        updateRandomGameId(userChosenGame.similar_games[randomGameIndex]);
                }
        }

        useEffect(() => {
                let apiUrl = 'http://localhost:8080/https://api.igdb.com/v4/games';
        
                const headers = {
                              'Client-ID': 'zj74j7i1ryan48mzoicj7n5afxxvps',
                              'Authorization': 'Bearer zbea1o83yeu6apme6xrxgd6f04ts29',
                              'Accept': 'application/json',
                              'X-Requested-With' : 'XMLHttpRequest'
                };
            
                let requestData = `fields name, cover, url;
                where id = ${randomGameId};`

                if (randomGameId) {
                        axios.post(apiUrl, requestData, { headers })
                                .then((response) => {
                                        updateUserChosenGame({name : response.data[0].name, url: response.data[0].url});
                                        axios.post('http://localhost:8080/https://api.igdb.com/v4/covers', `fields image_id; where id = ${response.data[0].cover};`, { headers })
                                                .then((response) => {
                                                        console.log(response.data[0])
                                                        updateUserChosenGameCover(`https://images.igdb.com/igdb/image/upload/t_720p/${response.data[0].image_id}.jpg`);
                                                        setRepeatAnimation(true);
                                                })
                                                .catch((error) => {
                                                        // Handle API request errors here
                                                        console.error(error);
                                                });
                                        document.querySelector(`.--recommender-dislike-button`).textContent = '💔';
                                        document.querySelector('.--recommender-like-button').textContent = '💖';
                                        document.querySelector('.--recommender-instructions-holder').textContent = `Here's a game you might like! Click the 💖 to match! or 💔 to not.`;
                                        setConfirmGame(true);
                                })
                                .catch((error) => {
                                        // Handle API request errors here
                                        console.error(error);
                                });
                }
        }, [randomGameId])
        
        function handleConfirmMatch(event) {
                axios
                        .post("http://localhost:8000/api/matches/new", {
                                title: userChosenGame.name,
                                coverArt: userChosenGameCover,
                                igdbUrl: userChosenGame.url,
                        })
                        .then((response) => {
                                console.log(response);
                                updateUserChosenGame(null);
                                updateUserChosenGameCover(null);
                                updateRandomGameId(null);
                                if (event.target.id == '--recommender-go-to-matches-btn') {
                                        navigate('/matches');
                                } else {
                                        navigate('/');
                                }
                        })
                        .catch((error) => {
                                console.log(error);
                        });
        }
        
        function handleBoxArtClick () {
                window.open(userChosenGame.url, '_blank')
        }

        function handleMouseEnter() {
            setShowInfoModal(true);
        }

        function handleMouseLeave() {
            setShowInfoModal(false);
        }

        return (
            <div>
                { showMatchModal ? 
                        (
                        <div id="--recommender-match-modal">
                                <div className='--recommender-match-modal-top-text'>
                                        <h3>It's a match! A new adventure awaits..</h3>
                                        <img src={pixelHeartGif} id="--recommender-pixel-heart-gif"/>
                                </div>
                                <div className='--recommender-match-modal-box-art-holder'>
                                        <img src={userChosenGameCover} />
                                </div>
                                <div className='--recommender-match-modal-buttons'>
                                        <button onClick={handleConfirmMatch} id="--recommender-go-to-matches-btn">Go to Matches</button>
                                        <button onClick={handleConfirmMatch} id="--recommender-recommend-again-btn">Recommend Again</button>
                                </div>
                        </div>
                        ) 
                : null }
                <Nav className={`${showMatchModal ? '--recommender-dim' : ''}`}/>
                <div className={`--recommender-container ${showMatchModal ? '--recommender-dim' : ''}`} >
                        <div className={`--recommender-top-text ${repeatAnimation ? 'slide-down' : ''}`}><p>{`${userChosenGame.name}`}</p></div>
                        <div className={`--recommender-instructions-holder ${repeatAnimation ? 'slide-down' : ''}`}>Is this the game you meant to enter? 👎 = No, 👍 = Yes</div>
                        <div className={`--recommender-box-art-holder ${repeatAnimation ? 'slide-down' : ''}`} style={{backgroundImage: `url(${userChosenGameCover})`}} onClick={handleBoxArtClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {showInfoModal && <div className="--recommender-modal">Click for more information on this game!</div>}
                        </div>
                        <div className={`--recommender-dislike-button ${repeatAnimation ? 'slide-down' : ''}`} onClick={handleDislikeClick}>👎</div>
                        <div className={`--recommender-like-button ${repeatAnimation ? 'slide-down' : ''}`} onClick={handleLikeClick}>👍</div>
                        <ReactSVG
                                src={recommenderGraphicSvg}
                                beforeInjection={(svg) => {
                                     // Create a new <svg> element
                                const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                
                                // Copy the existing SVG content to the new <svg>
                                for (const child of svg.children) {
                                newSvg.appendChild(child.cloneNode(true));
                                }

                                // Create and append the <foreignObject> to the new <svg>
                                const topText = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                                topText.setAttribute('class', '--recommender-top-text');
                                topText.setAttribute('x', '215');
                                topText.setAttribute('y', '90');
                                topText.textContent= `${userChosenGame.name}`;
                                newSvg.appendChild(topText);

                                // Replace the existing SVG content with the modified SVG content
                                svg.innerHTML = newSvg.innerHTML;
                                }}
                                fallback={() => <span>Error!</span>}
                        />
                </div>
        </div>
    )
}

export default Recommender