import Head from 'next/head';
import Image from 'next/image';
// import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const keyPress = (e) => {
    if (e != undefined && !isGenerating) {
      var evtobj = e
      if (evtobj.code == 'Enter' && evtobj.ctrlKey)
        callGenerateEndpoint();
    }
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
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

  return (
    <div className="root-chat">
      <Head>
        <title>Fuorisalone trail blazer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h2>Your personal assistant to the Fuorisalone</h2>
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
          onKeyPress={keyPress}
        />
        <div className="prompt-buttons">

          {isGenerating ?
            <a className='generate-button loading'>
              <div className="generate">
                <span className="loader"></span>
              </div>
            </a>
            :
            <a className='generate-button'
              onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Submit</p>
              </div>
            </a>
          }
        </div>
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
  );
};
export default Home;
