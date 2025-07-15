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
  const router = useRouter()

  // Create refs unconditionally
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  // Hide nav on MTG tool page
  if (router.pathname === '/mtg-tool') {
    return null
  }

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      hash: '#home',
      ref: homeRef,
    },
    {
      label: 'About',
      href: '/',
      hash: '#about',
      ref: aboutRef,
      isDesktopOnly: true,
    },
    {
      label: 'Resume',
      href: '/resume',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Contact',
      href: '/',
      hash: '#contact',
      ref: contactRef,
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
  // Destructure to avoid the linter treating `item` as a ref container
  // because NavItem has a `ref` field
  const { href, hash: itemHash, label, ref: itemRef } = item
  const router = useRouter()
  const hash = itemHash ?? ''

  const _onClickAnchor = e => {
    const { pathname } = e.target
    const ref = itemRef?.current
    e.preventDefault()
    router.push(pathname, null, { scroll: false }).then(() => {
      // timeout waits for page transition
      setTimeout(() => {
        if (pathname !== '/') window.scrollTo(0, 0)
        if (ref) ref.simulateClick()
      }, TRANSITION_DURATION + 5)
    })
  }

  const _onHoverAnchor = () => {
    router.prefetch(href)
  }

  if (router.pathname === href) {
    return (
      <Scrollchor to={hash} className={S['nav__items__link']} disableHistory={true}>
        {label}
      </Scrollchor>
    )
  }

  return (
    <>
      <Scrollchor ref={itemRef} to={hash} className={S['nav__items__link']} disableHistory={true} />
      <a
        href={href + hash}
        className={S['nav__items__link']}
        onClick={_onClickAnchor}
        onMouseEnter={_onHoverAnchor}
        data-index={index}
      >
        {label}
      </a>
    </>
  )
}
