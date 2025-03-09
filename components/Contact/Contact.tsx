import React from 'react'

import Portrait from 'assets/images/portrait.jpg'
import S from './Contact.module.scss'

const Contact = () => {
  const contactItems = [
    {
      label: 'eddie.tindame@googlemail.com',
      href: 'mailto:eddie.tindame@googlemail.com',
      isEmail: true,
    },
    {
      label: 'github',
      href: 'https://github.com/eddietindame',
    },
    {
      label: 'linkedin',
      href: 'https://uk.linkedin.com/in/eddietindame',
    },
    {
      label: 'c.v.',
      href: '/static/eddie_tindame_cv_2024.pdf?v=2',
    },
  ]

  return (
    <section id="contact" className={S['contact']}>
      <div className={[S['contact__inner'], 'container'].join(' ')}>
        <img src={Portrait.src} alt="Eddie Tindame" className={S['contact__portrait']} />
        <div className={S['contact__items']}>
          {contactItems.map(({ href, label, isEmail }, i) => (
            <div
              key={i}
              className={S['contact__item']}
              style={{ position: 'relative', zIndex: contactItems.length - i }}
            >
              <a
                href={href}
                className={[
                  S['contact__item__link'],
                  isEmail ? S['contact__item__link--email'] : '',
                ]
                  .join(' ')
                  .trim()}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
              >
                <span className="t-highlight">{label}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
