import svgPaths from '../../imports/svg-jtwl1psh6o';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ActivityGalleryProps {
  images?: string[];
}

export function ActivityGallery({
  images = [
    "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MTczMjc5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBib290Y2FtcCUyMHRlYW13b3JrfGVufDF8fHx8MTc3MTczMjc5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1690192203795-ca12d9bb3227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBtZWV0dXAlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MTczMjc5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1759884247144-53d52c31f859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzcxNzMyNzk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ]
}: ActivityGalleryProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Template 3: Activity Gallery - 600x800 */}
      <div className="relative h-[800px] w-[600px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Glass Effect Shapes - Corner Accents (Subtle) */}
        <div className="absolute inset-0">
          {/* Blue Glass Shape - Top Right Corner */}
          <div 
            className="absolute -right-8 -top-8 h-[140px] w-[140px] rotate-[20deg] rounded-[35px] opacity-70"
            style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.5) 0%, rgba(31, 134, 251, 0.3) 100%)',
              boxShadow: '0 15px 30px -8px rgba(66, 133, 244, 0.3), inset 0 2px 12px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Green Glass Shape - Bottom Right Corner */}
          <div 
            className="absolute -bottom-6 -right-6 h-[144px] w-[144px] rotate-[45deg] rounded-[36px] opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 170, 71, 0.5) 0%, rgba(52, 168, 83, 0.3) 100%)',
              boxShadow: '0 15px 30px -8px rgba(0, 170, 71, 0.3), inset 0 2px 12px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Yellow Glass Shape - Bottom Left Corner */}
          <div 
            className="absolute -bottom-6 -left-6 h-[112px] w-[112px] -rotate-[15deg] rounded-[28px] opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.5) 0%, rgba(255, 215, 0, 0.3) 100%)',
              boxShadow: '0 15px 30px -8px rgba(255, 166, 0, 0.3), inset 0 2px 12px rgba(255, 255, 255, 0.4)'
            }} 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full px-8 py-12">
          {/* Black Pill Header */}
          <div className="mb-8 inline-block rounded-full bg-black px-8 py-3">
            <p className="font-['Pretendard'] text-xl font-bold text-white">
              활동 갤러리
            </p>
          </div>

          {/* Photo Grid - Dynamic Layout */}
          <div className="space-y-4">
            {/* Top Large Photo */}
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <ImageWithFallback 
                src={images[0]}
                alt="Activity Photo 1"
                className="h-[252px] w-full object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Middle Two Photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <ImageWithFallback 
                  src={images[1]}
                  alt="Activity Photo 2"
                  className="h-[240px] w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <ImageWithFallback 
                  src={images[2]}
                  alt="Activity Photo 3"
                  className="h-[240px] w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>

            {/* Bottom Large Photo */}
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <ImageWithFallback 
                src={images[3]}
                alt="Activity Photo 4"
                className="h-[200px] w-full object-cover transition-transform hover:scale-105"
              />
            </div>
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
