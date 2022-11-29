import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [randomNumber, setRandomNumber] = useState(undefined);
  const subHeaderList = [
    "The Future of Questions is Here – Try It Now!",
    "Enhance Your Understanding of Complex Topics with AI Questions!",
    "Learn Faster with AI Questions!",
    "Generate Clever Questions with the Click of a Button!",
    "Get Creative With Your Questions!",
    "Generate Questions for Your Next Quiz!",
    "Tap Into the Power of AI: Generate Questions On Demand!",
    "Become a Master of Questions with AI!",
  ];
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * subHeaderList.length));
  }, []);


  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("calling API");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI response", output.text);
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Questions Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>{subHeaderList[randomNumber]}</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Paste your text here..."
            className="prompt-box" 
            value={userInput}
            onChange={onUserChangedText}
          />
        </div>
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
