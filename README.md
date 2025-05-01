# Hackathon Availability Analyzer🤖💥

This is a React + TypeScript frontend for an AI-powered debugging assistant, built to help investigate app availability issues efficiently and intuitively.

## 🧠 Purpose

The AI assistant helps engineers quickly identify and understand the root causes of downtime alerts by:

- Checking application availability via SPAQ
- Connecting to log systems for multiple services
- Analyzing dependencies and surfacing relevant logs
- Providing helpful, concise suggestions and insights

## 🔌 System Access

The AI assistant is able to:

- Query the **SPAQ availability cluster** for app status
- Check **APM logs** for performance issues
- Connect to:
  - MWP Logs
  - Product Graph Logs
  - PWS API Logs
- Use a **Log Analyzer** to detect and explain root causes of downtime

## 📊 Visual Diagram

A horizontal diagram is included under the assistant UI. It visually maps out:

- The flow from the assistant → data sources → log analyzer
- The various log systems connected
- Final root cause identification

## 🧪 How to Run Locally

```bash
npm install
npm run dev
```
