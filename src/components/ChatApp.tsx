import React, { useState, createContext } from 'react'
import UIAssistant from './UIAssistant'
import '../styles/ChatApp.css'

// Create a theme context
export const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
})

const ChatApp: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        className={`chat-app-container ${
          darkMode ? 'dark-mode' : 'light-mode'
        }`}
      >
        <UIAssistant />
      </div>
    </ThemeContext.Provider>
  )
}

export default ChatApp
