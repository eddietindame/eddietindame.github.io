import React from 'react'
import { CardZone } from './types'

interface GraveyardPermanentsProps {
  graveyard: CardZone
  onUpdate: (field: keyof CardZone, value: number) => void
}

export const GraveyardPermanents: React.FC<GraveyardPermanentsProps> = ({
  graveyard,
  onUpdate,
}) => (
  <div className="grid grid-cols-1">
    <div
      className="relative flex flex-col p-3"
      role="group"
      aria-labelledby="graveyard-permanents-title"
    >
      <h3 id="graveyard-permanents-title" className="mb-2 text-center text-sm font-bold">
        Graveyard Permanents
      </h3>
      <div className="flex flex-1 flex-col justify-center text-center">
        <div
          className="text-2xl font-bold"
          aria-label={`Graveyard permanents: ${graveyard.permanents || 0}`}
        >
          {graveyard.permanents || 0}
        </div>
        <div className="text-xs opacity-90">Permanents</div>
      </div>

      {/* Invisible clickable areas covering the entire card */}
      <button
        onClick={() => onUpdate('permanents', (graveyard.permanents || 0) - 1)}
        className="hover:bg-opacity-10 absolute top-0 left-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
        aria-label="Decrease graveyard permanents"
      />
      <button
        onClick={() => onUpdate('permanents', (graveyard.permanents || 0) + 1)}
        className="hover:bg-opacity-10 absolute top-0 right-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
        aria-label="Increase graveyard permanents"
      />
    </div>
  </div>
)
