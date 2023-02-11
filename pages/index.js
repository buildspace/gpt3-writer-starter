import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/n4f.png';
import copyIcon from '../assets/copy.ico';
import { useState } from 'react';
import ClipboardJS from 'clipboard';



const Home = () => {

  {/*copy funktion*/ }
  const [isCopying, setIsCopying] = useState(false)
  const copyToClipboard = (event) => {
    setIsCopying(true);
    const clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function(e) {
      console.log("Text wurde kopiert: ", e.text);
      setIsCopying(false);
    });
    clipboard.on('error', function(e) {
      console.error("Fehler beim Kopieren: ", e);
      setIsCopying(false);
    });
  }
    {/*copy funktion ende*/ }

const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
  {/*Reference https://buildspace.so/p/build-ai-writing-assistant-gpt3/lessons/add-in-the-openai-api*/ }
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

{/*Text Changed trigger */}
  const onUserChangedText = (event) => {
    /*console.log(event.target.value);*/
    setUserInput(event.target.value);
  };

  {/*State für die Seitenleiste*/}
  const [sidebarOpen, setSidebarOpen] = useState(false);

let selectedTitle = "";

const titleOptions = [
  "Graham",
  "eblog writer 2",
  "The Power of Ideas",
  "The Importance of Diversity",
  "The Benefits"
];

function createTitleDropdown() {
  const select = document.createElement("select");

  for (let i = 0; i < titleOptions.length; i++) {
    const option = document.createElement("option");
    option.value = titleOptions[i];
    option.text = titleOptions[i];
    select.appendChild(option);
  }

  select.onchange = function() {
    selectedTitle = select.value;
  };

  document.getElementByClassName("sidebar").appendChild(select);
}

createTitleDropdown();

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Smart Post Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>"Revolutionäre Textverarbeitung für bessere und effizientere Schreibarbeit"</h2>
          </div>
        </div>
        {/*Prompt COntainer*/}
        <div className="prompt-container">
            {/*Text input area */}
            <textarea
              className="prompt-box"
              id="inputtxt"
              placeholder="start typing here"
              value={userInput}
              onChange={onUserChangedText}>
            </textarea>;
            {/*Prompt Buttons */}
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
            {/*AI response output*/}
            {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
            {/*Text input area */}
            <textarea
              className="prompt-box"
              id="out"
              placeholder=""
              value={apiOutput}
            >
            </textarea>;
                        <button className={isCopying ? 'copy-btn copying' : 'copy-btn'} onClick={copyToClipboard} data-clipboard-target="#out">
                  <Image src={copyIcon} alt="Copy to clipboard" width={48} height={48} />
            </button>
              </div>
            </div>
          )}

      {/* Seitenleiste */}
      {sidebarOpen && (
        <div className="sidebar">

          {/* Hier könnte ein Menü hinzugefügt werden */}
        </div>
      )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://now4free.de/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>created by Now4Free</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
