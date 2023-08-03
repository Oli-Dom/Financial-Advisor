import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './FinancialAdvisorApp.css';

const FinancialAdvisorApp = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleUserQuestionChange = (event) => {
    setUserQuestion(event.target.value);
  };

  const getAnswer = async () => {
    const apiKey = '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'; // Replace with your OpenAI API key

    // Check if the user has entered a question
    if (!userQuestion) {
      alert('Please enter a question!');
      return;
    }

    try {
      const configuration = new Configuration({
        apiKey: apiKey,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful financial assistant.', },
          { role: 'user', content: userQuestion },
          
        ],
        max_tokens: 300, // Set the maximum total tokens allowed for the entire conversation

      });

      const answer = completion.data.choices[0].message['content'];
      setAnswer(`Kira: ${answer}`);
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setAnswer('Error fetching the answer. Please try again later.');
    }
  };

  return (
    <div id='chatForm'>
     
      <label htmlFor="userQuestion">Ask Kira your question:</label>
     
      <div className='answer'>{answer}</div>
      <input type="text" id="userQuestion" value={userQuestion} onChange={handleUserQuestionChange} />
      <button onClick={getAnswer}>Get Answer</button>
    </div>
  );
};

export default FinancialAdvisorApp;
