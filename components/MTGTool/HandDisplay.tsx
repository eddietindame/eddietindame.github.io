import React from 'react'

interface HandDisplayProps {
  handSize: number
}

export const HandDisplay: React.FC<HandDisplayProps> = ({ handSize }) => (
  <div className="bg-gray-200 p-2 text-center text-white" role="status" aria-live="polite">
    <div className="text-sm font-medium">Hand</div>
    <div className="text-lg font-bold" aria-label={`Hand size: ${handSize} cards`}>
      {handSize}
    </div>
  </div>
)
