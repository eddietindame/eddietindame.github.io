import React, { useEffect, useState, useRef } from 'react'
import { useSpring, animated, Animatable, ForwardProps } from 'react-spring'

import { Video as VideoType } from 'types/shared'
import S from './Video.module.scss'

type VideoProps = {
  video: VideoType
  className?: string
  animation?: Animatable<ForwardProps<object>>
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>
}

const Video = ({ className, animation, video, onTouchStart, onTouchEnd }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const springAnimation = useSpring(animation)

  const _animation = animation ? springAnimation : undefined
  const Element = animation ? animated.div : 'div'
  const _onVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  useEffect(() => {
    const videoElement = videoRef.current
    videoElement.addEventListener('canplay', _onVideoLoaded)
    return () => {
      videoElement.removeEventListener('canplay', _onVideoLoaded)
    }
  }, [])

  return (
    <Element
      className={(className ? className + ' ' : '') + S['video']}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      // @ts-expect-error - weird react-spring types
      style={_animation}
    >
      <video
        className={S['video__element']}
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
        ref={videoRef}
        playsInline
        autoPlay
        muted
        loop
      >
        {video.sources.map((source, i) => (
          <source key={i} src={`/static/video/${video.name}.${source}`} type={`video/${source}`} />
        ))}
        Your browser does not support the video tag. 😢
      </video>
      {!isVideoLoaded && (
        <div className={S['video__overlay']} style={{ opacity: isVideoLoaded ? 0 : 1 }}>
          <div className={[S['video__overlay__loader'], 'loader'].join(' ')} />
        </div>
      )}
    </Element>
  )
}

export default Video
