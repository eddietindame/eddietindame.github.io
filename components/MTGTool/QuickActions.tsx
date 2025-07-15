import React from 'react'
import { DeckState, CardZone } from './types'

interface QuickActionsProps {
  deckState: DeckState
  exileFromHand: boolean
  onUpdateZone: (zone: keyof DeckState, field: keyof CardZone, value: number) => void
  onToggleExileMode: () => void
  onReset: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  deckState,
  exileFromHand,
  onUpdateZone,
  onToggleExileMode,
  onReset,
}) => (
  <div className="grid grid-cols-3" role="group" aria-label="Quick actions">
    <button
      onClick={() => onUpdateZone('deck', 'total', deckState.deck.total - 1)}
      className="bg-red-500 p-3 text-base font-bold text-white transition-all hover:bg-red-600"
      aria-label="Draw a card from deck to hand"
    >
      Draw Card
    </button>
    <button
      onClick={onToggleExileMode}
      className={`p-3 text-xs font-bold text-white transition-all ${
        exileFromHand ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
      }`}
      aria-label={`Toggle exile mode. Currently: ${exileFromHand ? 'Exile from hand' : 'Exile from graveyard'}`}
      aria-pressed={exileFromHand}
    >
      {exileFromHand ? 'Hand→Exile' : 'GY→Exile'}
    </button>
    <button
      onClick={onReset}
      className="bg-gray-500 p-3 text-base font-bold text-white transition-all hover:bg-gray-600"
      aria-label="Reset game to initial state"
    >
      Reset Game
    </button>
  </div>
)
