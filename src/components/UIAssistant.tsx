import React, { useState, useContext, useRef, useEffect } from 'react'
import '../styles/UIAssistant.css'
import { ThemeContext } from './ChatApp'
import { useAIChat } from '../context/ChatContext'
import gdLogo from '../styles/gdlogo.jpg' // Updated to use gdlogo.jpg

const UIAssistant: React.FC = () => {
  const [message, setMessage] = useState('')
  const { darkMode, toggleTheme } = useContext(ThemeContext)

  // Use our AI chat hook
  const { messages, sendMessage, isLoading } = useAIChat()

  // Ref for auto-scrolling to bottom of messages
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    console.log('Messages updated:', messages)
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      handleSendMessage()
    }
  }

  return (
    <div className={`ui-assistant-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header with GoDaddy branding */}
      <div className="ui-assistant-header">
        <div className="godaddy-logo-container">
          <img src={gdLogo} alt="GoDaddy Logo" className="godaddy-logo" />
        </div>
        <div className="theme-toggle-container">
          <button
            onClick={toggleTheme}
            className="theme-toggle-button"
            aria-label={
              darkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className="ui-assistant-title">Availability Analyzer</h1>
        <div className="title-underline"></div>
        <p className="ui-assistant-subtitle">
          Ask me anything! I'm here to help.
        </p>
      </div>

      {/* Messages display area */}
      <div className="ui-assistant-messages-container">
        {messages.length === 0 ? (
          <div className="ui-assistant-empty-state">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`ui-assistant-message ${
                msg.role === 'user' ? 'user-message' : 'assistant-message'
              }`}
            >
              <div className="message-content">{msg.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="ui-assistant-message assistant-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area with send button */}
      <div className="ui-assistant-input-area">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="ui-assistant-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="ui-assistant-send-button"
          disabled={isLoading || message.trim() === ''}
        >
          &#10148;
        </button>
      </div>
    </div>
  )
}

export default UIAssistant
