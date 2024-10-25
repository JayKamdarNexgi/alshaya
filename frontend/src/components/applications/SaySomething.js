import React from 'react';
import { Input } from 'reactstrap';
import {
  FaMicrophoneSlash,
  FaMicrophone,
  FaPaperPlane,
  FaPaperclip,
} from 'react-icons/fa';

const SaySomething = ({
  placeholder,
  messageInput,
  record,
  stopRecording,
  startRecording,
  handleChatInputPress,
  handleChatInputChange,
  handleSendButtonClick,
}) => {
  return (
    <div className="chat-input-container d-flex justify-content-between align-items-center">
      <div>
        <FaPaperclip className="icon-button large mr-2" />
      </div>
      <Input
        className="form-control flex-grow-1 rounded"
        type="text"
        placeholder={placeholder}
        value={messageInput}
        onKeyPress={(e) => handleChatInputPress(e)}
        onChange={(e) => handleChatInputChange(e)}
      />
      <div>
        {record ? (
          <FaMicrophoneSlash className="mic" onClick={stopRecording} />
        ) : (
          <FaMicrophone className="mic" onClick={startRecording} />
        )}
        <FaPaperPlane
          className="icon-button large ml-2"
          onClick={() => handleSendButtonClick()}
        />
      </div>
    </div>
  );
};
export default React.memo(SaySomething);
