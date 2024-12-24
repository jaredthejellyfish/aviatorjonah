import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIsInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export function useIsInView<T extends Element>(
  options: UseIsInViewOptions = {}
): [RefObject<T>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
        root: options.root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.root]);

  return [elementRef, isInView];
}
