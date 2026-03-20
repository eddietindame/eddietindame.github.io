import React, { useState } from 'react'
import { ConfirmationModal } from './ConfirmationModal'

interface QuickActionsProps {
  exileFromHandOrPlay: boolean
  onToggleExileMode: () => void
  onReset: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  exileFromHandOrPlay,
  onToggleExileMode,
  onReset,
}) => {
  const [showResetModal, setShowResetModal] = useState(false)

  const handleResetClick = () => {
    setShowResetModal(true)
  }

  const handleConfirmReset = () => {
    onReset()
    setShowResetModal(false)
  }

  const handleCancelReset = () => {
    setShowResetModal(false)
  }

  return (
    <>
      <div className="grid grid-cols-2" role="group" aria-label="Quick actions">
        <button
          onClick={onToggleExileMode}
          className={`p-3 text-xs font-bold text-white transition-all ${
            exileFromHandOrPlay
              ? 'bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600'
              : 'bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600'
          }`}
          aria-label={`Toggle exile mode. Currently: ${exileFromHandOrPlay ? 'Exile from hand/play' : 'Exile from graveyard'}`}
          aria-pressed={exileFromHandOrPlay}
        >
          {exileFromHandOrPlay ? 'Hand/Play→Exile' : 'GY→Exile'}
        </button>
        <button
          onClick={handleResetClick}
          className="bg-gradient-to-br from-rose-600 to-rose-700 p-3 text-base font-bold text-white transition-all hover:from-rose-500 hover:to-rose-600"
          aria-label="Reset game to initial state"
        >
          Reset Game
        </button>
      </div>

      <ConfirmationModal
        isOpen={showResetModal}
        title="Reset Game"
        message="Are you sure you want to reset the game? This will return all cards to the library and cannot be undone."
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
        confirmText="Reset"
        cancelText="Cancel"
      />
    </>
  )
}
