import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop() {
  const router = useRouter();
  useEffect(() => {
    const scroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    router.events.on('routeChangeComplete', scroll);
    return () => router.events.off('routeChangeComplete', scroll);
  }, [router.events]);
  return null;
}
