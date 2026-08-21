import Guess from '../Guess/Guess';
import { useGame } from '../../context/GameContext';

function Results() {
    const { game } = useGame();

    return (
        <div className='guess-results'>
            {game.guesses?.map((guess, i) => (
                <Guess key={guess + '-' + i} guess={guess} index={i} />
            ))}
        </div>
    );
}

export default Results;
