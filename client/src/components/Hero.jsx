import React from 'react';
import '../index.css';
import BoxArtGraphic from './BoxArtGraphic';
import RecommenderForm from './RecommenderForm';


const Hero = () => {
    
    return (
        <div className="--hero-container">
            <RecommenderForm />
            <BoxArtGraphic />
        </div>
    );
};

export default Hero;
