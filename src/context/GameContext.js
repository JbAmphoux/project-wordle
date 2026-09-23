import React, { useContext, useEffect, useReducer } from 'react';
import { gameReducer, emptyGuess } from '../reducer/GameReducer';
import { sample } from '../utils';
import { WORDS } from '../data';
import { NUM_OF_GUESSES_ALLOWED } from '../constants';

const defaultGameValue = {
    tries: [],
};

const GameContext = React.createContext(defaultGameValue);

export function GameContextProvider(props) {
    const [state, dispatch] = useReducer(gameReducer, {
        isGameOver: false,
        isWordleFound: false,
        guesses: new Array(NUM_OF_GUESSES_ALLOWED).fill(null).map(() => emptyGuess()),
        answer: sample(WORDS),
        gameId: crypto.randomUUID(),
        gameStats: JSON.parse(window.localStorage.getItem('game_stats')) ?? [],
    });

    const initGame = () => {
        dispatch({ type: 'NEW_GAME', payload: { answer: sample(WORDS), gameId: crypto.randomUUID() } });
    };

    const addGuess = (guess) => {
        dispatch({ type: 'ADD_GUESS', payload: { guess } });
    };

    useEffect(() => {
        initGame();
    }, []);

    return (
        <GameContext.Provider
            value={{
                game: state,
                initGame,
                addGuess,
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}
