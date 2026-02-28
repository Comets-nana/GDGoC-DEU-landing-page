import svgPaths from '../../imports/svg-jtwl1psh6o';

export function PanoramaCenterSlide() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Center Slide - 600x800 */}
      <div className="relative h-[800px] w-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Top Center - Four Dots Cluster */}
        <div className="absolute left-1/2 top-8 z-10 flex -translate-x-1/2 gap-3">
          <div className="h-3 w-3 rounded-full bg-[#4285F4]" />
          <div className="h-3 w-3 rounded-full bg-[#FD2B25]" />
          <div className="h-3 w-3 rounded-full bg-[#FFA600]" />
          <div className="h-3 w-3 rounded-full bg-[#00AA47]" />
        </div>

        {/* CENTER CONTENT - All Text Centered */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* Black Pill Header */}
          <div className="mb-6 inline-block rounded-full bg-black px-10 py-3">
            <p className="font-['Pretendard'] text-xl font-medium text-white">
              2026년 1학기
            </p>
          </div>

          {/* Main Title - COMING SOON */}
          <h1 className="mb-5 font-['Montserrat'] text-[80px] font-black leading-none text-black">
            COMING
            <br />
            SOON
          </h1>

          {/* Subtitle 1 - Who is Next Chapter? */}
          <h2 className="mb-3 font-['Montserrat'] text-4xl font-extrabold text-black">
            Who is Next
            <br />
            Chapter?
          </h2>

          {/* Subtitle 2 - Korean Text */}
          <p className="font-['Pretendard'] text-2xl font-medium text-black">
            GDGoC DEU
            <br />
            신규 멤버 모집
          </p>
        </div>

        {/* Bottom Logo - Center Portion */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2">
            {/* Google Circles */}
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-[#4285F4]" />
              <div className="ml-[-8px] h-6 w-6 rounded-full bg-[#FD2B25]" />
              <div className="ml-[-8px] h-6 w-6 rounded-full bg-[#FFA600]" />
              <div className="ml-[-8px] h-6 w-6 rounded-full bg-[#00AA47]" />
            </div>
            {/* Logo Text using SVG from Figma */}
            <div className="relative h-[30px] w-[180px]">
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
