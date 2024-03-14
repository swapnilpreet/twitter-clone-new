import React, { useState } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { FaRegSmileBeam } from 'react-icons/fa';
// import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setShowPicker(false);
    onEmojiSelect(emoji.native);
  };

  return (
    <div>
      <FaRegSmileBeam size={22}  onClick={() => setShowPicker(!showPicker)}/>
      {showPicker && (
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          style={{ position: 'absolute', bottom: '20px', right: '20px' }}
        />
      )}
    </div>
  );
};

export default EmojiPicker;