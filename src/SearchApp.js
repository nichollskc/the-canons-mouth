import './App.css';
import SearchPage from './SearchPage.js';

function App() {
      return (
              <div className="App">
                <header className="App-header">
                    <SearchPage perPage={5}/>
                </header>
              </div>
            );
}

export default App;
