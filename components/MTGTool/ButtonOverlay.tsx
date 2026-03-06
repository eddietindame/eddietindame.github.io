import React from 'react'

interface ButtonOverlayProps {
  onDecrease: () => void
  onIncrease: () => void
  decreaseLabel: string
  increaseLabel: string
}

export const ButtonOverlay: React.FC<ButtonOverlayProps> = ({
  onDecrease,
  onIncrease,
  decreaseLabel,
  increaseLabel,
}) => (
  <>
    <button
      onClick={onDecrease}
      className="hover:bg-opacity-10 absolute top-0 left-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
      aria-label={decreaseLabel}
    >
      <div className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 text-xl font-bold opacity-30">
        −
      </div>
    </button>
    <button
      onClick={onIncrease}
      className="hover:bg-opacity-10 absolute top-0 right-0 h-full w-1/2 bg-transparent transition-all hover:bg-white"
      aria-label={increaseLabel}
    >
      <div className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 text-xl font-bold opacity-30">
        +
      </div>
    </button>
  </>
)
