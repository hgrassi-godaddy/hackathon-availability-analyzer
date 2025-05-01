import { experimental_createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';

// Attempt to import the StdioMCPTransport class from the ai/mcp-stdio module
const transport = new Experimental_StdioMCPTransport({
  command: '/bin/bash',
  args: ['-c', 'source ~/.nvm/nvm.sh && npx -y @elastic/mcp-server-elasticsearch'],
  env: { 
    ES_URL: process.env.RIGORDATAING_ES_URL || 'http://localhost:9200',
    ES_API_KEY: process.env.RIGORDATAING_ES_API_KEY || 'elastic',
  },
  stderr: process.stderr,
  cwd: process.cwd(),
});

// Create a client using the transport - wrapped in an async function
let clientPromise = initializeClient();

async function initializeClient() {
  const client = await experimental_createMCPClient({
    transport,
  });
  return client;
}

export default async function getTools() {
  // Use the client to get tools
  const clientOne = await clientPromise;
  const tools = await clientOne.tools();
  console.log('***Tools:', tools);
  return {
    ...tools,
  };
}
