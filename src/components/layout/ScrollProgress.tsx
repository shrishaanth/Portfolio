import { useRef } from 'react';
import { useScrollFrame } from '../../hooks/useScrollFrame';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    ref.current?.style.setProperty('--p', p.toFixed(4));
  });
  return <div className="progress" ref={ref} aria-hidden="true" />;
}
