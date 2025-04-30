import React, { useState, useContext } from 'react'
import '../styles/UIAssistant.css'
import { ThemeContext } from './ChatApp'

const UIAssistant: React.FC = () => {
  const [message, setMessage] = useState('')
  const { darkMode, toggleTheme } = useContext(ThemeContext)

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      console.log('Message sent:', message)
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
      {/* Dark-themed header box */}
      <div className="ui-assistant-header">
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
        <h1 className="ui-assistant-title">AI Assistant</h1>
        <p className="ui-assistant-subtitle">
          Ask me anything! I'm here to help.
        </p>
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
        />
        <button
          onClick={handleSendMessage}
          className="ui-assistant-send-button"
        >
          &#10148;
        </button>
      </div>
    </div>
  )
}

export default UIAssistant
