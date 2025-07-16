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
  const prevHandSize = useRef(handSize)
  const pendingUpdates = useRef<Map<string, number>>(new Map())

  // Detect actual state changes and show tooltips only when values actually change
  useEffect(() => {
    const prev = prevDeckState.current
    const current = deckState
    const prevHand = prevHandSize.current
    const currentHand = handSize

    // Check for hand size changes
    if (currentHand !== prevHand) {
      const handDifference = currentHand - prevHand
      if (handDifference !== 0) {
        addDifference('hand-size', handDifference)
      }
    }

    // Check each zone and field for actual changes
    Object.keys(current).forEach(zoneKey => {
      const zone = zoneKey as keyof typeof current
      Object.keys(current[zone]).forEach(fieldKey => {
        const field = fieldKey as keyof (typeof current)[typeof zone]
        const key = `${zone}-${field}`
        const prevValue = prev[zone][field] || 0
        const currentValue = current[zone][field] || 0
        const actualDifference = currentValue - prevValue

        if (actualDifference !== 0) {
          // Check if this change was tracked as a pending update
          if (pendingUpdates.current.has(key)) {
            addDifference(key, actualDifference)
            pendingUpdates.current.delete(key)
          } else {
            // This is a side effect change - check if it's graveyard changes from exile
            if (zone === 'graveyard' && actualDifference < 0) {
              // Graveyard decreased - this could be from exile
              const exileChange = current.exile.total - prev.exile.total
              if (exileChange > 0) {
                // Exile increased and graveyard decreased - show graveyard tooltip
                addDifference(key, actualDifference)
              }
            }
          }
        }
      })
    })

    prevDeckState.current = current
    prevHandSize.current = currentHand
  }, [deckState, handSize, addDifference])

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
    <div
      className="flex h-full flex-col bg-slate-900"
      role="application"
      aria-label="MTG Card Counter Tool"
    >
      <div className="flex flex-1 flex-col">
        <ZoneCard
          title="Deck"
          zone={deckState.deck}
          onUpdate={(field, value) => handleZoneUpdate('deck', field, value)}
          className="flex-1 border-b border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-white"
          getPositiveDifference={getPositiveDifference}
          getNegativeDifference={getNegativeDifference}
          hasPositiveDifference={hasPositiveDifference}
          hasNegativeDifference={hasNegativeDifference}
          isPositiveFading={isPositiveFading}
          isNegativeFading={isNegativeFading}
          zoneKey="deck"
        />

        <ZoneCard
          title="Graveyard"
          zone={deckState.graveyard}
          onUpdate={(field, value) => handleZoneUpdate('graveyard', field, value)}
          className="flex-1 border-b border-emerald-600 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white"
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
          className="flex-1 border-b border-purple-600 bg-gradient-to-br from-purple-700 to-purple-800 text-white"
          getPositiveDifference={getPositiveDifference}
          getNegativeDifference={getNegativeDifference}
          hasPositiveDifference={hasPositiveDifference}
          hasNegativeDifference={hasNegativeDifference}
          isPositiveFading={isPositiveFading}
          isNegativeFading={isNegativeFading}
          zoneKey="exile"
        />
      </div>

      <HandDisplay
        handSize={handSize}
        deckState={deckState}
        onUpdateZone={handleZoneUpdate}
        getPositiveDifference={getPositiveDifference}
        getNegativeDifference={getNegativeDifference}
        hasPositiveDifference={hasPositiveDifference}
        hasNegativeDifference={hasNegativeDifference}
        isPositiveFading={isPositiveFading}
        isNegativeFading={isNegativeFading}
      />

      <QuickActions
        exileFromHand={exileFromHand}
        onToggleExileMode={toggleExileMode}
        onReset={resetGame}
      />
    </div>
  )
}
