import React, { useState, useEffect, useRef } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SPEECH_KEY = import.meta.env.VITE_SPEECH_KEY;
const SPEECH_REGION = import.meta.env.VITE_SPEECH_REGION;

export const TextToSpeechComponent = ({ play, textToSpeech }) => {
  const processRef = useRef(null);
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const playerConfig = useRef(null);
  const recognizer = useRef(null);
  const prevPropRef = useRef(null);

  const complete_cb = (result) => {
    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
      console.log('synthesis finished');
      processRef.current = null;
    } else if (result.reason === sdk.ResultReason.Canceled) {
      console.log('synthesis failed. Error detail: ' + result.errorDetails);
    }
  };
  const err_cb = (result) => {
    console.log(result);
  };

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    speechConfig.current.speechRecognitionLanguage = 'ar-QA';
    speechConfig.current.speechSynthesisVoiceName = 'ar-QA-MoazNeural';
    playerConfig.current = new sdk.SpeakerAudioDestination();
    playerConfig.current.onAudioEnd = () => {
      console.log('processDone');
      processRef.current = null;
      // onEnd(true);
    };
    audioConfig.current = sdk.AudioConfig.fromSpeakerOutput(
      playerConfig.current
    );
    recognizer.current = new sdk.SpeechSynthesizer(
      speechConfig.current,
      audioConfig.current
    );
    recognizer.current.synthesizing = (s, e) => {
      console.log(
        '(synthesizing) Reason: ' +
          sdk.ResultReason[e.result.reason] +
          'Audio chunk length: ' +
          e.result.audioData.byteLength +
          '\r\n'
      );
    };

    // The synthesis started event signals that the synthesis is started.
    recognizer.current.synthesisStarted = (s, e) => {
      console.log('(synthesis started)' + '\r\n');
    };

    // The event synthesis completed signals that the synthesis is completed.
    recognizer.current.synthesisCompleted = (s, e) => {
      console.log(
        '(synthesized)  Reason: ' +
          sdk.ResultReason[e.result.reason] +
          ' Audio length: ' +
          e.result.audioData.byteLength +
          '\r\n'
      );
    };

    recognizer.current.SynthesisCanceled = (s, e) => {
      const cancellationDetails = sdk.CancellationDetails.fromResult(e.result);
      let str =
        '(cancel) Reason: ' +
        sdk.CancellationReason[cancellationDetails.reason];
      if (cancellationDetails.reason === sdk.CancellationReason.Error) {
        str += ': ' + e.result.errorDetails;
      }
      console.log(str);
    };
  }, []);

  useEffect(() => {
    if (prevPropRef.current !== null && prevPropRef.current !== play && play) {
      if (processRef.current === null) {
        processRef.current = 'start';
        console.log('synthesis start.\n', textToSpeech);
        recognizer.current.speakTextAsync(
          textToSpeech,
          (cb) => complete_cb(cb),
          (e) => err_cb(e)
        );
      } else if (processRef.current === 'start') {
        playerConfig.current.resume();
      }
    } else if (
      prevPropRef.current !== null &&
      prevPropRef.current !== play &&
      !play
    ) {
      console.log('synthesis close as push.\n');
      playerConfig.current.pause();
    }
    prevPropRef.current = play;
  }, [play, textToSpeech]);

  return <div></div>;
};
TextToSpeechComponent.defaultProps = {
  play: false,
};
