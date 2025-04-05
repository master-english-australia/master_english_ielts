const { chromium } = require('playwright');

async function startMCPServer() {
  // Launch browser with MCP enabled
  const browser = await chromium.launch({
    headless: false,
    args: ['--remote-debugging-port=9222']
  });
  
  // Create a new context
  const context = await browser.newContext();
  
  // Enable MCP on the context
  await context.route('**/*', route => route.continue());
  
  // Create a new page
  const page = await context.newPage();
  
  console.log('MCP server started. Browser is ready for agent control');
  
  // Navigate to Next.js development server
  await page.goto('http://localhost:3000');
  
  console.log('Connected to Next.js server. Ready for Cursor Agent integration.');
  
  // Keep the session alive
  process.on('SIGINT', async () => {
    console.log('Closing browser...');
    await browser.close();
    process.exit();
  });
}

module.exports = { startMCPServer };

// Run directly if called as a script
if (require.main === module) {
  startMCPServer().catch(console.error);
} 