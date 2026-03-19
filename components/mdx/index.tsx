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

export function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement(node))
    return extractText((node.props as { children?: React.ReactNode }).children)
  return ''
}

export function replaceText(
  node: React.ReactNode,
  replacer: (text: string) => React.ReactNode[],
): React.ReactNode {
  if (typeof node === 'string') return replacer(node)
  if (!node || typeof node === 'number' || typeof node === 'boolean') return node
  if (Array.isArray(node)) return node.map(child => replaceText(child, replacer))
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>
    return React.cloneElement(el, {
      children: replaceText(el.props.children, replacer),
    })
  }
  return node
}

export const Pre = ({ children }: MDXProps) => {
  const child = React.Children.only(children) as React.ReactElement
  const childProps = child?.props as Record<string, unknown>
  const className = (childProps?.className as string) || ''
  const isBash = className.includes('language-bash')

  if (!isBash) return <pre>{children}</pre>

  const fullText = extractText(childProps.children as React.ReactNode)
  const lines = fullText.split('\n')
  const promptLines = new Set<number>()
  lines.forEach((line, i) => {
    if (line.startsWith('> ')) promptLines.add(i)
  })

  let currentLine = 0
  let keyCounter = 0
  const transformed = replaceText(childProps.children as React.ReactNode, text => {
    const parts: React.ReactNode[] = []
    let buf = ''
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]
      if (ch === '\n') {
        buf += '\n'
        currentLine++
      } else if (buf.length === 0 || buf[buf.length - 1] === '\n') {
        if (promptLines.has(currentLine) && text.slice(i, i + 2) === '> ') {
          if (buf) {
            parts.push(buf)
            buf = ''
          }
          parts.push(
            <span key={`prompt-${keyCounter++}`} style={{ color: 'navy' }}>
              ${' '}
            </span>,
          )
          i += 1
        } else {
          buf += ch
        }
      } else {
        buf += ch
      }
    }
    if (buf) parts.push(buf)
    return parts
  })

  return (
    <pre>
      {React.cloneElement(child as React.ReactElement<{ children?: React.ReactNode }>, {
        children: transformed,
      })}
    </pre>
  )
}

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
  pre: Pre,
  hr: Hr,
}
