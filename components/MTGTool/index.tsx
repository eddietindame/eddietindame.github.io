import React from 'react'
import { useGameState } from './useGameState'
import { ZoneCard } from './ZoneCard'
import { HandDisplay } from './HandDisplay'
import { GraveyardPermanents } from './GraveyardPermanents'
import { QuickActions } from './QuickActions'

export const MTGTool: React.FC = () => {
  const { deckState, exileFromHand, handSize, updateZone, resetGame, toggleExileMode } =
    useGameState()

  return (
    <div className="flex h-full flex-col" role="application" aria-label="MTG Card Counter Tool">
      <div className="flex flex-1 flex-col">
        <ZoneCard
          title="Deck"
          zone={deckState.deck}
          onUpdate={(field, value) => updateZone('deck', field, value)}
          className="flex-1 bg-slate-50"
        />

        <HandDisplay handSize={handSize} />

        <ZoneCard
          title="Graveyard"
          zone={deckState.graveyard}
          onUpdate={(field, value) => updateZone('graveyard', field, value)}
          className="flex-1 bg-green-500"
        />

        <GraveyardPermanents
          graveyard={deckState.graveyard}
          onUpdate={(field, value) => updateZone('graveyard', field, value)}
        />

        <ZoneCard
          title="Exile"
          zone={deckState.exile}
          onUpdate={(field, value) => updateZone('exile', field, value)}
          className="flex-1 bg-blue-500 text-white"
        />
      </div>

      <QuickActions
        deckState={deckState}
        exileFromHand={exileFromHand}
        onUpdateZone={updateZone}
        onToggleExileMode={toggleExileMode}
        onReset={resetGame}
      />
    </div>
  )
}
