import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Fuorisalone trail blazer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Your personal assistant to the Fuorisalone</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask your assistant where you want to go and what you want to do!</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="Ask me something or a schedule for the day"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />

        <div className="prompt-buttons">
          <a className="generate-button" onClick={null}>
            <div className="generate">
              <p>Submit</p>
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
