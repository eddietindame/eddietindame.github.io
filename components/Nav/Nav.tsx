import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import Scrollchor from 'react-scrollchor'

import { TRANSITION_DURATION } from 'config'
import Heart from 'components/Heart'
import S from './Nav.module.scss'

const Nav = () => {
  const router = useRouter()
  const navItems = [
    {
      label: 'Home',
      hash: '#home',
      ref: useRef(null),
    },
    {
      label: 'About',
      hash: '#about',
      ref: useRef(null),
    },
    {
      label: 'Projects',
      href: '/work',
      ref: useRef(null),
    },
    {
      label: 'Contact',
      hash: '#contact',
      ref: useRef(null),
    },
  ]

  const _onClickAnchor = e => {
    const { pathname, dataset } = e.target
    const isWork = pathname === '/work'
    const ref = isWork ? null : navItems[parseInt(dataset.index[0])].ref.current
    e.preventDefault()
    router.push(pathname, null, { scroll: false }).then(() => {
      // timeout because page transition takes time
      setTimeout(() => {
        if (isWork) window.scrollTo(0, 0)
        if (ref) ref.simulateClick()
      }, TRANSITION_DURATION + 5)
    })
  }

  const _onHoverAnchor = () => {
    router.prefetch('/')
  }

  return (
    <div className={S['nav']}>
      <nav className={S['nav__inner']}>
        <ul className={S['nav__items']}>
          {navItems.map((item, i) => (
            <li key={i} className={S['nav__items__item']}>
              {item.hash ? (
                router.pathname === '/' ? (
                  <Scrollchor
                    to={item.hash}
                    className={S['nav__items__link']}
                    disableHistory={true}
                  >
                    {item.label}
                  </Scrollchor>
                ) : (
                  <>
                    <Scrollchor ref={item.ref} to={item.hash} disableHistory={true} />
                    <a
                      href={'/' + item.hash}
                      className={S['nav__items__link']}
                      onClick={_onClickAnchor}
                      onMouseEnter={_onHoverAnchor}
                      data-index={i}
                    >
                      {item.label}
                    </a>
                  </>
                )
              ) : router.pathname === '/work' ? (
                <Scrollchor to="#work" className={S['nav__items__link']} disableHistory={true}>
                  {item.label}
                </Scrollchor>
              ) : (
                <a
                  href={item.href}
                  className={S['nav__items__link']}
                  onClick={_onClickAnchor}
                  onMouseEnter={_onHoverAnchor}
                  data-index={i}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <Heart size={25} colour="#C03A2B" />
    </div>
  )
}

export default Nav
