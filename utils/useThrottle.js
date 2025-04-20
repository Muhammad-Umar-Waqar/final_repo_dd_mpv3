// utils/useThrottle.js
import { useState, useEffect, useRef } from 'react';

/**
 * Throttles updates to `value` so that it only changes
 * at most once every `limit` ms.
 */
export default function useThrottle(value, limit = 300) {
  const [throttled, setThrottled] = useState(value);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = limit - (now - lastRun.current);

    if (remaining <= 0) {
      // time elapsed → update immediately
      setThrottled(value);
      lastRun.current = now;
    } else {
      // schedule update at the tail
      const timer = setTimeout(() => {
        setThrottled(value);
        lastRun.current = Date.now();
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [value, limit]);

  return throttled;
}
