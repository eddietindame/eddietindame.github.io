import React from 'react'

import S from './About.module.scss'

const About = () => (
  <section id="about" className={S['about']}>
    <p className={[S['about__content'], 'u-margin-bottom-em'].join(' ')}>
      I&apos;m a software engineer based in London.
    </p>
    <p className={[S['about__content'], S['about__content--smaller']].join(' ')}>
      Currently, I work at{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.bertie.com/"
        style={{ color: '#ea580c' }}
      >
        Bertie
      </a>{' '}
      where we are disrupting the landscape of insurtech for small-mid sized MGAs.
    </p>
  </section>
)

export default About
