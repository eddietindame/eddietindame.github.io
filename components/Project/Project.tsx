import React, { useEffect, useState } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { animated } from 'react-spring'

import { Project as ProjectType } from 'types/shared'
import Image from 'components/Image'
import Video from 'components/Video'
import './Project.scss'

type ProjectProps = ProjectType & {
  isReversed?: boolean
  animation?: object
  className?: string
}

const Project = ({
  name,
  thumbnail,
  video,
  description,
  tags,
  href,
  credits,
  isReversed,
  animation,
  className
}: ProjectProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const enterAnimation = {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(10000px, 0px)'
    }
  }
  const Element = animation ? animated.div : 'div'
  const isLongWord = (words, threshold) =>
    words.split(' ').reduce((acc, cur) => (acc ? acc : cur.length > threshold), false)

  useEffect(() => {
    forceCheck()
  }, [])

  return (
    <Element
      className={
        (className ? className + ' ' : '') +
        'project' +
        (isReversed ? ' project--reversed' : '') +
        (isPressed ? ' project--pressed' : '')
      }
      style={animation}
    >
      <div className="project__inner">
        <h2 className={'project__title' + (isLongWord(name, 11) ? ' project__title--smaller' : '')}>
          <span className="t-highlight">
            {href ? (
              <a href={href} target="__blank" rel="noopener noreferrer" className="project__link">
                {name}
              </a>
            ) : (
              name
            )}
          </span>
        </h2>
        <p className="project__description">
          <span className="t-highlight">{description}</span>
        </p>
        {video ? (
          <LazyLoad height={400} offset={100} once>
            <Video
              className="project__thumbnail project__thumbnail--video"
              animation={enterAnimation}
              video={video}
              onTouchStart={() => {
                setIsPressed(true)
              }}
              onTouchEnd={() => {
                setIsPressed(false)
              }}
            />
          </LazyLoad>
        ) : (
          <LazyLoad height={400} offset={100} once>
            <Image
              className="project__thumbnail"
              animation={enterAnimation}
              image={thumbnail}
              alt={name}
              onTouchStart={() => {
                setIsPressed(true)
              }}
              onTouchEnd={() => {
                setIsPressed(false)
              }}
            />
          </LazyLoad>
        )}
        <ul className="project__tags">
          {tags.sort().map((tag, i) => (
            <li key={i} className="project__tags__tag">
              {tag}
            </li>
          ))}
        </ul>
        {credits &&
          credits.length &&
          credits.map((credit, i) => (
            <div key={i} className="project__credit">
              <span className="t-highlight">
                <span className="project__credit__label">{credit.label}:</span>{' '}
                <strong className="project__credit__value">{credit.value}</strong>
              </span>
            </div>
          ))}
      </div>
    </Element>
  )
}

export default Project
