import { useGame } from '../../context/GameContext';
import GameStats from '../GameStats/GameStats';

/**
 * Display an endgame banner wether the user win or lose
 */
function EndGame() {
    const { game, initGame } = useGame();

    return game.isGameOver ? (
        <div className={`${game.isWordleFound ? 'happy' : 'sad'} banner`}>
            {
                (game.isWordleFound,
                game.isWordleFound ? (
                    <p>
                        <strong>Congratulations!</strong> Got it in&nbsp;
                        <strong>{game.guesses.filter((g) => !g.isEmpty).length} guesses</strong>.
                    </p>
                ) : (
                    <p>
                        Sorry, the correct answer is <strong>{game.answer}</strong>.
                    </p>
                ))
            }
            <GameStats />
            <br />
            <br />
            <button
                onClick={() => {
                    initGame();
                }}
            >
                Guess another word
            </button>
        </div>
    ) : (
        <></>
    );
}

export default EndGame;
