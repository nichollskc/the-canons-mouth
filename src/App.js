import React, { useState, useEffect } from 'react';
import './App.css';
import CanonText from './CanonText.js';

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
                   <CanonText />

                </header>
              </div>
            );
}

export default App;
