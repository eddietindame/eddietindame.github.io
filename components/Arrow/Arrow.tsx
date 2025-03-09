import React from 'react'

export interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const Arrow = ({ size = 16, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 128 128"
    {...props}
  >
    <g>
      <path
        d="M64 1 17.9 127 64 99.8l46.1 27.2L64 1zm0 20.4 32.6 89.2L64 91.3V21.4z"
        fill="#191919"
      />
    </g>
  </svg>
)
