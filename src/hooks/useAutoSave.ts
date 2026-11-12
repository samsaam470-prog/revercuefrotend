import { useEffect, useRef } from 'react';

export function useAutoSave(save: () => void, intervalMs = 60000) {
  const saved = useRef(save);
  saved.current = save;
  useEffect(() => { const id = setInterval(() => saved.current(), intervalMs); return () => clearInterval(id); }, [intervalMs]);
}
