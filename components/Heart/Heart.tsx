import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import './Heart.scss'

type HeartProps = {
  size: number
  colour?: string
  accent?: string
}

const Heart = ({ size, colour, accent }: HeartProps) => {
  const [isActive, setIsActive] = useState(false)
  const spring = useSpring({ right: isActive ? '47px' : '-300px', from: { right: '-300px' } })
  const _onClickHeart = e => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={'heart' + (isActive ? ' heart--active' : '')}>
      <svg
        className="heart__svg"
        width={`${size}px`}
        height={`${size}px`}
        viewBox={`0 0 ${size * 2} ${size * 2}`}
      >
        <path
          className="heart__svg__path"
          onClick={_onClickHeart}
          fill={colour ? colour : '#000000'}
          d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"
        />
        <path
          className="heart__svg__path"
          onClick={_onClickHeart}
          fill={accent ? accent : '#FFFFFF'}
          d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z"
        />
      </svg>
      <div className="heart__bg" />
      <animated.div className="heart__message" style={spring}>
        <div className="heart__message__inner">
          <span className="t-highlight">
            Design & build: <strong>Eddie Tindame</strong>
          </span>
        </div>
      </animated.div>
    </div>
  )
}

export default Heart
