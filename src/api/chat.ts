// This file sets up an API endpoint to handle chat requests to Claude
import { Request, Response } from 'express';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import getTools from "../../server/ai-tools";

const SYSTEM_PROMPT = `You are an AI assistant for debugging app availability alerts.`;

// Handler function for the chat API
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get messages from request body
    const { messages } = req.body;

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    const tools = await getTools();

    // Use streamText to stream the response from Claude
    const stream = await streamText({
      model: anthropic("claude-3-5-sonnet-latest"),
      messages,
      system: SYSTEM_PROMPT,
      temperature: 0.7,
      maxSteps: 20,
      maxTokens: 1000,
      tools,
    });

    for await (const textPart of stream.textStream) {
      // Send each part of the response as a server-sent event
      res.write(`0: ${JSON.stringify(textPart)}\n\n`);
    }
    // End the response when done
    res.end();
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // If headers haven't been sent yet, send error as JSON
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Failed to generate response' });
    }
    
    // If streaming has already started, end the response
    res.end();
  }
}