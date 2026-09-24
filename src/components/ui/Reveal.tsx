import { createElement, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type Props = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  variant?: 'up' | 'fade' | 'scale' | 'clip';
  children?: ReactNode;
};

/** Fades/slides its content in the first time it scrolls into view. */
export default function Reveal({
  as = 'div',
  delay = 0,
  variant = 'up',
  className,
  style,
  children,
  ...rest
}: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ...rest,
      ref,
      className: ['reveal', `reveal--${variant}`, inView && 'is-in', className]
        .filter(Boolean)
        .join(' '),
      style: { ...style, '--d': `${delay}ms` } as CSSProperties,
    },
    // the clip lives on an inner wrapper: Chrome's IntersectionObserver treats a
    // fully clip-pathed target as not intersecting, so it would never reveal
    variant === 'clip' ? <span className="reveal__clip">{children}</span> : children,
  );
}
