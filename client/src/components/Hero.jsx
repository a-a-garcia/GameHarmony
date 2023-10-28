import React, { useEffect } from 'react';
import '../index.css';
import BoxArtGraphic from './BoxArtGraphic';
import pixelHeart from '../assets/pixel-heart.png';
import axios from 'axios';

const Hero = () => {
        
    // useEffect(() => {
    //     const apiUrl = 'http://localhost:8080/https://api.igdb.com/v4/games';

    //     const requestData = `fields cover;
    //     where rating > 90 & rating_count > 50 &first_release_date < 1672594866000;
    //     sort first_release_date desc;`;

    //     const headers = {
    //             'Client-ID': 'zj74j7i1ryan48mzoicj7n5afxxvps',
    //             'Authorization': 'Bearer zbea1o83yeu6apme6xrxgd6f04ts29',
    //             'Accept': 'application/json',
    //             'X-Requested-With' : 'XMLHttpRequest'
    //     };

    //     let coverArtUrls = [];

    //     //API call to get popular games, then inside is a nested API call to get the cover art for each game, since the /game endpoint doesn't have the image urls.
    //     axios
    //             .post(apiUrl, requestData, { headers })
    //             .then((response) => {
    //                 let coverApiUrl= 'http://localhost:8080/https://api.igdb.com/v4/covers'
    //                     const coverPromises = response.data.map((game) => {
    //                             let coverId = game.cover
    //                             let coverRequestData = `fields image_id; where id = ${coverId};`
    //                             return axios.post(coverApiUrl, coverRequestData, { headers })
    //                                     .then((response) => {
    //                                             let coverArtUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${response.data[0].image_id}.jpg`
    //                                             coverArtUrls.push(coverArtUrl)
    //                                     })
    //                                     .catch((error) => {
    //                                             // Handle API request errors here
    //                                             console.error(error);
    //                                     });
    //                     });
    //                     //using Promise.all to wait for all cover art URLs to be fetched
    //                     Promise.all(coverPromises)
    //                         .then(() => {
    //                             console.log(coverArtUrls)
    //                         })
    //             })
    //             .catch((error) => {
    //                     // Handle API request errors here
    //                     console.error(error);
    //             });
    //         },[]);


    return (
        <div className="--hero-container">
            <div className="--hero-text-container">
                <img src={pixelHeart} alt="" srcset="" className='--hero-pixel-heart-img'/>
                <h1>Welcome to GameHarmony!</h1>
                <h2>Ready to fall for a new game?</h2>
                <p>Start by entering the name of a game you like below:</p>
                <form className='--hero-form'>
                    <input type="text" name="game-search" id="game-search" placeholder="Enter a game name" />
                    <button type="submit">GO!</button>
                </form>
            </div>
            <BoxArtGraphic />
        </div>
    );
};

export default Hero;
