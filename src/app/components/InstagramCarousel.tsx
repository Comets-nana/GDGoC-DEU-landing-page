import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const slides = [
  { id: 1, name: 'Slide 1' },
  { id: 2, name: 'Slide 2' },
  { id: 3, name: 'Slide 3' },
  { id: 4, name: 'Slide 4' },
  { id: 5, name: 'Slide 5' },
];

export function InstagramCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Carousel Container - 3:4 Aspect Ratio */}
      <div className="relative w-full max-w-[600px]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Slide 1: Thumbnail */}
          {currentSlide === 0 && (
            <div className="absolute inset-0 bg-white">
              {/* Google Logo */}
              <div className="absolute left-8 top-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-[#4285F4]" />
                    <div className="ml-[-8px] h-6 w-6 rounded-full bg-[#FD2B25]" />
                  </div>
                  <span className="font-['Montserrat'] text-sm font-bold text-gray-800">
                    Google Developer Groups
                  </span>
                </div>
              </div>

              {/* 3D Glass Shapes Background */}
              <div className="absolute right-[-10%] top-[-15%] h-[600px] w-[600px] opacity-90">
                <img
                  src="https://images.unsplash.com/photo-1696041757950-62e2c030283b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tbXVuaXR5JTIwZ3JvdXAlMjBwZW9wbGV8ZW58MXx8fHwxNzcxNjI0ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt=""
                  className="size-full -rotate-30 object-contain"
                />
              </div>

              {/* Black Pill Header */}
              <div className="absolute left-8 top-28 rounded-full bg-black px-8 py-3">
                <p className="font-['Pretendard'] text-xl font-medium text-white">
                  2026년 1학기
                </p>
              </div>

              {/* Main Title */}
              <div className="absolute left-8 top-52">
                <h1 className="font-['Montserrat'] text-6xl font-extrabold leading-tight text-black">
                  Chapter
                  <br />
                  Member
                  <br />
                  Recruiting
                </h1>
              </div>

              {/* Subtitle */}
              <div className="absolute bottom-32 left-8">
                <p className="font-['Pretendard'] text-2xl font-normal text-black">
                  GDGoC DEU 신규 멤버 모집
                </p>
              </div>
            </div>
          )}

          {/* Slide 2: Activity Details */}
          {currentSlide === 1 && (
            <div className="absolute inset-0 bg-white p-12">
              {/* Header with Pill */}
              <div className="mb-12 inline-block rounded-full bg-black px-10 py-4">
                <h2 className="font-['Pretendard'] text-3xl font-bold text-white">
                  활동 내용
                </h2>
              </div>

              {/* Abstract Shape - Blue */}
              <div className="absolute right-12 top-12 h-32 w-32 rounded-[40px] bg-gradient-to-br from-[#4285F4] to-[#1F86FB] opacity-70 blur-sm" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                  <p className="font-['Pretendard'] text-2xl font-medium text-black">
                    지속적인 스터디 활동
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                  <p className="font-['Pretendard'] text-2xl font-medium text-black">
                    프로젝트 진행
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                  <p className="font-['Pretendard'] text-2xl font-medium text-black">
                    <span className="font-bold text-[#4285F4]">G</span>
                    <span className="font-bold text-[#FD2B25]">o</span>
                    <span className="font-bold text-[#FFA600]">o</span>
                    <span className="font-bold text-[#4285F4]">g</span>
                    <span className="font-bold text-[#00AA47]">l</span>
                    <span className="font-bold text-[#FD2B25]">e</span>
                    {' 개발자 커뮤니티 행사 참여'}
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                  <p className="font-['Pretendard'] text-2xl font-medium text-black">
                    비정기적인 세미나 등 이벤트 진행
                  </p>
                </div>
              </div>

              {/* Abstract Shape - Red */}
              <div className="absolute bottom-24 right-16 h-40 w-40 rounded-[50px] bg-gradient-to-br from-[#FD2B25] to-[#FF6B6B] opacity-60 blur-sm" />

              {/* Abstract Shape - Yellow */}
              <div className="absolute bottom-12 left-12 h-28 w-28 rounded-full bg-gradient-to-br from-[#FFA600] to-[#FFD700] opacity-50 blur-sm" />
            </div>
          )}

          {/* Slide 3: Gallery */}
          {currentSlide === 2 && (
            <div className="absolute inset-0 bg-white p-12">
              {/* Header with Pill */}
              <div className="mb-12 inline-block rounded-full bg-black px-10 py-4">
                <h2 className="font-['Pretendard'] text-3xl font-bold text-white">
                  활동 갤러리
                </h2>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-3xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1696041757950-62e2c030283b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tbXVuaXR5JTIwZ3JvdXAlMjBwZW9wbGV8ZW58MXx8fHwxNzcxNjI0ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tech community"
                    className="size-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcxNjI0ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Workshop"
                    className="size-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGV2ZWxvcGVycyUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NzE2MjQ4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Hackathon"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-3xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759884247387-a5d791ffb2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3MTYyNDg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Team meeting"
                    className="size-full object-cover"
                  />
                </div>
              </div>

              {/* Abstract Shape - Green */}
              <div className="absolute bottom-8 right-8 h-36 w-36 rounded-[45px] bg-gradient-to-br from-[#00AA47] to-[#34A853] opacity-60 blur-sm" />
            </div>
          )}

          {/* Slide 4: Eligibility & Schedule */}
          {currentSlide === 3 && (
            <div className="absolute inset-0 bg-white p-12">
              {/* Section 1: Eligibility */}
              <div className="mb-12">
                <div className="mb-6 inline-block rounded-full bg-black px-10 py-4">
                  <h2 className="font-['Pretendard'] text-3xl font-bold text-white">
                    지원 자격
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                    <p className="font-['Pretendard'] text-2xl font-medium text-black">
                      <span className="font-semibold">동의대학교 학부생</span> (재·휴학생) 누구나!
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                    <p className="font-['Pretendard'] text-2xl font-medium text-black">
                      전공·실력과 무관하게{' '}
                      <span className="font-bold text-[#FD2B25]">열정 가득한 분</span>
                      들을 기다립니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Abstract Shape - Blue */}
              <div className="absolute right-8 top-[35%] h-32 w-32 rounded-full bg-gradient-to-br from-[#4285F4] to-[#1F86FB] opacity-60 blur-sm" />

              {/* Section 2: Schedule */}
              <div className="mt-16">
                <div className="mb-6 inline-block rounded-full bg-black px-10 py-4">
                  <h2 className="font-['Pretendard'] text-3xl font-bold text-white">
                    모집 일정
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                    <p className="font-['Pretendard'] text-2xl font-medium text-black">
                      <span className="font-semibold">지원 접수</span> : 3월 3일(화) ~
                      3월 12일(목)
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                    <p className="font-['Pretendard'] text-2xl font-medium text-black">
                      <span className="font-semibold">결과 안내</span> : 3월 13일(금)
                      이후 개별 연락
                    </p>
                  </div>
                </div>
              </div>

              {/* Abstract Shape - Yellow/Red */}
              <div className="absolute bottom-12 left-8 h-36 w-36 rounded-[45px] bg-gradient-to-br from-[#FFA600] to-[#FD2B25] opacity-50 blur-sm" />
            </div>
          )}

          {/* Slide 5: Final CTA */}
          {currentSlide === 4 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-12">
              {/* Header */}
              <div className="mb-16 inline-block rounded-full bg-black px-12 py-4">
                <h2 className="font-['Pretendard'] text-3xl font-bold text-white">
                  지원 · 문의
                </h2>
              </div>

              {/* QR Code */}
              <div className="relative mb-12">
                <div className="overflow-hidden rounded-3xl border-4 border-black">
                  <img
                    src="https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcxNjI0ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="QR Code"
                    className="h-80 w-80 object-cover"
                  />
                </div>

                {/* Decorative shapes around QR */}
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#4285F4] to-[#1F86FB] opacity-60 blur-md" />
                <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-[35px] bg-gradient-to-br from-[#FD2B25] to-[#FF6B6B] opacity-60 blur-md" />
                <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-br from-[#FFA600] to-[#FFD700] opacity-50 blur-md" />
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-[30px] bg-gradient-to-br from-[#00AA47] to-[#34A853] opacity-50 blur-md" />
              </div>

              {/* CTA Text */}
              <p className="text-center font-['Pretendard'] text-xl font-bold text-black">
                QR 코드를 스캔하여,
                <br />
                간편하게 지원하세요!
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-black' : 'w-2 bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}