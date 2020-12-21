import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CheckboxContainer from './CheckboxContainer.js';
import Aeneid from './aeneid.js';
import Iliad from './iliad.js';

function App() {
      const [currentTime, setCurrentTime] = useState(0);

      useEffect(() => {
              fetch('/time').then(res => res.json()).then(data => {
                        setCurrentTime(data.time);
                      });
            }, []);

      return (
              <div className="App">
                <header className="App-header">
                   <img src={logo} className="App-logo" alt="logo" />
                   <p>
                       My first app!
                   </p>
                             <p>The current time is {currentTime}.</p>
                   <a
                     className="App-link"
                     href="https://reactjs.org"
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     Learn React
                   </a>

                   <CheckboxContainer />

                   <div>
                       <Aeneid />
                       <Iliad />
                   </div>

                </header>
              </div>
            );
}

export default App;
