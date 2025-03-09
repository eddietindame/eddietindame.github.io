import React from 'react'

import S from './About.module.scss'

const About = () => (
  <section id="about" className={S['about']}>
    <p className={[S['about__content'], 'u-margin-bottom-em'].join(' ')}>
      I am a software engineer currently open to work.
    </p>
    <p className={[S['about__content'], S['about__content--smaller']].join(' ')}>
      Most recently, I worked at Indeed where I helped people get jobs.
    </p>
  </section>
)

export default About
