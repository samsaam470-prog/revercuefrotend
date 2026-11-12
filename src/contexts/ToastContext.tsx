import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }
interface ToastContextType { toasts: Toast[]; toast: (message: string, type?: Toast['type']) => void; }
const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = (message: string, type: Toast['type'] = 'info') => { const id = crypto.randomUUID(); setToasts((t) => [...t, { id, message, type }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000); };
  return <ToastContext.Provider value={{ toasts, toast }}>{children}</ToastContext.Provider>;
}

export function useToast() { const ctx = useContext(ToastContext); if (!ctx) throw new Error('useToast must be inside ToastProvider'); return ctx; }
