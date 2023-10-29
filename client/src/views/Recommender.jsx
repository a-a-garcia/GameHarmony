import React, { useEffect } from 'react'
import '../index.css'
import Nav from '../components/Nav'
import recommenderGraphicSvg from '../assets/recommender-graphic.svg'
import { ReactSVG } from 'react-svg'
import { useRecommender } from '../components/RecommenderContext'

const Recommender = () => {
        const { userChosenGame, userChosenGameCover } = useRecommender();

        useEffect(() => {
                console.log(userChosenGame)
                console.log(userChosenGameCover)
                let randomGameIndex = Math.floor(Math.random() * userChosenGame.similar_games.length);
                console.log(randomGameIndex)
                console.log(userChosenGame.similar_games[randomGameIndex])
        }, [])

        // here, we need to generate that random number, based on how long a game's similar games array is, to determine which game will be recommended to the user.

    return (
        <div>
                <Nav />
                <div className="--recommender-container">
                        {/* <div className="--recommender-top-text"><p>Test!</p></div> */}
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
                                topText.textContent= 'The Last of Us: Part II';
                                newSvg.appendChild(topText);

                                const boxArtHolder = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                                boxArtHolder.setAttribute('class', '--recommender-box-art-holder');
                                boxArtHolder.setAttribute('x', '215');
                                boxArtHolder.setAttribute('y', '275');
                                boxArtHolder.style.backgroundImage = `url(${userChosenGameCover})`;
                                newSvg.appendChild(boxArtHolder);

                                const instructionsHolder = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                                instructionsHolder.setAttribute('class', '--recommender-instructions-holder');
                                instructionsHolder.setAttribute('x', '925');
                                instructionsHolder.setAttribute('y', '220');
                                instructionsHolder.textContent = "Click the 💔 if you don't like the game, or the 💖 if you do!"
                                newSvg.appendChild(instructionsHolder);

                                const dislikeButton = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                                dislikeButton.setAttribute('class', '--recommender-dislike-button');
                                dislikeButton.setAttribute('x', '295');
                                dislikeButton.setAttribute('y', '980');
                                dislikeButton.textContent = "💔"
                                newSvg.appendChild(dislikeButton);

                                const likeButton = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                                likeButton.setAttribute('class', '--recommender-like-button');
                                likeButton.setAttribute('x', '495');
                                likeButton.setAttribute('y', '980');
                                likeButton.textContent = "💖"
                                newSvg.appendChild(likeButton);

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