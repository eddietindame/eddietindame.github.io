import React, { useState } from 'react'
import { CardType, DeliriumState } from './types'

interface DeliriumTrackerProps {
  deliriumState: DeliriumState
  onToggleCardType: (cardType: CardType) => void
}

const cardTypes: CardType[] = [
  'land',
  'creature',
  'artifact',
  'enchantment',
  'instant',
  'sorcery',
  'planeswalker',
  'battle',
]

const cardTypeColors: Record<CardType, string> = {
  land: 'bg-amber-800 hover:bg-amber-900',
  creature: 'bg-green-600 hover:bg-green-700',
  artifact: 'bg-gray-600 hover:bg-gray-700',
  enchantment: 'bg-purple-600 hover:bg-purple-700',
  instant: 'bg-blue-600 hover:bg-blue-700',
  sorcery: 'bg-red-600 hover:bg-red-700',
  planeswalker: 'bg-yellow-600 hover:bg-yellow-700',
  battle: 'bg-orange-600 hover:bg-orange-700',
}

export const DeliriumTracker: React.FC<DeliriumTrackerProps> = ({
  deliriumState,
  onToggleCardType,
}) => {
  const { cardTypesInGraveyard, isActive } = deliriumState
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      {/* Header with toggle button - always visible */}
      <div className="border-t border-slate-600 bg-slate-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-700"
          aria-expanded={isExpanded}
          aria-controls="delirium-content"
          aria-label={`Toggle delirium tracker ${isExpanded ? 'closed' : 'open'}`}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">Delirium Tracker</h3>
            <div
              className={`rounded px-2 py-1 text-sm font-bold ${
                isActive ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300'
              }`}
            >
              {cardTypesInGraveyard.size}/4 types
              {isActive && ' - ACTIVE'}
            </div>
          </div>

          {/* Chevron icon */}
          <svg
            className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Overlay content that appears on top */}
      <div
        id="delirium-content"
        className={`absolute right-0 bottom-full left-0 z-10 overflow-hidden rounded-t-lg border border-slate-600 bg-slate-800 shadow-2xl transition-all duration-300 ease-out ${
          isExpanded
            ? 'max-h-96 translate-y-0 transform opacity-100'
            : 'max-h-0 translate-y-4 transform opacity-0'
        }`}
        style={{
          transformOrigin: 'bottom',
        }}
        aria-hidden={!isExpanded}
      >
        <div className="p-4">
          <div className="mb-3 grid grid-cols-2 gap-2">
            {cardTypes.map(cardType => {
              const isSelected = cardTypesInGraveyard.has(cardType)
              const baseColors = cardTypeColors[cardType]

              return (
                <button
                  key={cardType}
                  onClick={() => onToggleCardType(cardType)}
                  className={`rounded px-3 py-2 text-sm font-medium text-white transition-all ${
                    isSelected
                      ? baseColors + ' ring-2 ring-white'
                      : 'bg-slate-700 hover:bg-slate-600'
                  } `}
                  aria-pressed={isSelected}
                  tabIndex={isExpanded ? 0 : -1}
                >
                  {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
                </button>
              )
            })}
          </div>

          {isActive && (
            <div className="rounded bg-green-900/50 p-2 text-center text-sm text-green-200">
              🎯 Delirium is active! You have 4+ card types in your graveyard.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
