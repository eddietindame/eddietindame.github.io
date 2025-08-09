import { useState } from 'react'
import { DeckState, CardZone, initialDeckState } from './types'

export const useGameState = () => {
  const [deckState, setDeckState] = useState<DeckState>(initialDeckState)
  const [exileFromHand, setExileFromHand] = useState(false)

  const updateZone = (
    zone: keyof DeckState,
    field: keyof CardZone,
    value: number,
    fromHand = false,
  ) => {
    setDeckState(prev => {
      // Basic validation
      if (value < 0) return prev
      if (field === 'total' && value > initialDeckState.deck.total) return prev
      if (field === 'permanents' && zone !== 'graveyard' && value > prev[zone].total) return prev

      // Handle graveyard permanents specially
      if (zone === 'graveyard' && field === 'permanents') {
        return handleGraveyardPermanentsUpdate(prev, value)
      }

      // Handle zone total updates
      if (field === 'total') {
        return handleZoneTotalUpdate(prev, zone, value, fromHand)
      }

      // Default case - simple field update
      return {
        ...prev,
        [zone]: {
          ...prev[zone],
          [field]: value,
        },
      }
    })
  }

  const handleGraveyardPermanentsUpdate = (prev: DeckState, value: number) => {
    const currentTotal = prev.graveyard.total
    const newTotal = Math.max(currentTotal, value)
    const totalDifference = newTotal - currentTotal

    return {
      ...prev,
      deck: {
        ...prev.deck,
        total: prev.deck.total - totalDifference,
      },
      graveyard: {
        ...prev.graveyard,
        total: newTotal,
        permanents: value,
      },
    }
  }

  const handleZoneTotalUpdate = (
    prev: DeckState,
    zone: keyof DeckState,
    value: number,
    fromHand = false,
  ) => {
    const currentValue = prev[zone].total
    const difference = value - currentValue

    if (zone === 'graveyard') {
      return handleGraveyardTotalUpdate(prev, value, difference, fromHand)
    } else if (zone === 'deck') {
      return handleDeckTotalUpdate(prev, value, difference)
    } else if (zone === 'exile') {
      return handleExileTotalUpdate(prev, value, difference)
    }

    return prev
  }

  const handleGraveyardTotalUpdate = (
    prev: DeckState,
    value: number,
    difference: number,
    fromHand = false,
  ) => {
    if (fromHand && difference > 0) {
      // Discard from hand - no deck change needed since hand is calculated
      return {
        ...prev,
        graveyard: {
          ...prev.graveyard,
          total: value,
          permanents: Math.min(prev.graveyard.permanents || 0, value),
        },
      }
    }

    // Mill from deck (plus button or other cases)
    return {
      ...prev,
      deck: {
        ...prev.deck,
        total: prev.deck.total - difference,
      },
      graveyard: {
        ...prev.graveyard,
        total: value,
        permanents: Math.min(prev.graveyard.permanents || 0, value),
      },
    }
  }

  const handleDeckTotalUpdate = (prev: DeckState, value: number, difference: number) => {
    if (difference > 0) {
      // Adding to deck - take from hand only
      const handSize =
        initialDeckState.deck.total - prev.deck.total - prev.graveyard.total - prev.exile.total
      if (handSize < difference) return prev
    }

    return {
      ...prev,
      deck: { ...prev.deck, total: value },
    }
  }

  const handleExileTotalUpdate = (prev: DeckState, value: number, difference: number) => {
    if (difference < 0) {
      // Removing from exile - goes to graveyard
      return {
        ...prev,
        graveyard: {
          ...prev.graveyard,
          total: prev.graveyard.total - difference,
        },
        exile: { ...prev.exile, total: value },
      }
    }

    // Adding to exile - check mode
    if (exileFromHand) {
      return handleExileFromHand(prev, value, difference)
    } else {
      return handleExileFromGraveyard(prev, value, difference)
    }
  }

  const handleExileFromHand = (prev: DeckState, value: number, difference: number) => {
    const handSize =
      initialDeckState.deck.total - prev.deck.total - prev.graveyard.total - prev.exile.total
    if (handSize < difference) return prev

    return {
      ...prev,
      exile: { ...prev.exile, total: value },
    }
  }

  const handleExileFromGraveyard = (prev: DeckState, value: number, difference: number) => {
    if (prev.graveyard.total < difference) return prev

    return {
      ...prev,
      graveyard: {
        ...prev.graveyard,
        total: prev.graveyard.total - difference,
        permanents: Math.max(0, (prev.graveyard.permanents || 0) - difference),
      },
      exile: { ...prev.exile, total: value },
    }
  }

  const resetGame = () => {
    setDeckState(initialDeckState)
  }

  const toggleExileMode = () => {
    setExileFromHand(!exileFromHand)
  }

  const handSize =
    initialDeckState.deck.total -
    deckState.deck.total -
    deckState.graveyard.total -
    deckState.exile.total

  return {
    deckState,
    exileFromHand,
    handSize,
    updateZone,
    resetGame,
    toggleExileMode,
  }
}
