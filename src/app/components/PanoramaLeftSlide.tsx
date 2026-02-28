export function PanoramaLeftSlide() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Left Slide - 600x800 */}
      <div className="relative h-[800px] w-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Left Side - 3D Glass Shapes */}
        <div className="absolute left-0 top-0 h-full w-full">
          {/* Blue Glass Shape - Top Left */}
          <div 
            className="absolute -left-20 top-[100px] h-[280px] w-[280px] -rotate-[25deg] rounded-[60px]" 
            style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.8) 0%, rgba(31, 134, 251, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(66, 133, 244, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Yellow Glass Shape - Middle Left */}
          <div 
            className="absolute left-[80px] top-[300px] h-[200px] w-[200px] rotate-[35deg] rounded-[50px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 166, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(255, 166, 0, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
          
          {/* Green Glass Shape - Bottom Left */}
          <div 
            className="absolute -left-16 top-[520px] h-[240px] w-[240px] -rotate-[15deg] rounded-[55px]"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 170, 71, 0.8) 0%, rgba(52, 168, 83, 0.6) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 170, 71, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.4)'
            }} 
          />
        </div>

        {/* Bottom Logo - Left Portion */}
        <div className="absolute bottom-8 left-0 z-10 w-full overflow-hidden">
          {/* This will show the left third of the logo, positioned as if the full logo spans 1800px */}
          <div className="relative h-[50px]" style={{ marginLeft: 'calc(900px - 600px)' }}>
            {/* Logo will be cut off on the left, showing only right portion that fits in this slide */}
          </div>
        </div>
      </div>
    </div>
  );
}
