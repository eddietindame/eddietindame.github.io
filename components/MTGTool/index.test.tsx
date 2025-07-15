import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MTGTool } from './index'

// Simple mock for utils
jest.mock('lib/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('MTGTool', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    render(<MTGTool />)
  })

  test('displays correct initial values', () => {
    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Toggle exile mode.*Exile from graveyard/ }),
    ).toBeInTheDocument()
  })

  test('decreases deck when increasing graveyard', async () => {
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })

    await user.click(increaseGraveyardButton)

    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
  })

  test('increases graveyard total when permanents exceed current total', async () => {
    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })

    await user.click(increasePermanentsButton)

    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard permanents: 1')).toBeInTheDocument()
  })

  test('toggles between exile modes', async () => {
    const modeButton = screen.getByRole('button', { name: /Toggle exile mode/ })

    await user.click(modeButton)
    expect(
      screen.getByRole('button', { name: /Toggle exile mode.*Exile from hand/ }),
    ).toBeInTheDocument()

    await user.click(modeButton)
    expect(
      screen.getByRole('button', { name: /Toggle exile mode.*Exile from graveyard/ }),
    ).toBeInTheDocument()
  })

  test('draw card decreases deck and increases hand', async () => {
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })

    await user.click(drawButton)

    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 1 cards')).toBeInTheDocument()
  })

  test('reset game returns to initial state', async () => {
    // Make changes
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)

    // Reset
    const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
    await user.click(resetButton)

    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
  })

  test('maintains total card count of 99', async () => {
    // Make various changes
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton) // Deck 99 -> 98, Hand 0 -> 1

    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton) // Graveyard 0 -> 1, Deck 98 -> 97

    // Get current values from aria labels
    const deckElement = screen.getByLabelText('Deck total: 97 cards')
    const handElement = screen.getByLabelText('Hand size: 1 cards')
    const graveyardElement = screen.getByLabelText('Graveyard total: 1 cards')
    const exileElement = screen.getByLabelText('Exile total: 0 cards')

    // Parse values from aria labels
    const deckValue = parseInt(deckElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0')
    const handValue = parseInt(handElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0')
    const graveyardValue = parseInt(
      graveyardElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0',
    )
    const exileValue = parseInt(exileElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0')

    expect(deckValue + handValue + graveyardValue + exileValue).toBe(99)
  })

  test('accessibility: all interactive elements have proper labels', () => {
    // Check that all buttons have accessible names
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName()
    })

    // Check that status elements have proper roles
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('application')).toBeInTheDocument()

    // Check that groups have proper labeling (either aria-labelledby or aria-label)
    const groups = screen.getAllByRole('group')
    groups.forEach(group => {
      expect(group).toHaveAccessibleName()
    })
  })

  test('exile mode toggle has correct aria-pressed state', async () => {
    const modeButton = screen.getByRole('button', { name: /Toggle exile mode/ })

    // Initially should be false (GY→Exile mode)
    expect(modeButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(modeButton)

    // After click should be true (Hand→Exile mode)
    expect(modeButton).toHaveAttribute('aria-pressed', 'true')
  })

  // NEW TEST CASES - Missing edge cases and validation logic

  test('prevents deck total from going below 0', async () => {
    // First, empty the deck completely
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })

    // Click 99 times to move all cards to graveyard
    for (let i = 0; i < 99; i++) {
      await user.click(increaseGraveyardButton)
    }

    expect(screen.getByLabelText('Deck total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 99 cards')).toBeInTheDocument()

    // Try to decrease deck further - should not work
    const decreaseDeckButton = screen.getByRole('button', { name: 'Decrease deck total' })
    await user.click(decreaseDeckButton)

    // Should still be 0
    expect(screen.getByLabelText('Deck total: 0 cards')).toBeInTheDocument()
  })

  test('prevents zone totals from exceeding 99', async () => {
    // Try to increase deck beyond 99 (should fail)
    const increaseDeckButton = screen.getByRole('button', { name: 'Increase deck total' })
    await user.click(increaseDeckButton)

    // Should still be 99
    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
  })

  test('prevents adding to deck when insufficient cards in hand', async () => {
    // Start with some cards in hand
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton) // Hand: 1, Deck: 98

    // Try to add 2 cards to deck (should fail since hand only has 1)
    const increaseDeckButton = screen.getByRole('button', { name: 'Increase deck total' })
    await user.click(increaseDeckButton)
    await user.click(increaseDeckButton) // Second click should fail

    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
  })

  test('exile from graveyard mode works correctly', async () => {
    // Add cards to graveyard first
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 2, Deck: 97

    // Exile from graveyard (default mode)
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)

    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Deck total: 97 cards')).toBeInTheDocument()
  })

  test('exile from hand mode works correctly', async () => {
    // Draw cards to hand
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)
    await user.click(drawButton) // Hand: 2, Deck: 97

    // Switch to exile from hand mode
    const modeButton = screen.getByRole('button', { name: /Toggle exile mode/ })
    await user.click(modeButton)

    // Exile from hand
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)

    expect(screen.getByLabelText('Hand size: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Deck total: 97 cards')).toBeInTheDocument()
  })

  test('prevents exile from hand when insufficient cards in hand', async () => {
    // Switch to exile from hand mode with no cards in hand
    const modeButton = screen.getByRole('button', { name: /Toggle exile mode/ })
    await user.click(modeButton)

    // Try to exile from empty hand
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)

    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
  })

  test('prevents exile from graveyard when insufficient cards in graveyard', async () => {
    // Try to exile from empty graveyard
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)

    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
  })

  test('removing from exile returns cards to graveyard', async () => {
    // Set up some cards in exile
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 2

    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)
    await user.click(increaseExileButton) // Exile: 2, Graveyard: 0

    // Remove from exile
    const decreaseExileButton = screen.getByRole('button', { name: 'Decrease exile total' })
    await user.click(decreaseExileButton)

    expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
  })

  test('graveyard permanents cannot exceed graveyard total', async () => {
    // Add 2 cards to graveyard
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 2

    // Add 3 permanents (should auto-expand graveyard)
    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton) // Permanents: 3, should expand graveyard to 3

    expect(screen.getByLabelText('Graveyard total: 3 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard permanents: 3')).toBeInTheDocument()
  })

  test('decreasing graveyard total adjusts permanents when necessary', async () => {
    // Set up graveyard with 3 cards and 2 permanents
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 3

    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton) // Permanents: 2

    // Decrease graveyard to 1 (should reduce permanents to 1)
    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })
    await user.click(decreaseGraveyardButton)
    await user.click(decreaseGraveyardButton) // Graveyard: 1

    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard permanents: 1')).toBeInTheDocument()
  })

  test('exiling from graveyard properly reduces permanents', async () => {
    // Set up graveyard with cards and permanents
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 3

    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton) // Permanents: 2

    // Exile 2 cards from graveyard
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)
    await user.click(increaseExileButton) // Exile: 2, Graveyard: 1

    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard permanents: 0')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 2 cards')).toBeInTheDocument()
  })
})
