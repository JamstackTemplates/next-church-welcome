'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function BoardFrame({ children }: { children: ReactNode }) {
  const board = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = board.current;
    if (!element || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.inView = '';
      observer.disconnect();
    }, { threshold: .15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section className="hymn-board" ref={board}>{children}</section>;
}
