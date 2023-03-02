import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    let options=  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    };
    const response = await fetch('/api/generate',options);

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
}

  return (
    <div className="root">
      <Head>
        <title>Fuorisalone trail blazer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h5>Your personal assistant to the Fuorisalone</h5>
          </div>
          <div className="header-subtitle">
            <h5>Ask your assistant where you want to go and what you want to do!</h5>
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
