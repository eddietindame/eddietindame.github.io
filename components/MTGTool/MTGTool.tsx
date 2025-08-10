import React, { useEffect, useRef } from 'react'
import { useGameState } from './useGameState'
import { ZoneCard } from './ZoneCard'
import { HandOrPlayDisplay } from './HandOrPlayDisplay'
import { GraveyardPermanents } from './GraveyardPermanents'
import { QuickActions } from './QuickActions'
import { DeliriumTracker } from './DeliriumTracker'
import { useDebouncedDifference } from 'components/MTGTool/useDebouncedDifference'
import { CardZone, CardZones } from './types'

export const MTGTool: React.FC = () => {
  const {
    deckState,
    exileFromHandOrPlay,
    handOrPlayCount,
    updateZone,
    resetGame,
    toggleExileMode,
    toggleCardTypeInGraveyard,
  } = useGameState()
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
  const prevHandOrPlayCount = useRef(handOrPlayCount)

  // Detect actual state changes and show tooltips only when values actually change
  useEffect(() => {
    const prevHandOrPlay = prevHandOrPlayCount.current
    const currentHandOrPlay = handOrPlayCount

    // Check for hand/play size changes
    if (currentHandOrPlay !== prevHandOrPlay) {
      const handOrPlayDifference = currentHandOrPlay - prevHandOrPlay
      if (handOrPlayDifference !== 0) {
        addDifference('hand-or-play-size', handOrPlayDifference)
      }
    }

    // Check for zone changes (only card zones, not delirium)
    ;(['deck', 'graveyard', 'exile'] as const).forEach(zoneName => {
      const zone = deckState[zoneName]
      const prevZone = prevDeckState.current[zoneName]

      // Check zone total changes
      if (zone.total !== prevZone.total) {
        const difference = zone.total - prevZone.total
        if (difference !== 0) {
          addDifference(`${zoneName}-total`, difference)
        }
      }

      // Check permanents changes for graveyard
      if (zoneName === 'graveyard' && 'permanents' in zone && 'permanents' in prevZone) {
        const graveyardZone = zone as { total: number; permanents: number }
        const prevGraveyardZone = prevZone as { total: number; permanents: number }

        if (graveyardZone.permanents !== prevGraveyardZone.permanents) {
          const difference = graveyardZone.permanents - prevGraveyardZone.permanents
          if (difference !== 0) {
            addDifference('graveyard-permanents', difference)
          }
        }
      }
    })

    // Update previous values for next comparison
    prevDeckState.current = { ...deckState }
    prevHandOrPlayCount.current = currentHandOrPlay
  }, [deckState, handOrPlayCount, addDifference])

  const handleZoneUpdate = (
    zone: keyof CardZones,
    field: keyof CardZone,
    value: number,
    fromHandOrPlay = false,
  ) => {
    updateZone(zone, field, value, fromHandOrPlay)
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

      <HandOrPlayDisplay
        handOrPlayCount={handOrPlayCount}
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
        exileFromHandOrPlay={exileFromHandOrPlay}
        onToggleExileMode={toggleExileMode}
        onReset={resetGame}
      />

      <DeliriumTracker
        deliriumState={deckState.delirium}
        onToggleCardType={toggleCardTypeInGraveyard}
      />
    </div>
  )
}
