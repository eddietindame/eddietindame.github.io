import SpinningNumber from 'react-spinning-number'
import { CardZone } from 'components/MTGTool/types'
import { DeckState } from 'components/MTGTool/types'
import { DifferenceTooltip } from './DifferenceTooltip'
import React from 'react'

interface HandDisplayProps {
  handSize: number
  deckState: DeckState
  onDiscardToGraveyard: (count?: number) => void
  onUpdateZone: (zone: keyof DeckState, field: keyof CardZone, value: number) => void
  getPositiveDifference: (key: string) => number
  getNegativeDifference: (key: string) => number
  hasPositiveDifference: (key: string) => boolean
  hasNegativeDifference: (key: string) => boolean
  isPositiveFading: (key: string) => boolean
  isNegativeFading: (key: string) => boolean
}

export const HandDisplay: React.FC<HandDisplayProps> = ({
  handSize,
  deckState,
  onDiscardToGraveyard,
  onUpdateZone,
  getPositiveDifference,
  getNegativeDifference,
  hasPositiveDifference,
  hasNegativeDifference,
  isPositiveFading,
  isNegativeFading,
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
      <div
        className="flex justify-center text-lg font-bold text-gray-900"
        aria-label={`Hand size: ${handSize} cards`}
      >
        <span className="relative">
          <SpinningNumber
            fontSize={1}
            duration={300}
            style={{ fontWeight: 'bold', color: '#111827' }}
          >
            {handSize}
          </SpinningNumber>
          <DifferenceTooltip
            positiveDifference={getPositiveDifference('hand-size')}
            negativeDifference={getNegativeDifference('hand-size')}
            hasPositive={hasPositiveDifference('hand-size')}
            hasNegative={hasNegativeDifference('hand-size')}
            isPositiveFading={isPositiveFading('hand-size')}
            isNegativeFading={isNegativeFading('hand-size')}
          />
        </span>
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
