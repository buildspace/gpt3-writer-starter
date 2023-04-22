/* eslint-disable import/no-extraneous-dependencies */
import { use, useEffect, useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import Button from '../lib/button/button';
import { getConversationGeneration, createFullChatContext } from '../utils/client/prompt-helpers';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import Layout from '../lib/layout/layout';
import Link from 'next/link';

// todo: let user pick out the voice & the rate (peep their demo & use react-speech-kit)
// todo: add a place where the user can input how they felt about the session (abstract textarea?)
// todo: insert session into database

function AudioCall() {
  const { listening, listen, stop, } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    },
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const englishVoices = voices.filter(voice => voice.lang.includes('en'));
  const [chat, setChat] = useState([]);
  const [conversationStatus, setConversationStatus] = useState('not-started');
  if (!SpeechRecognition.browserSupportsSpeechRecognition() || !supported) {
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
    // SpeechRecognition.startListening({ continuous: true });
    listen({ interimResults: true, lang: 'en-US' });
  };
  const stopListening = async () => {
    // SpeechRecognition.stopListening();
    stop();
    if (transcript) {
      await getResponse();
      // resetTranscript();
    }
  };
  const getResponse = async () => {
    setIsGenerating(true);
    const prompt = createFullChatContext(chat, transcript);
    console.log(prompt);
    const responseText = await getConversationGeneration(prompt);
    setIsGenerating(false);
    speak({ text: responseText, voice: englishVoices[0] });
    setChat([...chat, { user: transcript, JEN: responseText }]);
    // todo: changing the order of this could help with the flow. do note: i'd have to update the latest jen's response
  };
  const endCall = async () => {
    if (listening) SpeechRecognition.stopListening();
    setConversationStatus('closed');
    // resetTranscript();
    setChat([]);
    if (speaking) cancel();
    const sessionChat = createFullChatContext(chat, transcript);
    // await insertAudioSessionIntoDB({sessionChat});
  };
  return (
    <>
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
              <div style={{ display: 'flex' }}>
                <Button onClickAction={startListening}>start recording</Button>
                <Button onClickAction={stopListening}>stop recording</Button>
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
