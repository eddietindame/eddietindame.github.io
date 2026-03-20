import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { ConfirmationModal } from './ConfirmationModal'

describe('ConfirmationModal', () => {
  let user: ReturnType<typeof userEvent.setup>
  const mockOnConfirm = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  const defaultProps = {
    isOpen: true,
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
    title: 'Test Modal',
    message: 'Are you sure you want to proceed?',
  }

  test('renders modal when isOpen is true', () => {
    render(<ConfirmationModal {...defaultProps} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument()
  })

  test('does not render modal when isOpen is false', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders default button text', () => {
    render(<ConfirmationModal {...defaultProps} />)

    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  test('renders custom button text', () => {
    render(<ConfirmationModal {...defaultProps} confirmText="Delete" cancelText="Keep" />)

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument()
  })

  test('calls onConfirm when confirm button is clicked', async () => {
    render(<ConfirmationModal {...defaultProps} />)

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    await user.click(confirmButton)

    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(mockOnCancel).not.toHaveBeenCalled()
  })

  test('calls onCancel when cancel button is clicked', async () => {
    render(<ConfirmationModal {...defaultProps} />)

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  test('calls onCancel when backdrop is clicked', async () => {
    render(<ConfirmationModal {...defaultProps} />)

    const backdrop = screen.getByRole('dialog')
    await user.click(backdrop)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  test('does not call onCancel when modal content is clicked', async () => {
    render(<ConfirmationModal {...defaultProps} />)

    const modalContent = screen.getByText('Test Modal')
    await user.click(modalContent)

    expect(mockOnCancel).not.toHaveBeenCalled()
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  test('has proper accessibility attributes', () => {
    render(<ConfirmationModal {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-description')

    const title = screen.getByText('Test Modal')
    expect(title).toHaveAttribute('id', 'modal-title')

    const message = screen.getByText('Are you sure you want to proceed?')
    expect(message).toHaveAttribute('id', 'modal-description')
  })

  test('renders with custom title and message', () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        title="Custom Title"
        message="Custom message with more details"
      />,
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom message with more details')).toBeInTheDocument()
  })

  test('modal has correct styling classes', () => {
    render(<ConfirmationModal {...defaultProps} />)

    const backdrop = screen.getByRole('dialog')
    expect(backdrop).toHaveClass('bg-opacity-50', 'fixed', 'inset-0', 'z-50')

    const modalContent = backdrop.firstChild
    expect(modalContent).toHaveClass(
      'mx-4',
      'max-w-sm',
      'rounded-lg',
      'bg-white',
      'p-6',
      'shadow-xl',
    )
  })

  test('buttons have correct styling', () => {
    render(<ConfirmationModal {...defaultProps} />)

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    expect(confirmButton).toHaveClass('bg-gradient-to-r', 'from-red-500', 'to-pink-500')
    expect(cancelButton).toHaveClass('bg-gradient-to-r', 'from-gray-200', 'to-gray-300')
  })

  test('handles rapid clicks correctly', async () => {
    render(<ConfirmationModal {...defaultProps} />)

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })

    // Click rapidly multiple times
    await user.click(confirmButton)
    await user.click(confirmButton)
    await user.click(confirmButton)

    // Should only call onConfirm for each click
    expect(mockOnConfirm).toHaveBeenCalledTimes(3)
  })

  test('keyboard navigation works correctly', async () => {
    render(<ConfirmationModal {...defaultProps} />)

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    // Tab to first button
    await user.tab()
    expect(cancelButton).toHaveFocus()

    // Tab to second button
    await user.tab()
    expect(confirmButton).toHaveFocus()

    // Press Enter to activate the confirm button
    await user.keyboard('{Enter}')
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
  })
})
