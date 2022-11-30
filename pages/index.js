import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import buildspaceLogo from '../assets/buildspace-logo.png';
import twitterLogo from '../assets/twitter-logo.svg';

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
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Explain Like I'm 5</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> Explain Like I'm 5 🐣</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Type in any topic below and we'll explain it like you're 5!
            </h2>
          </div>
          <div className="header-subtitle">
            <h2>
              "If you can't explain it simply, you don't understand it well enough." - Albert Einstein
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Try 'Quantum mechanics' "
            value={userInput}
            onChange={onUserChangedText}
            className="prompt-box" />
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
                  <h3>Explanation</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/tobelatnafu"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={twitterLogo} alt="twitter logo" />
            <p>@tobelatnafu</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
