import { WORD_LENGTH, NUM_OF_GUESSES_ALLOWED } from '../constants';
import { checkGuess } from '../game-helpers';

export const emptyGuess = () => {
    return {
        isEmpty: true,
        value: new Array(WORD_LENGTH).fill(null).map(() => ({ letter: '', status: '' })),
    };
};

export function gameReducer(state, action) {
    const addGuess = (guess, index, answer) => {
        return state.guesses.map((g, i) => {
            if (index === i) {
                return checkGuess(guess, answer);
            }
            return g;
        });
    };

    const handleAddGuess = (guess) => {
        let newState = {
            ...state,
            guesses: addGuess(
                guess,
                state.guesses.findIndex((g) => g.value.every((cell) => cell.letter === '')),
                state.answer,
            ),
            isWordleFound: guess === state.answer,
        };

        if (newState.isWordleFound || newState.guesses.filter((x) => x.isEmpty).length === 0) {
            const newStats = [...state.gameStats, { gameId: state.gameId, numberOfGuesses: newState.guesses.filter((g) => !g.isEmpty).length, win: newState.isWordleFound }];
            window.localStorage.setItem('game_stats', JSON.stringify(newStats));
            newState = {
                ...newState,
                isGameOver: true,
                gameStats: newStats,
            };
        }
        return newState;
    };

    switch (action.type) {
        case 'NEW_GAME': {
            return {
                isGameOver: false,
                isWordleFound: false,
                guesses: new Array(NUM_OF_GUESSES_ALLOWED).fill(null).map(() => emptyGuess()),
                answer: action.payload.answer,
                gameId: action.payload.gameId,
                gameStats: state.gameStats,
            };
        }
        case 'ADD_GUESS': {
            return handleAddGuess(action.payload.guess);
        }
        default: {
            return state;
        }
    }
}
