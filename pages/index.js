import Head from 'next/head';
import Image from 'next/image';
import twitterLogo from '../assets/twitter-logo.png';
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
    // console.log(event.target.value); -- commented out so that it doesnt clutter our console.
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Resume Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Resume Writing with Advance AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Unlock the Secrets to Crafting the Perfect AI Resume for Your Dream Job</h2>
            <p><i>Disclaimer: It is important to note that AI technology has limitations and cannot replace the expertise of a human. Therefore, it is recommended that multiple iterations of the resume be reviewed and edited by a human for accuracy and quality assurance.</i></p>
            <i><p>This is just an experiment to playaround with OpenAI GPT-3.</p></i>
          </div>
        </div>

        {/* text area code */}

        <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="start typing here. You can give some parameters such as your name, job title, experience etc."
          value={userInput}
          onChange={onUserChangedText}
          />
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

          {/* New code I added here */}
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
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          {/* badge */}
        </a>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/cryptoverseOG"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={twitterLogo} alt="buildspace logo" />
            <p>Check us out on twitter</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
