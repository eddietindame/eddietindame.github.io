import React from 'react'

interface QuickActionsProps {
  exileFromHand: boolean
  onToggleExileMode: () => void
  onReset: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  exileFromHand,
  onToggleExileMode,
  onReset,
}) => (
  <div className="grid grid-cols-2" role="group" aria-label="Quick actions">
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
