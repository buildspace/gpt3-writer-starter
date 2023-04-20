/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Title from '../lib/title/title';
import HighlightBox from '../lib/highlight-box/highlight-box';
import Root from '../lib/root/root';
import { getGeneration } from '../utils/prompt-helpers';

function Prompt() {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const playOutput = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = apiOutput;
    const allPossibleVoices = speechSynthesis.getVoices();
    let targetVoice = allPossibleVoices[0];
    for (let idx; idx < allPossibleVoices.length(); idx + 1) {
      if (allPossibleVoices[idx].name === 'Boing') targetVoice = allPossibleVoices[idx];
    }
    msg.voice = targetVoice;
    window.speechSynthesis.speak(msg);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    const text = await getGeneration(userInput);
    setApiOutput(text);
    setIsGenerating(false);
  };

  return (
    <Root>
      <Head>
        <title>dashboard</title>
      </Head>
      <Title
        title="reinforce ur shit."
        subtitle="it's so hard to remember ur principles. let JEN help with that."
      />
      <div className="prompt-container">
        <textarea
          placeholder="i feel like my work is not perfect; it's gotten so hard for me to keep creating."
          className="prompt-box"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div>
              { isGenerating ? <span className="loader" /> : <p>JENerate</p> }
            </div>
          </a>
        </div>

        { apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>here&apos;s what i think</h3>
                <button type="button" onClick={playOutput}>play my thoughts</button>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        ) }
        <HighlightBox fullPromptText={apiOutput} />
      </div>
    </Root>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return { redirect: { destination: '/' } };
  }
  return { props: { session } };
}

export default Prompt;
