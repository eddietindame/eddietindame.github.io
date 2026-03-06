import { renderHook, act } from '@testing-library/react'
import { useGameState } from './useGameState'
import { CardType } from './types'

describe('useGameState - Delirium Functionality', () => {
  test('initial delirium state is empty and inactive', () => {
    const { result } = renderHook(() => useGameState())

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(0)
    expect(result.current.deckState.delirium.isActive).toBe(false)
  })

  test('toggleCardTypeInGraveyard adds new card type', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.toggleCardTypeInGraveyard('land')
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.has('land')).toBe(true)
    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(1)
    expect(result.current.deckState.delirium.isActive).toBe(false)
  })

  test('toggleCardTypeInGraveyard removes existing card type', () => {
    const { result } = renderHook(() => useGameState())

    // Add a card type
    act(() => {
      result.current.toggleCardTypeInGraveyard('land')
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.has('land')).toBe(true)

    // Remove the same card type
    act(() => {
      result.current.toggleCardTypeInGraveyard('land')
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.has('land')).toBe(false)
    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(0)
  })

  test('delirium becomes active with 4 card types', () => {
    const { result } = renderHook(() => useGameState())

    const cardTypes: CardType[] = ['land', 'creature', 'artifact', 'instant']

    // Add 4 different card types
    act(() => {
      cardTypes.forEach(type => {
        result.current.toggleCardTypeInGraveyard(type)
      })
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(4)
    expect(result.current.deckState.delirium.isActive).toBe(true)

    // Verify all types are present
    cardTypes.forEach(type => {
      expect(result.current.deckState.delirium.cardTypesInGraveyard.has(type)).toBe(true)
    })
  })

  test('delirium remains active with more than 4 card types', () => {
    const { result } = renderHook(() => useGameState())

    const cardTypes: CardType[] = ['land', 'creature', 'artifact', 'instant', 'sorcery']

    // Add 5 different card types
    act(() => {
      cardTypes.forEach(type => {
        result.current.toggleCardTypeInGraveyard(type)
      })
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(5)
    expect(result.current.deckState.delirium.isActive).toBe(true)
  })

  test('delirium becomes inactive when dropping below 4 card types', () => {
    const { result } = renderHook(() => useGameState())

    const cardTypes: CardType[] = ['land', 'creature', 'artifact', 'instant']

    // Add 4 card types to activate delirium
    act(() => {
      cardTypes.forEach(type => {
        result.current.toggleCardTypeInGraveyard(type)
      })
    })

    expect(result.current.deckState.delirium.isActive).toBe(true)

    // Remove one card type
    act(() => {
      result.current.toggleCardTypeInGraveyard('land')
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(3)
    expect(result.current.deckState.delirium.isActive).toBe(false)
  })

  test('all 8 card types can be tracked', () => {
    const { result } = renderHook(() => useGameState())

    const allCardTypes: CardType[] = [
      'land',
      'creature',
      'artifact',
      'enchantment',
      'instant',
      'sorcery',
      'planeswalker',
      'battle',
    ]

    // Add all 8 card types
    act(() => {
      allCardTypes.forEach(type => {
        result.current.toggleCardTypeInGraveyard(type)
      })
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(8)
    expect(result.current.deckState.delirium.isActive).toBe(true)

    // Verify all types are present
    allCardTypes.forEach(type => {
      expect(result.current.deckState.delirium.cardTypesInGraveyard.has(type)).toBe(true)
    })
  })

  test('resetGame clears delirium state', () => {
    const { result } = renderHook(() => useGameState())

    // Add some card types
    act(() => {
      result.current.toggleCardTypeInGraveyard('land')
      result.current.toggleCardTypeInGraveyard('creature')
      result.current.toggleCardTypeInGraveyard('artifact')
      result.current.toggleCardTypeInGraveyard('instant')
    })

    expect(result.current.deckState.delirium.isActive).toBe(true)
    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(4)

    // Reset game
    act(() => {
      result.current.resetGame()
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(0)
    expect(result.current.deckState.delirium.isActive).toBe(false)
  })

  test('delirium state is independent of zone updates', () => {
    const { result } = renderHook(() => useGameState())

    // Add card types to delirium
    act(() => {
      result.current.toggleCardTypeInGraveyard('land')
      result.current.toggleCardTypeInGraveyard('creature')
    })

    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(2)

    // Update zone totals - delirium should be unaffected
    act(() => {
      result.current.updateZone('graveyard', 'total', 5)
    })

    expect(result.current.deckState.graveyard.total).toBe(5)
    expect(result.current.deckState.delirium.cardTypesInGraveyard.size).toBe(2)
    expect(result.current.deckState.delirium.cardTypesInGraveyard.has('land')).toBe(true)
    expect(result.current.deckState.delirium.cardTypesInGraveyard.has('creature')).toBe(true)
  })
})
