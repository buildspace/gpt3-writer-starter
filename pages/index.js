import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>remember ur shit. retain ur sanity.</h1>
          </div>
          <div className="header-subtitle">
            <h2>it's so hard to remember your principles. let riri help with that.</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="what's going on?"
          className="prompt-box"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="prompt-buttons">
          <a className="generate-button" onClick={null}>
            <div>
              <p>generate</p>
            </div>
          </a>
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
