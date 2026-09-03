import type { ElementType, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  pad?: boolean
  as?: ElementType
}

export default function GlassCard({ children, className = '', pad = false, as }: Props) {
  const Tag = as ?? 'div'
  const cls = ['glass', pad ? 'glass--pad' : '', className].filter(Boolean).join(' ')
  return <Tag className={cls}>{children}</Tag>
}
