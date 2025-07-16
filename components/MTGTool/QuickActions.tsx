import React, { useState } from 'react'
import { ConfirmationModal } from './ConfirmationModal'

interface QuickActionsProps {
  exileFromHand: boolean
  onToggleExileMode: () => void
  onReset: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  exileFromHand,
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
          className={`font-bol p-3 text-xs transition-all ${
            exileFromHand ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
          }`}
          aria-label={`Toggle exile mode. Currently: ${exileFromHand ? 'Exile from hand' : 'Exile from graveyard'}`}
          aria-pressed={exileFromHand}
        >
          {exileFromHand ? 'Hand→Exile' : 'GY→Exile'}
        </button>
        <button
          onClick={handleResetClick}
          className="font-bol bg-gray-500 p-3 text-base transition-all hover:bg-gray-600"
          aria-label="Reset game to initial state"
        >
          Reset Game
        </button>
      </div>

      <ConfirmationModal
        isOpen={showResetModal}
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
        title="Reset Game"
        message="Are you sure you want to reset the game? This will clear all card counts and return to the initial state."
        confirmText="Reset"
        cancelText="Cancel"
      />
    </>
  )
}
