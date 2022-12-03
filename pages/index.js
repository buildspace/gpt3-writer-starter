import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
    
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
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
            <h1>Get Plato's advice</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a message to Plato, get his advice - he's a wise guy! P.S. the more detail the better</h2>
          </div>
        </div>
        
<div className="prompt-container">
<textarea
  className="prompt-box"
  placeholder="What should I do with my life?"
  value={userInput}
  onChange={onUserChangedText}
/>;       

<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>

  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Plato Says...</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
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
