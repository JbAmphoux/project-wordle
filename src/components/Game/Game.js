import Results from '../Results/Results';
import GuessInput from '../GuessInput/GuessInput';
import EndGame from '../EndGame/EndGame';

function Game() {
    return (
        <div className='game-wrapper'>
            <Results />
            <GuessInput />
            <EndGame />
        </div>
    );
}

export default Game;
