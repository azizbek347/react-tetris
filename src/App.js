import Tetris from './components/tetris';
import state from './state';

function App() {
  return (
    <div className="App">
      <Tetris store={state}/>
    </div>
  );
}

export default App;
