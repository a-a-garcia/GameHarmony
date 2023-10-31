import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import Nav from '../components/Nav'
import recommenderGraphicSvg from '../assets/recommender-graphic.svg'
import { ReactSVG } from 'react-svg'
import { useRecommender } from '../components/RecommenderContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Recommender = () => {
        const { userChosenGame, userChosenGameCover, updateUserChosenGame, updateUserChosenGameCover, randomGameId, updateRandomGameId } = useRecommender();
        const [showInfoModal, setShowInfoModal] = useState(false);
        const [ confirmGame, setConfirmGame ] = useState(false);
        const navigate = useNavigate();

        let apiUrl = 'http://localhost:8080/https://api.igdb.com/v4/games';

        const headers = {
                      'Client-ID': 'zj74j7i1ryan48mzoicj7n5afxxvps',
                      'Authorization': 'Bearer zbea1o83yeu6apme6xrxgd6f04ts29',
                      'Accept': 'application/json',
                      'X-Requested-With' : 'XMLHttpRequest'
        };
    
        let requestData = `fields name, cover, url;
        where id = ${randomGameId};`

        useEffect(() => {
                console.log(userChosenGame)
                // if (confirmGame) {
                //     window.location.reload();
                // }
        }, [confirmGame])

        function handleDislikeClick () {
                updateUserChosenGame(null);
                navigate('/')
        }

        function handleLikeClick () {
                let randomGameIndex = Math.floor(Math.random() * userChosenGame.similar_games.length);
                updateRandomGameId(userChosenGame.similar_games[randomGameIndex]);
                axios.post(apiUrl, requestData, { headers })
                        .then((response) => {
                                console.log(response.data[0])
                                updateUserChosenGame(response.data[0].name);
                                updateUserChosenGameCover(response.data[0].cover);
                                console.log(userChosenGameCover)
                                document.querySelector('.--recommender-dislike-button').textContent = '💔'
                                document.querySelector('.--recommender-like-button').textContent = '💖' 
                                document.querySelector('.--recommender-instructions-holder').textContent = `Here's a game you might like then! Click the 💖 to match! or 💔 to not.`
                                setConfirmGame(true)
                        })
                        .catch((error) => {
                                // Handle API request errors here
                                console.error(error);
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
                <Nav />
                <div className="--recommender-container">
                        <div className="--recommender-top-text"><p>{`${userChosenGame.name}`}</p></div>
                        <div className='--recommender-box-art-holder' style={{backgroundImage: `url(${userChosenGameCover})`}} onClick={handleBoxArtClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {showInfoModal && <div className="--recommender-modal">Click for more information on this game!</div>}
                        </div>
                        <div className='--recommender-dislike-button' onClick={handleDislikeClick}>👎</div>
                        <div className='--recommender-like-button' onClick={handleLikeClick}>👍</div>
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

                                const instructionsHolder = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                                instructionsHolder.setAttribute('class', '--recommender-instructions-holder');
                                instructionsHolder.setAttribute('x', '925');
                                instructionsHolder.setAttribute('y', '220');
                                instructionsHolder.textContent = "Is this the game you meant to enter? 👎 = No, 👍 = Yes"
                                newSvg.appendChild(instructionsHolder);


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