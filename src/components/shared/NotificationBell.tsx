export function NotificationBell({ count = 0 }: { count?: number }) { return (<button className="bell" aria-label="Notifications">{count > 0 && <span className="badge">{count}</span>}</button>); }
