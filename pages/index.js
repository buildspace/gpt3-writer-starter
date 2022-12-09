import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  }

  const callGenerateEndpoint = async () => {
    setIsGenerating(true)

    console.log('Calling OpenAI...')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({userInput}),
    })

  const data = await response.json()
  const { output } = data
  console.log('OpenAI replies...', output.text)

  setApiOutput(`${output.text}`)
  setIsGenerating(false)
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate the perfect love letter</h1>
          </div>
          <div className="header-subtitle">
            <h2>let us help you love your partner</h2>
          </div>
          <div className="prompt-container">
            <textarea placeholder='start typing here' className="prompt-box" value={userInput} onChange={onUserChangedText}/>
          </div>
          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className='generate'>
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
