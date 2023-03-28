import Head from 'next/head';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>remember ur shit.</h1>
          </div>
          <div className="header-subtitle">
            <h2>it's so hard to remember your principles. let JEN help with that.</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="i don't feel like building in public..."
          className="prompt-box"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="prompt-buttons">
          <a
            className={isGenerating ? "generate-button loading" : "generate-button"}
            onClick={callGenerateEndpoint}
          >
            <div>
              { isGenerating ? <span className="loader" /> : <p>JENerate</p> }
            </div>
          </a>
        </div>
      
      {
        apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>here's what i think</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
      )}
      </div>
    </div>
  );
};

export default Home;
