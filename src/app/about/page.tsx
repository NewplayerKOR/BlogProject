import { getPostsByCategory } from '@/lib/posts';

/**
 * 자기소개 페이지
 */
export const metadata = {
  title: '자기소개 | NewplayerKOR 블로그',
  description: 'NewplayerKOR을 소개합니다.',
};

export default function AboutPage() {
  const posts = getPostsByCategory('자기소개');
  const aboutPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* 헤더 */}
      <header className="mb-12 text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-6xl font-bold text-white">NK</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          NewplayerKOR
        </h1>
        <p className="text-xl text-gray-600">
          개발자 / 학습자 / 문제 해결사
        </p>
      </header>

      {/* 소개 내용 */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👋 안녕하세요</h2>
          <p className="text-gray-700 leading-relaxed">
            끊임없이 배우고 성장하는 개발자 NewplayerKOR입니다. 
            이 블로그는 제가 학습한 내용과 경험을 기록하고 공유하기 위해 만들었습니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💻 기술 스택</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'JavaScript',
              'TypeScript',
              'React',
              'Next.js',
              'Node.js',
              'Git',
            ].map((skill) => (
              <div
                key={skill}
                className="px-4 py-3 bg-gray-100 rounded-lg text-center font-medium text-gray-700"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 관심사</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 웹 프론트엔드 개발</li>
            <li>• 사용자 경험 (UX) 개선</li>
            <li>• 성능 최적화</li>
            <li>• 코드 품질과 유지보수성</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📬 연락처</h2>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/NewplayerKOR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 블로그 소개</h2>
          <p className="text-gray-700 leading-relaxed">
            이 블로그는 <strong>Next.js 16</strong>, <strong>React 19</strong>, 
            <strong>TypeScript</strong>로 직접 구축했습니다. 
            학습한 내용을 기록하고, 문제 해결 과정을 공유하며, 
            프로젝트 경험을 정리하는 공간입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
