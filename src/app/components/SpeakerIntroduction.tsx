import svgPaths from '../../imports/svg-jtwl1psh6o';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SpeakerIntroductionProps {
  speakerName?: string;
  presentationTitle?: string;
  description?: string;
  speakerImageUrl?: string;
}

export function SpeakerIntroduction({
  speakerName = "김철수",
  presentationTitle = "Google Cloud Platform 실전 활용",
  description = "실무에서 활용하는 GCP 서비스들과 클라우드 아키텍처 설계 방법에 대해 배워봅니다. Firebase, Cloud Functions, Cloud Run 등 다양한 서비스를 다룹니다.",
  speakerImageUrl = "https://images.unsplash.com/photo-1733222765056-b0790217baa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzcGVha2VyJTIwcHJlc2VudGluZyUyMHRlY2h8ZW58MXx8fHwxNzcxNzMyNzUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
}: SpeakerIntroductionProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Template 2: Speaker Introduction - 600x800 */}
      <div className="relative h-[800px] w-[600px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Glass Effect Shapes - Background (Subtle) */}
        <div className="absolute inset-0">
          {/* Blue Glass Shape - Top Right */}
          <div 
            className="absolute -right-12 top-8 h-[180px] w-[180px] rotate-[20deg] rounded-[45px] opacity-70"
            style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.6) 0%, rgba(31, 134, 251, 0.4) 100%)',
              boxShadow: '0 20px 40px -10px rgba(66, 133, 244, 0.4), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Red Glass Shape - Bottom Left */}
          <div 
            className="absolute -left-10 bottom-12 h-[200px] w-[200px] -rotate-[15deg] rounded-[50px] opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(253, 43, 37, 0.6) 0%, rgba(255, 107, 107, 0.4) 100%)',
              boxShadow: '0 20px 40px -10px rgba(253, 43, 37, 0.4), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Yellow Glass Shape - Bottom Right */}
          <div 
            className="absolute -right-8 bottom-[100px] h-[160px] w-[160px] rotate-[25deg] rounded-[40px] opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.6) 0%, rgba(255, 215, 0, 0.4) 100%)',
              boxShadow: '0 20px 40px -10px rgba(255, 166, 0, 0.4), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Green Glass Shape - Top Left */}
          <div 
            className="absolute -left-8 top-[120px] h-[140px] w-[140px] -rotate-[20deg] rounded-[35px] opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 170, 71, 0.6) 0%, rgba(52, 168, 83, 0.4) 100%)',
              boxShadow: '0 20px 40px -10px rgba(0, 170, 71, 0.4), inset 0 2px 15px rgba(255, 255, 255, 0.4)'
            }} 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center px-8 py-16">
          {/* Top Label */}
          <div className="mb-8 inline-block rounded-full bg-black px-8 py-3">
            <p className="font-['Pretendard'] text-lg font-medium text-white">
              Speaker
            </p>
          </div>

          {/* Speaker Photo - Large Rounded */}
          <div className="mb-8 overflow-hidden rounded-[40px] border-4 border-gray-100 shadow-2xl">
            <ImageWithFallback 
              src={speakerImageUrl}
              alt={speakerName}
              className="h-[280px] w-[280px] object-cover"
            />
          </div>

          {/* Speaker Name */}
          <h2 className="mb-3 text-center font-['Pretendard'] text-3xl font-bold text-black">
            {speakerName}
          </h2>

          {/* Presentation Title */}
          <div className="mb-6 text-center">
            <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-[#4285F4] to-[#1F86FB] px-6 py-2">
              <p className="font-['Pretendard'] text-sm font-semibold text-white">
                발표 주제
              </p>
            </div>
            <h3 className="font-['Pretendard'] text-2xl font-bold text-gray-900">
              {presentationTitle}
            </h3>
          </div>

          {/* Description */}
          <div className="max-w-md text-center">
            <p className="font-['Pretendard'] text-base leading-relaxed text-gray-700">
              {description}
            </p>
          </div>

          {/* Decorative Dots */}
          <div className="mt-auto flex gap-2">
            <div className="h-2 w-2 rounded-full bg-[#4285F4]" />
            <div className="h-2 w-2 rounded-full bg-[#FD2B25]" />
            <div className="h-2 w-2 rounded-full bg-[#FFA600]" />
            <div className="h-2 w-2 rounded-full bg-[#00AA47]" />
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2">
            {/* Google Circles */}
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#4285F4]" />
              <div className="ml-[-6px] h-4 w-4 rounded-full bg-[#FD2B25]" />
              <div className="ml-[-6px] h-4 w-4 rounded-full bg-[#FFA600]" />
              <div className="ml-[-6px] h-4 w-4 rounded-full bg-[#00AA47]" />
            </div>
            {/* Logo SVG */}
            <div className="relative h-[22px] w-[140px]">
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
