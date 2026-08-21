import { GameContextProvider } from '../../context/GameContext';
import Game from '../Game';
import Header from '../Header';

function App() {
    return (
        <div className='wrapper'>
            <Header />

            <div className='game-wrapper'>
                <GameContextProvider>
                    <Game />
                </GameContextProvider>
            </div>
        </div>
    );
}

export default App;
