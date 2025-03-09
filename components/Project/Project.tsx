import React from 'react'
import { useEffect, useState } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { animated, Animatable, ForwardProps } from 'react-spring'

import { Project as ProjectType } from 'types/shared'
import Image from 'components/Image'
import Video from 'components/Video'
import S from './Project.module.scss'

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
  className,
}: ProjectProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const enterAnimation = {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(10000px, 0px)',
    },
  } as Animatable<ForwardProps<object>>
  const Element = animation ? animated.div : 'div'
  const isLongWord = (words, threshold) =>
    words.split(' ').reduce((acc, cur) => (acc ? acc : cur.length > threshold), false)

  useEffect(() => {
    forceCheck()
  }, [])

  return (
    <Element
      className={[
        className ? className + ' ' : '',
        S['project'],
        isReversed ? S['project--reversed'] : '',
        isPressed ? S['project--pressed'] : '',
      ].join(' ')}
      style={animation}
    >
      <div className={S['project__inner']}>
        <h2
          className={[
            S['project__title'],
            isLongWord(name, 11) ? S['project__title--smaller'] : '',
          ].join(' ')}
        >
          <span className="t-highlight">
            {href ? (
              <a
                href={href}
                target="__blank"
                rel="noopener noreferrer"
                className={S['project__link']}
              >
                {name}
              </a>
            ) : (
              name
            )}
          </span>
        </h2>
        <p className={S['project__description']}>
          <span className="t-highlight">{description}</span>
        </p>
        {video ? (
          <LazyLoad className={S['project__thumbnail']} height={400} offset={100} once>
            <Video
              className={S['project__thumbnail__video']}
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
          <LazyLoad className={S['project__thumbnail']} height={400} offset={100} once>
            <Image
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
        <ul className={S['project__tags']}>
          {tags.sort().map((tag, i) => (
            <li key={i} className={S['project__tags__tag']}>
              {tag}
            </li>
          ))}
        </ul>
        {credits &&
          credits.length &&
          credits.map((credit, i) => (
            <div key={i} className={S['project__credit']}>
              <span className="t-highlight">
                <span className={S['project__credit__label']}>{credit.label}:</span>{' '}
                <strong className={S['project__credit__value']}>{credit.value}</strong>
              </span>
            </div>
          ))}
      </div>
    </Element>
  )
}

export default Project
