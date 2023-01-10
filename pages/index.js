import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';



const Home = () => {
  const [userInput, setUserInput] = useState('');

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
            <h1>Generador Automático de CV</h1>
          </div>
          <div className="header-subtitle">
          <h2>Genera tu CV de manera automática con inteligencia artificial</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Agrega el empleo para el que deseas generar tus logros de manera automática" className="prompt-box" value={userInput} onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={null}>
            <div className="generar">
            <p>Generate</p>
            </div>
            </a>
        </div>
      </div>
      <div className="badge-container grow">
        <a href="https://buildspace.so/builds/ai-writer" target="_blank" rel="noreferrer"/>
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
