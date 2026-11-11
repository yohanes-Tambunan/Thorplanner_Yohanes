import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function Toast() {
  const { toast, dismissToast } = useGym();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(dismissToast, 3200);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;
  const Icon = toast.type === 'error' ? AlertCircle : CheckCircle2;

  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <Icon size={18} />
      <span>{toast.message}</span>
      <button type="button" onClick={dismissToast} aria-label="Tutup notifikasi"><X size={16} /></button>
    </div>
  );
}
