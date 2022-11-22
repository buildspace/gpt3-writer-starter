import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const generateAction = useCallback(async () => {
    setIsGenerating(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    const { baseChoice, finalChoice } = data;

    setOutput(
      `Song Titles:${finalChoice.text}\n\nLyrics:\n${input}${baseChoice.text}`
    );

    setIsGenerating(false);
  }, [input]);

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>GPT-3</h1>
            <h1>Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write your first song in the style of your favorite artist.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea className="prompt-box" value={input} onChange={onChange} />
          <div className="prompt-buttons">
            <div className="key-stroke">
              <p>cmd/ctrl + enter</p>
            </div>
            <div className="or">
              <p>OR</p>
            </div>
            <a className="generate-button" onClick={generateAction}>
              <div className="generate">
                {/* {!isGenerating ? (
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : ( */}
                <p>Generate</p>
                {/* )} */}
              </div>
            </a>
          </div>
        </div>
        {output && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{output}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
