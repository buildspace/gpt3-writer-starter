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
        <div className="content">
          <div className="header">
            <p className="header-title">Scratchpad</p>
            <p className="header-subtitle">
              Write your first song in the style of your favorite artist.
            </p>
          </div>
          <div className="text-container">
            <textarea
              className="text-area"
              placeholder="write some lyrics here to get started"
              value={input}
              onChange={onChange}
            />
            <textarea
              className="text-area"
              placeholder="your lyrics and song titles will go here"
              value={output}
              disabled
            />
          </div>
          <button
            className="generate-button"
            onClick={generateAction}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <p>Generate</p>
            )}
          </button>
        </div>
        <div className="footer">
          <Image src={buildspaceLogo} width={25} alt="buildspace logo" />
          <p>build on</p>
          <a
            href="https://buildspace.so/builds/ai-writer"
            target="_blank"
            rel="noreferrer"
          >
            buildspace
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
