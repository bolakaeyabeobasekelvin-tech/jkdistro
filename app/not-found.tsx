import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-neutral-900 mb-4">404 - Not Found</h2>
      <Link href="/" className="bg-red-700 text-white px-8 py-3 font-bold uppercase hover:bg-red-800 transition-colors rounded-sm shadow-sm">
        Return Home
      </Link>
    </div>
  )
}
