import React, { PropsWithChildren } from 'react'
import { cn } from 'lib/utils'

type LayoutProps = PropsWithChildren & {
  className?: string
  narrow?: boolean
}

export const Layout = ({ children, className, narrow }: LayoutProps) => (
  <div
    className={cn(
      className,
      'fade-children-in mx-auto mb-16 flex min-h-full flex-col gap-2 px-4 pt-8 pb-16 font-serif text-xl sm:px-0 sm:pt-16 sm:pb-32',
      narrow ? 'max-w-xl' : 'max-w-3xl',
    )}
  >
    {children}
  </div>
)
