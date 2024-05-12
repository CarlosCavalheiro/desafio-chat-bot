import React, { useState, useEffect } from 'react';
import './ChatBot.css'; // Assuming you have a CSS file for styling

const ChatBot = () => {
  const API_KEY = 'AIzaSyBd3oofkb4sNED2b0lMYKGddSHxGZNcHFQ'; // Replace with your actual API key
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [context, setContext] = useState([]); // Changed from null to empty array

  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      fetchChatbotResponse(inputValue, context);
      setInputValue('');
    }
  };

  const fetchChatbotResponse = async (message, conversationContext) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              ...conversationContext,
              {
                role: 'user',
                parts: [{ text: message }],
              },
            ],
            safetySettings: [
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_ONLY_HIGH',
              },
            ],
            generationConfig: {
              stopSequences: ['Title'],
              temperature: 1.0,
              maxOutputTokens: 800,
              topP: 0.8,
              topK: 10,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao fazer solicitação à API de linguagem generativa do Google');
      }

      const data = await response.json();
      console.log('Resposta da API de linguagem generativa do Google:', data);
      setMessages([...messages, { text: data.candidates[0].content.parts[0].text, sender: 'bot' }]);
      setContext([...conversationContext, { role: 'mo1del', parts: [{ text: data.text }] }]); // Update context
    } catch (error) {
      console.error('Erro ao fazer solicitação à API de linguagem generativa do Google:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend();
            }
          }}
        />
        <button onClick={handleMessageSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
