// Import necessary modules and components
import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

// Define the main component
const FinancialAdvisorApp = () => {
  // Define states for managing chat messages and "Kira is typing" indicator
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Kira, your financial advisor",
      sentTime: "just now",
      sender: "Kira"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Replace this API key with your own OpenAI API key
  const API_KEY = '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';

  // Function to handle user message sending
  const handleSend = async (message) => {
    // Create a new message object with user's message
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    // Add the new message to the messages state
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // Set the "Kira is typing" indicator to true and process the user's message
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
    // Set the "Kira is typing" indicator to false after message processing
    setIsTyping(false);
  };

  // Function to process the user's message and get a response from the OpenAI API
  async function processMessageToChatGPT(chatMessages) {
    // Prepare the user and assistant (Kira) messages for the API
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Kira") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    // Prepare the API request body
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: 'system', content: 'You are a helpful financial assistant.' }, // The system message defines the logic of our chatGPT
        ...apiMessages
      ],
      "max_tokens": 100 // Limit the response to 100 tokens
    }

    try {
      // Make the API call to OpenAI to get the response
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      // Parse the API response data
      const data = await response.json();
      console.log(data); // Log the data to inspect the response structure

      // Check if the response contains choices and at least one message
      if (data.choices && data.choices.length > 0) {
        // Add the response from Kira as a new message to the chat
        setMessages([...chatMessages, {
          message: data.choices[0].message['content'], // Get the content of the response
          sender: "Kira"
        }]);
      } else {
        console.error("No response content found.");
      }
    } catch (error) {
      console.error('Error fetching the answer:', error);
    }

    // Set the "Kira is typing" indicator to false after processing the response
    setIsTyping(false);
  }

  return (
    // Render the chat UI components
    <div className="App" style={{ height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={isTyping ? <TypingIndicator content="Kira is typing" /> : null}
            style={{ height: "calc(100vh - 100px)" }} // Adjust the height to cover the entire page (minus header)
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

// Export the component for use in other parts of the application
export default FinancialAdvisorApp;
