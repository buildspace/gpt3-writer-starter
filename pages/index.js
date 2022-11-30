import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import BuildspaceLogo from '../assets/Buildspace-logo.png';
import Typewriter from 'typewriter-effect';


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
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Rumi Writer</title>
      </Head>
      <div className="container">
      <div className="gg">
      
          <div className="header">
            <div className="header-title">
            <h1>Rumi Writer</h1>
            </div>
          <div className="header-subtitle">
            <h2>
              <Typewriter 
              options={{
                strings: ['Ask Rumi to write you a poem about anything',],
                autoStart: true,
                loop: true,
                delay: 50,
                pauseFor: 10000,
                
              }} />
            </h2>
          </div>
        </div>
      </div>
    <div className="prompt-container">
        <textarea placeholder="what you want the poem to be about(ex.a cat on the moon)" className="prompt-box" value={userInput} onChange={onUserChangedText} />
        <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
</div> 
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
      <div className="lil" />
      <Image className='small' src={BuildspaceLogo} alt="buildspace logo" />
        <h2></h2>
        <h3>Poem by Rumi</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
        <div className='gg'/>
    </div>
    
  </div>

  
)}
      <div className="badge-container grow">
        <a
          href="https://twitter.com/aribk24"
          target="_blank"
          rel="noreferrer"
        >
      <div className="badge">
            <p>Built by Arib</p>
          </div>
        </a>
      </div>
    </div>
</div>
    
  );
};

export default Home;
