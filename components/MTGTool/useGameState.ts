import { useState } from 'react'
import { DeckState, initialDeckState, CardType, CardZone, CardZones } from './types'

export const useGameState = () => {
  const [deckState, setDeckState] = useState<DeckState>(initialDeckState)
  const [exileFromHandOrPlay, setExileFromHandOrPlay] = useState(false)

  const updateZone = (
    zone: keyof CardZones,
    field: keyof CardZone,
    value: number,
    fromHandOrPlay = false,
  ) => {
    setDeckState(prev => {
      // Handle graveyard permanents specially
      if (zone === 'graveyard' && field === 'permanents') {
        return handleGraveyardPermanentsUpdate(prev, value)
      }

      // Handle zone total updates
      if (field === 'total') {
        return handleZoneTotalUpdate(prev, zone, value, fromHandOrPlay)
      }

      // Default case - direct update
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
    const graveyardDifference = value - (prev.graveyard.permanents || 0)

    // If increasing permanents, also increase graveyard total and decrease deck
    if (graveyardDifference > 0) {
      return {
        ...prev,
        deck: {
          ...prev.deck,
          total: prev.deck.total - graveyardDifference,
        },
        graveyard: {
          ...prev.graveyard,
          permanents: value,
          total: prev.graveyard.total + graveyardDifference,
        },
      }
    }

    // If decreasing permanents, don't change graveyard total (cards stay in graveyard)
    return {
      ...prev,
      graveyard: {
        ...prev.graveyard,
        permanents: value,
      },
    }
  }

  const handleZoneTotalUpdate = (
    prev: DeckState,
    zone: keyof CardZones,
    value: number,
    fromHandOrPlay = false,
  ) => {
    const zoneData = prev[zone] as CardZone
    const difference = value - zoneData.total

    if (zone === 'graveyard') {
      return handleGraveyardTotalUpdate(prev, value, difference, fromHandOrPlay)
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
    fromHandOrPlay = false,
  ) => {
    if (fromHandOrPlay && difference > 0) {
      // Discard from hand/play - no deck change needed since hand/play is calculated
      return {
        ...prev,
        graveyard: { ...prev.graveyard, total: value },
      }
    }

    if (difference < 0) {
      // Removing from graveyard - goes back to deck (undo mill)
      const cardsToMove = -difference // Convert negative difference to positive
      const maxDeckSize = initialDeckState.deck.total
      const availableDeckSpace = maxDeckSize - prev.deck.total

      // Don't allow any operation if deck is at maximum
      if (availableDeckSpace <= 0) {
        return prev // No space in deck, don't allow the operation
      }

      // Only move as many cards as there's space for
      const actualCardsToMove = Math.min(cardsToMove, availableDeckSpace)

      // Calculate the new graveyard total based on what we can actually move
      const newGraveyardTotal = prev.graveyard.total - actualCardsToMove

      return {
        ...prev,
        deck: {
          ...prev.deck,
          total: prev.deck.total + actualCardsToMove,
        },
        graveyard: {
          ...prev.graveyard,
          total: newGraveyardTotal,
          permanents: Math.max(0, (prev.graveyard.permanents || 0) - actualCardsToMove),
        },
      }
    }

    // Adding to graveyard from deck (mill)
    return {
      ...prev,
      deck: { ...prev.deck, total: prev.deck.total - difference },
      graveyard: { ...prev.graveyard, total: value },
    }
  }

  const handleDeckTotalUpdate = (prev: DeckState, value: number, difference: number) => {
    if (difference > 0) {
      // Adding to deck - take from hand/play only
      const handOrPlayCount =
        initialDeckState.deck.total - prev.deck.total - prev.graveyard.total - prev.exile.total
      if (handOrPlayCount < difference) return prev

      return {
        ...prev,
        deck: { ...prev.deck, total: value },
      }
    }

    // Removing from deck (draw) - goes to hand/play (calculated automatically)
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
    if (exileFromHandOrPlay) {
      return handleExileFromHandOrPlay(prev, value, difference)
    } else {
      return handleExileFromGraveyard(prev, value, difference)
    }
  }

  const handleExileFromHandOrPlay = (prev: DeckState, value: number, difference: number) => {
    const handOrPlayCount =
      initialDeckState.deck.total - prev.deck.total - prev.graveyard.total - prev.exile.total
    if (handOrPlayCount < difference) return prev

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
    setExileFromHandOrPlay(false)
  }

  const toggleExileMode = () => {
    setExileFromHandOrPlay(!exileFromHandOrPlay)
  }

  const toggleCardTypeInGraveyard = (cardType: CardType) => {
    setDeckState(prev => {
      const newCardTypes = new Set(prev.delirium.cardTypesInGraveyard)

      if (newCardTypes.has(cardType)) {
        newCardTypes.delete(cardType)
      } else {
        newCardTypes.add(cardType)
      }

      const isActive = newCardTypes.size >= 4

      return {
        ...prev,
        delirium: {
          cardTypesInGraveyard: newCardTypes,
          isActive,
        },
      }
    })
  }

  const handOrPlayCount =
    initialDeckState.deck.total -
    deckState.deck.total -
    deckState.graveyard.total -
    deckState.exile.total

  return {
    deckState,
    exileFromHandOrPlay,
    handOrPlayCount,
    updateZone,
    resetGame,
    toggleExileMode,
    toggleCardTypeInGraveyard,
  }
}
