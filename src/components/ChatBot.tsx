import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, Send, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your EstateVista assistant. How can I help you with your property search today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: inputValue }]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have an answer for that yet.";

      // Simple keyword matching for demo purposes
      const userMessage = inputValue.toLowerCase();
      if (userMessage.includes("price") || userMessage.includes("cost")) {
        botResponse =
          "Property prices in Gujarat range from ₹25 lakhs to ₹5 crores depending on location, size, and amenities.";
      } else if (
        userMessage.includes("location") ||
        userMessage.includes("area")
      ) {
        botResponse =
          "Popular areas in Gujarat include Bodakdev, Satellite, and Vastrapur in Ahmedabad, and Vesu in Surat.";
      } else if (
        userMessage.includes("contact") ||
        userMessage.includes("agent")
      ) {
        botResponse =
          "You can contact our agents directly from any property listing page. Would you like me to connect you with an agent now?";
      } else if (
        userMessage.includes("visit") ||
        userMessage.includes("tour")
      ) {
        botResponse =
          "You can schedule a property visit by clicking the 'Schedule a Visit' button on any property details page.";
      } else if (userMessage.includes("hello") || userMessage.includes("hi")) {
        botResponse =
          "Hello! How can I assist you with your property search today?";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl z-50 border-2">
          <CardHeader className="bg-primary text-primary-foreground py-3">
            <CardTitle className="text-base font-medium">
              EstateVista Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
