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
        isPositiveFading={false}
        isNegativeFading={false}
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
        isPositiveFading={false}
        isNegativeFading={false}
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
        isPositiveFading={false}
        isNegativeFading={false}
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
        isPositiveFading={false}
        isNegativeFading={false}
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
        isPositiveFading={false}
        isNegativeFading={false}
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
        isPositiveFading={false}
        isNegativeFading={false}
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
        isPositiveFading={false}
        isNegativeFading={false}
      />,
    )

    expect(screen.queryByText(/[+-]/)).not.toBeInTheDocument()
  })

  test('positive tooltip has correct positioning classes', () => {
    render(
      <DifferenceTooltip
        positiveDifference={3}
        negativeDifference={0}
        hasPositive={true}
        hasNegative={false}
        isPositiveFading={false}
        isNegativeFading={false}
      />,
    )

    const tooltip = screen.getByText('+3')
    expect(tooltip).toHaveClass('left-full', 'ml-4')
  })

  test('negative tooltip has correct positioning classes', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={2}
        hasPositive={false}
        hasNegative={true}
        isPositiveFading={false}
        isNegativeFading={false}
      />,
    )

    const tooltip = screen.getByText('-2')
    expect(tooltip).toHaveClass('right-full', 'mr-4')
  })

  test('applies fade-out class when isPositiveFading is true', () => {
    render(
      <DifferenceTooltip
        positiveDifference={5}
        negativeDifference={0}
        hasPositive={true}
        hasNegative={false}
        isPositiveFading={true}
        isNegativeFading={false}
      />,
    )

    const tooltip = screen.getByText('+5')
    expect(tooltip).toHaveClass('opacity-0')
  })

  test('applies fade-out class when isNegativeFading is true', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={3}
        hasPositive={false}
        hasNegative={true}
        isPositiveFading={false}
        isNegativeFading={true}
      />,
    )

    const tooltip = screen.getByText('-3')
    expect(tooltip).toHaveClass('opacity-0')
  })

  test('does not apply fade-out class when not fading', () => {
    render(
      <DifferenceTooltip
        positiveDifference={5}
        negativeDifference={3}
        hasPositive={true}
        hasNegative={true}
        isPositiveFading={false}
        isNegativeFading={false}
      />,
    )

    const positiveTooltip = screen.getByText('+5')
    const negativeTooltip = screen.getByText('-3')
    expect(positiveTooltip).toHaveClass('opacity-100')
    expect(negativeTooltip).toHaveClass('opacity-100')
  })
})
