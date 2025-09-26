import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Calendar, User, Clock } from 'lucide-react';
import AppointmentScheduler from './AppointmentScheduler';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'quick-action';
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you with your telepsychiatry needs. How can I assist you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'hello': "Hello! Welcome to NC Telepsychiatry. I'm here to help you get started with our ADHD care services. What would you like to know?",
    'pricing': "We offer 4 ADHD subscription plans: Starter ($79/month), Basic ($149/month), Comprehensive ($219/month), and Elite ($329/month). Which plan interests you most?",
    'appointment': "I'd be happy to help you schedule an appointment! You can call us at (336) 569-7223 for same-day appointments or use our contact form. Would you prefer to schedule by phone or online?",
    'insurance': "We accept Blue Cross Blue Shield NC, Aetna, United Healthcare, Cigna, and select Medicare plans. What insurance do you have?",
    'adhd': "Our ADHD specialists provide comprehensive care including medication management, therapy techniques, and lifestyle coaching. All appointments are via secure video calls. What specific ADHD concerns do you have?",
    'emergency': "For mental health emergencies, please call 911 immediately or contact the Suicide & Crisis Lifeline at 988. For urgent but non-emergency concerns, call (336) 569-7223.",
    'hours': "We're available Mon-Fri: 8AM-6PM, Sat: 9AM-3PM. Our ADHD specialists also offer evening and weekend appointments for your convenience."
  };

  const quickActions = [
    { text: "Schedule Appointment", action: "appointment", icon: Calendar },
    { text: "View Pricing Plans", action: "pricing", icon: User },
    { text: "Call Now", action: "phone", icon: Phone },
    { text: "Insurance Info", action: "insurance", icon: Clock }
  ];

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Track chat interaction
    (window as any).gtag?.('event', 'chat_interaction', {
      event_category: 'Lead Generation',
      event_label: 'User Message'
    });

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const lowerText = text.toLowerCase();
      let response = "Thank you for your message! A licensed psychiatrist will be in touch within 2 hours during business hours. For immediate assistance, please call (336) 569-7223.";

      // Check for predefined responses
      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerText.includes(key)) {
          response = value;
          break;
        }
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      
      // Track agent response
      (window as any).gtag?.('event', 'chat_response', {
        event_category: 'Lead Generation',
        event_label: 'Agent Response'
      });
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'phone':
        window.location.href = 'tel:+13365697223';
        (window as any).trackPhoneCall?.();
        break;
      case 'appointment':
        setShowScheduler(true);
        break;
      case 'pricing':
        handleSendMessage("Can you tell me about your pricing plans?");
        break;
      case 'insurance':
        handleSendMessage("What insurance do you accept?");
        break;
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      (window as any).gtag?.('event', 'chat_opened', {
        event_category: 'Lead Generation',
        event_label: 'Live Chat Widget'
      });
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <div 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 group animate-pulse hover:animate-none"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
          <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with us!
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">NC Telepsychiatry</h3>
                <p className="text-sm opacity-90">Usually replies instantly</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-[80%] p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{action.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Scheduler Modal */}
      <AppointmentScheduler 
        isOpen={showScheduler} 
        onClose={() => setShowScheduler(false)} 
      />
    </>
  );
};

export default LiveChat;