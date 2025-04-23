// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 | Page Not Found</h1>
      <p className="mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className="cursor-pointer">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}
