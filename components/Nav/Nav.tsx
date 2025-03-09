import React, { RefObject, useRef } from 'react'
import { useRouter } from 'next/router'
import Scrollchor from 'react-scrollchor'

import { TRANSITION_DURATION } from 'config'
import { cn } from 'lib/utils'
import Heart from 'components/Heart'
import S from './Nav.module.scss'

type NavItem = {
  label: string
  href: string
  hash?: string
  ref?: RefObject<typeof Scrollchor>
  isDesktopOnly?: boolean
}

const Nav = () => {
  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      hash: '#home',
      ref: useRef(null),
    },
    {
      label: 'About',
      href: '/',
      hash: '#about',
      ref: useRef(null),
      isDesktopOnly: true,
    },
    {
      label: 'Resume',
      href: '/resume',
    },
    {
      label: 'Projects',
      href: '/work',
    },
    {
      label: 'Contact',
      href: '/',
      hash: '#contact',
      ref: useRef(null),
    },
  ]

  return (
    <div className={S['nav']}>
      <nav className={S['nav__inner']}>
        <ul className={S['nav__items']}>
          {navItems.map((item, i) => (
            <li
              key={i}
              className={cn(S['nav__items__item'], item.isDesktopOnly && 'hidden sm:inline-block')}
            >
              <NavLink item={item} index={i} />
            </li>
          ))}
        </ul>
      </nav>
      <Heart size={25} colour="#C03A2B" />
    </div>
  )
}

export default Nav

type NavLinkProps = {
  item: NavItem
  index: number
}

const NavLink = ({ item, index }: NavLinkProps) => {
  const router = useRouter()
  const hash = item.hash ?? ''

  const _onClickAnchor = e => {
    const { pathname } = e.target
    const scrollchorRef = item.ref?.current
    e.preventDefault()
    router.push(pathname, null, { scroll: false }).then(() => {
      // timeout waits for page transition
      setTimeout(() => {
        if (pathname !== '/') window.scrollTo(0, 0)
        if (scrollchorRef) scrollchorRef.simulateClick()
      }, TRANSITION_DURATION + 5)
    })
  }

  const _onHoverAnchor = () => {
    router.prefetch(item.href)
  }

  if (router.pathname === item.href) {
    return (
      <Scrollchor to={hash} className={S['nav__items__link']} disableHistory={true}>
        {item.label}
      </Scrollchor>
    )
  }

  return (
    <>
      <Scrollchor
        ref={item.ref}
        to={hash}
        className={S['nav__items__link']}
        disableHistory={true}
      />
      <a
        href={item.href + hash}
        className={S['nav__items__link']}
        onClick={_onClickAnchor}
        onMouseEnter={_onHoverAnchor}
        data-index={index}
      >
        {item.label}
      </a>
    </>
  )
}
