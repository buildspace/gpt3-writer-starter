import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from "react";

const Home = () => {
    const [userInput, setUserInput] = useState('');

    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };

    return (
        <div className="root">
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>Classmate</h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>A friendly AI companion that help you with your essay</h2>
                    </div>
                </div>
                <div className="prompt-container">
                   <textarea
                       className="prompt-box"
                       placeholder="start typing here"
                       value={userInput}
                       onChange={onUserChangedText}
                   />
                    <div className="prompt-buttons">
                        <a className="generate-button" onClick={null}>
                            <div className="generate">
                                <p>Generate</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="badge-container grow">
                <a
                    href="https://github.com/buildspace/gpt3-writer-starter"
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
