'use client';

import { useEffect } from 'react';

/**
 * 전역 에러 핸들러
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">오류 발생</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        페이지를 불러오는 중 오류가 발생했습니다
      </h2>
      <div className="mb-8 p-4 bg-red-50 rounded-lg">
        <p className="text-red-700 font-mono text-sm">
          {error.message}
        </p>
      </div>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
