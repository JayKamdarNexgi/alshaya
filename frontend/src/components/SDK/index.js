import React, { useState, useEffect, useRef } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SPEECH_KEY = import.meta.env.VITE_SPEECH_KEY;
const SPEECH_REGION = import.meta.env.VITE_SPEECH_REGION;

export const SpeechToTextComponent = ({ record, onWord, onEnd }) => {
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const recognizer = useRef(null);
  const prevPropRef = useRef(null);

  const [myTranscript, setMyTranscript] = useState('');

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    speechConfig.current.speechRecognitionLanguage = 'ar-QA';
    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new sdk.SpeechRecognizer(
      speechConfig.current,
      audioConfig.current
    );

    const processRecognizedTranscript = (event) => {
      const result = event.result;
      console.log('Recognition result:', result);

      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        const transcript = result.text;
        console.log('Recognized: -->', transcript);
        setMyTranscript(transcript);
      }
    };

    const processRecognizingTranscript = (event) => {
      const result = event.result;
      console.log('Recognition result:', result);
      if (result.reason === sdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        console.log('Recognizing: -->', transcript);
        // Call a function to process the transcript as needed

        onWord(transcript);
      }
    };

    recognizer.current.recognized = (s, e) => processRecognizedTranscript(e);
    recognizer.current.recognizing = (s, e) => processRecognizingTranscript(e);
  }, []);

  useEffect(() => {
    if (
      prevPropRef.current !== null &&
      prevPropRef.current !== record &&
      record
    ) {
      recognizer.current.startContinuousRecognitionAsync(() => {
        console.log('Resumed listening...');
      });
    } else if (
      prevPropRef.current !== null &&
      prevPropRef.current !== record &&
      !record
    ) {
      recognizer.current.stopContinuousRecognitionAsync(() => {
        console.log('Speech recognition stopped.');
        onEnd(myTranscript);
      });
    }
    prevPropRef.current = record;
  }, [record]);

  return <div></div>;
};
SpeechToTextComponent.defaultProps = {
  record: false,
};
