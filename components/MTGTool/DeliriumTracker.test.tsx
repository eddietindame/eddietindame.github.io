import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi, type Mock } from 'vitest'
import { DeliriumTracker } from './DeliriumTracker'
import { DeliriumState, CardType } from './types'

describe('DeliriumTracker', () => {
  let user: ReturnType<typeof userEvent.setup>
  let mockOnToggleCardType: Mock

  beforeEach(() => {
    user = userEvent.setup()
    mockOnToggleCardType = vi.fn()
  })

  const createDeliriumState = (cardTypes: CardType[] = []): DeliriumState => ({
    cardTypesInGraveyard: new Set(cardTypes),
    isActive: cardTypes.length >= 4,
  })

  test('renders collapsed by default with toggle button', () => {
    const deliriumState = createDeliriumState()

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    // Should show the toggle button and heading
    expect(screen.getByRole('button', { name: /Toggle delirium tracker/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Delirium Tracker' })).toBeInTheDocument()

    // Toggle button should be collapsed initially
    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    // Card type buttons should exist but not be focusable when collapsed
    const expectedCardTypes = [
      'Land',
      'Creature',
      'Artifact',
      'Enchantment',
      'Instant',
      'Sorcery',
      'Planeswalker',
      'Battle',
    ]

    expectedCardTypes.forEach(cardType => {
      const button = screen.getByText(cardType)
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('tabIndex', '-1')
    })
  })

  test('expands to show all card type buttons when toggle is clicked', async () => {
    const deliriumState = createDeliriumState()

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })

    // Expand the tracker
    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    const expectedCardTypes = [
      'Land',
      'Creature',
      'Artifact',
      'Enchantment',
      'Instant',
      'Sorcery',
      'Planeswalker',
      'Battle',
    ]

    expectedCardTypes.forEach(cardType => {
      const button = screen.getByRole('button', { name: cardType })
      expect(button).toHaveAttribute('tabIndex', '0') // Focusable when expanded
    })
  })

  test('displays correct initial status when no card types are selected', () => {
    const deliriumState = createDeliriumState()

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    expect(screen.getByText('0/4 types')).toBeInTheDocument()
    expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument()
  })

  test('displays correct status with 3 card types (inactive)', () => {
    const deliriumState = createDeliriumState(['land', 'creature', 'artifact'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    expect(screen.getByText('3/4 types')).toBeInTheDocument()
    expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument()
  })

  test('displays active status with 4 card types', () => {
    const deliriumState = createDeliriumState(['land', 'creature', 'artifact', 'instant'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    expect(screen.getByText('4/4 types - ACTIVE')).toBeInTheDocument()
  })

  test('shows success message when expanded and delirium is active', async () => {
    const deliriumState = createDeliriumState(['land', 'creature', 'artifact', 'instant'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    // Success message should not be visible when collapsed
    expect(screen.queryByText('🎯 Delirium is active!')).not.toBeInTheDocument()

    // Expand the tracker
    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    await user.click(toggleButton)

    // Now success message should be visible
    expect(
      screen.getByText('🎯 Delirium is active! You have 4+ card types in your graveyard.'),
    ).toBeInTheDocument()
  })

  test('selected card types have correct visual styling when expanded', async () => {
    const deliriumState = createDeliriumState(['land', 'creature'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    // Expand first
    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    await user.click(toggleButton)

    const landButton = screen.getByRole('button', { name: 'Land' })
    const creatureButton = screen.getByRole('button', { name: 'Creature' })
    const artifactButton = screen.getByRole('button', { name: 'Artifact' })

    // Selected buttons should have aria-pressed="true"
    expect(landButton).toHaveAttribute('aria-pressed', 'true')
    expect(creatureButton).toHaveAttribute('aria-pressed', 'true')

    // Non-selected buttons should have aria-pressed="false"
    expect(artifactButton).toHaveAttribute('aria-pressed', 'false')
  })

  test('clicking card type buttons calls onToggleCardType when expanded', async () => {
    const deliriumState = createDeliriumState()

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    // First expand the tracker
    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    await user.click(toggleButton)

    const landButton = screen.getByRole('button', { name: 'Land' })
    const creatureButton = screen.getByRole('button', { name: 'Creature' })

    await user.click(landButton)
    expect(mockOnToggleCardType).toHaveBeenCalledWith('land')

    await user.click(creatureButton)
    expect(mockOnToggleCardType).toHaveBeenCalledWith('creature')

    expect(mockOnToggleCardType).toHaveBeenCalledTimes(2)
  })

  test('all card type buttons are clickable when expanded', async () => {
    const deliriumState = createDeliriumState()

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    // First expand the tracker
    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    await user.click(toggleButton)

    const cardTypeButtons = [
      'Land',
      'Creature',
      'Artifact',
      'Enchantment',
      'Instant',
      'Sorcery',
      'Planeswalker',
      'Battle',
    ]

    for (const cardTypeName of cardTypeButtons) {
      const button = screen.getByRole('button', { name: cardTypeName })
      await user.click(button)
    }

    expect(mockOnToggleCardType).toHaveBeenCalledTimes(8)

    // Verify each card type was called with correct parameter
    const expectedCallParams: CardType[] = [
      'land',
      'creature',
      'artifact',
      'enchantment',
      'instant',
      'sorcery',
      'planeswalker',
      'battle',
    ]

    expectedCallParams.forEach((cardType, index) => {
      expect(mockOnToggleCardType).toHaveBeenNthCalledWith(index + 1, cardType)
    })
  })

  test('toggle button chevron rotates correctly', async () => {
    const deliriumState = createDeliriumState()

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    const chevron = toggleButton.querySelector('svg')

    // Initially should not be rotated
    expect(chevron).not.toHaveClass('rotate-180')

    // Click to expand
    await user.click(toggleButton)
    expect(chevron).toHaveClass('rotate-180')

    // Click to collapse
    await user.click(toggleButton)
    expect(chevron).not.toHaveClass('rotate-180')
  })

  test('status indicator has correct styling for inactive state', () => {
    const deliriumState = createDeliriumState(['land', 'creature'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    const statusIndicator = screen.getByText('2/4 types')
    expect(statusIndicator).toHaveClass('bg-slate-600', 'text-slate-300')
    expect(statusIndicator).not.toHaveClass('bg-green-600', 'text-white')
  })

  test('status indicator has correct styling for active state', () => {
    const deliriumState = createDeliriumState(['land', 'creature', 'artifact', 'instant'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    const statusIndicator = screen.getByText('4/4 types - ACTIVE')
    expect(statusIndicator).toHaveClass('bg-green-600', 'text-white')
    expect(statusIndicator).not.toHaveClass('bg-slate-600', 'text-slate-300')
  })

  test('component renders with proper accessibility attributes', () => {
    const deliriumState = createDeliriumState(['land', 'creature'])

    render(
      <DeliriumTracker deliriumState={deliriumState} onToggleCardType={mockOnToggleCardType} />,
    )

    // Check toggle button accessibility
    const toggleButton = screen.getByRole('button', { name: /Toggle delirium tracker/ })
    expect(toggleButton).toHaveAttribute('aria-expanded')
    expect(toggleButton).toHaveAttribute('aria-controls', 'delirium-content')

    // Check heading
    expect(screen.getByRole('heading', { name: 'Delirium Tracker' })).toBeInTheDocument()
  })
})
