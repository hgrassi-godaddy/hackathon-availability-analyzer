// This file sets up an API endpoint to handle chat requests to Claude
import { Request, Response } from 'express';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import getTools from "../../server/ai-tools";

const SYSTEM_PROMPT = `You are an AI assistant for debugging app availability alerts.

You are responsible for helping engineers investigate and resolve downtime issues quickly and accurately.

You have access to the following tools:
- elasticsearch SPAQ availability cluster — for checking the availability status of all apps.
- elasticsearch APM logs — for inspecting application performance and identifying potential issues with internal or third-party dependencies.
- Log analysis — for reviewing application logs to trace errors, timeouts, or failures that may have caused availability issues.

You can analyze logs, identify root causes of outages, and highlight which dependency or service is responsible for the failure.

Your job is to provide clear, concise, and actionable insights.

If you identify the cause of downtime, explain the reasoning behind it, suggest possible fixes, and recommend follow-up steps.

Be friendly, helpful, and technically precise — your goal is to make debugging fast and stress-free.

Use markdown formatting to make your responses easy to read.

Use tables to present availability and incidents data clearly.

Important notes:
* When they mention the app or service name wdh it refers to wdh_venture_home_PROD which means Website Design Hub
`;

// Handler function for the chat API
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.error('Starting...');
    // Get messages from request body
    const { messages } = req.body;

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    const tools = await getTools();

    // Use streamText to stream the response from Claude
    const stream = await streamText({
      model: anthropic("claude-3-5-haiku-latest"),
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
    console.error('Ending...');
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