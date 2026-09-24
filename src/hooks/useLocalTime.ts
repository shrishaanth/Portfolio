import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** Current time in Coimbatore (IST), as HH:MM. */
export function useLocalTime(): string {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setNow(fmt.format(new Date())), 10_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}
