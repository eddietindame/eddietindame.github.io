import React, { useEffect, useRef } from 'react'
import { useGameState } from './useGameState'
import { ZoneCard } from './ZoneCard'
import { HandDisplay } from './HandDisplay'
import { GraveyardPermanents } from './GraveyardPermanents'
import { QuickActions } from './QuickActions'
import { useDebouncedDifference } from 'components/MTGTool/useDebouncedDifference'

export const MTGTool: React.FC = () => {
  const { deckState, exileFromHand, handSize, updateZone, resetGame, toggleExileMode } =
    useGameState()
  const {
    addDifference,
    getPositiveDifference,
    getNegativeDifference,
    hasPositiveDifference,
    hasNegativeDifference,
    isPositiveFading,
    isNegativeFading,
  } = useDebouncedDifference()

  // Track previous state to detect actual changes
  const prevDeckState = useRef(deckState)
  const pendingUpdates = useRef<Map<string, number>>(new Map())

  // Detect actual state changes and show tooltips only when values actually change
  useEffect(() => {
    const prev = prevDeckState.current
    const current = deckState

    // Check each zone and field for actual changes
    Object.keys(current).forEach(zoneKey => {
      const zone = zoneKey as keyof typeof current
      Object.keys(current[zone]).forEach(fieldKey => {
        const field = fieldKey as keyof (typeof current)[typeof zone]
        const key = `${zone}-${field}`
        const prevValue = prev[zone][field] || 0
        const currentValue = current[zone][field] || 0
        const actualDifference = currentValue - prevValue

        if (actualDifference !== 0 && pendingUpdates.current.has(key)) {
          addDifference(key, actualDifference)
          pendingUpdates.current.delete(key)
        }
      })
    })

    prevDeckState.current = current
  }, [deckState, addDifference])

  const handleZoneUpdate = (
    zone: keyof typeof deckState,
    field: keyof (typeof deckState)[keyof typeof deckState],
    value: number,
  ) => {
    const key = `${zone}-${field}`
    const currentValue = deckState[zone][field] || 0
    const intendedDifference = value - currentValue

    // Only track this update if it would actually change something
    if (intendedDifference !== 0) {
      pendingUpdates.current.set(key, intendedDifference)
    }

    updateZone(zone, field, value)
  }

  return (
    <div className="flex h-full flex-col" role="application" aria-label="MTG Card Counter Tool">
      <div className="flex flex-1 flex-col">
        <ZoneCard
          title="Deck"
          zone={deckState.deck}
          onUpdate={(field, value) => handleZoneUpdate('deck', field, value)}
          className="flex-1 bg-slate-50"
          getPositiveDifference={getPositiveDifference}
          getNegativeDifference={getNegativeDifference}
          hasPositiveDifference={hasPositiveDifference}
          hasNegativeDifference={hasNegativeDifference}
          isPositiveFading={isPositiveFading}
          isNegativeFading={isNegativeFading}
          zoneKey="deck"
        />

        <HandDisplay handSize={handSize} />

        <ZoneCard
          title="Graveyard"
          zone={deckState.graveyard}
          onUpdate={(field, value) => handleZoneUpdate('graveyard', field, value)}
          className="flex-1 bg-green-500"
          getPositiveDifference={getPositiveDifference}
          getNegativeDifference={getNegativeDifference}
          hasPositiveDifference={hasPositiveDifference}
          hasNegativeDifference={hasNegativeDifference}
          isPositiveFading={isPositiveFading}
          isNegativeFading={isNegativeFading}
          zoneKey="graveyard"
        />

        <GraveyardPermanents
          graveyard={deckState.graveyard}
          onUpdate={(field, value) => handleZoneUpdate('graveyard', field, value)}
          getPositiveDifference={getPositiveDifference}
          getNegativeDifference={getNegativeDifference}
          hasPositiveDifference={hasPositiveDifference}
          hasNegativeDifference={hasNegativeDifference}
          isPositiveFading={isPositiveFading}
          isNegativeFading={isNegativeFading}
        />

        <ZoneCard
          title="Exile"
          zone={deckState.exile}
          onUpdate={(field, value) => handleZoneUpdate('exile', field, value)}
          className="flex-1 bg-blue-500 text-white"
          getPositiveDifference={getPositiveDifference}
          getNegativeDifference={getNegativeDifference}
          hasPositiveDifference={hasPositiveDifference}
          hasNegativeDifference={hasNegativeDifference}
          isPositiveFading={isPositiveFading}
          isNegativeFading={isNegativeFading}
          zoneKey="exile"
        />
      </div>

      <QuickActions
        deckState={deckState}
        exileFromHand={exileFromHand}
        onUpdateZone={handleZoneUpdate}
        onToggleExileMode={toggleExileMode}
        onReset={resetGame}
      />
    </div>
  )
}
