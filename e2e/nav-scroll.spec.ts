import { test, expect } from '@playwright/test'

const TRANSITION_DURATION = 300

test.describe('navigation auto-scroll', () => {
  test('scrolls to #contact when navigating from /resume to /#contact', async ({ page }) => {
    await page.goto('/resume')
    await page.waitForLoadState('networkidle')

    const contactLink = page.locator('a[href="/#contact"]')
    await contactLink.click()

    await page.waitForURL('/')

    // Should land at the top of the page initially
    const scrollYOnArrival = await page.evaluate(() => window.scrollY)
    expect(scrollYOnArrival).toBeLessThan(100)

    // Wait for page transition + scroll animation
    await page.waitForTimeout(TRANSITION_DURATION + 500)

    // Should have scrolled down to #contact
    const scrollYAfter = await page.evaluate(() => window.scrollY)
    expect(scrollYAfter).toBeGreaterThan(scrollYOnArrival)

    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeVisible()

    const rect = await contactSection.evaluate(el => el.getBoundingClientRect().top)
    expect(rect).toBeLessThan(200)
  })

  test('scrolls to #about when navigating from /blog to /#about', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    const aboutLink = page.locator('a[href="/#about"]')
    await aboutLink.click()

    await page.waitForURL('/')

    const scrollYOnArrival = await page.evaluate(() => window.scrollY)
    expect(scrollYOnArrival).toBeLessThan(100)

    await page.waitForTimeout(TRANSITION_DURATION + 500)

    const scrollYAfter = await page.evaluate(() => window.scrollY)
    expect(scrollYAfter).toBeGreaterThan(scrollYOnArrival)

    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()

    const rect = await aboutSection.evaluate(el => el.getBoundingClientRect().top)
    expect(rect).toBeLessThan(200)
  })

  test('does not scroll when navigating to homepage via #home', async ({ page }) => {
    await page.goto('/resume')
    await page.waitForLoadState('networkidle')

    const homeLink = page.locator('a[href="/#home"]')
    await homeLink.click()

    await page.waitForURL('/')
    await page.waitForTimeout(TRANSITION_DURATION + 500)

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(100)
  })
})
