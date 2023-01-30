import React, { useState } from 'react';
import Image from './Image';
import buildspaceLogo from './buildspaceLogo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [generateResponse, setGenerateResponse] = useState('');

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateClick = () => {
    // Make API call to generate content here
    setGenerateResponse('Generated content goes here.');
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>574WARD Marketing Assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Build The Bend</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="start typing here" 
            className="prompt-box" 
            value={userInput} 
            onChange={onUserChangedText} 
          />
        </div>
        <div className="prompt-buttons">
          <a className="generate-button" onClick={handleGenerateClick}>
            <div className="generate">
              <p>Generate</p>
            </div>
          </a>
        </div>
        <div className="generated-response">
          <p>{generateResponse}</p>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
