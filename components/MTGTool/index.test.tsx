import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { MTGTool } from './MTGTool'

// Simple mock for utils
vi.mock('lib/utils', () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(' ')),
}))

describe('MTGTool', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    render(<MTGTool />)
  })

  test('displays correct initial values', () => {
    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand/Play size: 0 cards')).toBeInTheDocument()
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

  test('toggles exile mode', async () => {
    const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })

    // Initially should be in graveyard mode
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')

    // Click to toggle to hand/play mode
    await user.click(toggleButton)

    expect(
      screen.getByRole('button', { name: /Toggle exile mode.*Exile from hand\/play/ }),
    ).toBeInTheDocument()
  })

  test('draw card decreases deck and increases hand/play', async () => {
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })

    await user.click(drawButton)

    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()
  })

  test('reset game returns to initial state', async () => {
    // First, draw a card to change the state
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    await user.click(drawButton)

    // Verify state changed
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()

    // Reset the game
    const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
    await user.click(resetButton)

    // Confirm reset
    const confirmButton = screen.getByRole('button', { name: 'Reset' })
    await user.click(confirmButton)

    // Wait for modal to close and state to reset
    await waitFor(() => {
      expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    })
    expect(screen.getByLabelText('Hand/Play size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
  })

  test('reset game can be cancelled', async () => {
    // First, draw a card to change the state
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    await user.click(drawButton)

    // Verify state changed
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()

    // Try to reset the game
    const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
    await user.click(resetButton)

    // Cancel reset
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    // State should remain unchanged
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()
  })

  test('reset modal can be dismissed by clicking backdrop', async () => {
    // First, draw a card to change the state
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    await user.click(drawButton)

    // Try to reset the game
    const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
    await user.click(resetButton)

    // Click on the backdrop (the modal overlay)
    const backdrop = screen.getByRole('dialog')
    await user.click(backdrop)

    // Modal should be dismissed and state unchanged
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()
  })

  test('maintains total card count of 99', async () => {
    // Draw a card
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    await user.click(drawButton)

    // Check that total is still 99 (98 in library + 1 in hand/play)
    const libraryElement = screen.getByLabelText(/Deck total: \d+ cards/)
    const handOrPlayElement = screen.getByLabelText(/Hand\/Play size: \d+ cards/)

    expect(libraryElement).toBeInTheDocument()
    expect(handOrPlayElement).toBeInTheDocument()

    // Extract numbers and verify total
    const libraryMatch = libraryElement.getAttribute('aria-label')?.match(/(\d+)/)
    const handOrPlayMatch = handOrPlayElement.getAttribute('aria-label')?.match(/(\d+)/)

    const libraryCount = libraryMatch ? parseInt(libraryMatch[1]) : 0
    const handOrPlayCount = handOrPlayMatch ? parseInt(handOrPlayMatch[1]) : 0

    expect(libraryCount + handOrPlayCount).toBe(99)
  })

  test('accessibility: all interactive elements have proper labels', () => {
    // Check that all buttons have proper aria-labels
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
    })

    // Check that status elements have proper labels
    const statusElements = screen.getAllByRole('status')
    statusElements.forEach(status => {
      // Status elements should have aria-live
      expect(status).toHaveAttribute('aria-live')
    })
  })

  test('discard button moves cards from hand/play to graveyard', async () => {
    // First draw a card to have something in hand/play
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    await user.click(drawButton)

    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()

    // Now discard a card
    const discardButton = screen.getByRole('button', { name: /Discard a card/ })
    await user.click(discardButton)

    expect(screen.getByLabelText('Hand/Play size: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
  })

  test('discard button is disabled when hand/play is empty', () => {
    const discardButton = screen.getByRole('button', { name: /Discard a card/ })
    expect(discardButton).toBeDisabled()
  })

  test('draw button is disabled when library is empty', async () => {
    // Decrease library to 0 by increasing graveyard to 99
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })

    // Click 99 times to empty the library
    for (let i = 0; i < 99; i++) {
      await user.click(increaseGraveyardButton)
    }

    expect(screen.getByLabelText('Deck total: 0 cards')).toBeInTheDocument()

    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    expect(drawButton).toBeDisabled()
  })

  test('exile from graveyard works correctly', async () => {
    // First add cards to graveyard
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)

    expect(screen.getByLabelText('Graveyard total: 2 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()

    // Now exile a card from graveyard
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)

    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
  })

  test('exile from hand/play works correctly', async () => {
    // First draw cards to hand/play
    const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
    await user.click(drawButton)
    await user.click(drawButton)

    expect(screen.getByLabelText('Hand/Play size: 2 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()

    // Toggle to hand/play exile mode
    const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })
    await user.click(toggleButton)

    // Now exile a card from hand/play
    const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
    await user.click(increaseExileButton)

    expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
  })

  describe('difference tooltips', () => {
    test('shows positive difference tooltip when hand/play size increases', async () => {
      const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })

      // Draw 3 cards quickly
      await user.click(drawButton)
      await user.click(drawButton)
      await user.click(drawButton)

      // Should show tooltip for hand/play size increase
      await waitFor(() => {
        expect(screen.getByLabelText('Hand/Play size increased by 3')).toBeInTheDocument()
      })
      expect(screen.getByLabelText('Hand/Play size increased by 3')).toHaveClass('text-green-400')
    })

    test('positive difference tooltip fades out after delay', async () => {
      const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })

      await user.click(drawButton)
      await user.click(drawButton)
      await user.click(drawButton)

      // Should show tooltip initially
      await waitFor(() => {
        expect(screen.getByLabelText('Hand/Play size increased by 3')).toBeInTheDocument()
      })

      // Should fade out after delay
      await waitFor(
        () => {
          expect(screen.queryByLabelText('Hand/Play size increased by 3')).not.toBeInTheDocument()
        },
        { timeout: 4000 },
      )
    })

    test('shows negative difference tooltip when hand/play size decreases', async () => {
      // First draw cards
      const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
      await user.click(drawButton)
      await user.click(drawButton)

      // Then discard them
      const discardButton = screen.getByRole('button', { name: /Discard a card/ })
      await user.click(discardButton)
      await user.click(discardButton)

      // Should show tooltip for hand/play size decrease
      await waitFor(() => {
        expect(screen.getByLabelText('Hand/Play size decreased by 2')).toBeInTheDocument()
      })
      expect(screen.getByLabelText('Hand/Play size decreased by 2')).toHaveClass('text-red-400')
    })

    test('negative difference tooltip fades out after delay', async () => {
      // First draw cards
      const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
      await user.click(drawButton)
      await user.click(drawButton)
      await user.click(drawButton)

      // Wait for any existing tooltips to appear and then fade
      await waitFor(
        () => {
          expect(screen.queryByLabelText('Hand/Play size increased by 3')).not.toBeInTheDocument()
        },
        { timeout: 4000 },
      )

      // Then discard them
      const discardButton = screen.getByRole('button', { name: /Discard a card/ })
      await user.click(discardButton)
      await user.click(discardButton)
      await user.click(discardButton)

      // Should show negative tooltip
      await waitFor(() => {
        expect(screen.getByLabelText('Hand/Play size decreased by 3')).toBeInTheDocument()
      })

      // Should fade out after delay
      await waitFor(
        () => {
          expect(screen.queryByLabelText('Hand/Play size decreased by 3')).not.toBeInTheDocument()
        },
        { timeout: 4000 },
      )
    })
  })

  describe('exile mode functionality', () => {
    test('exile mode button shows correct text and state', async () => {
      const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })

      // Initially should be in graveyard mode
      expect(toggleButton.textContent).toBe('GY→Exile')
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')

      // Click to toggle to hand/play mode
      await user.click(toggleButton)

      expect(toggleButton.textContent).toBe('Hand/Play→Exile')
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    })

    test('exile from graveyard mode behavior', async () => {
      // Add cards to graveyard first
      const increaseGraveyardButton = screen.getByRole('button', {
        name: 'Increase graveyard total',
      })
      await user.click(increaseGraveyardButton)
      await user.click(increaseGraveyardButton)

      // Ensure we're in graveyard mode
      const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })
      if (toggleButton.textContent?.includes('Hand/Play→Exile')) {
        await user.click(toggleButton)
      }

      // Now exile should take from graveyard
      const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
      await user.click(increaseExileButton)

      expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
      expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
    })

    test('exile from hand/play mode behavior', async () => {
      // Draw cards to hand/play first
      const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
      await user.click(drawButton)
      await user.click(drawButton)

      // Toggle to hand/play mode
      const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })
      await user.click(toggleButton)

      // Ensure we're in hand/play mode
      expect(toggleButton.textContent).toBe('Hand/Play→Exile')

      // Now exile should take from hand/play
      const increaseExileButton = screen.getByRole('button', { name: 'Increase exile total' })
      await user.click(increaseExileButton)

      expect(screen.getByLabelText('Hand/Play size: 1 cards')).toBeInTheDocument()
      expect(screen.getByLabelText('Exile total: 1 cards')).toBeInTheDocument()
    })

    test('exile mode persists across other operations', async () => {
      // Toggle to hand/play mode
      const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })
      await user.click(toggleButton)

      // Perform other operations
      const drawButton = screen.getByRole('button', { name: 'Draw a card from deck to hand/play' })
      await user.click(drawButton)

      // Mode should still be hand/play
      expect(toggleButton.textContent).toBe('Hand/Play→Exile')
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    })

    test('exile mode resets with game reset', async () => {
      // Toggle to hand/play mode
      const toggleButton = screen.getByRole('button', { name: /Toggle exile mode/ })
      await user.click(toggleButton)

      expect(toggleButton.textContent).toBe('Hand/Play→Exile')

      // Reset game
      const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
      await user.click(resetButton)

      const confirmButton = screen.getByRole('button', { name: 'Reset' })
      await user.click(confirmButton)

      // Mode should be back to graveyard
      await waitFor(() => {
        expect(toggleButton.textContent).toBe('GY→Exile')
      })
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    })
  })

  test('undo mill: graveyard decrease sends cards back to deck', async () => {
    // First mill some cards (graveyard +)
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)
    await user.click(increaseGraveyardButton)

    // Verify mill worked: deck decreased, graveyard increased
    expect(screen.getByLabelText('Deck total: 96 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 3 cards')).toBeInTheDocument()

    // Now undo mill (graveyard -)
    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })
    await user.click(decreaseGraveyardButton)
    await user.click(decreaseGraveyardButton)

    // Verify undo mill worked: cards went back to deck
    expect(screen.getByLabelText('Deck total: 98 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Exile total: 0 cards')).toBeInTheDocument()
  })

  test('undo mill reduces graveyard permanents correctly', async () => {
    // First add some permanents to graveyard
    const increasePermanentsButton = screen.getByRole('button', {
      name: 'Increase graveyard permanents',
    })
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton)
    await user.click(increasePermanentsButton)

    // Verify permanents were added
    expect(screen.getByLabelText('Graveyard permanents: 3')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 3 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Deck total: 96 cards')).toBeInTheDocument()

    // Now undo mill (graveyard -)
    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })
    await user.click(decreaseGraveyardButton)

    // Verify permanents were reduced and cards went back to deck
    expect(screen.getByLabelText('Graveyard permanents: 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 2 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Deck total: 97 cards')).toBeInTheDocument()
  })

  test('undo mill respects maximum deck size limit', async () => {
    // Mill all 99 cards to graveyard (deck will be 0)
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    for (let i = 0; i < 99; i++) {
      await user.click(increaseGraveyardButton)
    }

    expect(screen.getByLabelText('Deck total: 0 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 99 cards')).toBeInTheDocument()

    // Now undo mill all cards back (should work and hit the limit)
    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })
    for (let i = 0; i < 99; i++) {
      await user.click(decreaseGraveyardButton)
    }

    // Should be back to initial state
    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()

    // Now mill one card and try to undo mill when deck is already at max
    await user.click(increaseGraveyardButton) // Deck: 98, Graveyard: 1

    // Try to add one more card to deck beyond the limit (this should be blocked)
    // We'll do this by trying to undo mill twice when there's only 1 card in graveyard
    await user.click(decreaseGraveyardButton) // Should work: Deck: 99, Graveyard: 0

    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()

    // Add one card to graveyard again
    await user.click(increaseGraveyardButton) // Deck: 98, Graveyard: 1

    // Try to undo mill when deck is at 98 (should work and reach 99)
    await user.click(decreaseGraveyardButton) // Should work: Deck: 99, Graveyard: 0

    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
  })

  test('undo mill moves partial cards when deck has limited space', async () => {
    // Mill 98 cards to graveyard, leaving deck with 1 card
    const increaseGraveyardButton = screen.getByRole('button', { name: 'Increase graveyard total' })
    for (let i = 0; i < 98; i++) {
      await user.click(increaseGraveyardButton)
    }

    expect(screen.getByLabelText('Deck total: 1 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 98 cards')).toBeInTheDocument()

    // Now undo mill - should move cards back until deck reaches max (99)
    const decreaseGraveyardButton = screen.getByRole('button', { name: 'Decrease graveyard total' })

    // First undo should work (deck: 2, graveyard: 97)
    await user.click(decreaseGraveyardButton)
    expect(screen.getByLabelText('Deck total: 2 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 97 cards')).toBeInTheDocument()

    // Continue undoing until we reach deck limit
    for (let i = 0; i < 97; i++) {
      await user.click(decreaseGraveyardButton)
    }

    // Should be back to initial state (deck: 99, graveyard: 0)
    expect(screen.getByLabelText('Deck total: 99 cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Graveyard total: 0 cards')).toBeInTheDocument()
  })

  describe('delirium integration', () => {
    test('delirium tracker is present in the interface', async () => {
      expect(screen.getByRole('heading', { name: 'Delirium Tracker' })).toBeInTheDocument()
      expect(screen.getByText('0/4 types')).toBeInTheDocument()

      // Expand the delirium tracker to access the buttons
      const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
      await user.click(toggleButton)

      // Check all card type buttons are present
      const cardTypes = [
        'Land',
        'Creature',
        'Artifact',
        'Enchantment',
        'Instant',
        'Sorcery',
        'Planeswalker',
        'Battle',
      ]
      cardTypes.forEach(cardType => {
        expect(screen.getByRole('button', { name: cardType })).toBeInTheDocument()
      })
    })

    test('delirium tracker works independently of zone updates', async () => {
      // Add cards to graveyard
      const increaseGraveyardButton = screen.getByRole('button', {
        name: 'Increase graveyard total',
      })
      await user.click(increaseGraveyardButton)
      await user.click(increaseGraveyardButton)

      expect(screen.getByLabelText('Graveyard total: 2 cards')).toBeInTheDocument()

      // Expand the delirium tracker to access the buttons
      const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
      await user.click(toggleButton)

      // Toggle some card types in delirium tracker
      const landButton = screen.getByRole('button', { name: 'Land' })
      const creatureButton = screen.getByRole('button', { name: 'Creature' })

      await user.click(landButton)
      await user.click(creatureButton)

      // Delirium should show 2 types, graveyard should still be 2 cards
      expect(screen.getByText('2/4 types')).toBeInTheDocument()
      expect(screen.getByLabelText('Graveyard total: 2 cards')).toBeInTheDocument()
      expect(landButton).toHaveAttribute('aria-pressed', 'true')
      expect(creatureButton).toHaveAttribute('aria-pressed', 'true')
    })

    test('delirium activates with 4 card types', async () => {
      // Expand the delirium tracker to access the buttons
      const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
      await user.click(toggleButton)

      const cardTypeButtons = [
        screen.getByRole('button', { name: 'Land' }),
        screen.getByRole('button', { name: 'Creature' }),
        screen.getByRole('button', { name: 'Artifact' }),
        screen.getByRole('button', { name: 'Instant' }),
      ]

      // Click 4 different card types
      for (const button of cardTypeButtons) {
        await user.click(button)
      }

      // Should show active status
      expect(screen.getByText('4/4 types - ACTIVE')).toBeInTheDocument()
      expect(
        screen.getByText('🎯 Delirium is active! You have 4+ card types in your graveyard.'),
      ).toBeInTheDocument()

      // All clicked buttons should be pressed
      cardTypeButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed', 'true')
      })
    })

    test('delirium deactivates when dropping below 4 types', async () => {
      // Expand the delirium tracker to access the buttons
      const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
      await user.click(toggleButton)

      const cardTypeButtons = [
        screen.getByRole('button', { name: 'Land' }),
        screen.getByRole('button', { name: 'Creature' }),
        screen.getByRole('button', { name: 'Artifact' }),
        screen.getByRole('button', { name: 'Instant' }),
      ]

      // Activate delirium with 4 types
      for (const button of cardTypeButtons) {
        await user.click(button)
      }

      expect(screen.getByText('4/4 types - ACTIVE')).toBeInTheDocument()

      // Remove one card type
      await user.click(cardTypeButtons[0]) // Remove Land

      // Should deactivate
      expect(screen.getByText('3/4 types')).toBeInTheDocument()
      expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument()
      expect(screen.queryByText('🎯 Delirium is active!')).not.toBeInTheDocument()
    })

    test('delirium state resets with game reset', async () => {
      // Expand the delirium tracker to access the buttons
      const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
      await user.click(toggleButton)

      // Activate delirium
      const cardTypeButtons = [
        screen.getByRole('button', { name: 'Land' }),
        screen.getByRole('button', { name: 'Creature' }),
        screen.getByRole('button', { name: 'Artifact' }),
        screen.getByRole('button', { name: 'Instant' }),
      ]

      for (const button of cardTypeButtons) {
        await user.click(button)
      }

      expect(screen.getByText('4/4 types - ACTIVE')).toBeInTheDocument()

      // Reset game
      const resetButton = screen.getByRole('button', { name: 'Reset game to initial state' })
      await user.click(resetButton)

      const confirmButton = screen.getByRole('button', { name: 'Reset' })
      await user.click(confirmButton)

      // Wait for reset and verify delirium is cleared
      await waitFor(() => {
        expect(screen.getByText('0/4 types')).toBeInTheDocument()
      })

      expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument()

      // All buttons should be unpressed
      cardTypeButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed', 'false')
      })
    })

    test('can toggle all 8 card types when expanded', async () => {
      // First expand delirium tracker
      const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
      await user.click(toggleButton)

      const allCardTypes = [
        'Land',
        'Creature',
        'Artifact',
        'Enchantment',
        'Instant',
        'Sorcery',
        'Planeswalker',
        'Battle',
      ]

      // Toggle all card types on
      for (const cardTypeName of allCardTypes) {
        const button = screen.getByRole('button', { name: cardTypeName })
        await user.click(button)
      }

      expect(screen.getByText('8/4 types - ACTIVE')).toBeInTheDocument()
      expect(
        screen.getByText('🎯 Delirium is active! You have 4+ card types in your graveyard.'),
      ).toBeInTheDocument()

      // All buttons should be pressed
      allCardTypes.forEach(cardTypeName => {
        const button = screen.getByRole('button', { name: cardTypeName })
        expect(button).toHaveAttribute('aria-pressed', 'true')
      })

      // Toggle all card types off
      for (const cardTypeName of allCardTypes) {
        const button = screen.getByRole('button', { name: cardTypeName })
        await user.click(button)
      }

      expect(screen.getByText('0/4 types')).toBeInTheDocument()
      expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument()

      // All buttons should be unpressed
      allCardTypes.forEach(cardTypeName => {
        const button = screen.getByRole('button', { name: cardTypeName })
        expect(button).toHaveAttribute('aria-pressed', 'false')
      })
    })
  })
})
