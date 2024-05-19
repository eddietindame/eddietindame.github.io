import React from 'react'
import { useSpring, animated, AnimatedValue, ForwardedProps } from 'react-spring'
import Img from 'react-image'
import './Image.scss'

type ImageProps = {
  image: string
  alt: string
  className?: string
  animation?: AnimatedValue<ForwardedProps<object>>
  onTouchStart: React.TouchEventHandler<HTMLDivElement>
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>
}

const Image = ({ className, animation, image, alt, onTouchStart, onTouchEnd }: ImageProps) => {
  const springAnimation = useSpring(animation)
  const _animation = animation ? springAnimation : undefined
  const Element = animation ? animated.div : 'div'

  return (
    <Element
      className={(className ? className + ' ' : '') + 'image'}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={_animation}
    >
      <Img
        src={image}
        alt={alt}
        className="image__inner"
        loader={
          <div className="image__inner">
            <div className="image__loader loader" />
          </div>
        }
      />
    </Element>
  )
}

export default Image
