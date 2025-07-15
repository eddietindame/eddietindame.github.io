import React from 'react'
import { cn } from 'lib/utils'
import { CardZone } from './types'
import { ButtonOverlay } from './ButtonOverlay'

interface ZoneCardProps {
  title: string
  zone: CardZone
  onUpdate: (field: keyof CardZone, value: number) => void
  className?: string
}

export const ZoneCard: React.FC<ZoneCardProps> = ({ title, zone, onUpdate, className }) => (
  <div
    className={cn('relative flex flex-col p-3 text-white', className)}
    role="group"
    aria-labelledby={`${title.toLowerCase()}-title`}
  >
    <h3 id={`${title.toLowerCase()}-title`} className="mb-2 text-center text-sm font-bold">
      {title}
    </h3>
    <div className="flex flex-1 flex-col justify-center text-center">
      <div className="text-2xl font-bold" aria-label={`${title} total: ${zone.total} cards`}>
        {zone.total}
      </div>
      <div className="text-xs opacity-90">Total Cards</div>
    </div>

    <ButtonOverlay
      onDecrease={() => onUpdate('total', zone.total - 1)}
      onIncrease={() => onUpdate('total', zone.total + 1)}
      decreaseLabel={`Decrease ${title.toLowerCase()} total`}
      increaseLabel={`Increase ${title.toLowerCase()} total`}
    />
  </div>
)
