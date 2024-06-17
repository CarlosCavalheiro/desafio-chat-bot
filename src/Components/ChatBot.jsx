import React, { useState } from 'react';
import './ChatBot.css';

// Componente para a postagem do usuário
const UserMessage = ({ text }) => {
  return <div className="message user">{text}</div>;
};

// Componente para a resposta do chat
const BotMessage = ({ text }) => {
  return <div className="message bot">{text}</div>;
};

const ChatBot = () => {
  //const API_KEY = 'SUA API KEY'; //Substituir pela sua API_KEY
  const API_KEY = 'AIzaSyBd3oofkb4sNED2b0lMYKGddSHxGZNcHFQ';

  const [messages, setMessages] = useState([
    { role: "model",
      text: "Olá! Como posso te ajudar hoje?!"
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleMessageSend = async () => {
    if (inputValue.trim() !== '') {      
      setMessages([...messages, { role: "user", text: inputValue }]);
      setConversationHistory([...conversationHistory, {role: "user", parts: [{text: inputValue}]}]);
      await fetchChatbotResponse(inputValue);
      setInputValue('');
    }
  };

  console.log(conversationHistory)

  const fetchChatbotResponse = async (message) => {    
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
              conversationHistory          
            ]},
          )         
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao fazer solicitação à API de linguagem generativa do Google');
      }
      
      const data = await response.json();
      const botMessage = { role: "model", text: data.candidates[0].content.parts[0].text};      
      setMessages([...messages, botMessage]);
      setConversationHistory([...conversationHistory, {role: "model", parts: [{text: data.candidates[0].content.parts[0].text}]}]);
    } catch (error) {
      console.error('Erro ao fazer solicitação à API de linguagem generativa do Google:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">      
        {messages.map((message, index) => {          
          if (message.role === "user") {
            return <UserMessage key={index} text={message.text} />;
          } else {
            return <BotMessage key={index} text={message.text} />;
          }
        })}
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
