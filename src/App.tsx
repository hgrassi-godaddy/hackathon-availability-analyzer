import React from 'react'
import './App.css'
import ChatApp from './components/ChatApp'
import { ChatProvider } from './context/ChatContext'

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <ChatApp />
      </ChatProvider>
    </div>
  )
}

export default App
