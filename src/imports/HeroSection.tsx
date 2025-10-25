// Import the video files
import chandonVideo from '../assets/video/Chandon 10sek website.mp4';
import dt5Video from '../assets/video/DT5 P5 10sek website.mp4';
import manishaVideo from '../assets/video/Manisha 10sek website.mp4';

// Video configuration - you can change the default video here
const DEFAULT_VIDEO = chandonVideo; // Options: chandonVideo, dt5Video, manishaVideo

function ImageSection() {
  return (
    <div className="absolute contents inset-0" data-name="Image section">
      <div className="absolute inset-0 rounded-br-[20px] rounded-tr-[20px]" data-name="Background Image">
        <video 
          autoPlay 
          className="absolute max-w-none object-cover rounded-br-[20px] rounded-tr-[20px] size-full" 
          controlsList="nodownload" 
          loop 
          muted
          playsInline
          src={DEFAULT_VIDEO}
        >
          {/* Fallback sources for better browser compatibility */}
          <source src={chandonVideo} type="video/mp4" />
          <source src={dt5Video} type="video/mp4" />
          <source src={manishaVideo} type="video/mp4" />
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center left-0 right-0 top-[60.83%]">
        <div className="flex-none h-[329px] scale-y-[-100%] w-[1280px]">
          <div className="bg-gradient-to-b from-[#ffffff] from-[18.103%] rounded-bl-[20px] rounded-br-[20px] size-full to-[rgba(255,255,255,0)]" data-name="Gradient overlay" />
        </div>
      </div>
    </div>
  );
}

function Scroll() {
  return (
    <div className="absolute h-[17px] left-[614px] top-[582.92px] w-[70px]" data-name="scroll">
      <div className="absolute bottom-[-50%] left-[-14.29%] right-0 top-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 34">
          <g id="scroll">
            <g filter="url(#filter0_d_1_5054)" id="Ellipse 10">
              <circle cx="17" cy="17" fill="var(--fill-0, white)" r="7" />
            </g>
            <circle cx="33" cy="17" fill="var(--fill-0, #C7C8D5)" id="Ellipse 8" r="5" />
            <circle cx="47" cy="17" fill="var(--fill-0, #C7C8D5)" id="Ellipse 9" r="5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="34" id="filter0_d_1_5054" width="34" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.865385 0 0 0 0 0.865385 0 0 0 0 0.865385 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_5054" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_5054" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative size-full" data-name="Hero Section">
      <ImageSection />
      <Scroll />
      <div className="absolute capitalize flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] left-[62px] text-[#192126] text-[0px] top-[729px] translate-y-[-50%] w-[1012px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[66px] mb-0 text-[64px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`With you, `}</p>
        <p className="leading-[66px] text-[64px]">
          <span className="text-[#192126]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Redefining
          </span>
          <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
          <span className="bg-clip-text bg-gradient-to-b from-[#69b57c] to-[#388896]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
            Limitless Possibilities.
          </span>
        </p>
      </div>
    </div>
  );
}