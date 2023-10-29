import React, { createContext, useContext, useState } from 'react';

//defines the context where you store and share data
const RecommenderContext = createContext();

//custom hook to simplify the process of accessing the context
export function useRecommender() {
    return useContext(RecommenderContext);
}

//provider component that wraps your app and makes the context object available to any child component that calls useRecommender()
export function RecommenderProvider({ children }) { // { children } represents the child compontns that will be wrapped by this provider. in this case, it's all of your <Routes> in App.jsx

    //using the useStateHook to create state for the data you want to share
    const [userChosenGame, setUserChosenGame] = useState() //state for the inputted game
    const [userChosenGameCover, setUserChosenGameCover] = useState() //state for the inputted game's cover art
    const [randomGame, setRandomGame] = useState() //state for the random game
    const [randomGameCover, setRandomGameCover] = useState() //state for the random game's cover art

    //function that allows you to update the state
    //crucial for the form to work
    const updateUserChosenGame = (gameData) => {
        setUserChosenGame(gameData);
      };
    
      const updateUserChosenGameCover = (coverData) => {
        setUserChosenGameCover(coverData);
      };
    
      const updateRandomGame = (gameData) => {
        setRandomGame(gameData);
      };
    
      const updateRandomGameCover = (coverData) => {
        setRandomGameCover(coverData);
      };

    //we're returning a provider component that wraps the entire app
    //the value prop is where you define what values you want to expose to child components
    //in this case, it's an object with 'recommenderData' and 'updateRecommenderData' keys
    //the {children} prop is used to specify the child components that will be wrapped by this provider. this is what makes it possible to apply the context to the components inside the "RecommenderProvider" component in App.jsx
return (
    <RecommenderContext.Provider value={{ 
        userChosenGame,
        userChosenGameCover,
        randomGame,
        randomGameCover,
        updateUserChosenGame,
        updateUserChosenGameCover,
        updateRandomGame,
        updateRandomGameCover
    }}>
        {children}
    </RecommenderContext.Provider>
    );
}