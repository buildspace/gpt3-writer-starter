import Head from 'next/head'
import Image from 'next/image'
import buildspaceLogo from '../assets/buildspace-logo.png'
import { useState } from 'react'

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const onUserChangedText = (event) => {
    //TEST: text input is rendering to textbox
    //console.log(event.target.value)
    setUserInput(event.target.value)
  }
  return (
    <div className="root">
      <Head>
        <title>Nugg's Strain Finder</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Nugg's Strain Finder</h1>
          </div>
          <div className="header-subtitle">
            <h2>Let Nugg, your virtual budtender, help you find your ideal strain!</h2>
          </div>
          <div className="user-instructions">
            <h3>For best results, ask your question just like you would if you were talking with Nugg in person!</h3>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            className="prompt-box"
            placeholder="Type your desired effect or symptom relief need here..." className="prompt-box" 
            value={userInput}
            onChange={onUserChangedText} 
            />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={null}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
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
