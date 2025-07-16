import React from 'react'
import { CardZone } from './types'
import { ButtonOverlay } from './ButtonOverlay'
import { DifferenceTooltip } from './DifferenceTooltip'

interface GraveyardPermanentsProps {
  graveyard: CardZone
  onUpdate: (field: keyof CardZone, value: number) => void
  getPositiveDifference: (key: string) => number
  getNegativeDifference: (key: string) => number
  hasPositiveDifference: (key: string) => boolean
  hasNegativeDifference: (key: string) => boolean
  isPositiveFading: (key: string) => boolean
  isNegativeFading: (key: string) => boolean
}

export const GraveyardPermanents: React.FC<GraveyardPermanentsProps> = ({
  graveyard,
  onUpdate,
  getPositiveDifference,
  getNegativeDifference,
  hasPositiveDifference,
  hasNegativeDifference,
  isPositiveFading,
  isNegativeFading,
}) => (
  <div className="grid grid-cols-1">
    <div
      className="relative flex flex-col border-b border-amber-900 bg-gradient-to-br from-amber-800 to-stone-800 p-3 text-white"
      role="group"
      aria-labelledby="graveyard-permanents-title"
    >
      <h3 id="graveyard-permanents-title" className="mb-2 text-center text-sm font-bold">
        Graveyard Permanents
      </h3>
      <div className="flex flex-1 flex-col justify-center text-center">
        <div
          className="relative text-2xl font-bold"
          aria-label={`Graveyard permanents: ${graveyard.permanents || 0}`}
        >
          <span className="relative">
            {graveyard.permanents || 0}
            <DifferenceTooltip
              positiveDifference={getPositiveDifference('graveyard-permanents')}
              negativeDifference={getNegativeDifference('graveyard-permanents')}
              hasPositive={hasPositiveDifference('graveyard-permanents')}
              hasNegative={hasNegativeDifference('graveyard-permanents')}
              isPositiveFading={isPositiveFading('graveyard-permanents')}
              isNegativeFading={isNegativeFading('graveyard-permanents')}
            />
          </span>
        </div>
        <div className="text-xs opacity-90">Permanents</div>
      </div>

      <ButtonOverlay
        onDecrease={() => onUpdate('permanents', (graveyard.permanents || 0) - 1)}
        onIncrease={() => onUpdate('permanents', (graveyard.permanents || 0) + 1)}
        decreaseLabel="Decrease graveyard permanents"
        increaseLabel="Increase graveyard permanents"
      />
    </div>
  </div>
)
