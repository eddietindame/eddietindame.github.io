import React from 'react'
import SpinningNumber from 'react-spinning-number'
import { cn } from 'lib/utils'
import { CardZone } from './types'
import { ButtonOverlay } from './ButtonOverlay'
import { DifferenceTooltip } from './DifferenceTooltip'

interface ZoneCardProps {
  title: string
  zone: CardZone
  onUpdate: (field: keyof CardZone, value: number) => void
  className?: string
  getPositiveDifference: (key: string) => number
  getNegativeDifference: (key: string) => number
  hasPositiveDifference: (key: string) => boolean
  hasNegativeDifference: (key: string) => boolean
  isPositiveFading: (key: string) => boolean
  isNegativeFading: (key: string) => boolean
  zoneKey: string
}

export const ZoneCard: React.FC<ZoneCardProps> = ({
  title,
  zone,
  onUpdate,
  className,
  getPositiveDifference,
  getNegativeDifference,
  hasPositiveDifference,
  hasNegativeDifference,
  isPositiveFading,
  isNegativeFading,
  zoneKey,
}) => (
  <div
    className={cn('relative flex flex-col p-3', className)}
    role="group"
    aria-labelledby={`${title.toLowerCase()}-title`}
  >
    <h3 id={`${title.toLowerCase()}-title`} className="mb-2 text-center text-sm font-bold">
      {title}
    </h3>
    <div className="flex flex-1 flex-col justify-center text-center">
      <div
        className="my-2 flex justify-center font-bold"
        aria-label={`${title} total: ${zone.total} cards`}
      >
        <span className="relative">
          <SpinningNumber fontSize={2} duration={300} style={{ fontWeight: 'bold' }}>
            {zone.total}
          </SpinningNumber>
          <DifferenceTooltip
            positiveDifference={getPositiveDifference(`${zoneKey}-total`)}
            negativeDifference={getNegativeDifference(`${zoneKey}-total`)}
            hasPositive={hasPositiveDifference(`${zoneKey}-total`)}
            hasNegative={hasNegativeDifference(`${zoneKey}-total`)}
            isPositiveFading={isPositiveFading(`${zoneKey}-total`)}
            isNegativeFading={isNegativeFading(`${zoneKey}-total`)}
            context={`${title} total`}
          />
        </span>
      </div>
      <div className="text-xs opacity-90">Total Cards</div>
    </div>

    <ButtonOverlay
      onDecrease={() => onUpdate('total', zone.total - 1)}
      onIncrease={() => onUpdate('total', zone.total + 1)}
      decreaseLabel={`Decrease ${title.toLowerCase()} total`}
      increaseLabel={`Increase ${title.toLowerCase()} total`}
    />
  </div>
)
