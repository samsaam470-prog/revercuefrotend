import { useState, useEffect } from 'react';
import { notificationsApi } from '../api/notifications';

export function useNotifications() {
  const [count, setCount] = useState(0);
  useEffect(() => { notificationsApi.unreadCount().then((r: any) => setCount(r.count ?? 0)).catch(() => {}); }, []);
  return { count, setCount };
}
