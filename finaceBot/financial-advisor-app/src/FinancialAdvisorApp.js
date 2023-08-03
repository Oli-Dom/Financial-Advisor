// Import necessary modules and components
import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const questions = [
  "How can I build my credit score?",
  "How can I start a businesss?",
  "How can I plan for college?",
];
const answers = [
  "To build your credit score, check your credit report for errors, use a secured credit card or credit builder loan, and always make timely payments. Keep your credit utilization below 30%, avoid opening too many new accounts, and maintain old accounts for a longer credit history. Apply for new credit only when needed, monitor your credit regularly, and be patient while practicing responsible financial habits. Building credit takes time, but these steps will help you establish a strong credit profile.",
  "To start a business, you'll need to follow these key steps. First, conduct thorough market research to identify your target audience and assess the demand for your product or service. Next, create a detailed business plan outlining your objectives, strategies, and financial projections. Register your business name and structure, obtain necessary permits and licenses, and secure funding through personal savings, loans, or investors. Build a strong team and network with industry professionals. Establish your online and offline presence through a website, social media, and marketing efforts. Lastly, launch your business and continually adapt and grow based on customer feedback and market trends. Remember, entrepreneurship requires dedication, resilience, and adaptability.",
  "To plan for college successfully, consider the following steps. Start by researching potential colleges and universities that offer programs aligning with your interests and career goals. Review admission requirements and deadlines, and gather information on financial aid options such as scholarships, grants, and loans. Create a timeline to track application deadlines, standardized tests (SAT/ACT), and other essential documents needed for admission. Work on enhancing your academic performance and participating in extracurricular activities to strengthen your college applications. Seek guidance from school counselors or mentors to navigate the process. Lastly, be proactive in exploring different career paths and college majors to make an informed decision that aligns with your aspirations. Planning ahead will increase your chances of a successful college experience.",
];

// Define the main component
const FinancialAdvisorApp = () => {
  // Define states for managing chat messages and "Kira is typing" indicator
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Kira, your financial advisor",
      sentTime: "just now",
      sender: "Kira",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  // Function to handle user message sending
  const handleSend = async (message) => {
    // Create a new message object with user's message
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
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
      return { role: role, content: messageObject.message };
    });

    // Prepare the API request body
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful financial assistant." }, // The system message defines the logic of our chatGPT
        ...apiMessages,
      ],
      max_tokens: 200, // Limit the response
    };

    try {
      // Make the API call to OpenAI to get the response
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      // Parse the API response data
      const data = await response.json();
      console.log(data); // Log the data to inspect the response structure

      // Check if the response contains choices and at least one message
      if (data.choices && data.choices.length > 0) {
        // Add the response from Kira as a new message to the chat
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message["content"], // Get the content of the response
            sender: "Kira",
          },
        ]);
      } else {
        console.error("No response content found.");
      }
    } catch (error) {
      console.error("Error fetching the answer:", error);
    }

    // Set the "Kira is typing" indicator to false after processing the response
    setIsTyping(false);
  }

  return (
    // Render the chat UI components
    <div
      className="App"
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        marginTop: "2.5rem",
      }}
    >
      <MainContainer
        style={{ maxWidth: "600px", width: "90%", height: "80vh" }}
      >
        <ChatContainer>
          <MessageList
            typingIndicator={
              isTyping ? <TypingIndicator content="Kira is typing" /> : null
            }
            style={{ maxHeight: "calc(100% - 40px)", overflowY: "auto" }} // Adjust the max-height and overflow for scrolling
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
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
