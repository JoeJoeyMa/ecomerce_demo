import BackgroundBeams from "@/components/BackgroundBeams";
import BackgroundGradientDemo from "@/components/BackgroundGradientDemo";
import BackgroundLinesDemo from "@/components/BackgroundLinesDemo";

import CameraOverlay from "@/components/CameraOverlay";
import CardStackDemo from "@/components/CardStackDemo";
import Footer from "@/components/Footer";

import { LayoutGridDemo } from "@/components/LayoutGridDemo";
import Overlay from "@/components/Overlay";
import SparklesPreview from "@/components/SparklesPreview";
export default function Home() {
  return (
    <main className="relative left-0 top-0">
      <BackgroundBeams />
      <div className="relative w-full h-[30vh]">
        <SparklesPreview />
      </div>
      <div className="relative w-full h-[80px]">
        <BackgroundLinesDemo>Camera & Lens</BackgroundLinesDemo>
      </div>
      <div className="relative w-full h-[60vh]">
        <CameraOverlay />
        <Overlay />
      </div>
      <div className="relative w-full h-[80px] max-lg:mt-32">
        <BackgroundLinesDemo>Offers</BackgroundLinesDemo>
      </div>
      <div className="relative w-full h-[100vh] px-4">
        <LayoutGridDemo />
      </div>
      <div className="relative w-full h-[80px]">
        <BackgroundLinesDemo>Camera Accessories</BackgroundLinesDemo>
      </div>
      <div className="relative w-full h-[100vh]">
        <BackgroundGradientDemo />
      </div>
      <div className="relative w-full h-[80px] mt-52 max-lg:mt-[2350px]">
        <BackgroundLinesDemo>Testimonials</BackgroundLinesDemo>
      </div>
      <div className="relative w-full h-[50vh]">
        <CardStackDemo />
      </div>
      <div className="relative w-full h-[30vh] mt-36 bottom-0">
        <Footer />
      </div>
    </main>
  );
}
