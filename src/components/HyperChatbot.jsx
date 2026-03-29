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
  const [isMobile, setIsMobile] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  
  const API_URL = 'https://hyper-ai-backend.onrender.com';
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant',
        content: "Hi there! I'm Hyper, your AI voice agent for AgentDesk. I can tell you all about our services, features, and how to deploy AI agents in minutes. What would you like to know?",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      setTimeout(() => {
        speakText(welcomeMessage.content);
      }, 500);
    }
  }, [isOpen]);
  
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Speech recognition
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported. Please use Chrome, Edge, or Safari.');
      return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      sendMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    return recognition;
  };
  
  // Text to speech
  const speakText = (text) => {
    if (!synthRef.current) return;
    
    const cleanText = text.replace(/[^\w\s.,!?]/g, '');
    
    try {
      synthRef.current.cancel();
    } catch (e) {}
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Natural') ||
      voice.lang === 'en-US'
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    try {
      synthRef.current.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };
  
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };
  
  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initSpeechRecognition();
    }
    if (recognitionRef.current && !isListening && !isSpeaking) {
      recognitionRef.current.start();
    }
  };
  
  // Send message
  const sendMessage = async (message) => {
    if (!message.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: message,
        conversation_history: conversationHistory
      });
      
      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: response.data.timestamp
      };
      setMessages(prev => [...prev, assistantMessage]);
      speakText(response.data.response);
      
    } catch (error) {
      let errorMsg = "I'm having trouble connecting right now. Please check your connection and try again.";
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
  
  const handleSend = () => {
    if (inputMessage.trim() && !isLoading && !isSpeaking) {
      sendMessage(inputMessage);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !isSpeaking) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const quickSuggestions = [
    "What is AgentDesk?",
    "How do I deploy?",
    "Voice Agents",
    "Pricing",
    "Integration",
    "Features"
  ];
  
  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 9998
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: isMobile ? '95%' : '90%',
      maxWidth: isMobile ? '95%' : '700px',
      height: isMobile ? '90vh' : '80vh',
      maxHeight: isMobile ? '90vh' : '750px',
      background: '#ffffff',
      borderRadius: isMobile ? '20px' : '24px',
      overflow: 'hidden',
      zIndex: 9999,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    chatbot: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '16px 20px' : '20px 24px',
      borderBottom: '1px solid #e5e7eb',
      background: '#ffffff',
      flexShrink: 0
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    agentIcon: {
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
      borderRadius: '50%',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontWeight: 600,
      fontSize: isMobile ? '16px' : '18px',
      fontFamily: 'Playfair Display, serif'
    },
    headerInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    headerTitle: {
      margin: 0,
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: 600,
      color: '#000000',
      fontFamily: 'Playfair Display, serif',
      letterSpacing: '-0.02em'
    },
    agentStatus: {
      margin: 0,
      fontSize: isMobile ? '10px' : '11px',
      color: '#6b7280',
      fontFamily: 'Inter, sans-serif'
    },
    closeButton: {
      width: isMobile ? '28px' : '32px',
      height: isMobile ? '28px' : '32px',
      borderRadius: '50%',
      background: '#f3f4f6',
      border: 'none',
      color: '#6b7280',
      fontSize: isMobile ? '14px' : '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: isMobile ? '16px' : '24px',
      background: '#ffffff'
    },
    message: {
      display: 'flex',
      gap: isMobile ? '8px' : '12px',
      marginBottom: isMobile ? '16px' : '20px'
    },
    messageAvatar: {
      width: isMobile ? '28px' : '32px',
      height: isMobile ? '28px' : '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '10px' : '12px',
      fontWeight: 500,
      flexShrink: 0,
      fontFamily: 'Inter, sans-serif'
    },
    userAvatar: {
      background: '#000000',
      color: '#ffffff'
    },
    assistantAvatar: {
      background: '#f3f4f6',
      color: '#000000'
    },
    messageContent: {
      flex: 1,
      borderRadius: isMobile ? '14px' : '16px',
      padding: isMobile ? '10px 12px' : '12px 16px',
      maxWidth: '75%',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    },
    userContent: {
      background: '#000000',
      color: '#ffffff'
    },
    assistantContent: {
      background: '#f3f4f6',
      color: '#1f2937'
    },
    messageText: {
      fontSize: isMobile ? '12px' : '13px',
      lineHeight: '1.5',
      fontFamily: 'Inter, sans-serif',
      wordBreak: 'break-word'
    },
    messageTime: {
      fontSize: isMobile ? '8px' : '9px',
      color: '#9ca3af',
      marginTop: '4px',
      fontFamily: 'Inter, sans-serif'
    },
    quickSuggestions: {
      padding: isMobile ? '10px 16px' : '12px 24px',
      display: 'flex',
      gap: isMobile ? '8px' : '10px',
      flexWrap: 'wrap',
      borderTop: '1px solid #e5e7eb',
      background: '#ffffff',
      flexShrink: 0,
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    suggestionBtn: {
      padding: isMobile ? '6px 12px' : '6px 14px',
      borderRadius: '20px',
      fontSize: isMobile ? '10px' : '11px',
      fontFamily: 'Inter, sans-serif',
      border: '1px solid #e5e7eb',
      background: '#ffffff',
      color: '#4b5563',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap'
    },
    inputArea: {
      padding: isMobile ? '12px 16px' : '16px 24px',
      display: 'flex',
      gap: isMobile ? '8px' : '12px',
      alignItems: 'center',
      borderTop: '1px solid #e5e7eb',
      background: '#ffffff',
      flexShrink: 0,
      position: 'relative'
    },
    voiceBtn: {
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
      borderRadius: isMobile ? '10px' : '12px',
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      color: '#4b5563',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.2s ease'
    },
    voiceBtnListening: {
      background: '#000000',
      color: '#ffffff',
      borderColor: '#000000'
    },
    textarea: {
      flex: 1,
      padding: isMobile ? '8px 12px' : '10px 16px',
      borderRadius: isMobile ? '20px' : '24px',
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      color: '#1f2937',
      fontFamily: 'Inter, sans-serif',
      fontSize: isMobile ? '12px' : '13px',
      resize: 'none',
      outline: 'none',
      minHeight: isMobile ? '36px' : '40px',
      maxHeight: isMobile ? '80px' : '100px'
    },
    sendBtn: {
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
      borderRadius: isMobile ? '10px' : '12px',
      background: '#000000',
      color: '#ffffff',
      border: 'none',
      fontSize: isMobile ? '14px' : '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.2s ease',
      fontWeight: 500
    },
    sendBtnDisabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    },
    stopSpeechBtn: {
      position: 'absolute',
      right: isMobile ? '70px' : '80px',
      bottom: isMobile ? '18px' : '24px',
      width: isMobile ? '28px' : '32px',
      height: isMobile ? '28px' : '32px',
      borderRadius: isMobile ? '6px' : '8px',
      background: '#ef4444',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: isMobile ? '10px' : '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    typingIndicator: {
      display: 'flex',
      gap: '4px',
      padding: '4px 0'
    },
    typingDot: {
      width: isMobile ? '5px' : '6px',
      height: isMobile ? '5px' : '6px',
      borderRadius: '50%',
      background: '#9ca3af',
      animation: 'typing 1.4s infinite'
    }
  };
  
  // Add animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-6px);
        }
      }
      
      .messages-container::-webkit-scrollbar {
        width: 4px;
      }
      
      .messages-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }
      
      .messages-container::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
      }
      
      textarea:focus {
        border-color: #000000;
        outline: none;
      }
      
      button:hover:not(:disabled) {
        transform: translateY(-1px);
      }
      
      .suggestion-btn:hover:not(:disabled) {
        background: #f3f4f6;
        border-color: #000000;
      }
      
      .voice-btn:hover:not(:disabled) {
        background: #e5e7eb;
      }
      
      .close-button:hover {
        background: #e5e7eb;
      }
      
      .voice-btn.listening {
        background: #000000;
        color: #ffffff;
        border-color: #000000;
      }
      
      @media (max-width: 768px) {
        button:hover:not(:disabled) {
          transform: none;
        }
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
            <div style={styles.agentIcon}>
              H
            </div>
            <div style={styles.headerInfo}>
              <h2 style={styles.headerTitle}>Hyper</h2>
              <p style={styles.agentStatus}>
                {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : isLoading ? 'Thinking...' : 'Ready'}
              </p>
            </div>
          </div>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {/* Messages */}
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
                  H
                </div>
              )}
              <div style={{
                ...styles.messageContent,
                ...(message.role === 'user' ? styles.userContent : styles.assistantContent),
                maxWidth: message.role === 'user' ? '75%' : '80%'
              }}>
                <div style={styles.messageText}>{message.content}</div>
                <div style={styles.messageTime}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.role === 'user' && (
                <div style={{ ...styles.messageAvatar, ...styles.userAvatar }}>
                  U
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div style={styles.message}>
              <div style={{ ...styles.messageAvatar, ...styles.assistantAvatar }}>
                H
              </div>
              <div style={{ ...styles.messageContent, ...styles.assistantContent }}>
                <div style={styles.typingIndicator}>
                  <span style={styles.typingDot}></span>
                  <span style={{ ...styles.typingDot, animationDelay: '0.2s' }}></span>
                  <span style={{ ...styles.typingDot, animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Suggestions */}
        <div style={styles.quickSuggestions}>
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
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
            <svg width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C10.9 2 10 2.9 10 4V12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12V4C14 2.9 13.1 2 12 2Z" fill="currentColor"/>
              <path d="M19 12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12H3C3 16.4 6.4 20 11 20.9V23H13V20.9C17.6 20 21 16.4 21 12H19Z" fill="currentColor"/>
            </svg>
          </button>
          <textarea
            style={styles.textarea}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isMobile ? "Ask Hyper..." : "Type your message or click the microphone to speak..."}
            rows="1"
            disabled={isLoading || isSpeaking}
          />
          <button
            style={{
              ...styles.sendBtn,
              ...((isLoading || !inputMessage.trim() || isSpeaking) ? styles.sendBtnDisabled : {})
            }}
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim() || isSpeaking}
          >
            →
          </button>
          {isSpeaking && (
            <button 
              style={styles.stopSpeechBtn}
              onClick={stopSpeaking}
            >
              ⏹
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HyperChatbot;