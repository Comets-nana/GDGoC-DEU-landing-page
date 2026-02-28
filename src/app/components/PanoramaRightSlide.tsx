export function PanoramaRightSlide() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Right Slide - 600x800 */}
      <div className="relative h-[800px] w-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Right Side - 3D Glass Shapes */}
        <div className="absolute right-0 top-0 h-full w-full">
          {/* Red Glass Shape - Top Right */}
          <div 
            className="absolute -right-16 top-[120px] h-[300px] w-[220px] rotate-[15deg] rounded-[70px]"
            style={{
              background: 'linear-gradient(135deg, rgba(253, 43, 37, 0.8) 0%, rgba(255, 107, 107, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(253, 43, 37, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Blue Glass Shape - Middle Right */}
          <div 
            className="absolute right-[60px] top-[340px] h-[220px] w-[220px] -rotate-[30deg] rounded-[55px]"
            style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(66, 133, 244, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Yellow Glass Shape - Bottom Right */}
          <div 
            className="absolute -right-12 top-[540px] h-[260px] w-[260px] rotate-[25deg] rounded-[60px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(255, 166, 0, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
        </div>

        {/* Bottom Logo - Right Portion */}
        <div className="absolute bottom-8 left-0 z-10 w-full overflow-hidden">
          {/* This will show the right third of the logo, positioned as if the full logo spans 1800px */}
          <div className="relative h-[50px]" style={{ marginRight: 'calc(900px - 600px)' }}>
            {/* Logo will be cut off on the right, showing only left portion that fits in this slide */}
          </div>
        </div>
      </div>
    </div>
  );
}
