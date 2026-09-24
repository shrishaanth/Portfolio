import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost';
  strength?: number;
  children: ReactNode;
};

/** Pill button that leans toward the cursor; label rolls over on hover. */
export default function MagneticLink({
  variant = 'primary',
  strength,
  className,
  children,
  ...rest
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(strength);
  return (
    <a
      ref={ref}
      className={['btn', `btn--${variant}`, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__inner">{children}</span>
    </a>
  );
}
