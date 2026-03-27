import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Set modal root element
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const HyperChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  
  // API endpoint - Hardcoded for now (you can change this)
  const API_URL = 'https://hyper-ai-backend.onrender.com';
  
  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant',
        content: "👋 Hi there! I'm Hyper, your AI voice agent for AgentDesk! I can tell you all about our services, features, and how to deploy AI agents in minutes. What would you like to know?",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      // Small delay before speaking to ensure component is ready
      setTimeout(() => {
        speakText(welcomeMessage.content);
      }, 500);
    }
  }, [isOpen]);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initialize speech recognition
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      alert('Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
      return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      sendMessage(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use voice input.');
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    return recognition;
  };
  
  // Text to speech function
  const speakText = (text) => {
    if (!synthRef.current) return;
    
    // Remove emojis and markdown for cleaner speech
    const cleanText = text.replace(/[^\w\s.,!?]/g, '');
    
    // Cancel any ongoing speech
    try {
      synthRef.current.cancel();
    } catch (e) {
      console.error('Error canceling speech:', e);
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to use a natural voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Natural') ||
      voice.lang === 'en-US'
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
    };
    
    try {
      synthRef.current.speak(utterance);
    } catch (e) {
      console.error('Error speaking:', e);
      setIsSpeaking(false);
    }
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {
        console.error('Error stopping speech:', e);
      }
    }
    setIsSpeaking(false);
  };
  
  // Start voice input
  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initSpeechRecognition();
    }
    
    if (recognitionRef.current && !isListening && !isSpeaking) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
        alert('Could not start voice recognition. Please try again.');
      }
    }
  };
  
  // Send message to backend
  const sendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Prepare conversation history for API
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Call backend API
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: message,
        conversation_history: conversationHistory
      });
      
      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: response.data.timestamp
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response
      speakText(response.data.response);
      
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMsg = "I'm having trouble connecting right now. ";
      
      if (error.code === 'ERR_NETWORK') {
        errorMsg += "Please make sure the backend server is running at http://localhost:8000";
      } else {
        errorMsg += "Please check your connection and try again. You can also email support@agentdesk.com for immediate assistance.";
      }
      
      const errorMessage = {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle send button click
  const handleSend = () => {
    if (inputMessage.trim() && !isLoading && !isSpeaking) {
      sendMessage(inputMessage);
    }
  };
  
  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !isSpeaking) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Quick suggestion buttons
  const quickSuggestions = [
    "What is AgentDesk?",
    "How do I deploy an AI agent?",
    "Tell me about Voice Agents",
    "What are the pricing plans?",
    "How does the integration work?",
    "Show me the features"
  ];
  const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(12px)',
    zIndex: 9998
  },

  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '92%',
    maxWidth: '640px',
    height: '82vh',
    background: '#0a0a0f',
    borderRadius: '20px',
    overflow: 'hidden',
    zIndex: 9999,
    border: '1px solid rgba(255,255,255,.06)'
  },

  chatbot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,.05)'
  },

  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  agentIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: '#1a1a24',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: 'Inter, sans-serif'
  },

  agentStatus: {
    fontSize: '10px',
    color: '#9ca3af',
    fontFamily: 'JetBrains Mono'
  },

  closeButton: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,.05)',
    border: 'none',
    color: '#fff',
    cursor: 'pointer'
  },

  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  message: {
    display: 'flex',
    gap: '8px'
  },

  messageAvatar: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: '#1a1a24',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px'
  },

  messageContent: {
    borderRadius: '12px',
    padding: '8px 12px',
    maxWidth: '75%'
  },

  userContent: {
    background: 'rgba(255,255,255,.08)',
    border: '1px solid rgba(255,255,255,.15)',
    color: '#fff'
  },

  assistantContent: {
    background: '#1a1a24',
    color: '#e5e7eb'
  },

  messageText: {
    fontSize: '12px',
    lineHeight: '1.5',
    fontFamily: 'Inter, sans-serif'
  },

  messageTime: {
    fontSize: '9px',
    color: '#6b7280',
    marginTop: '4px',
    fontFamily: 'JetBrains Mono'
  },

  quickSuggestions: {
    padding: '10px 14px',
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    borderTop: '1px solid rgba(255,255,255,.05)'
  },

  suggestionBtn: {
    padding: '6px 12px',
    borderRadius: '100px',
    fontSize: '10px',
    fontFamily: 'JetBrains Mono',
    border: '1px solid rgba(255,255,255,.1)',
    background: 'transparent',
    color: '#9ca3af',
    cursor: 'pointer'
  },

  inputArea: {
    padding: '14px',
    display: 'flex',
    gap: '10px',
    borderTop: '1px solid rgba(255,255,255,.05)'
  },

  voiceBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: '#1a1a24',
    border: '1px solid rgba(255,255,255,.1)',
    color: '#fff',
    cursor: 'pointer'
  },

  voiceBtnListening: {
    background: '#fff',
    color: '#000'
  },

  textarea: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    background: '#111118',
    border: '1px solid rgba(255,255,255,.1)',
    color: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    resize: 'none'
  },

  sendBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: '#fff',
    color: '#000',
    border: 'none',
    cursor: 'pointer'
  },

  sendBtnDisabled: {
    opacity: 0.4
  },

  stopSpeechBtn: {
    position: 'absolute',
    right: '70px',
    bottom: '20px',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: '#fff',
    border: 'none',
    color: '#000',
    cursor: 'pointer'
  }
};
   // Add keyframes to document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from {
          transform: translate(-50%, -40%);
          opacity: 0;
        }
        to {
          transform: translate(-50%, -50%);
          opacity: 1;
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-10px);
        }
      }
      
      .messages-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .messages-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .messages-container::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
      
      .messages-container::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .quick-suggestions::-webkit-scrollbar {
        height: 4px;
      }
      
      .quick-suggestions::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .quick-suggestions::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }
      
      textarea:focus {
        outline: none;
        border-color: #00ff9d !important;
      }
      
      button:hover:not(:disabled) {
        transform: translateY(-2px);
      }
      
      .send-btn:hover:not(:disabled) {
        box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3);
      }
      
      .suggestion-btn:hover:not(:disabled) {
        background: rgba(0, 255, 157, 0.2);
        border-color: #00ff9d;
        transform: translateY(-2px);
      }
      
      .close-button:hover {
        background: rgba(255, 71, 87, 0.3);
        transform: scale(1.05);
      }
      
      .voice-btn.listening {
        animation: pulse 1s infinite;
      }
      
      .agent-icon {
        animation: pulse 2s infinite;
      }
      
      .typing-indicator span {
        animation: typing 1.4s infinite;
      }
      
      .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: styles.overlay,
        content: styles.modal
      }}
      closeTimeoutMS={300}
    >
      <div style={styles.chatbot}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div className="agent-icon" style={styles.agentIcon}>
              <span>🤖</span>
            </div>
            <div style={styles.headerInfo}>
              <h2 style={styles.headerTitle}>Hyper AI Agent</h2>
              <p style={styles.agentStatus}>
                {isSpeaking ? '🔊 Speaking...' : isListening ? '🎤 Listening...' : '⚡ Ready to help'}
              </p>
            </div>
          </div>
          <button 
            style={styles.closeButton}
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {/* Messages Container */}
        <div 
          className="messages-container"
          style={styles.messagesContainer} 
          ref={chatContainerRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {message.role !== 'user' && (
                <div style={{ ...styles.messageAvatar, ...styles.assistantAvatar }}>
                  🤖
                </div>
              )}
              <div style={{
                ...styles.messageContent,
                ...(message.role === 'user' ? styles.userContent : styles.assistantContent),
                maxWidth: message.role === 'user' ? '70%' : '80%'
              }}>
                <div style={styles.messageText}>{message.content}</div>
                <div style={styles.messageTime}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
              {message.role === 'user' && (
                <div style={{ ...styles.messageAvatar, ...styles.userAvatar }}>
                  👤
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div style={styles.message}>
              <div style={{ ...styles.messageAvatar, ...styles.assistantAvatar }}>
                🤖
              </div>
              <div style={{ ...styles.messageContent, ...styles.assistantContent }}>
                <div className="typing-indicator" style={styles.typingIndicator}>
                  <span style={styles.typingDot}></span>
                  <span style={styles.typingDot}></span>
                  <span style={styles.typingDot}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Suggestions */}
        <div className="quick-suggestions" style={styles.quickSuggestions}>
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-btn"
              style={styles.suggestionBtn}
              onClick={() => sendMessage(suggestion)}
              disabled={isLoading || isSpeaking}
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        {/* Input Area */}
        <div style={styles.inputArea}>
          <button
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            style={{
              ...styles.voiceBtn,
              ...(isListening ? styles.voiceBtnListening : {})
            }}
            onClick={startVoiceInput}
            disabled={isLoading || isSpeaking}
          >
            🎤
          </button>
          <textarea
            style={styles.textarea}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or click the microphone to speak..."
            rows="1"
            disabled={isLoading || isSpeaking}
          />
          <button
            className="send-btn"
            style={{
              ...styles.sendBtn,
              ...((isLoading || !inputMessage.trim() || isSpeaking) ? styles.sendBtnDisabled : {})
            }}
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim() || isSpeaking}
          >
            {isLoading ? '⏳' : '📤'}
          </button>
          {isSpeaking && (
            <button 
              style={styles.stopSpeechBtn}
              onClick={stopSpeaking}
            >
              ⏹️
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HyperChatbot;