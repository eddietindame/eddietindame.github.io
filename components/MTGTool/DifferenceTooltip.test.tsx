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
        context="Deck total"
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
        context="Hand size"
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
        context="Graveyard total"
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
        context="Exile total"
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
        context="Deck total"
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
        context="Hand size"
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
        context="Graveyard permanents"
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
        context="Deck total"
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
        context="Hand size"
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
        context="Graveyard total"
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
        context="Exile total"
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
        context="Graveyard permanents"
      />,
    )

    const positiveTooltip = screen.getByText('+5')
    const negativeTooltip = screen.getByText('-3')
    expect(positiveTooltip).toHaveClass('opacity-100')
    expect(negativeTooltip).toHaveClass('opacity-100')
  })

  test('positive tooltip has correct aria label', () => {
    render(
      <DifferenceTooltip
        positiveDifference={7}
        negativeDifference={0}
        hasPositive={true}
        hasNegative={false}
        isPositiveFading={false}
        isNegativeFading={false}
        context="Deck total"
      />,
    )

    const tooltip = screen.getByLabelText('Deck total increased by 7')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveAttribute('role', 'status')
    expect(tooltip).toHaveAttribute('aria-live', 'polite')
  })

  test('negative tooltip has correct aria label', () => {
    render(
      <DifferenceTooltip
        positiveDifference={0}
        negativeDifference={4}
        hasPositive={false}
        hasNegative={true}
        isPositiveFading={false}
        isNegativeFading={false}
        context="Hand size"
      />,
    )

    const tooltip = screen.getByLabelText('Hand size decreased by 4')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveAttribute('role', 'status')
    expect(tooltip).toHaveAttribute('aria-live', 'polite')
  })

  test('both tooltips have correct aria labels when both are present', () => {
    render(
      <DifferenceTooltip
        positiveDifference={6}
        negativeDifference={2}
        hasPositive={true}
        hasNegative={true}
        isPositiveFading={false}
        isNegativeFading={false}
        context="Graveyard total"
      />,
    )

    const positiveTooltip = screen.getByLabelText('Graveyard total increased by 6')
    const negativeTooltip = screen.getByLabelText('Graveyard total decreased by 2')

    expect(positiveTooltip).toBeInTheDocument()
    expect(negativeTooltip).toBeInTheDocument()
    expect(positiveTooltip).toHaveAttribute('role', 'status')
    expect(negativeTooltip).toHaveAttribute('role', 'status')
    expect(positiveTooltip).toHaveAttribute('aria-live', 'polite')
    expect(negativeTooltip).toHaveAttribute('aria-live', 'polite')
  })
})
