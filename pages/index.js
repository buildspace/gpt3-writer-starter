import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';
const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")

    const response = await fetch('./api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     /* proxy: {
        host: 'blablabla',
        port: 81
      },*/
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Song lyrics generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>input a topic, i'll generate lyrics </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea className="prompt-box" placeholder="start typing here" value={userInput} onChange={onUserChangedText} />;
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="more-container grow">
        Like this tool ? Download the Google Chrome Extension 
        <a href="https://github.com/OrrYggE/LyricsGenerator/raw/main/lyrics_generator.zip" target="_blank" rel="noreferrer"> here</a>
      </div>
    </div>
  );
};

export default Home;