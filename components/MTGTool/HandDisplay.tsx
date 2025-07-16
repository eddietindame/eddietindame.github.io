import { CardZone } from 'components/MTGTool/types'
import { DeckState } from 'components/MTGTool/types'
import React from 'react'

interface HandDisplayProps {
  handSize: number
  deckState: DeckState
  onDiscardToGraveyard: (count?: number) => void
  onUpdateZone: (zone: keyof DeckState, field: keyof CardZone, value: number) => void
}

export const HandDisplay: React.FC<HandDisplayProps> = ({
  handSize,
  deckState,
  onDiscardToGraveyard,
  onUpdateZone,
}) => (
  <div className="grid grid-cols-3">
    <button
      onClick={() => onDiscardToGraveyard(1)}
      className="bg-gradient-to-r from-red-500 to-pink-500 p-3 text-base font-bold text-white transition-all hover:from-red-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Discard a card from hand to graveyard"
      disabled={handSize === 0}
    >
      Discard
    </button>

    <div
      className="bg-gradient-to-b from-gray-100 to-gray-300 p-2 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-sm font-medium text-gray-700">Hand</div>
      <div className="text-lg font-bold text-gray-900" aria-label={`Hand size: ${handSize} cards`}>
        {handSize}
      </div>
    </div>

    <button
      onClick={() => onUpdateZone('deck', 'total', deckState.deck.total - 1)}
      className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 text-base font-bold text-white transition-all hover:from-green-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Draw a card from deck to hand"
      disabled={deckState.deck.total <= 0}
    >
      Draw Card
    </button>
  </div>
)
