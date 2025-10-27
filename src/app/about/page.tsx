import { getPostsByCategory } from '@/lib/posts';
import Image from "next/image";

/**
 * 자기소개 페이지
 */
export const metadata = {
  title: '자기소개 | NewplayerKOR 블로그',
  description: '박태규(NewplayerKOR)를 소개합니다.',
};

export default function AboutPage() {
  const posts = getPostsByCategory('자기소개');
  const aboutPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* 헤더 */}
      <header className="mb-12 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
              <Image
                  src="https://pub-8645696b761c495498795a6b2b48c318.r2.dev/ProfileImage/DrawProfile.png" // ✅ 여기에 본인 R2 이미지 URL 넣기
                  alt="프로필 이미지"
                  fill // 부모 div 크기(w-32 h-32)에 맞춰 꽉 채우기
                  sizes="128px" // 이미지 최적화용
                  className="object-cover" // 이미지 비율 유지하며 꽉 채움
                  priority // 초기 렌더링 시 미리 로드
              />
          </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          박태규 (NewplayerKOR)
        </h1>
        <p className="text-xl text-gray-600">
          백엔드 개발자
        </p>
      </header>

      {/* 소개 내용 */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👋 안녕하세요</h2>
          <p className="text-black leading-relaxed">
            끊임없이 배우고 성장하는 백엔드 개발자 박태규입니다. 
            이 블로그는 제가 학습한 내용과 경험을 기록하고 공유하기 위해 운영하고 있습니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💻 기술 스택</h2>
          
          {/* 백엔드 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Backend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Java',
                'Spring Boot',
                'JPA',
                'REST API',
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-center font-medium text-green-800"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* 데이터베이스 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Database</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'MySQL',
                'AWS RDS',
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-center font-medium text-blue-800"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* 인프라 & 클라우드 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Infrastructure & Cloud</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'AWS EC2',
                'AWS S3',
                'GCP Compute Engine',
                'GCP Storage',
                'Terraform',
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-center font-medium text-orange-800"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* 보안 & 인증 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Security & Auth</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Spring Security',
                'JWT',
                'OAuth',
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-center font-medium text-red-800"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">DevOps</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'GitHub Actions(CI/CD)'
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg text-center font-medium text-purple-800"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 관심사</h2>
          <ul className="space-y-2 text-black">
            <li>• 백엔드 개발</li>
            <li>• RESTful API 설계</li>
            <li>• 클라우드 인프라 구축</li>
            <li>• 보안 및 인증 시스템</li>
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
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 블로그 소개</h2>
          <p className="text-black leading-relaxed">
            학습한 내용을 기록하고, 문제 해결 과정을 공유하며, 
            프로젝트 경험을 정리하는 공간입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
