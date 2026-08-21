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

    const handleGameOver = (state, isWordleFound) => {
        return {
            ...state,
            isGameOver: true,
            isWordleFound: isWordleFound,
        };
    };

    const handleAddGuess = (guess) => {
        const newState = {
            ...state,
            guesses: addGuess(
                guess,
                state.guesses.findIndex((g) => g.value.every((cell) => cell.letter === '')),
                state.answer,
            ),
            isWordleFound: guess === state.answer,
        };

        if (newState.isWordleFound || newState.guesses.filter((x) => x.isEmpty).length === 0) {
            return handleGameOver(newState, newState.isWordleFound);
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
        case 'GAME_OVER': {
            return handleGameOver(state, action.payload.isWordleFound);
        }
        case 'ADD_GAME_STAT': {
            return {
                ...state,
                gameStats: [...state.gameStats, action.payload.gameStat],
            };
        }
        default: {
            return state;
        }
    }
}
