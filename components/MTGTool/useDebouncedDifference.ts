import { useState, useEffect, useRef } from 'react'

interface DifferenceState {
  [key: string]: {
    positive: number
    negative: number
  }
}

export const useDebouncedDifference = (debounceMs: number = 2000) => {
  const [differences, setDifferences] = useState<DifferenceState>({})
  const timeoutRefs = useRef<{
    [key: string]: { positive?: NodeJS.Timeout; negative?: NodeJS.Timeout }
  }>({})

  const addDifference = (key: string, amount: number) => {
    const type = amount > 0 ? 'positive' : 'negative'
    const value = Math.abs(amount)

    // Clear existing timeout for this key and type
    if (timeoutRefs.current[key]?.[type]) {
      clearTimeout(timeoutRefs.current[key]![type]!)
    }

    // Initialize if needed
    if (!timeoutRefs.current[key]) {
      timeoutRefs.current[key] = {}
    }

    // Update the difference
    setDifferences(prev => ({
      ...prev,
      [key]: {
        positive:
          type === 'positive' ? (prev[key]?.positive || 0) + value : prev[key]?.positive || 0,
        negative:
          type === 'negative' ? (prev[key]?.negative || 0) + value : prev[key]?.negative || 0,
      },
    }))

    // Set new timeout to clear this difference type
    timeoutRefs.current[key]![type] = setTimeout(() => {
      setDifferences(prev => {
        const current = prev[key]
        if (!current) return prev

        const newState = { ...prev }
        if (type === 'positive') {
          newState[key] = { ...current, positive: 0 }
        } else {
          newState[key] = { ...current, negative: 0 }
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

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeouts => {
        if (timeouts.positive) clearTimeout(timeouts.positive)
        if (timeouts.negative) clearTimeout(timeouts.negative)
      })
    }
  }, [])

  return {
    addDifference,
    getPositiveDifference,
    getNegativeDifference,
    hasPositiveDifference,
    hasNegativeDifference,
  }
}
