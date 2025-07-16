import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
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

    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Reset Game' })).toBeInTheDocument()
    expect(
      screen.getByText(
        'Are you sure you want to reset the game? This will clear all card counts and return to the initial state.',
      ),
    ).toBeInTheDocument()

    // Confirm reset
    const confirmButton = screen.getByRole('button', { name: 'Reset' })
    await user.click(confirmButton)

    // Modal should disappear
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Verify reset state
    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
  })

  test('reset game can be cancelled', async () => {
    // Make changes
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)

    // Reset
    const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
    await user.click(resetButton)

    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Cancel reset
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    // Modal should disappear
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Verify state unchanged (should still show the drawn card)
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 1 cards')).toBeInTheDocument()
  })

  test('reset modal can be dismissed by clicking backdrop', async () => {
    // Make changes
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)

    // Reset
    const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
    await user.click(resetButton)

    // Modal should appear
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    // Click backdrop (the modal backdrop div)
    await user.click(modal)

    // Modal should disappear
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Verify state unchanged (should still show the drawn card)
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand size: 1 cards')).toBeInTheDocument()
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

  test('discard button moves cards from hand to graveyard', async () => {
    // First draw a card to have something in hand
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)

    expect(screen.getByLabelText('Hand size: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()

    // Now discard it
    const discardButton = screen.getByRole('button', {
      name: 'Discard a card from hand to graveyard',
    })
    await user.click(discardButton)

    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
  })

  test('discard button is disabled when hand is empty', async () => {
    const discardButton = screen.getByRole('button', {
      name: 'Discard a card from hand to graveyard',
    })

    // Should be disabled when hand is empty
    expect(discardButton).toBeDisabled()

    // Draw a card
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)

    // Should be enabled now
    expect(discardButton).not.toBeDisabled()

    // Discard the card
    await user.click(discardButton)

    // Should be disabled again
    expect(discardButton).toBeDisabled()
  })

  test('cannot discard more cards than in hand', async () => {
    // Draw 2 cards
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)
    await user.click(drawButton)

    expect(screen.getByLabelText('Hand size: 2 cards')).toBeInTheDocument()

    // Discard 3 times (should only discard 2)
    const discardButton = screen.getByRole('button', {
      name: 'Discard a card from hand to graveyard',
    })
    await user.click(discardButton)
    await user.click(discardButton)
    await user.click(discardButton) // This should do nothing

    expect(screen.getByLabelText('Hand size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 2 cards')).toBeInTheDocument()
  })

  test('maintains total card count with draw and discard actions', async () => {
    // Draw 3 cards
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)
    await user.click(drawButton)
    await user.click(drawButton)

    // Discard 1 card
    const discardButton = screen.getByRole('button', {
      name: 'Discard a card from hand to graveyard',
    })
    await user.click(discardButton)

    // Get current values
    const deckElement = screen.getByLabelText('Deck total: 96 cards')
    const handElement = screen.getByLabelText('Hand size: 2 cards')
    const graveyardElement = screen.getByLabelText('Graveyard total: 1 cards')
    const exileElement = screen.getByLabelText('Exile total: 0 cards')

    // Parse values
    const deckValue = parseInt(deckElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0')
    const handValue = parseInt(handElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0')
    const graveyardValue = parseInt(
      graveyardElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0',
    )
    const exileValue = parseInt(exileElement.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0')

    expect(deckValue + handValue + graveyardValue + exileValue).toBe(99)
  })

  test('displays positive tooltip when increasing values', async () => {
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })

    // Click multiple times to accumulate positive changes
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Should show +3

    // Check that positive tooltip appears
    await waitFor(() => {
      expect(screen.getByText('+3')).toBeInTheDocument()
    })
    expect(screen.getByText('+3')).toHaveClass('text-green-400')
  })

  test('displays negative tooltip when decreasing values', async () => {
    // First add some cards to graveyard so we can decrease
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 3

    // Wait for tooltip to disappear
    await waitFor(
      () => {
        expect(screen.queryByText('+3')).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })
    await user.click(decreaseGraveyardButton)
    await user.click(decreaseGraveyardButton) // Should show -2

    // Check that negative tooltip appears
    await waitFor(() => {
      expect(screen.getByText('-2')).toBeInTheDocument()
    })
    expect(screen.getByText('-2')).toHaveClass('text-red-400')
  })

  test('displays both positive and negative tooltips simultaneously', async () => {
    // First add some cards to graveyard
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Graveyard: 3, should show +3

    // Wait for positive tooltip to appear
    await waitFor(() => {
      expect(screen.getByText('+3')).toBeInTheDocument()
    })

    // Then decrease without waiting for timeout
    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })
    await user.click(decreaseGraveyardButton) // Should show -1

    // Both tooltips should be visible
    await waitFor(() => {
      expect(screen.getByText('+3')).toBeInTheDocument()
      expect(screen.getByText('-1')).toBeInTheDocument()
    })
    expect(screen.getByText('+3')).toHaveClass('text-green-400')
    expect(screen.getByText('-1')).toHaveClass('text-red-400')
  })

  test('tooltips accumulate values correctly', async () => {
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })

    // Click multiple times quickly
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Should accumulate to +5

    await waitFor(() => {
      expect(screen.getByText('+5')).toBeInTheDocument()
    })
  })

  test('tooltips work for graveyard permanents', async () => {
    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })

    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton) // Should show +3

    await waitFor(() => {
      expect(screen.getByText('+3')).toBeInTheDocument()
    })
    expect(screen.getByText('+3')).toHaveClass('text-green-400')
  })

  test('tooltips work for all zones', async () => {
    // Test deck zone
    const decreaseDeckButton = screen.getByRole('button', { name: 'Decrease deck total' })
    await user.click(decreaseDeckButton)
    await user.click(decreaseDeckButton) // Should show -2

    await waitFor(() => {
      expect(screen.getByText('-2')).toBeInTheDocument()
    })
    expect(screen.getByText('-2')).toHaveClass('text-red-400')

    // Test graveyard total
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton) // Should show +3

    await waitFor(() => {
      expect(screen.getByText('+3')).toBeInTheDocument()
    })
    expect(screen.getByText('+3')).toHaveClass('text-green-400')

    // Test graveyard permanents
    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton) // Should show +2

    await waitFor(() => {
      const tooltips = screen.getAllByText('+2')
      expect(tooltips.length).toBeGreaterThan(0)
    })

    // Test exile zone - now graveyard has cards to exile from
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton) // Should show +1

    await waitFor(() => {
      expect(screen.getByText('+1')).toBeInTheDocument()
    })
    expect(screen.getByText('+1')).toHaveClass('text-green-400')

    // Verify tooltips are showing different values to confirm they're working independently
    expect(screen.getByText('-2')).toBeInTheDocument() // Deck
    expect(screen.getByText('+3')).toBeInTheDocument() // Graveyard total
    expect(screen.getAllByText('+2').length).toBeGreaterThan(0) // Graveyard permanents and hand
    expect(screen.getByText('+1')).toBeInTheDocument() // Exile
  })

  test('displays tooltip when drawing cards to hand', async () => {
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })

    // Draw multiple cards to accumulate positive changes
    await user.click(drawButton)
    await user.click(drawButton)
    await user.click(drawButton) // Should show +3 on hand

    // Check that positive tooltip appears on hand
    await waitFor(() => {
      expect(screen.getByText('+3')).toBeInTheDocument()
    })
    expect(screen.getByText('+3')).toHaveClass('text-green-400')
  })

  test('displays tooltip when discarding cards from hand', async () => {
    // First draw some cards
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand' })
    await user.click(drawButton)
    await user.click(drawButton)
    await user.click(drawButton) // Hand: 3

    // Wait for tooltip to disappear
    await waitFor(
      () => {
        expect(screen.queryByText('+3')).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Now discard some cards
    const discardButton = screen.getByRole('button', {
      name: 'Discard a card from hand to graveyard',
    })
    await user.click(discardButton)
    await user.click(discardButton) // Should show -2 on hand

    // Check that negative tooltip appears on hand
    await waitFor(() => {
      expect(screen.getByText('-2')).toBeInTheDocument()
    })
    expect(screen.getByText('-2')).toHaveClass('text-red-400')
  })
})
