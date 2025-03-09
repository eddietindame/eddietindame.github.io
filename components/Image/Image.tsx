import React from 'react'
import { useSpring, animated, Animatable, ForwardProps } from 'react-spring'
import { Img } from 'react-image'

import S from './Image.module.scss'

type ImageProps = {
  image: string
  alt: string
  className?: string
  animation?: Animatable<ForwardProps<object>>
  onTouchStart: React.TouchEventHandler<HTMLDivElement>
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>
}

const Image = ({ className, animation, image, alt, onTouchStart, onTouchEnd }: ImageProps) => {
  const springAnimation = useSpring(animation)
  const _animation = animation ? springAnimation : undefined
  const Element = animation ? animated.div : 'div'

  return (
    <Element
      className={(className ? className + ' ' : '') + S['image']}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      // @ts-expect-error - weird react-spring types
      style={_animation}
    >
      <Img
        src={image}
        alt={alt}
        className={S['image__inner']}
        loader={
          <div className={S['image__inner']}>
            <div className={[S['image__loader'], 'loader'].join(' ')} />
          </div>
        }
      />
    </Element>
  )
}

export default Image

// TODO: try next/Image
