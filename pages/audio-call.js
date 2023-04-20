/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../lib/button/button';

function AudioCall() {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return (
      <>
        <p>
          your browser does not support this feature.
        </p>
        <p>
          if possible, i recommend trying google chrome or safari!
        </p>
      </>
    );
  }
  useEffect(() => {
    console.log('here', interimTranscript);
  }, [interimTranscript, finalTranscript]);
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };
  return (
    <>
      <Button onClickAction={startListening}>open call</Button>
      { listening ? (
        <>
          {/* <Button onClickAction={SpeechRecognition.stopListening}>end call</Button> */}
          <button type="button" onClick={SpeechRecognition.stopListening}>close</button>
          <div>
            <h4>audio transcript</h4>
            <p>{ transcript }</p>
            {/* <Button onClickAction={resetTranscript}>reset</Button> */}
            <button type="button" onClick={resetTranscript}>reset</button>
          </div>
        </>
      ) : '' }
    </>
  );
}

export default AudioCall;
