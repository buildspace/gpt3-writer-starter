/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../lib/button/button';
import { getConversationGeneration, createFullChatContext } from '../utils/client/prompt-helpers';
import { useSpeechSynthesis } from 'react-speech-kit';
import Layout from '../lib/layout/layout';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

const appId = '703efb7d-6930-4a9e-b71c-2282c3d7d145';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

// todo: let user pick out the voice & the rate (peep their demo & use react-speech-kit)
// todo: add a place where the user can input how they felt about the session (abstract textarea?)
// todo: insert session into database

function AudioCall() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const englishVoices = voices.filter(voice => voice.lang.includes('en'));
  const [chat, setChat] = useState([]);
  const [conversationStatus, setConversationStatus] = useState('not-started');
  const { transcript, listening, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();
  
  if (!browserSupportsSpeechRecognition || !supported) {
    return (
      <>
        <p>
          your browser does not support this feature.
        </p>
        <p>
          if possible, i recommend trying google chrome!
        </p>
      </>
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <>
        <p>
          your browser does not have access to your microphone :(
        </p>
        <p>
          please check your browser settings and try again!
        </p>
      </>
    );
  }

  const listenContinuously = () => SpeechRecognition.startListening({ continuous: true });

  const stopListening = async () => {
    SpeechRecognition.stopListening();
    // if (transcript) {
      await getResponse();
    // }
  };

  const getResponse = async () => {
    setIsGenerating(true);
    const prompt = createFullChatContext(chat, transcript);
    const responseText = await getConversationGeneration(prompt);
    setIsGenerating(false);
    speak({ text: responseText, voice: englishVoices[0] });
    setChat([...chat, { user: transcript, JEN: responseText }]);
  };

  const endCall = async () => {
    if (listening) SpeechRecognition.stopListening();
    setConversationStatus('closed');
    setChat([]);
    if (speaking) cancel();
    // const sessionChat = createFullChatContext(chat, transcript);
    // await insertAudioSessionIntoDB({sessionChat});
  };
  
  console.log('transcript', transcript);

  return (
    <>
      { conversationStatus === 'open'
          ? (
            <>
              {/* <h4>audio transcript</h4>
              {
                chat.length
                 ? chat.map((el) => (
                    <>
                      <p>you: { el.user }</p>
                      <p>jen: { el.JEN }</p>             
                    </>
                  ))
                  : null
              }
              { listening ? <p>you: { transcript }</p> : null }
              { isGenerating ? <p>hmm...interesting - let me think about it.</p> : null }
              <div style={{ display: 'flex' }}> */}
              {/* <Button
                onTouchStart={listenContinuously}
                onMouseDown={listenContinuously}
                onTouchEnd={stopListening}
                onMouseUp={stopListening}>
                hold to talk
              </Button> */}

              {/* </div> */}
              <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <button
        onTouchStart={listenContinuously}
        onMouseDown={listenContinuously}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button> */}
      <button onClick={listenContinuously}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <p>{transcript}</p>
    </div>
              <Button onClickAction={endCall}>end call</Button>
            </>
          )
          : conversationStatus === 'closed'
            ? (
                <Layout>
                  <h2>thanks for today&apos;s great session :)</h2>
                  <p>you can see this session again in ur bookmarks.</p>
                  <Button onClickAction={() => {}}>back to home</Button>
                  <Button onClickAction={() => setConversationStatus('open')}>call again!</Button>
                </Layout>)
            : (
              <Layout>
                <h2>audio call w jen :)</h2>
                <h4>excited for today&apos;s session? call away!</h4>
                <Button onClickAction={() => setConversationStatus('open')}>open call</Button>
              </Layout>
            )}
    </>
  );
}

export default AudioCall;
