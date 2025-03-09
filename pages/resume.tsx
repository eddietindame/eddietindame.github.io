import React, { PropsWithChildren } from 'react'
import ResumeMD from 'markdown/resume.md'
import Link from 'next/link'

import { Arrow } from 'components/Arrow'

type MDXProps = PropsWithChildren & { href?: string }

const H1 = ({ children }: MDXProps) => (
  <h1 className="text-lowercase font-sans text-3xl font-bold">{children}</h1>
)
const H2 = ({ children }: MDXProps) => (
  <h2 className="text-lowercase font-sans text-2xl font-bold text-slate-400">{children}</h2>
)
const H3 = ({ children }: MDXProps) => <h3 className="text-3xl">{children}</h3>
const A = ({ children, href }: MDXProps) => (
  <Link href={href} className="flex items-center gap-2" scroll={false}>
    {children} <Arrow className="inline rotate-90" />
  </Link>
)
const Li = ({ children }: MDXProps) => <li className="ml-4 list-disc">{children}</li>
const StrongSans = ({ children }: MDXProps) => (
  <strong className="font-sans text-lg">{children}</strong>
)
const Strong = ({ children }: MDXProps) => <em className="font-bold text-zinc-600">{children}</em>
const Hr = () => <hr className="my-4" />

const overrideComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  a: A,
  li: Li,
  strong: StrongSans,
  del: Strong,
  hr: Hr,
}

const Resume = () => (
  <div className="container py-8 sm:py-16">
    <div className="mx-auto mb-16 max-w-xl px-4 sm:px-0">
      <div className="fade-children-in flex flex-col gap-2 font-serif text-xl">
        <ResumeMD className="font-serif" components={overrideComponents} />
      </div>
    </div>
  </div>
)

export default Resume
