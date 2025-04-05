const { test, expect } = require('@playwright/test');

test('homepage has IELTS Master title and features', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:3000');

  // Expect the page to have the title 'IELTS Master'
  await expect(page).toHaveTitle(/IELTS Master/);

  // Expect the heading to be visible
  const heading = page.locator('h1:has-text("IELTS Master")');
  await expect(heading).toBeVisible();

  // Expect 4 feature cards to be present
  const featureCards = page.locator('.feature-card');
  await expect(featureCards).toHaveCount(4);

  // Check specific feature titles
  const featureTitles = [
    'Speaking Practice',
    'Writing Assessment',
    'Reading Exercises',
    'Listening Tests'
  ];

  for (const title of featureTitles) {
    const card = page.locator(`.feature-card h3:has-text("${title}")`);
    await expect(card).toBeVisible();
  }
  
  // Test interactivity - click on first feature card
  const firstCard = page.locator('.feature-card').first();
  const firstTitle = await firstCard.locator('h3').textContent();
  
  // We need to handle the alert that will appear
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain(firstTitle);
    await dialog.accept();
  });
  
  await firstCard.click();
}); 