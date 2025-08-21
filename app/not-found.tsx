import Link from 'next/link';
import { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Page Not Found</h2>
      <p className="text-white-100 mb-8 text-center max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 rounded-lg bg-purple text-white font-medium hover:bg-opacity-90 transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}