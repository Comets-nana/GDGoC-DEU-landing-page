import svgPaths from '../../imports/svg-jtwl1psh6o';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudyIntroductionProps {
  studyName?: string;
  studyDescription?: string;
  imageUrl?: string;
  recruitmentPeriod?: string;
}

export function StudyIntroduction({ 
  studyName = "Android 개발 스터디",
  studyDescription = "Kotlin과 Jetpack Compose를 활용한 모던 Android 앱 개발을 배우고, 실제 프로젝트를 통해 협업 능력을 키워나가는 스터디입니다.",
  imageUrl = "https://images.unsplash.com/photo-1758270705290-62b6294dd044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudCUyMGdyb3VwJTIwc3R1ZHklMjB0b2dldGhlcnxlbnwxfHx8fDE3NzE3NjU5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  recruitmentPeriod = "2026. 02. 24 ~ 2026. 03. 07"
}: StudyIntroductionProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Template: Study Introduction - 600x800 */}
      <div className="relative h-[800px] w-[600px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Glass Effect Shapes - Scattered Background */}
        <div className="absolute inset-0">
          {/* Blue Glass Shape - Top Left */}
          <div 
            className="absolute -left-10 top-12 h-[280px] w-[280px] -rotate-[25deg] rounded-[60px]"
            style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(66, 133, 244, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Yellow Glass Shape - Left Center */}
          <div 
            className="absolute left-[50px] top-[300px] h-[200px] w-[200px] rotate-[35deg] rounded-[50px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(255, 166, 0, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Green Glass Shape - Bottom Left */}
          <div 
            className="absolute -left-8 bottom-12 h-[240px] w-[240px] -rotate-[15deg] rounded-[55px]"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 170, 71, 0.8) 0%, rgba(52, 168, 83, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 170, 71, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Red Glass Shape - Top Right */}
          <div 
            className="absolute -right-10 top-[80px] h-[300px] w-[220px] rotate-[15deg] rounded-[70px]"
            style={{
              background: 'linear-gradient(135deg, rgba(253, 43, 37, 0.8) 0%, rgba(255, 107, 107, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(253, 43, 37, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Blue Glass Shape - Right Center */}
          <div 
            className="absolute right-[60px] top-[380px] h-[220px] w-[220px] -rotate-[30deg] rounded-[55px]"
            style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(66, 133, 244, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Yellow Glass Shape - Bottom Right */}
          <div 
            className="absolute -right-8 bottom-[60px] h-[260px] w-[260px] rotate-[25deg] rounded-[60px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(255, 166, 0, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
        </div>

        {/* Content - Centered with Z-index */}
        <div className="absolute inset-0 z-10 flex flex-col items-center px-12 pt-16">
          {/* Top Dots */}
          <div className="mb-6 flex gap-3">
            <div className="h-3 w-3 rounded-full bg-[#4285F4]" />
            <div className="h-3 w-3 rounded-full bg-[#FD2B25]" />
            <div className="h-3 w-3 rounded-full bg-[#FFA600]" />
            <div className="h-3 w-3 rounded-full bg-[#00AA47]" />
          </div>

          {/* Black Pill Label */}
          <div className="mb-8 inline-block rounded-full bg-black px-10 py-3">
            <p className="font-['Pretendard'] text-xl font-medium text-white">
              2026년 1학기 스터디
            </p>
          </div>

          {/* Group Photo */}
          <div className="mb-8 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/50">
            <ImageWithFallback
              src={imageUrl}
              alt={studyName}
              className="h-[280px] w-[400px] object-cover"
            />
          </div>

          {/* Study Name */}
          <h1 className="mb-6 text-center font-['Pretendard'] text-5xl font-black leading-tight text-black">
            {studyName}
          </h1>

          {/* Study Description */}
          <p className="mb-5 text-center font-['Pretendard'] text-lg leading-relaxed text-gray-800">
            {studyDescription}
          </p>

          {/* Recruitment Period */}
          <div className="flex items-center gap-3">
            <div className="inline-block rounded-full bg-black px-6 py-2">
              <p className="font-['Pretendard'] text-base font-medium text-white">
                모집 기간
              </p>
            </div>
            <p className="font-['Pretendard'] text-lg font-semibold text-gray-900">
              {recruitmentPeriod}
            </p>
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2">
            {/* Google Circles */}
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-[#4285F4]" />
              <div className="ml-[-8px] h-5 w-5 rounded-full bg-[#FD2B25]" />
              <div className="ml-[-8px] h-5 w-5 rounded-full bg-[#FFA600]" />
              <div className="ml-[-8px] h-5 w-5 rounded-full bg-[#00AA47]" />
            </div>
            {/* Logo SVG */}
            <div className="relative h-[26px] w-[160px]">
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
      </div>
    </div>
  );
}