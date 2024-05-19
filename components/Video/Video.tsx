import React, { useEffect, useState, useRef } from 'react'
import { useSpring, animated, AnimatedValue, ForwardedProps } from 'react-spring'

import { Video as VideoType } from 'types/shared'
import './Video.scss'

type VideoProps = {
  video: VideoType
  className?: string
  animation?: AnimatedValue<ForwardedProps<object>>
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>
}

const Video = ({ className, animation, video, onTouchStart, onTouchEnd }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>()
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
      className={(className ? className + ' ' : '') + 'video'}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={_animation}
    >
      <video
        className="video__element"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
        ref={videoRef}
        // width="250"
        // height="400"
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
        <div className="video__overlay" style={{ opacity: isVideoLoaded ? 0 : 1 }}>
          <div className="video__overlay__loader loader" />
        </div>
      )}
    </Element>
  )
}

export default Video
