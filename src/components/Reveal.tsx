import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type RevealTag = 'div' | 'article' | 'p' | 'form';

interface RevealProps {
  as?: RevealTag;
  small?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

/** Wraps a block with the .reveal scroll-in-view treatment used across the page. */
export default function Reveal({ as = 'div', small, className, id, style, children }: RevealProps) {
  const { ref, className: revealClass } = useReveal<HTMLElement>(small);
  const Tag = as as unknown as 'div';

  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      id={id}
      style={style}
      className={[revealClass, className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
