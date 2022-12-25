import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from "/assets/lotties/gym.json";

const Home = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value);
    // we are calling the setUserInput and set whatever is in the textarea. 
    // The value of the userInput will be updated with whatever is in the textArea
  }



  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Let's Launch a workout program for you</h1>
          </div>
          <div className="header-subtitle">
            <h2>Tell me what's your body goals and let me do the rest!</h2>
          </div>
        </div>
      </div>

      <div>
        <Lottie options={defaultOptions} height={250} width={250} />
      </div>
      
      {/* setting the value of the textarea to the user input. 
      Which means whatever is in the userInput var, 
      we are going to show in the textarea damn */}
      <div className="prompt-container">
        <textarea
          placeholder="ex: I want to lose 10 pounds"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
          <a
            className={
              isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Here You Go!</h3>
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



