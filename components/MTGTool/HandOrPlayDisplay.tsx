import SpinningNumber from 'react-spinning-number'
import { CardZone } from 'components/MTGTool/types'
import { DeckState } from 'components/MTGTool/types'
import { DifferenceTooltip } from './DifferenceTooltip'
import React from 'react'

interface HandOrPlayDisplayProps {
  handOrPlayCount: number
  deckState: DeckState
  onUpdateZone: (
    zone: keyof DeckState,
    field: keyof CardZone,
    value: number,
    fromHandOrPlay?: boolean,
  ) => void
  getPositiveDifference: (key: string) => number
  getNegativeDifference: (key: string) => number
  hasPositiveDifference: (key: string) => boolean
  hasNegativeDifference: (key: string) => boolean
  isPositiveFading: (key: string) => boolean
  isNegativeFading: (key: string) => boolean
}

export const HandOrPlayDisplay: React.FC<HandOrPlayDisplayProps> = ({
  handOrPlayCount,
  deckState,
  onUpdateZone,
  getPositiveDifference,
  getNegativeDifference,
  hasPositiveDifference,
  hasNegativeDifference,
  isPositiveFading,
  isNegativeFading,
}) => {
  const handleDiscard = () => {
    if (handOrPlayCount > 0) {
      onUpdateZone('graveyard', 'total', deckState.graveyard.total + 1, true)
    }
  }

  const handleDraw = () => {
    if (deckState.deck.total > 0) {
      onUpdateZone('deck', 'total', deckState.deck.total - 1)
    }
  }

  return (
    <div className="grid grid-cols-3">
      <button
        onClick={handleDiscard}
        className="bg-gradient-to-r from-red-500 to-pink-500 p-3 text-base font-bold text-white transition-all hover:from-red-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Discard a card from hand/play to graveyard"
        disabled={handOrPlayCount === 0}
      >
        Discard
      </button>

      <div
        className="bg-gradient-to-b from-gray-100 to-gray-300 p-2 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="text-sm font-medium text-gray-700">Hand/Play</div>
        <div
          className="flex justify-center text-lg font-bold text-gray-900"
          aria-label={`Hand/Play size: ${handOrPlayCount} cards`}
        >
          <span className="relative">
            <SpinningNumber
              fontSize={1}
              duration={300}
              style={{ fontWeight: 'bold', color: '#111827' }}
            >
              {handOrPlayCount}
            </SpinningNumber>
            <DifferenceTooltip
              positiveDifference={getPositiveDifference('hand-or-play-size')}
              negativeDifference={getNegativeDifference('hand-or-play-size')}
              hasPositive={hasPositiveDifference('hand-or-play-size')}
              hasNegative={hasNegativeDifference('hand-or-play-size')}
              isPositiveFading={isPositiveFading('hand-or-play-size')}
              isNegativeFading={isNegativeFading('hand-or-play-size')}
              context="Hand/Play size"
            />
          </span>
        </div>
      </div>

      <button
        onClick={handleDraw}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 text-base font-bold text-white transition-all hover:from-blue-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Draw a card from deck to hand/play"
        disabled={deckState.deck.total === 0}
      >
        Draw
      </button>
    </div>
  )
}
