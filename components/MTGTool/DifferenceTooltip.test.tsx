import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DifferenceTooltip } from './DifferenceTooltip'

describe('DifferenceTooltip', () => {
  test('renders positive tooltip when hasPositive is true', () => {
    render(
      <DifferenceTooltip
        positiveDifference={5}
        negativeDifference={0}
        hasPositive={true}
        hasNegative={false}
      />,
    )

    expect(screen.getByText('+5')).toBeInTheDocument()
    expect(screen.getByText('+5')).toHaveClass('text-green-400')
  })

  test('renders negative tooltip when hasNegative is true', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={3}
        hasPositive={false}
        hasNegative={true}
      />,
    )

    expect(screen.getByText('-3')).toBeInTheDocument()
    expect(screen.getByText('-3')).toHaveClass('text-red-400')
  })

  test('renders both tooltips simultaneously', () => {
    render(
      <DifferenceTooltip
        positiveDifference={8}
        negativeDifference={2}
        hasPositive={true}
        hasNegative={true}
      />,
    )

    expect(screen.getByText('+8')).toBeInTheDocument()
    expect(screen.getByText('-2')).toBeInTheDocument()
    expect(screen.getByText('+8')).toHaveClass('text-green-400')
    expect(screen.getByText('-2')).toHaveClass('text-red-400')
  })

  test('renders nothing when no differences', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={0}
        hasPositive={false}
        hasNegative={false}
      />,
    )

    expect(screen.queryByText(/[+-]/)).not.toBeInTheDocument()
  })

  test('does not render positive tooltip when hasPositive is false', () => {
    render(
      <DifferenceTooltip
        positiveDifference={5}
        negativeDifference={0}
        hasPositive={false}
        hasNegative={false}
      />,
    )

    expect(screen.queryByText('+5')).not.toBeInTheDocument()
  })

  test('does not render negative tooltip when hasNegative is false', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={3}
        hasPositive={false}
        hasNegative={false}
      />,
    )

    expect(screen.queryByText('-3')).not.toBeInTheDocument()
  })

  test('does not render tooltips when difference is 0', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={0}
        hasPositive={true}
        hasNegative={true}
      />,
    )

    expect(screen.queryByText('+0')).not.toBeInTheDocument()
    expect(screen.queryByText('-0')).not.toBeInTheDocument()
  })

  test('positive tooltip has correct positioning classes', () => {
    render(
      <DifferenceTooltip
        positiveDifference={1}
        negativeDifference={0}
        hasPositive={true}
        hasNegative={false}
      />,
    )

    const positiveTooltip = screen.getByText('+1')
    expect(positiveTooltip).toHaveClass('absolute', 'left-full', 'top-0', 'ml-1')
  })

  test('negative tooltip has correct positioning classes', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={1}
        hasPositive={false}
        hasNegative={true}
      />,
    )

    const negativeTooltip = screen.getByText('-1')
    expect(negativeTooltip).toHaveClass('absolute', 'right-full', 'top-0', 'mr-1')
  })
})
