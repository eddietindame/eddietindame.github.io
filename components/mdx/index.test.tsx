import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { extractText, replaceText, Pre } from '.'

describe('extractText', () => {
  it('extracts text from a plain string', () => {
    expect(extractText('hello')).toBe('hello')
  })

  it('extracts text from nested elements', () => {
    const node = (
      <span>
        hello <em>world</em>
      </span>
    )
    expect(extractText(node)).toBe('hello world')
  })

  it('returns empty string for null/undefined', () => {
    expect(extractText(null)).toBe('')
    expect(extractText(undefined)).toBe('')
  })

  it('converts numbers to strings', () => {
    expect(extractText(42)).toBe('42')
  })

  it('handles arrays of mixed nodes', () => {
    const nodes = ['foo', <span key="a">bar</span>, 'baz']
    expect(extractText(nodes)).toBe('foobarbaz')
  })
})

describe('replaceText', () => {
  it('replaces plain string text', () => {
    const result = replaceText('hello', text => [text.toUpperCase()])
    expect(result).toEqual(['HELLO'])
  })

  it('replaces text inside nested elements', () => {
    const node = <span>hello</span>
    const result = replaceText(node, text => [text.toUpperCase()])
    const html = ReactDOMServer.renderToStaticMarkup(result as React.ReactElement)
    expect(html).toBe('<span>HELLO</span>')
  })

  it('passes through non-string nodes unchanged', () => {
    expect(replaceText(null, () => ['x'])).toBeNull()
    expect(replaceText(42, () => ['x'])).toBe(42)
    expect(replaceText(true, () => ['x'])).toBe(true)
  })
})

describe('Pre component', () => {
  function render(el: React.ReactElement): string {
    return ReactDOMServer.renderToStaticMarkup(el)
  }

  it('passes through non-bash code blocks unchanged', () => {
    const html = render(
      <Pre>
        <code className="language-js">const x = 1</code>
      </Pre>,
    )
    expect(html).toContain('const x = 1')
    expect(html).not.toContain('$')
  })

  it('replaces > prefix with styled $ on bash code blocks', () => {
    const html = render(
      <Pre>
        <code className="language-bash">{`> echo hello`}</code>
      </Pre>,
    )
    expect(html).toContain('$ ')
    expect(html).toContain('echo hello')
    expect(html).not.toContain('&gt; ')
    expect(html).not.toContain('> echo')
  })

  it('styles the $ span with navy color', () => {
    const html = render(
      <Pre>
        <code className="language-bash">{`> echo hello`}</code>
      </Pre>,
    )
    expect(html).toContain('color:navy')
  })

  it('does not add $ to lines without > prefix', () => {
    const html = render(
      <Pre>
        <code className="language-bash">{`> echo hello\nsome output`}</code>
      </Pre>,
    )
    expect(html).toContain('some output')
    // Only one $ prompt
    const dollarCount = (html.match(/\$ /g) || []).length
    expect(dollarCount).toBe(1)
  })

  it('handles multiple prompt lines', () => {
    const html = render(
      <Pre>
        <code className="language-bash">{`> cmd1\n> cmd2`}</code>
      </Pre>,
    )
    const dollarCount = (html.match(/\$ /g) || []).length
    expect(dollarCount).toBe(2)
  })

  it('leaves blank lines alone', () => {
    const html = render(
      <Pre>
        <code className="language-bash">{`> cmd1\n\n> cmd2`}</code>
      </Pre>,
    )
    const dollarCount = (html.match(/\$ /g) || []).length
    expect(dollarCount).toBe(2)
  })

  it('handles highlighted spans (mixed children)', () => {
    const html = render(
      <Pre>
        <code className="language-bash">
          <span className="hljs-built_in">{`> echo`}</span>
          {' hello'}
        </code>
      </Pre>,
    )
    expect(html).toContain('$ ')
    expect(html).toContain('echo')
    expect(html).toContain('hello')
  })
})
