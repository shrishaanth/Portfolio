import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  to?: string
  href?: string
  download?: boolean | string
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  download,
  className = '',
}: Props) {
  const cls = `btn btn--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls}>
      {children}
    </button>
  )
}
