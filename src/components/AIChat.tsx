import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "crisis" | "normal";
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AIChat = ({ isOpen, onToggle }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI wellness assistant. I'm here to provide support, answer questions about mental health, and help you access resources. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "no point", "give up"];
  const anxietyKeywords = ["anxiety", "anxious", "worried", "panic", "overwhelmed", "stressed"];
  const depressionKeywords = ["depressed", "sad", "hopeless", "lonely", "empty", "worthless"];

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const generateResponse = (userMessage: string): { content: string; type: "crisis" | "normal" } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (detectCrisis(lowerMessage)) {
      return {
        content: "I'm concerned about what you've shared. Please know that you're not alone and help is available. If you're having thoughts of self-harm, please contact emergency services (911) or the National Suicide Prevention Lifeline at 988 immediately. I can also help you find a licensed professional for ongoing support. Would you like me to connect you with crisis resources?",
        type: "crisis"
      };
    }

    if (anxietyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        content: "I understand you're dealing with anxiety. That's very common and there are effective ways to manage it. Here are some immediate strategies: Try deep breathing (4 counts in, 4 counts hold, 4 counts out), practice grounding techniques (name 5 things you can see, 4 you can hear, 3 you can touch), and remember that anxiety is temporary. Would you like me to guide you through a breathing exercise or connect you with a professional for ongoing support?",
        type: "normal"
      };
    }

    if (depressionKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        content: "Thank you for sharing how you're feeling. Depression can feel overwhelming, but please know that you're not alone and that treatment is effective. Small steps can make a difference - even getting some sunlight, gentle movement, or reaching out to a friend can help. Professional support can provide you with personalized strategies. Would you like me to help you find resources or book a session with one of our licensed therapists?",
        type: "normal"
      };
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("resources")) {
      return {
        content: "I'm here to help! I can assist you with: 🔹 Mental health assessments 🔹 Booking sessions with licensed professionals 🔹 Crisis support resources 🔹 Mindfulness and coping techniques 🔹 Educational resources about mental health 🔹 Community support connections. What would you like to explore?",
        type: "normal"
      };
    }

    const responses = [
      "I hear you. Can you tell me more about what you're experiencing?",
      "Thank you for sharing that with me. How long have you been feeling this way?",
      "That sounds challenging. What kind of support would be most helpful for you right now?",
      "I appreciate you opening up. Would you like to explore some coping strategies or connect with a professional?",
      "Your feelings are valid. Have you been able to talk to anyone else about this?"
    ];

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      type: "normal"
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const aiMessage: Message = {
        id: messages.length + 2,
        content: response.content,
        sender: "ai",
        timestamp: new Date(),
        type: response.type,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-strong hover:scale-105 transition-all duration-300 z-50"
        variant="therapeutic"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-3rem)] shadow-strong z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-primary text-primary-foreground rounded-t-lg flex-shrink-0">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          AI Wellness Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 px-4 py-2">
          <div className="space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm break-words",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.type === "crisis"
                      ? "bg-destructive/10 border border-destructive/20 text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "ai" && (
                      <div className="flex-shrink-0">
                        {message.type === "crisis" ? (
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        ) : (
                          <Bot className="h-4 w-4 text-secondary-accent mt-0.5" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 text-sm flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-secondary-accent" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-secondary-accent rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-secondary-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-secondary-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" variant="therapeutic">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This is AI assistance, not a substitute for professional care. In crisis, call 911 or 988.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};