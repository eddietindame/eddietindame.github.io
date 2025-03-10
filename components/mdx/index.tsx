import React, { PropsWithChildren } from 'react'
import Link from 'next/link'

import { Arrow } from 'components/Arrow'

export type MDXProps = PropsWithChildren & { href?: string; src?: string; alt?: string }

const H1 = ({ children }: MDXProps) => (
  <h1 className="text-lowercase font-sans text-3xl font-bold">{children}</h1>
)

const H2 = ({ children }: MDXProps) => (
  <h2 className="text-lowercase font-sans text-2xl font-bold text-slate-400">{children}</h2>
)

const H3 = ({ children }: MDXProps) => <h3 className="text-3xl">{children}</h3>

export const A = ({ children, href }: MDXProps) => (
  <span className="block">
    <Link href={href} className="inline-flex items-center gap-2" scroll={false}>
      {children} <Arrow className="inline rotate-90" />
    </Link>
  </span>
)

const Li = ({ children }: MDXProps) => <li className="ml-4 list-disc">{children}</li>

const StrongSans = ({ children }: MDXProps) => (
  <strong className="font-sans text-lg">{children}</strong>
)

const Strong = ({ children }: MDXProps) => <em className="font-bold text-zinc-600">{children}</em>

const Code = ({ children }: MDXProps) => (
  <code className="hljs inline-block rounded px-2 py-1 text-sm">{children}</code>
)

const Hr = () => <hr className="my-4" />

export const overrideComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  a: A,
  li: Li,
  strong: StrongSans,
  del: Strong,
  code: Code,
  hr: Hr,
}
