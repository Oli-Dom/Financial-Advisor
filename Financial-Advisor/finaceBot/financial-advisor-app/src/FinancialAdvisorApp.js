import React, { useState } from "react";
import ReactPlayer from "react-player";
import './FinancialAdvisorApp.css'

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import MessageRecipient from "./MessageRecipient";

const questions = [
  "How can I build my credit score?",
  "How can I start a business?",
  "How can I plan for college?",
];
const answers = [
  "To build your credit score, check your credit report for errors, use a secured credit card or credit builder loan, and always make timely payments. Keep your credit utilization below 30%, avoid opening too many new accounts, and maintain old accounts for a longer credit history. Apply for new credit only when needed, monitor your credit regularly, and be patient while practicing responsible financial habits. Building credit takes time, but these steps will help you establish a strong credit profile.",
  "To start a business, you'll need to follow these key steps. First, conduct thorough market research to identify your target audience and assess the demand for your product or service. Next, create a detailed business plan outlining your objectives, strategies, and financial projections. Register your business name and structure, obtain necessary permits and licenses, and secure funding through personal savings, loans, or investors. Build a strong team and network with industry professionals. Establish your online and offline presence through a website, social media, and marketing efforts. Lastly, launch your business and continually adapt and grow based on customer feedback and market trends. Remember, entrepreneurship requires dedication, resilience, and adaptability.",
  "To financially plan for college, start by researching college costs and creating a budget that includes tuition, living expenses, and other necessities. Explore financial aid options like scholarships, grants, and federal aid through the FAFSA. Save early by setting up a college savings account or getting a part-time job in high school. Consider attending a community college to save on tuition before transferring to a four-year institution. Compare financial aid packages from different colleges to understand your net cost. Minimize debt by opting for federal loans and living frugally during college. Look for work-study programs and paid internships for additional income. Regularly reassess your plan to adjust to changing circumstances and financial aid opportunities. Seek guidance from college counselors or financial aid offices as needed.",
];

const videoAnswers = [
  "https://youtu.be/kjYlsz2kmII",
  "https://youtu.be/RxQHjlv38wQ",
  "https://youtu.be/lZa8r3hUc8w",
];

const achivements = [
  "Entrepreneur : Ask about business",
  "Rookie : Ask your first question",
  "Veteran : Ask 100 questions",
];

const FinancialAdvisorApp = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Kira, your financial advisor",
      sentTime: "just now",
      sender: "Kira",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [questionsAsked, setQuestionsAsked] = useState(1);

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    const questionIndex = questions.findIndex(
      (q) => q.toLowerCase() === message.toLowerCase()
    );

    if (questionIndex !== -1) {
      setIsTyping(true);

      setTimeout(() => {
        const answerMessage = {
          message: answers[questionIndex],
          sender: "Kira",
        };
        const videoMessage = {
          message: videoAnswers[questionIndex],
          sender: "Kira",
          isVideo: true,
        };

        setMessages([...newMessages, answerMessage, videoMessage]);
        setIsTyping(false);

        // Set the React Player URL based on the user's input
        setVideoUrl(videoAnswers[questionIndex]);
      }, 3000);
    } else {
      setIsTyping(true);
      await processMessageToChatGPT(newMessages);
      setIsTyping(false);
    }

    setQuestionsAsked(questionsAsked + 1);
    console.log(questionsAsked);
     if (questionsAsked === 1 && !achievements.includes("Rookie : Ask your first question")) {
      alert("Rookie achivement unlocked!");
      // If the user asks their first question, add the "Rookie" achievement to the unlocked achievements
      setAchievements([...achievements, "Rookie : Ask your first question"]);
      achivements.splice(1, 1);
    }
    
  };

  async function processMessageToChatGPT(chatMessages) {
    // ... (existing code)
  }

  const handleAchievementsButtonClick = () => {
    setShowAchievements(!showAchievements);
  };

  return (
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
            style={{ maxHeight: "calc(100% - 40px)", overflowY: "auto" }}
          >
            {messages.map((message, i) => {
              if (message.sender === "Kira" && message.isVideo) {
                return (
                  <div key={i}>
                    <MessageRecipient>{message.sender}</MessageRecipient>

                    <ReactPlayer
                      url={videoUrl} // Set the URL for the React Player
                      controls={true}
                      width="400px"
                      height="400px"
                    />
                  </div>
                );
              } else {
                return <Message key={i} model={message} />;
              }
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>

      <div className="achievements-container">
        {/* Button to toggle visibility of achievements */}
        <button id="achivementButton" onClick={handleAchievementsButtonClick}>
          {showAchievements ? "Hide Achievements" : "Show Achievements"}
        </button>
        {showAchievements && (
          <div className="achievements-list">
            <h2>Unlocked Achievements:</h2>
            <ul>
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
            <h2>Locked Achievements:</h2>
            <ul>
              {/* Logic to display locked achievements (if any) */}
              {achivements.map((achivement, index) => {
                const achievement = `Achievement: ${achivement}`;
                if (!achievements.includes(achievement)) {
                  return <li  key={index}>{achievement} (Locked)</li>;
                }
                return null;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAdvisorApp;
