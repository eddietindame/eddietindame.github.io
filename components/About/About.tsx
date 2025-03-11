import React, { PropsWithChildren } from 'react'

import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { AboutQuery } from 'tina/__generated__/types'
import { cn } from 'lib/utils'
import S from './About.module.scss'

const Main = ({ children }: PropsWithChildren) => (
  <p className={cn(S['about__content'], 'u-margin-bottom-em')}>{children}</p>
)

type AboutProps = {
  content: AboutQuery['about']
}

const About = ({ content }: AboutProps) => (
  <section id="about" className={S['about']}>
    <TinaMarkdown
      components={{
        h1: Main,
        h2: Main,
        h3: Main,
        p: ({ children }) => (
          <p className={[S['about__content'], S['about__content--smaller']].join(' ')}>
            {children}
          </p>
        ),
        a: ({ children, url }) => (
          <a target="_blank" rel="noopener noreferrer" href={url} className="!text-blue-800">
            {children}
          </a>
        ),
      }}
      content={content.body}
    />
  </section>
)

export default About
