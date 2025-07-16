import React from 'react'

interface DifferenceTooltipProps {
  positiveDifference: number
  negativeDifference: number
  hasPositive: boolean
  hasNegative: boolean
  isPositiveFading: boolean
  isNegativeFading: boolean
  context: string // e.g., "Deck total", "Hand size", "Graveyard total", etc.
}

export const DifferenceTooltip: React.FC<DifferenceTooltipProps> = ({
  positiveDifference,
  negativeDifference,
  hasPositive,
  hasNegative,
  isPositiveFading,
  isNegativeFading,
  context,
}) => {
  return (
    <>
      {hasNegative && negativeDifference > 0 && (
        <span
          className={`bg-opacity-75 absolute top-0 right-full mr-4 rounded bg-black/40 px-2 py-1 text-xs font-bold whitespace-nowrap text-red-400 transition-opacity duration-500 ease-out ${isNegativeFading ? 'opacity-0' : 'opacity-100'}`}
          aria-label={`${context} decreased by ${negativeDifference}`}
          role="status"
          aria-live="polite"
        >
          -{negativeDifference}
        </span>
      )}
      {hasPositive && positiveDifference > 0 && (
        <span
          className={`bg-opacity-75 absolute top-0 left-full ml-4 rounded bg-black/40 px-2 py-1 text-xs font-bold whitespace-nowrap text-green-400 transition-opacity duration-500 ease-out ${isPositiveFading ? 'opacity-0' : 'opacity-100'}`}
          aria-label={`${context} increased by ${positiveDifference}`}
          role="status"
          aria-live="polite"
        >
          +{positiveDifference}
        </span>
      )}
    </>
  )
}
