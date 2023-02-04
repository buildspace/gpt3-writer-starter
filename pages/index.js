import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const onUserChangedText = event => {
    setUserInput(event.target.value);
  };

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate.js', {
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
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>574WARD Marketing Assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Build The Bend</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="start typing here" 
            className="prompt-box" 
            value={userInput} 
            onChange={onUserChangedText} 
          />
        </div>
        <div className="prompt-buttons">
          <a className="generate-button" onClick={callGenerateEndpoint}>
            <div className="generate">
              <p>Generate</p>
            </div>
          </a>
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
    </div>
  );
};

export default Home;
