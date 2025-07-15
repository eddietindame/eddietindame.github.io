import React from 'react'

interface DifferenceTooltipProps {
  positiveDifference: number
  negativeDifference: number
  hasPositive: boolean
  hasNegative: boolean
}

export const DifferenceTooltip: React.FC<DifferenceTooltipProps> = ({
  positiveDifference,
  negativeDifference,
  hasPositive,
  hasNegative,
}) => {
  return (
    <>
      {hasNegative && negativeDifference > 0 && (
        <span className="bg-opacity-75 absolute top-0 right-full mr-1 animate-pulse rounded bg-black px-1 py-0.5 text-xs font-bold whitespace-nowrap text-red-400">
          -{negativeDifference}
        </span>
      )}
      {hasPositive && positiveDifference > 0 && (
        <span className="bg-opacity-75 absolute top-0 left-full ml-1 animate-pulse rounded bg-black px-1 py-0.5 text-xs font-bold whitespace-nowrap text-green-400">
          +{positiveDifference}
        </span>
      )}
    </>
  )
}
