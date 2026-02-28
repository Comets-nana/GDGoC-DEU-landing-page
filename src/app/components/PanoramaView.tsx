import { PanoramaLeftSlide } from './PanoramaLeftSlide';
import { PanoramaCenterSlide } from './PanoramaCenterSlide';
import { PanoramaRightSlide } from './PanoramaRightSlide';

export function PanoramaView() {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Panoramic Banner - 3 Individual Slides (600x800 each)
        </h2>
        
        {/* Display all 3 slides side by side */}
        <div className="flex justify-center gap-4">
          <PanoramaLeftSlide />
          <PanoramaCenterSlide />
          <PanoramaRightSlide />
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>When placed side-by-side, these form a seamless 1800x800 panoramic banner</p>
        </div>
      </div>
    </div>
  );
}
