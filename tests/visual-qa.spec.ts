import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: '1080p', width: 1920, height: 1080, isMobile: false },
  { name: '1440x900', width: 1440, height: 900, isMobile: false },
  { name: '720p', width: 1280, height: 720, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

const THEMES = ['dark', 'light'];

for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    test.describe(`${vp.name} (${theme} mode)`, () => {
      test.use({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
      });

      test('Verification suite: CSS 3D depth, coverflow, modal & asset fidelity', async ({ page }) => {
        const consoleErrors: string[] = [];
        const failedRequests: string[] = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('requestfailed', (req) => failedRequests.push(req.url()));

        await page.addInitScript(`localStorage.setItem('portfolio_theme', '${theme}');`);
        await page.goto('/', { waitUntil: 'networkidle' });

        // 1. Zero visible TODO strings
        const bodyText = await page.innerText('body');
        expect(bodyText).not.toContain('TODO:');

        // 2. Canvas count: At most 1 canvas on desktop (Hyperspeed background), 0 on mobile
        const canvasCount = await page.locator('canvas').count();
        expect(canvasCount).toBeLessThanOrEqual(vp.isMobile ? 0 : 1);

        // 3. Section headings clearance below navbar
        const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
        for (const sec of sections) {
          const secEl = page.locator(`#${sec}`);
          if (await secEl.isVisible()) {
            await secEl.evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
            await page.waitForTimeout(300);
            const h2 = secEl.locator('h2').first();
            if (await h2.isVisible()) {
              const box = await h2.boundingBox();
              if (box) {
                expect(box.y).toBeGreaterThanOrEqual(48);
              }
            }
          }
        }

        // 4. Desktop 3D Coverflow and 9-project assertions
        if (!vp.isMobile) {
          const projectsSection = page.locator('#projects');
          await projectsSection.evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
          await page.waitForTimeout(400);

          for (let i = 0; i < 9; i++) {
            // Assert title scrollWidth <= clientWidth (no mid-word wrap/overflow)
            const isTitleFit = await page.evaluate(() => {
              const h3 = document.querySelector('#projects h3');
              if (!h3) return false;
              return h3.scrollWidth <= h3.clientWidth + 2;
            });
            expect(isTitleFit).toBe(true);

            // Assert carousel track and info panel do not overlap
            const isNonOverlapping = await page.evaluate(() => {
              const carousel = document.querySelector('[data-cursor="CAROUSEL"]');
              const panel = document.querySelector('#projects .rounded-2xl.border.p-5, #projects .rounded-3xl.border.p-5');
              if (!carousel || !panel) return true;
              const cRect = carousel.getBoundingClientRect();
              const pRect = panel.getBoundingClientRect();
              return cRect.bottom <= pRect.top + 5;
            });
            expect(isNonOverlapping).toBe(true);

            // Navigate to next
            if (i < 8) {
              const nextBtn = page.locator('#projects button[aria-label="Next project"]');
              await nextBtn.click();
              await page.waitForTimeout(300);
            }
          }

          // 5. Case Study Modal Scrolling & Layering Check
          const caseStudyBtn = page.locator('#projects button:has-text("CASE STUDY")').first();
          await caseStudyBtn.click();
          await page.waitForTimeout(400);

          const modal = page.locator('[role="dialog"]');
          await expect(modal).toBeVisible();

          const scrollContainer = modal.locator('[data-lenis-prevent="true"]');
          const initialScrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
          const initialWindowScrollY = await page.evaluate(() => window.scrollY);

          // Scroll inside modal content
          await scrollContainer.evaluate((el) => el.scrollBy(0, 150));
          await page.waitForTimeout(200);

          const scrolledTop = await scrollContainer.evaluate((el) => el.scrollTop);
          const currentWindowScrollY = await page.evaluate(() => window.scrollY);

          expect(scrolledTop).toBeGreaterThan(initialScrollTop);
          expect(currentWindowScrollY).toBe(initialWindowScrollY);

          // Close modal via Escape key
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
          await expect(modal).not.toBeVisible();
        }

        expect(consoleErrors).toHaveLength(0);
        expect(failedRequests).toHaveLength(0);
      });
    });
  }
}
