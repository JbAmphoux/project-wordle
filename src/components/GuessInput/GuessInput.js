import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function GuessInput() {
    const { game, addGuess } = useGame();
    const [guessValue, setGuessValue] = useState('');

    const handleSubmit = (value) => {
        if (!game.isGameOver) {
            if (value.length === 5) {
                if (game.guesses.length <= NUM_OF_GUESSES_ALLOWED && value !== '') {
                    addGuess(value.toUpperCase());
                }
                setGuessValue('');
            }
        }
    };

    const guessInputRef = useRef();

    useEffect(() => {
        if (guessInputRef.current) {
            guessInputRef.current.disabled = game.isGameOver;
        }
    }, [game.isGameOver]);

    return (
        <form
            className='guess-input-wrapper'
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(guessValue);
            }}
        >
            <label htmlFor='guess-input'>Enter guess:</label>
            <input
                ref={guessInputRef}
                type='text'
                name='guess-input'
                pattern='[A-Za-z]{5}'
                value={guessValue}
                onChange={(e) => {
                    setGuessValue(e.target.value.toUpperCase());
                }}
                required
                placeholder='Enter your guess'
            />
        </form>
    );
}

export default GuessInput;
