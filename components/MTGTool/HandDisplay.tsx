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
      className="bg-red-500 p-3 text-base font-bold text-white transition-all hover:bg-red-600"
      aria-label="Discard a card from hand to graveyard"
      disabled={handSize === 0}
    >
      Discard
    </button>
    <div className="bg-gray-200 p-2 text-center text-white" role="status" aria-live="polite">
      <div className="text-sm font-medium">Hand</div>
      <div className="text-lg font-bold" aria-label={`Hand size: ${handSize} cards`}>
        {handSize}
      </div>
    </div>
    <button
      onClick={() => onUpdateZone('deck', 'total', deckState.deck.total - 1)}
      className="bg-green-600 p-3 text-base font-bold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      aria-label="Draw a card from deck to hand"
    >
      Draw Card
    </button>
  </div>
)
