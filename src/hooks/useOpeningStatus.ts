import { useEffect, useState } from 'react';
import { isDechetLabOpen } from '../data/content';
import { useSite } from '../data/siteStore';

export function useOpeningStatus() {
  const { content } = useSite();
  const [status, setStatus] = useState(() => isDechetLabOpen(new Date(), content.profile));

  useEffect(() => {
    const refresh = () => setStatus(isDechetLabOpen(new Date(), content.profile));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [content.profile]);

  return status;
}