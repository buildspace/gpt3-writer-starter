/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../lib/button/button';
import { getGeneration, createFullChatContextForPrompt } from '../utils/prompt-helpers';
import { useSpeechSynthesis } from 'react-speech-kit';

function AudioCall() {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();
  const [generation, setGeneration] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const englishVoices = voices.filter(voice => voice.lang.includes('en'));
  const [chat, setChat] = useState([]);
  const [conversationStatus, setConversationStatus] = useState('not-started');
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
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setConversationStatus('open');
  };
  const stopListening = async () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    await getResponse();
  }
  const getResponse = async () => {
    setIsGenerating(true);
    const prompt = createFullChatContextForPrompt(chat, transcript);
    const responseText = await getGeneration(prompt);
    setIsGenerating(false);
    setGeneration(responseText);
    speak({ text: responseText, voice: englishVoices[0] });
    setChat([...chat, { user: transcript, JEN: responseText }]);
  };
  const endCall = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    setConversationStatus('closed');
  };
  return (
    <>
      <Button onClickAction={startListening}>open call</Button>
      { conversationStatus === 'open'
          ? (
            <>
              <h4>audio transcript</h4>
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
              <div style={{ width: '700px', display: 'flex' }}>
                <Button onClickAction={stopListening}>stop recording</Button>
                <Button onClickAction={resetTranscript}>reset recording</Button>
                <Button onClickAction={endCall}>end call</Button>
              </div>
            </>
          )
          : conversationStatus === 'closed'
            ? (
                <>
                  <p>thanks for today&apos;s great session :)</p>
                  <p>you can see this session again in ur bookmarks.</p>
                </>)
            : (
              <>
                <p>hi! excited for today&apos;s session? call away!</p>
              </>
            )}
    </>
  );
}

export default AudioCall;
