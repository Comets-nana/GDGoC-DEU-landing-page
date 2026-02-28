import svgPaths from '../../imports/svg-yos8aw1z4z';
import imgHero from 'figma:asset/dcdc3308ca777392ac349d588c47b69b45c86f16.png';
import imgQR from 'figma:asset/c97689eed4ae702b08a612dcac78b384f937ff06.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RecruitmentLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <header className="px-4 py-6 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            {/* Google Circles */}
            <div className="flex items-center">
              <div className="h-7 w-7 rounded-full bg-[#4285F4] md:h-8 md:w-8" />
              <div className="ml-[-10px] h-7 w-7 rounded-full bg-[#FD2B25] md:h-8 md:w-8" />
              <div className="ml-[-10px] h-7 w-7 rounded-full bg-[#FFA600] md:h-8 md:w-8" />
              <div className="ml-[-10px] h-7 w-7 rounded-full bg-[#00AA47] md:h-8 md:w-8" />
            </div>
            {/* Logo SVG */}
            <div className="relative h-[30px] w-[180px] md:h-[39px] md:w-[239px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 239 39">
                <g>
                  <path d={svgPaths.p2f6a5d00} fill="#FD2B25" />
                  <path d={svgPaths.p3188f800} fill="#1E1E1E" />
                  <path d={svgPaths.pd71fa00} fill="#1E1E1E" />
                  <path d={svgPaths.p5c02080} fill="#1E1E1E" />
                  <path d={svgPaths.p2e414100} fill="#1E1E1E" />
                  <path d={svgPaths.p26ad9e80} fill="#1E1E1E" />
                  <path d={svgPaths.p1995f700} fill="#1E1E1E" />
                  <path d={svgPaths.p3ee40280} fill="#1E1E1E" />
                  <path d={svgPaths.p1a10f00} fill="#1E1E1E" />
                  <path d={svgPaths.p2e1eec40} fill="#1E1E1E" />
                  <path d={svgPaths.p2212a100} fill="#1E1E1E" />
                  <path d={svgPaths.p2c258000} fill="#1E1E1E" />
                  <path d={svgPaths.p16afbd00} fill="#1E1E1E" />
                  <path d={svgPaths.p7e3ec80} fill="#1E1E1E" />
                  <path d={svgPaths.p28dc8c30} fill="#1E1E1E" />
                  <path d={svgPaths.p1f48ee00} fill="#1F86FB" />
                  <path d={svgPaths.p2bb7ba00} fill="#1E1E1E" />
                  <path d={svgPaths.p1da1d900} fill="#00AA47" />
                  <path d={svgPaths.pcc25c00} fill="#1E1E1E" />
                  <path d={svgPaths.p2aa12700} fill="#1E1E1E" />
                  <path d={svgPaths.p1be63e00} fill="#FFA600" />
                  <path d={svgPaths.p1a7d2680} fill="#1E1E1E" />
                  <path d={svgPaths.p2cc37400} fill="#1E1E1E" />
                  <path d={svgPaths.p276d4c0} fill="#4285F4" />
                  <path d={svgPaths.paa6f100} fill="black" />
                  <path d={svgPaths.p38b92700} fill="#1E1E1E" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            {/* Left Content */}
            <div className="z-10">
              {/* Semester Badge */}
              <div className="mb-6 inline-block rounded-full bg-black px-8 py-3 md:px-10 md:py-4">
                <p className="font-['Pretendard'] text-xl font-medium text-white md:text-2xl lg:text-3xl">
                  2026년 1학기
                </p>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6 font-['Montserrat'] text-5xl font-extrabold leading-tight text-black md:text-6xl lg:text-7xl">
                Chapter
                <br />
                Member
                <br />
                Recruiting
              </h1>

              {/* Subtext */}
              <p className="font-['Pretendard'] text-xl text-gray-800 md:text-2xl">
                GDGoC DEU 신규 멤버 모집
              </p>
            </div>

            {/* Right - 3D Glassmorphism Graphics */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative h-[400px] w-full max-w-[500px] md:h-[500px] lg:h-[600px]">
                <img 
                  src={imgHero} 
                  alt="3D Glass Objects" 
                  className="absolute inset-0 size-full -rotate-[30deg] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid Section */}
      <section className="px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Activities Section */}
            <div className="group">
              {/* Section Header */}
              <div className="mb-6 inline-block rounded-full bg-black px-8 py-3 transition-all hover:scale-105">
                <h2 className="font-['Pretendard'] text-xl font-bold text-white md:text-2xl">
                  활동 내용
                </h2>
              </div>

              {/* Activities List */}
              <ul className="ml-6 space-y-3 font-['Pretendard'] text-base text-gray-800 md:text-lg">
                <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                  지속적인 스터디 활동
                </li>
                <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                  프로젝트 진행
                </li>
                <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                  <span className="font-bold text-[#1F86FB]">G</span>
                  <span className="font-bold text-[#FD2B25]">o</span>
                  <span className="font-bold text-[#FFA600]">o</span>
                  <span className="font-bold text-[#1F86FB]">g</span>
                  <span className="font-bold text-[#00AA47]">l</span>
                  <span className="font-bold text-[#FD2B25]">e</span>
                  <span> 개발자 커뮤니티 행사 참여</span>
                </li>
                <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                  비정기적인 세미나 등 이벤트 진행
                </li>
              </ul>

              {/* Decorative Glass Shapes - Activities */}
              <div className="relative mt-8 h-24">
                <div 
                  className="absolute left-0 top-0 h-20 w-20 rounded-[20px] bg-gradient-to-br from-[#4285F4]/80 to-[#1F86FB]/60"
                  style={{
                    boxShadow: '0 15px 30px -8px rgba(66, 133, 244, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
                  }}
                />
                <div 
                  className="absolute left-16 top-4 h-16 w-16 rotate-12 rounded-[20px] bg-gradient-to-br from-[#FD2B25]/80 to-[#FF6B6B]/60"
                  style={{
                    boxShadow: '0 15px 30px -8px rgba(253, 43, 37, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
                  }}
                />
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="group">
              {/* Section Header */}
              <div className="mb-6 inline-block rounded-full bg-black px-8 py-3 transition-all hover:scale-105">
                <h2 className="font-['Pretendard'] text-xl font-bold text-white md:text-2xl">
                  지원 자격
                </h2>
              </div>

              {/* Eligibility List */}
              <ul className="ml-6 space-y-3 font-['Pretendard'] text-base text-gray-800 md:text-lg">
                <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                  <span className="rounded-md bg-[#0B3D91] px-2 py-1 font-semibold text-white">
                    동의대학교 학부생
                  </span>{' '}
                  (재·휴학생) 누구나!
                </li>
                <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                  전공·실력과 무관하게{' '}
                  <span className="rounded-md bg-[#FD2B25] px-2 py-1 font-bold text-white">
                    열정 가득한 분
                  </span>{' '}
                  들을 기다립니다.
                </li>
              </ul>

              {/* Decorative Glass Shapes - Eligibility */}
              <div className="relative mt-8 h-24">
                <div 
                  className="absolute right-16 top-0 h-20 w-20 -rotate-12 rounded-[20px] bg-gradient-to-br from-[#00AA47]/80 to-[#34A853]/60"
                  style={{
                    boxShadow: '0 15px 30px -8px rgba(0, 170, 71, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
                  }}
                />
                <div 
                  className="absolute right-0 top-4 h-16 w-16 rotate-6 rounded-[20px] bg-gradient-to-br from-[#FFA600]/80 to-[#FFD700]/60"
                  style={{
                    boxShadow: '0 15px 30px -8px rgba(255, 166, 0, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="bg-gray-50 px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            {/* Section Header */}
            <div className="mb-8 inline-block rounded-full bg-black px-8 py-3 transition-all hover:scale-105">
              <h2 className="font-['Pretendard'] text-xl font-bold text-white md:text-2xl">
                모집 일정
              </h2>
            </div>

            {/* Schedule List */}
            <ul className="ml-6 space-y-4 font-['Pretendard'] text-base text-gray-800 md:text-lg">
              <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                <span className="font-semibold">지원 접수</span> : 3월 3일(화) ~ 3월 12일(목)
              </li>
              <li className="list-disc transition-all hover:translate-x-1 hover:text-black">
                <span className="font-semibold">결과 안내</span> : 3월 13일(금) 이후 개별 연락
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
              {/* Left - Text and Button */}
              <div className="text-center md:text-left">
                <div className="mb-6 inline-block rounded-full bg-black px-8 py-3 transition-all hover:scale-105">
                  <h2 className="font-['Pretendard'] text-xl font-bold text-white md:text-2xl">
                    지원 · 문의
                  </h2>
                </div>

                <p className="mb-6 font-['Pretendard'] text-base text-gray-700 md:text-lg">
                  QR 코드를 스캔하여,
                  <br />
                  간편하게 지원하세요!
                </p>

                <button className="group rounded-full bg-gradient-to-r from-[#4285F4] to-[#1F86FB] px-8 py-4 font-['Pretendard'] text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                  지금 지원하기
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              {/* Right - QR Code */}
              <div className="flex flex-col items-center gap-4">
                <div className="overflow-hidden rounded-2xl border-2 border-black shadow-lg">
                  <img 
                    src={imgQR} 
                    alt="QR Code for Application" 
                    className="size-[150px] md:size-[180px]"
                  />
                </div>
                <p className="font-['Pretendard'] text-sm text-gray-600">스캔하여 지원하기</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Decorative Elements */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8 flex justify-center gap-4">
            <div className="h-4 w-4 rounded-full bg-[#4285F4]" />
            <div className="h-4 w-4 rounded-full bg-[#FD2B25]" />
            <div className="h-4 w-4 rounded-full bg-[#FFA600]" />
            <div className="h-4 w-4 rounded-full bg-[#00AA47]" />
          </div>
          
          <p className="font-['Pretendard'] text-sm text-gray-600">
            © 2026 Google Developer Groups on Campus - Dong-Eui University
          </p>
        </div>

        {/* Decorative Background Shapes */}
        <div 
          className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#4285F4]/20 to-[#1F86FB]/10 blur-3xl"
        />
        <div 
          className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#FD2B25]/20 to-[#FF6B6B]/10 blur-3xl"
        />
      </footer>
    </div>
  );
}
