import React, { useState } from 'react'
import { cn } from 'lib/utils'

interface CardZone {
  total: number
  permanents?: number
}

interface DeckState {
  deck: CardZone
  graveyard: CardZone
  exile: CardZone
}

const initialDeckState: DeckState = {
  deck: { total: 99 },
  graveyard: { total: 0, permanents: 0 },
  exile: { total: 0 },
}

export const MTGTool: React.FC = () => {
  const [deckState, setDeckState] = useState<DeckState>(initialDeckState)
  const [exileFromHand, setExileFromHand] = useState(false)

  const updateZone = (zone: keyof DeckState, field: keyof CardZone, value: number) => {
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
        return handleZoneTotalUpdate(prev, zone, value)
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

  const handleZoneTotalUpdate = (prev: DeckState, zone: keyof DeckState, value: number) => {
    const currentValue = prev[zone].total
    const difference = value - currentValue

    if (zone === 'graveyard') {
      return handleGraveyardTotalUpdate(prev, value, difference)
    } else if (zone === 'deck') {
      return handleDeckTotalUpdate(prev, value, difference)
    } else if (zone === 'exile') {
      return handleExileTotalUpdate(prev, value, difference)
    }

    return prev
  }

  const handleGraveyardTotalUpdate = (prev: DeckState, value: number, difference: number) => {
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

  const handSize =
    initialDeckState.deck.total -
    deckState.deck.total -
    deckState.graveyard.total -
    deckState.exile.total

  return (
    <div className="flex h-full flex-col" role="application" aria-label="MTG Card Counter Tool">
      {/* Zone Cards - Vertical Stack */}
      <div className="flex flex-1 flex-col">
        <ZoneCard
          title="Deck"
          zone={deckState.deck}
          onUpdate={(field, value) => updateZone('deck', field, value)}
          className="flex-1 bg-slate-50"
          ariaLabel="Deck zone"
        />

        {/* Hand Size Display */}
        <div className="bg-gray-200 p-2 text-center text-white" role="status" aria-live="polite">
          <div className="text-sm font-medium">Hand</div>
          <div className="text-lg font-bold" aria-label={`Hand size: ${handSize} cards`}>
            {handSize}
          </div>
        </div>

        <ZoneCard
          title="Graveyard"
          zone={deckState.graveyard}
          onUpdate={(field, value) => updateZone('graveyard', field, value)}
          className="flex-1 bg-green-500"
          ariaLabel="Graveyard zone"
        />

        {/* Zone Details */}
        <div className="grid grid-cols-1">
          <div
            className="relative flex flex-col p-3"
            role="group"
            aria-labelledby="graveyard-permanents-title"
          >
            <h3 id="graveyard-permanents-title" className="mb-2 text-center text-sm font-bold">
              Graveyard Permanents
            </h3>
            <div className="flex flex-1 flex-col justify-center text-center">
              <div
                className="text-2xl font-bold"
                aria-label={`Graveyard permanents: ${deckState.graveyard.permanents || 0}`}
              >
                {deckState.graveyard.permanents || 0}
              </div>
              <div className="text-xs opacity-90">Permanents</div>
            </div>

            {/* Invisible clickable areas covering the entire card */}
            <button
              onClick={() =>
                updateZone('graveyard', 'permanents', (deckState.graveyard.permanents || 0) - 1)
              }
              className="hover:bg-opacity-10 absolute top-0 left-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
              aria-label="Decrease graveyard permanents"
            />
            <button
              onClick={() =>
                updateZone('graveyard', 'permanents', (deckState.graveyard.permanents || 0) + 1)
              }
              className="hover:bg-opacity-10 absolute top-0 right-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
              aria-label="Increase graveyard permanents"
            />
          </div>
        </div>

        <ZoneCard
          title="Exile"
          zone={deckState.exile}
          onUpdate={(field, value) => updateZone('exile', field, value)}
          className="flex-1 bg-blue-500 text-white"
          ariaLabel="Exile zone"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3" role="group" aria-label="Quick actions">
        <button
          onClick={() => {
            updateZone('deck', 'total', deckState.deck.total - 1)
          }}
          className="bg-red-500 p-3 text-base font-bold text-white transition-all hover:bg-red-600 active:scale-95"
          aria-label="Draw a card from deck to hand"
        >
          Draw Card
        </button>
        <button
          onClick={() => setExileFromHand(!exileFromHand)}
          className={`p-3 text-xs font-bold text-white transition-all active:scale-95 ${
            exileFromHand ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
          }`}
          aria-label={`Toggle exile mode. Currently: ${exileFromHand ? 'Exile from hand' : 'Exile from graveyard'}`}
          aria-pressed={exileFromHand}
        >
          {exileFromHand ? 'Hand→Exile' : 'GY→Exile'}
        </button>
        <button
          onClick={resetGame}
          className="bg-gray-500 p-3 text-base font-bold text-white transition-all hover:bg-gray-600 active:scale-95"
          aria-label="Reset game to initial state"
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}

interface ZoneCardProps {
  title: string
  zone: CardZone
  onUpdate: (field: keyof CardZone, value: number) => void
  className?: string
  ariaLabel: string
}

const ZoneCard: React.FC<ZoneCardProps> = ({ title, zone, onUpdate, className, ariaLabel }) => {
  return (
    <div
      className={cn('relative flex flex-col p-3 text-white', className)}
      role="group"
      aria-labelledby={`${title.toLowerCase()}-title`}
    >
      <h3 id={`${title.toLowerCase()}-title`} className="mb-2 text-center text-sm font-bold">
        {title}
      </h3>
      <div className="flex flex-1 flex-col justify-center text-center">
        <div className="text-2xl font-bold" aria-label={`${title} total: ${zone.total} cards`}>
          {zone.total}
        </div>
        <div className="text-xs opacity-90">Total Cards</div>
      </div>

      {/* Invisible clickable areas covering the entire card */}
      <button
        onClick={() => onUpdate('total', zone.total - 1)}
        className="hover:bg-opacity-10 absolute top-0 left-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
        aria-label={`Decrease ${title.toLowerCase()} total`}
      />
      <button
        onClick={() => onUpdate('total', zone.total + 1)}
        className="hover:bg-opacity-10 absolute top-0 right-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
        aria-label={`Increase ${title.toLowerCase()} total`}
      />
    </div>
  )
}

interface ZoneDetailsProps {
  title: string
  zone: CardZone
  onUpdate: (field: keyof CardZone, value: number) => void
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ title, zone, onUpdate }) => {
  const nonPermanents = zone.total - (zone.permanents || 0)

  return (
    <div className="bg-opacity-10 bg-white p-2 text-white">
      <h4 className="mb-2 text-sm font-bold">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="text-xs font-medium">Permanents</div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onUpdate('permanents', (zone.permanents || 0) - 1)}
              disabled={(zone.permanents || 0) <= 0}
              className="bg-red-500 p-1 text-xs text-white transition-all hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              -
            </button>
            <span className="text-sm font-bold">{zone.permanents || 0}</span>
            <button
              onClick={() => onUpdate('permanents', (zone.permanents || 0) + 1)}
              disabled={(zone.permanents || 0) >= 99}
              className="bg-green-500 p-1 text-xs text-white transition-all hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium">Non-Permanents</div>
          <div className="flex items-center justify-center">
            <span className="text-sm font-bold">{nonPermanents}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
