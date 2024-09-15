import React, { useState } from 'react';
import './Translator.css';

const Translator = () => {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');

  const handleTranslate = () => {
    // Dummy translation (for now)
    setTranslation(`Translation: ${input}`);
  };

  return (
    <div className="translator-container">
      <h2>Translator</h2>
      <input 
        type="text" 
        placeholder="Enter text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleTranslate}>Translate</button>
      {translation && <p>{translation}</p>}
    </div>
  );
};

export default Translator;
