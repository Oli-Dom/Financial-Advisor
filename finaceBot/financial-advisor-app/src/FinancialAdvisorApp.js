// src/FinancialAdvisorApp.js
import React, { useState } from 'react';
import axios from 'axios';

const FinancialAdvisorApp = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleUserQuestionChange = (event) => {
    setUserQuestion(event.target.value);
  };

  const getAnswer = async () => {
    const apiKey = 'YOUR_API_KEY'; // Replace 

    // Check if the user has entered a question
    if (!userQuestion) {
      alert('Please enter a question!');
      return;
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: userQuestion,
        max_tokens: 150, // Set the maximum length of the response
        temperature: 0.7, // Adjust temperature as needed
        stop: '\n' // Stop the response at the first line break
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const data = response.data;
      const answer = data.choices[0].text.trim();
      setAnswer(`Answer: ${answer}`);
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setAnswer('Error fetching the answer. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Financial Advisor App</h1>
      <label htmlFor="userQuestion">Enter your financial question:</label>
      <input type="text" id="userQuestion" value={userQuestion} onChange={handleUserQuestionChange} />
      <button onClick={getAnswer}>Get Answer</button>
      <div>{answer}</div>
    </div>
  );
};

export default FinancialAdvisorApp;
