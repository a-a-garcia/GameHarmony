import React, { useEffect } from 'react';
import '../index.css';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import axios from 'axios';

const DynamicBackground = () => {
        
    useEffect(() => {
        const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games';

        const requestData = `fields cover;
        where rating > 90 & rating_count > 50 &first_release_date < 1672594866000;
        sort first_release_date desc;`;

        const headers = {
                'Client-ID': 'zj74j7i1ryan48mzoicj7n5afxxvps',
                'Authorization': 'Bearer zbea1o83yeu6apme6xrxgd6f04ts29',
                'Accept': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest'
        };

        let coverArtUrls = [];

        //API call to get popular games, then inside is a nested API call to get the cover art for each game, since the /game endpoint doesn't have the image urls.
        axios
                .post(apiUrl, requestData, { headers })
                .then((response) => {
                    let coverApiUrl= 'http://localhost:8080/https://api.igdb.com/v4/covers'
                        const coverPromises = response.data.map((game) => {
                                let coverId = game.cover
                                let coverRequestData = `fields image_id; where id = ${coverId};`
                                return axios.post(coverApiUrl, coverRequestData, { headers })
                                        .then((response) => {
                                                let coverArtUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${response.data[0].image_id}.jpg`
                                                coverArtUrls.push(coverArtUrl)
                                        })
                                        .catch((error) => {
                                                // Handle API request errors here
                                                console.error(error);
                                        });
                        });
                        //using Promise.all to wait for all cover art URLs to be fetched
                        Promise.all(coverPromises)
                            .then(() => {
                                console.log(coverArtUrls)
                            })
                })
                .catch((error) => {
                        // Handle API request errors here
                        console.error(error);
                });

        let threeContainer = document.getElementById('three-container');

        if (threeContainer) {
                document.body.removeChild(threeContainer);
        }

        threeContainer = document.createElement('div');
        threeContainer.id = 'three-container';
        document.body.appendChild(threeContainer);

        const objects = [];
        
        const init = () => {
                const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
                camera.position.z = 3000;
    
                const scene = new THREE.Scene();
    
                for (let i = 0; i < coverArtUrls.length; i++) {
                    const img = document.createElement('img');
                    img.src = coverArtUrls[i];
    
                    const div = document.createElement('div');
                    div.style.width = '200px';
                    div.style.height = '200px';
                    div.style.backgroundImage = `url(${img.src})`;
    
                    const objectCSS = new CSS3DObject(div);
                    // Adjust the positions for the desired layout
                    objectCSS.position.x = Math.random() * 4000 - 2000;
                    objectCSS.position.y = Math.random() * 4000 - 2000;
                    objectCSS.position.z = Math.random() * 4000 - 2000;
                    scene.add(objectCSS);
    
                    objects.push(objectCSS);
                }
    
                const renderer = new CSS3DRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                threeContainer.appendChild(renderer.domElement);
    
                window.addEventListener('resize', onWindowResize);

                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    render();
                }

                function render() {
                    renderer.render(scene, camera);
                }

                render();
            };

        init();
    }, []);

    return (
        <div>
            <div id="info">Welcome to GameHarmony</div>
        </div>
    );
};

export default DynamicBackground;
