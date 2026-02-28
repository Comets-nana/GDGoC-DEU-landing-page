import svgPaths from '../../imports/svg-jtwl1psh6o';

export function InstagramBanner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      {/* Banner Container - 1800x800 */}
      <div className="relative h-[800px] w-[1800px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* GDG Logo - Top Left */}
        <div className="absolute left-12 top-12 z-10">
          <div className="flex items-center gap-3">
            {/* Google Circles */}
            <div className="flex items-center gap-[-4px]">
              <div className="h-8 w-8 rounded-full bg-[#4285F4]" />
              <div className="ml-[-10px] h-8 w-8 rounded-full bg-[#FD2B25]" />
              <div className="ml-[-10px] h-8 w-8 rounded-full bg-[#FFA600]" />
              <div className="ml-[-10px] h-8 w-8 rounded-full bg-[#00AA47]" />
            </div>
            {/* Logo Text using SVG from Figma */}
            <div className="relative h-[39px] w-[239px]">
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

        {/* LEFT SIDE - Floating Abstract Geometric Shapes */}
        <div className="absolute left-0 top-0 h-full w-[450px]">
          {/* Blue Circle */}
          <div className="absolute left-[50px] top-[200px] h-[120px] w-[120px] rounded-full bg-[#4285F4] opacity-90" />
          
          {/* Red Square */}
          <div className="absolute left-[100px] top-[450px] h-[100px] w-[100px] rotate-[20deg] rounded-[20px] bg-[#FD2B25] opacity-90" />
          
          {/* Yellow Circle */}
          <div className="absolute left-[180px] top-[250px] h-[80px] w-[80px] rounded-full bg-[#FFA600] opacity-85" />
          
          {/* Green Square */}
          <div className="absolute left-[30px] top-[600px] h-[90px] w-[90px] rotate-[-15deg] rounded-[18px] bg-[#00AA47] opacity-90" />
          
          {/* Small Blue Square */}
          <div className="absolute left-[250px] top-[580px] h-[60px] w-[60px] rotate-[35deg] rounded-[12px] bg-[#4285F4] opacity-80" />
          
          {/* Small Red Circle */}
          <div className="absolute left-[220px] top-[400px] h-[70px] w-[70px] rounded-full bg-[#FD2B25] opacity-75" />
          
          {/* Small Yellow Square */}
          <div className="absolute left-[40px] top-[350px] h-[55px] w-[55px] rotate-[45deg] rounded-[10px] bg-[#FFA600] opacity-80" />
        </div>

        {/* RIGHT SIDE - 3D Glass Shapes */}
        <div className="absolute -right-32 -top-32 z-0 h-[900px] w-[900px]">
          {/* Blue Glass Shape */}
          <div className="absolute right-[200px] top-[100px] h-[280px] w-[280px] -rotate-[25deg] rounded-[60px] bg-gradient-to-br from-[#4285F4]/80 to-[#1F86FB]/60 shadow-2xl backdrop-blur-sm" 
               style={{
                 background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)',
                 boxShadow: '0 25px 50px -12px rgba(66, 133, 244, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
               }} />
          
          {/* Red Glass Shape */}
          <div className="absolute right-[50px] top-[250px] h-[320px] w-[220px] rotate-[15deg] rounded-[70px] bg-gradient-to-br from-[#FD2B25]/80 to-[#FF6B6B]/60 shadow-2xl backdrop-blur-sm"
               style={{
                 background: 'linear-gradient(135deg, rgba(253, 43, 37, 0.8) 0%, rgba(255, 107, 107, 0.6) 100%)',
                 boxShadow: '0 25px 50px -12px rgba(253, 43, 37, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
               }} />
          
          {/* Yellow Glass Shape */}
          <div className="absolute right-[380px] top-[380px] h-[240px] w-[240px] rotate-[45deg] rounded-[50px] bg-gradient-to-br from-[#FFA600]/80 to-[#FFD700]/60 shadow-2xl backdrop-blur-sm"
               style={{
                 background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)',
                 boxShadow: '0 25px 50px -12px rgba(255, 166, 0, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
               }} />
          
          {/* Green Glass Shape */}
          <div className="absolute right-[120px] top-[550px] h-[260px] w-[260px] -rotate-[20deg] rounded-[55px] bg-gradient-to-br from-[#00AA47]/80 to-[#34A853]/60 shadow-2xl backdrop-blur-sm"
               style={{
                 background: 'linear-gradient(135deg, rgba(0, 170, 71, 0.8) 0%, rgba(52, 168, 83, 0.6) 100%)',
                 boxShadow: '0 25px 50px -12px rgba(0, 170, 71, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
               }} />
        </div>

        {/* CENTER CONTENT - All Text Center Aligned */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* Black Pill Header */}
          <div className="mb-8 inline-block rounded-full bg-black px-12 py-4">
            <p className="font-['Pretendard'] text-2xl font-medium text-white">
              2026년 1학기
            </p>
          </div>

          {/* Main Title - COMING SOON */}
          <h1 className="mb-6 font-['Montserrat'] text-[120px] font-black leading-none text-black">
            COMING SOON
          </h1>

          {/* Subtitle 1 - Who is Next Chapter? */}
          <h2 className="mb-4 font-['Montserrat'] text-5xl font-extrabold text-black">
            Who is Next Chapter?
          </h2>

          {/* Subtitle 2 - Korean Text */}
          <p className="font-['Pretendard'] text-3xl font-medium text-black">
            GDGoC DEU 신규 멤버 모집
          </p>
        </div>

        {/* Bottom Decorative Dots - Centered */}
        <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-4">
          <div className="h-3 w-3 rounded-full bg-[#4285F4]" />
          <div className="h-3 w-3 rounded-full bg-[#FD2B25]" />
          <div className="h-3 w-3 rounded-full bg-[#FFA600]" />
          <div className="h-3 w-3 rounded-full bg-[#00AA47]" />
        </div>
      </div>
    </div>
  );
}