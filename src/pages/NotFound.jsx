import { Link } from 'react-router-dom';
import { ArrowLeft, Dumbbell } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="brand-mark"><Dumbbell size={21} /></div>
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>This page took a rest.</h1>
      <p>Halaman yang kamu cari tidak tersedia atau alamatnya sudah berubah.</p>
      <Link to="/" className="button button-primary"><ArrowLeft size={16} /> Back to dashboard</Link>
    </main>
  );
}
