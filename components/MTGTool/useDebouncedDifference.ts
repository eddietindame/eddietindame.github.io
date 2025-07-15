import { useState, useEffect, useRef } from 'react'

interface DifferenceState {
  [key: string]: {
    positive: number
    negative: number
    positiveFading: boolean
    negativeFading: boolean
  }
}

export const useDebouncedDifference = (debounceMs: number = 2000, fadeMs: number = 500) => {
  const [differences, setDifferences] = useState<DifferenceState>({})
  const timeoutRefs = useRef<{
    [key: string]: {
      positive?: NodeJS.Timeout
      negative?: NodeJS.Timeout
      positiveFade?: NodeJS.Timeout
      negativeFade?: NodeJS.Timeout
    }
  }>({})

  const addDifference = (key: string, amount: number) => {
    const type = amount > 0 ? 'positive' : 'negative'
    const fadeType = amount > 0 ? 'positiveFade' : 'negativeFade'
    const value = Math.abs(amount)

    // Clear existing timeouts for this key and type
    if (timeoutRefs.current[key]?.[type]) {
      clearTimeout(timeoutRefs.current[key]![type]!)
    }
    if (timeoutRefs.current[key]?.[fadeType]) {
      clearTimeout(timeoutRefs.current[key]![fadeType]!)
    }

    // Initialize if needed
    if (!timeoutRefs.current[key]) {
      timeoutRefs.current[key] = {}
    }

    // Update the difference and reset fading state
    setDifferences(prev => ({
      ...prev,
      [key]: {
        positive:
          type === 'positive' ? (prev[key]?.positive || 0) + value : prev[key]?.positive || 0,
        negative:
          type === 'negative' ? (prev[key]?.negative || 0) + value : prev[key]?.negative || 0,
        positiveFading: type === 'positive' ? false : prev[key]?.positiveFading || false,
        negativeFading: type === 'negative' ? false : prev[key]?.negativeFading || false,
      },
    }))

    // Set timeout to start fade-out
    timeoutRefs.current[key]![fadeType] = setTimeout(() => {
      setDifferences(prev => {
        const current = prev[key]
        if (!current) return prev

        return {
          ...prev,
          [key]: {
            ...current,
            positiveFading: type === 'positive' ? true : current.positiveFading,
            negativeFading: type === 'negative' ? true : current.negativeFading,
          },
        }
      })
      delete timeoutRefs.current[key]![fadeType]
    }, debounceMs - fadeMs)

    // Set timeout to clear this difference type completely
    timeoutRefs.current[key]![type] = setTimeout(() => {
      setDifferences(prev => {
        const current = prev[key]
        if (!current) return prev

        const newState = { ...prev }
        if (type === 'positive') {
          newState[key] = { ...current, positive: 0, positiveFading: false }
        } else {
          newState[key] = { ...current, negative: 0, negativeFading: false }
        }

        // Remove the key entirely if both are 0
        if (newState[key].positive === 0 && newState[key].negative === 0) {
          delete newState[key]
        }

        return newState
      })
      delete timeoutRefs.current[key]![type]
    }, debounceMs)
  }

  const getPositiveDifference = (key: string): number => {
    return differences[key]?.positive || 0
  }

  const getNegativeDifference = (key: string): number => {
    return differences[key]?.negative || 0
  }

  const hasPositiveDifference = (key: string): boolean => {
    return (differences[key]?.positive || 0) > 0
  }

  const hasNegativeDifference = (key: string): boolean => {
    return (differences[key]?.negative || 0) > 0
  }

  const isPositiveFading = (key: string): boolean => {
    return differences[key]?.positiveFading || false
  }

  const isNegativeFading = (key: string): boolean => {
    return differences[key]?.negativeFading || false
  }

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeouts => {
        if (timeouts.positive) clearTimeout(timeouts.positive)
        if (timeouts.negative) clearTimeout(timeouts.negative)
        if (timeouts.positiveFade) clearTimeout(timeouts.positiveFade)
        if (timeouts.negativeFade) clearTimeout(timeouts.negativeFade)
      })
    }
  }, [])

  return {
    addDifference,
    getPositiveDifference,
    getNegativeDifference,
    hasPositiveDifference,
    hasNegativeDifference,
    isPositiveFading,
    isNegativeFading,
  }
}
