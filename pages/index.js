import Head from 'next/head';
//const Head = require("next/Head");
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import {useState} from 'react'; 

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
    //console.log(event.target.value);
    setUserInput(event.target.value); 
  }
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Talk to Dumbledore:</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a message to Dumbledore, ask him about anything (ex. What was your greatest challenge, What did you learn from it, etc)
</h2>
          </div>
        </div>
      </div>
      {/* Added textarea here */}
      <div className="prompt-container">
        <textarea 
        placeholder='start typing here' 
        className="prompt-box"
        value={userInput}
        onChange={onUserChangedText}
         />;
      </div>
       {/* new code I added here for btn*/}
       <div className="prompt-buttons">
        <a className="generate-button" onClick={callGenerateEndpoint}>
          <div className="generate">
            <p>Generate</p>
          </div>
        </a>
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
