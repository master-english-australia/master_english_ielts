const { runServer } = require("@playwright/mcp");
const { chromium } = require("playwright");

runServer({
  launch: async () => {
    return await chromium.launch({
      headless: false,
    });
  },
});
