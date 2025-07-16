import React from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={onCancel} // dismiss when clicking the backdrop
    >
      <div
        className="mx-4 max-w-sm rounded-lg bg-white p-6 shadow-xl"
        onClick={e => e.stopPropagation()} // prevent dismiss when clicking inside the modal
      >
        <h2 id="modal-title" className="mb-2 text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <p id="modal-description" className="mb-6 text-gray-600">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded bg-gradient-to-r from-gray-200 to-gray-300 px-4 py-2 text-gray-700 transition-all hover:from-gray-300 hover:to-gray-400"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-white transition-all hover:from-red-600 hover:to-pink-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
