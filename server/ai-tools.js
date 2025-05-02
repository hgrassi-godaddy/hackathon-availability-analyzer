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
let spaqClientPromise = initializeSPAQClient();
async function initializeSPAQClient() {
  const client = await experimental_createMCPClient({
    transport,
  });
  return client;
}

let apmClientPromise = initializeAPMClient();
async function initializeAPMClient() {
  const client = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "http://localhost:8081/sse",
    },
    name: "APM Transactions Service",
  });
  return client;
}

export default async function getTools() {
  // Use Promise.all to get both clients concurrently
  const [spaqClient, apmClient] = await Promise.all([
    spaqClientPromise,
    apmClientPromise
  ]);
  
  // Get tools from both clients in parallel
  const [spaqTools, apmTools] = await Promise.all([
    spaqClient.tools(),
    apmClient.tools()
  ]);
  
  // Combine tools
  const tools = {
    ...spaqTools,
    ...apmTools,
  };
  
  //console.log('***Tools:', tools);
  return tools;
}
