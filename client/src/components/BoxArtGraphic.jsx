import React, { useEffect } from 'react'
import '../index.css'

const BoxArtGraphic = () => {

    //Array of image URLS = 
    const boxArtUrls = [
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xex.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co6bo0.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co53i7.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co4p71.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co3gbk.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co521n.jpg",
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p5f.jpg"
    ]

    //create game boxes for each image URL
    useEffect(() => {
        const gameContainer = document.getElementById('--hero-box-arts-container');

        
        gameContainer.innerHTML = '';

        boxArtUrls.forEach((boxArtUrl, index) => {
            const coverArt = document.createElement('div');
            coverArt.classList.add('box-art');
            coverArt.style.backgroundImage = `url(${boxArtUrl})`;
            gameContainer.appendChild(coverArt);

            const randomX = Math.random() * (window.innerWidth / 2 - 220);
            const randomY = Math.random() * (window.innerHeight / 2 - 220);
            coverArt.style.transform = `translate(${randomX}px, ${randomY}px)`;
            coverArt.style.zIndex = index;
        });

        function updateBoxPositions() {
            const gameBoxes = document.querySelectorAll('.box-art');
            gameBoxes.forEach((box) => {
              const randomX = Math.random() * (window.innerWidth / 2 - 220);
              const randomY = Math.random() * (window.innerHeight / 2 - 220);
              box.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        
            setTimeout(updateBoxPositions, 5000);
          }
        
        updateBoxPositions();
    }, []);

  return (
    <div id="--hero-box-arts-container"></div>
  )
}

export default BoxArtGraphic