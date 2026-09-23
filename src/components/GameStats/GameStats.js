import React, { useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function GameStats() {
    const { game } = useGame();

    const stats = useMemo(() => {
        // Tally wins by their guess count in a single pass: { 1: 2, 3: 5, ... }
        const winsByGuessCount = game.gameStats.reduce((acc, stat) => {
            if (stat.win) {
                acc[stat.numberOfGuesses] = (acc[stat.numberOfGuesses] ?? 0) + 1;
            }
            return acc;
        }, {});

        const failedGamesCount = game.gameStats.filter((stat) => !stat.win).length;

        return {
            numberOfGamesPlayed: game.gameStats.length,
            winsByGuessCount,
            failedGamesCount,
        };
    }, [game.gameStats]);

    return (
        <div className='game-state'>
            <span className='title'>Statistics</span>
            <div>
                You've played {stats.numberOfGamesPlayed} game{stats.numberOfGamesPlayed !== 1 ? 's' : ''}
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {Array.from({ length: NUM_OF_GUESSES_ALLOWED }, (_, i) => i + 1).map((guessCount) => (
                    <li key={guessCount}>
                        {guessCount} guess{guessCount > 1 ? 'es' : ''}: {stats.winsByGuessCount[guessCount] ?? 0}
                    </li>
                ))}
                <li>❌ Failed: {stats.failedGamesCount}</li>
            </ul>
        </div>
    );
}

export default GameStats;
