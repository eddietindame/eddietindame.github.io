import React from 'react'

import S from './About.module.scss'

const About = () => (
  <section id="about" className={S['about']}>
    <p className={[S['about__content'], 'u-margin-bottom-em'].join(' ')}>
      I&apos;m a software engineer based in London who is currently open to work.
    </p>
    <p className={[S['about__content'], S['about__content--smaller']].join(' ')}>
      Most recently, I worked at{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.indeed.com/"
        className="!text-blue-800"
      >
        Indeed
      </a>{' '}
      where I helped people get jobs.
    </p>
  </section>
)

export default About
