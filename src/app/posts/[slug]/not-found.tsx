import Link from 'next/link';

/**
 * 포스트를 찾을 수 없을 때 표시되는 404 페이지
 */
export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        포스트를 찾을 수 없습니다
      </h2>
      <p className="text-gray-600 mb-8">
        요청하신 포스트가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
