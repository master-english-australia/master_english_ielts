# Master English IELTS

An English learning platform for IELTS preparation with Next.js, TypeScript, Playwright MCP, and Cursor Agent integration.

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the Next.js development server:
   ```
   npm run dev
   ```

3. In a new terminal, start the Playwright MCP integration:
   ```
   npm run agent
   ```

## Using Cursor Agent with Playwright MCP and Next.js

This project integrates Playwright's Model Control Protocol (MCP) with Cursor Agent to enable automated UI development based on browser designs, using Next.js with TypeScript.

### How it works:

1. The Next.js server hosts a TypeScript-based IELTS learning platform UI.
2. The Playwright MCP server connects to the browser and enables remote control capabilities.
3. Cursor Agent can observe the UI design and automatically develop TypeScript components based on it.

### Development workflow:

1. Start the Next.js development server: `npm run dev`
2. Launch the Cursor Agent integration: `npm run agent`
3. Open Cursor IDE and connect the Agent to the running browser session.
4. The Agent can now observe and modify the UI components based on the design.

### Project Structure:

```
/
├── src/                # Source code directory
│   ├── app/            # Next.js App Router
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Homepage component
│   ├── components/     # React components
│   │   └── FeatureCard.tsx
│   └── styles/         # CSS styles
│       └── globals.css
├── public/             # Static assets
├── tests/              # Playwright tests
├── mcp.js              # MCP server setup
├── cursor-agent-integration.js # Cursor Agent integration
└── next.config.js      # Next.js configuration
```

## Features

- Speaking Practice
- Writing Assessment
- Reading Exercises
- Listening Tests

## Building for Production

To build the application for production, run:

```
npm run build
```

To start the production server:

```
npm start
```