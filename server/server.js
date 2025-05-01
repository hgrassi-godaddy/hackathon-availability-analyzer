// Register ts-node to handle TypeScript files
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const net = require('net');
require('dotenv').config();

// Create Express app
const app = express();
const DEFAULT_PORT = process.env.PORT || 3001;

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => {
        // Port is in use
        resolve(true);
      })
      .once('listening', () => {
        // Port is free
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}

// Function to find an available port
async function findAvailablePort(startPort) {
  let port = startPort;
  while (await isPortInUse(port)) {
    console.log(`Port ${port} is in use, trying ${port + 1}...`);
    port++;
  }
  return port;
}

// Middleware
app.use(bodyParser.json());

// Import our chat handler - using proper path (updated for new location)
const chatHandler = require('../src/api/chat').default;

// API route for chat
app.post('/api/chat', (req, res) => {
  chatHandler(req, res);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Start server with port checking
(async () => {
  const port = await findAvailablePort(DEFAULT_PORT);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
    // If the port is different than default, inform about proxy configuration
    if (port !== DEFAULT_PORT) {
      console.log(`\nNOTE: Your server is running on port ${port}, but your client proxy is configured for port ${DEFAULT_PORT}.`);
      console.log(`To make the client communicate with the server, you may need to update the proxy setting in package.json to "http://localhost:${port}"\n`);
    }
  });
})();