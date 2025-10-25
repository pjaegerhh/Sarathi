import svgPaths from "./svg-rjm8pbzjz8";
import imgHealingCardImage from "figma:asset/4038b380ca66816e136f836132bca1b8cc0db251.png";
import imgHealingCardImage1 from "figma:asset/dc47787b499eb83f6a39d48d318b9dac108c4c7d.png";
import imgRectangle71 from "figma:asset/4769aeb444c6cbe05dc0663fb5c35a853e49584c.png";
import imgRectangle72 from "figma:asset/ceb4eb08f4449d6be9cb7d76be55ca0ad330384c.png";
import imgStatisticsCardImage from "figma:asset/617b3f3d9b67780e89a5c8d624b5d8b0f13ea0bf.png";
import imgCommunityCardImageContent from "figma:asset/9e46f3be7b5472cd8a3b304c1ba73356f2cd2099.png";
import imgCommunityCardImageContent1 from "figma:asset/8fb8fc34b439a14d915eca2570a2d283a90cabb5.png";
import imgCommunityCardImageContent2 from "figma:asset/14532ada289a40c010c9ed2d41fc6fc11a3aae7f.png";

function HeroOverlay() {
  return (
    <div className="absolute bottom-[88.79%] contents left-0 right-0 top-[2.58%]" data-name="Hero overlay">
      <div className="absolute bottom-[88.79%] left-0 right-0 rounded-br-[20px] rounded-tr-[20px] top-[2.58%]" data-name="Hero background">
        <video autoPlay className="absolute max-w-none object-cover rounded-br-[20px] rounded-tr-[20px] size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/fa354ed52501118ff5c9557ed256befe125c3fca" />
        </video>
      </div>
      <div className="absolute bottom-[88.79%] flex items-center justify-center left-0 right-0 top-[7.49%]">
        <div className="flex-none h-[160px] scale-y-[-100%] w-[375px]">
          <div className="bg-gradient-to-b from-[#ffffff] from-[18.103%] rounded-bl-[20px] rounded-br-[20px] size-full to-[rgba(255,255,255,0)]" data-name="Gradient overlay" />
        </div>
      </div>
    </div>
  );
}

function Scroll() {
  return (
    <div className="absolute h-[5px] left-[calc(40%+29.883px)] top-[383.92px] w-[24.296px]" data-name="scroll">
      <div className="absolute bottom-[-200%] left-[-41.16%] right-0 top-[-200%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 25">
          <g id="scroll ">
            <g filter="url(#filter0_d_1_4036)" id="Ellipse 10">
              <circle cx="12.5" cy="12.5" fill="var(--fill-0, white)" r="2.5" />
            </g>
            <circle cx="21.5" cy="12.5" fill="var(--fill-0, #C7C8D5)" id="Ellipse 8" r="2.5" />
            <circle cx="30.5" cy="12.5" fill="var(--fill-0, #C7C8D5)" id="Ellipse 9" r="2.5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25" id="filter0_d_1_4036" width="25" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0.35 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_4036" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_4036" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute contents left-0 top-[111px]" data-name="Hero section">
      <HeroOverlay />
      <Scroll />
      <div className="absolute flex flex-col font-['Roboto:Bold',_sans-serif] font-bold h-[90px] justify-center leading-[0] left-[17px] text-[#192126] text-[24px] top-[429px] translate-y-[-50%] w-[285px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px] mb-0">{`With you, `}</p>
        <p className="leading-[30px]">
          <span>{`Redefining `}</span>
          <span className="bg-clip-text bg-gradient-to-b from-[#69b57c] to-[#388896]" style={{ WebkitTextFillColor: "transparent" }}>
            Limitless Possibilities.
          </span>
        </p>
      </div>
    </div>
  );
}

function QuoteAuthor() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal gap-[4px] items-center leading-[0] relative shrink-0 text-[12px] text-center tracking-[0.4px]" data-name="Quote author">
      <div className="flex flex-col justify-center relative shrink-0 text-[#388896] w-[269px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Dr. Pooja Mukul, MD</p>
      </div>
      <div className="flex flex-col justify-center min-w-full relative shrink-0 text-[#979797] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">B.M.V.S.S, Jaipur</p>
      </div>
    </div>
  );
}

function QuoteSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-center left-1/2 top-[522px] translate-x-[-50%]" data-name="Quote section">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-center tracking-[0.4px] w-[349px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">{`"It's time we shared the global knowledge of the developers of the prosthesis community and worked together on shared solutions to better and better help those in need"`}</p>
      </div>
      <QuoteAuthor />
    </div>
  );
}

function HealingHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0" data-name="Healing header">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#192126] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Redefining the Way You Heal</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-[303px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Your journey is unique — our platform adapts to your rhythm, supporting confidence and comfort at every stage.</p>
      </div>
    </div>
  );
}

function Component30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 52">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 52">
          <path d={svgPaths.p3a16f780} id="Vector" stroke="var(--stroke-0, #388896)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryButtonIconAndTextMobile() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="secondary button icon and text mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#8ac0ad] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Training</p>
      </div>
      <Component30 />
    </div>
  );
}

function HealingCardDetails() {
  return (
    <div className="bg-gradient-to-b from-[#69b57c] h-[96px] mb-[-96px] relative rounded-tl-[15px] rounded-tr-[15px] shrink-0 to-[#388896] w-full" data-name="Healing card details">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[96px] items-start p-[12px] relative w-full">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.4px] w-[172px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[16px]">Relearning motion, rebuilding trust through training</p>
          </div>
          <SecondaryButtonIconAndTextMobile />
        </div>
      </div>
    </div>
  );
}

function HealingCard() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[96px] pt-0 px-0 relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[270px]" data-name="Healing card">
      <div className="h-[225.281px] mb-[-96px] relative rounded-tl-[15px] rounded-tr-[15px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Healing card image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[15px] rounded-tr-[15px]">
          <img alt="" className="absolute h-[119.85%] left-[0.37%] max-w-none top-[-23.24%] w-full" src={imgHealingCardImage} />
        </div>
      </div>
      <HealingCardDetails />
    </div>
  );
}

function Component31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 52">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 52">
          <path d={svgPaths.p3a16f780} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryButtonIconTextMobile() {
  return (
    <div className="bg-[#8ac0ad] box-border content-stretch flex gap-[12px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="primary button icon text mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Rehabilitation</p>
      </div>
      <Component31 />
    </div>
  );
}

function HealingCardDetails1() {
  return (
    <div className="bg-white h-[96px] mb-[-96px] relative rounded-tl-[15px] rounded-tr-[15px] shrink-0 w-full" data-name="Healing card details">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[96px] items-start p-[12px] relative w-full">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#192126] text-[12px] tracking-[0.4px] w-[172px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[16px] whitespace-pre-wrap">{`Reconnecting body and mind in  motion with rehabilitation`}</p>
          </div>
          <PrimaryButtonIconTextMobile />
        </div>
      </div>
    </div>
  );
}

function HealingCard1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[96px] pt-0 px-0 relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[270px]" data-name="Healing card">
      <div className="h-[225.281px] mb-[-96px] relative rounded-tl-[15px] rounded-tr-[15px] shrink-0 w-full" data-name="Healing card image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[15px] rounded-tr-[15px] size-full" src={imgHealingCardImage1} />
      </div>
      <HealingCardDetails1 />
    </div>
  );
}

function HealingContent() {
  return (
    <div className="box-border content-stretch flex gap-[31px] h-[239px] items-center overflow-x-auto overflow-y-clip p-[8px] relative shrink-0 w-[359px]" data-name="Healing content">
      <HealingCard />
      <HealingCard1 />
    </div>
  );
}

function HealingSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[359px] items-start left-[16px] top-[654px]" data-name="Healing section">
      <HealingHeader />
      <HealingContent />
    </div>
  );
}

function ProstheticHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 w-full" data-name="Prosthetic header">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center min-w-full relative shrink-0 text-[#192126] text-[16px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Find What Fits You Best</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-[275px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Explore prosthetic solutions designed around your needs, comfort, and lifestyle.</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d="M8 4L16 12L8 20" id="Vector" stroke="var(--stroke-0, #C7C8D5)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryButtonIconMobile() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="primary button icon mobile">
      <Component />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center left-0 pb-[10px] pt-[4px] px-[4px] right-[59.12%] top-[calc(50%+48px)] translate-y-[-50%]">
      <PrimaryButtonIconMobile />
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] opacity-0 relative shrink-0 text-[14px] text-nowrap text-right text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Below knee</p>
      </div>
    </div>
  );
}

function Component37() {
  return (
    <div className="h-[150px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[340px]" data-name="Component 86">
      <div className="absolute inset-0 rounded-[15px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
          <img alt="" className="absolute h-[269%] left-[-4.12%] max-w-none top-[-161.67%] w-[118.68%]" src={imgHealingCardImage1} />
        </div>
      </div>
      <div className="absolute bg-[#fbfbfb] inset-0 opacity-20 rounded-[15px]" />
      <Frame14 />
    </div>
  );
}

function ProstheticOptions() {
  return (
    <div className="content-stretch flex gap-[24px] items-center overflow-x-auto overflow-y-clip relative shrink-0" data-name="Prosthetic options">
      <Component37 />
    </div>
  );
}

function ProstheticSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[16px] top-[1053px] w-[340px]" data-name="Prosthetic section">
      <ProstheticHeader />
      <ProstheticOptions />
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p26f43d00} fill="var(--fill-0, #C7C8D5)" id="Vector" stroke="var(--stroke-0, #C7C8D5)" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Component1 />
      <p className="[white-space-collapse:collapse] font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px] w-[113px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search Location
      </p>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p31ec8500} fill="var(--fill-0, #C7C8D5)" id="Vector" stroke="var(--stroke-0, #C7C8D5)" />
        </g>
      </svg>
    </div>
  );
}

function InputArea() {
  return (
    <div className="absolute bg-white inset-0 rounded-[10px]" data-name="Input Area">
      <div className="box-border content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[inherit] size-full">
        <Frame />
        <Component2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]" />
    </div>
  );
}

function SearchLocationField() {
  return (
    <div className="h-[52px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[207px]" data-name="search location field">
      <InputArea />
    </div>
  );
}

function Component3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p5955980} fill="var(--fill-0, #C7C8D5)" id="Vector" />
          <path d={svgPaths.p2077b800} fill="var(--fill-0, #C7C8D5)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Component3 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Center Type
      </p>
    </div>
  );
}

function InputArea1() {
  return (
    <div className="bg-white h-[52px] relative rounded-[10px] shrink-0 w-[207px]" data-name="Input Area">
      <div className="box-border content-stretch flex gap-[12px] h-[52px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[inherit] w-[207px]">
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]" />
    </div>
  );
}

function CenterField() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="center field">
      <InputArea1 />
    </div>
  );
}

function Component4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p1c768b00} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Component4 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Price Range
      </p>
    </div>
  );
}

function PriceField() {
  return (
    <div className="absolute bg-white inset-0 rounded-[10px]" data-name="price field">
      <div className="box-border content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[inherit] size-full">
        <Frame2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]" />
    </div>
  );
}

function SearchLocationField1() {
  return (
    <div className="h-[52px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[207px]" data-name="search location field">
      <PriceField />
    </div>
  );
}

function SearchLocationField2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Search location field">
      <SearchLocationField />
      <CenterField />
      <SearchLocationField1 />
    </div>
  );
}

function PrimaryButtonMobile() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[24px] py-[8px] relative rounded-[28px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[200px]" data-name="Primary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Search</p>
      </div>
    </div>
  );
}

function HelpCardContent() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col gap-[12px] items-start ml-[30px] mt-[174px] px-[40px] py-[20px] relative rounded-[20px]" data-name="Help card content">
      <div aria-hidden="true" className="absolute border-[0.5px] border-solid border-white inset-0 pointer-events-none rounded-[20px]" />
      <SearchLocationField2 />
      <PrimaryButtonMobile />
    </div>
  );
}

function HelpCard() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Help card">
      <div className="[grid-area:1_/_1] h-[522px] ml-0 mt-0 rounded-[20px] w-[343px]" data-name="Help card background" />
      <HelpCardContent />
    </div>
  );
}

function HelpCardDescription() {
  return (
    <div className="content-stretch flex gap-[316px] items-center relative shrink-0" data-name="Help card description">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[0.25px] w-[310px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">{` Discover all nearby centers in one click and connect with the support you need.`}</p>
      </div>
    </div>
  );
}

function HelpCard1() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[12px] items-center ml-[6px] mt-[42px] px-[24px] py-0 relative w-[329.772px]" data-name="Help card">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] min-w-full relative shrink-0 text-[24px] text-center text-white w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">Help Is Closer Than You Think</p>
      </div>
      <HelpCardDescription />
    </div>
  );
}

function HelpSection() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Help section">
      <HelpCard />
      <HelpCard1 />
    </div>
  );
}

function TextUnderlineMobile() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-0 py-[2px] relative shrink-0" data-name="text underline mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#505050] text-[0px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[20px] text-[#8ac0ad] text-[14px] underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          View All
        </p>
      </div>
    </div>
  );
}

function HelpCardHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[342px]" data-name="Help card header">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#505050] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Select Center Category</p>
      </div>
      <TextUnderlineMobile />
    </div>
  );
}

function Component5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Component">
          <path d={svgPaths.p34461a80} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component5 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Kanpur, UP</p>
      </div>
    </div>
  );
}

function Component34() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center justify-center left-[13px] px-[8px] py-[4px] rounded-[20.268px] top-[10px]" data-name="Component 56">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[20.268px] shadow-[0px_0px_10px_0px_#dddddd]" />
      <Frame31 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[163px] left-0 rounded-tl-[15px] rounded-tr-[15px] top-0 w-[270px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[15px] rounded-tr-[15px] size-full" src={imgRectangle71} />
      </div>
      <Component34 />
    </div>
  );
}

function Component6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p1c768b00} fill="var(--fill-0, #388896)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <Component6 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Subsidized cost, ADIP scheme</p>
      </div>
    </div>
  );
}

function Frame3() {
  return <div className="absolute h-[16px] left-0 top-0 w-[145px]" />;
}

function Frame30() {
  return (
    <div className="absolute h-[16px] left-0 top-[102px] w-[145px]">
      <Frame3 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="h-[26px] relative shrink-0 w-full">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] left-0 text-[14px] text-black text-nowrap top-[10px] tracking-[0.1px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Government Centers</p>
      </div>
    </div>
  );
}

function Component7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component">
          <path d={svgPaths.p25042d00} fill="var(--fill-0, #388896)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[145px]">
      <Component7 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">{`170+ ALIMCO centers  `}</p>
      </div>
    </div>
  );
}

function Component8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d="M8 4L16 12L8 20" id="Vector" stroke="var(--stroke-0, #C7C8D5)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryButtonIconMobile1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="primary button icon mobile">
      <Component8 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[58px] items-end relative shrink-0 w-full">
      <Frame37 />
      <PrimaryButtonIconMobile1 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[243px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Offer prosthesis fitting, financial aid, and personalized rehabilitation services.</p>
      </div>
      <Frame38 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[254px]">
      <Frame23 />
      <Frame39 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[130px] relative shrink-0 w-full">
      <Frame30 />
      <Frame40 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Frame4 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[133px] pt-0 px-0 shadow-[0px_0px_10px_0px_#dddddd] top-[163px] w-[270px]">
      <Frame15 />
    </div>
  );
}

function CenterCategory() {
  return (
    <div className="h-[345px] relative shrink-0 w-[270px]" data-name="Center category">
      <Group />
      <Frame20 />
    </div>
  );
}

function Component9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Component">
          <path d={svgPaths.p34461a80} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component9 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Jaipur, Rajasthan</p>
      </div>
    </div>
  );
}

function Component35() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center justify-center left-[13px] px-[8px] py-[4px] rounded-[20.268px] top-[10px]" data-name="Component 56">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[20.268px] shadow-[0px_0px_10px_0px_#dddddd]" />
      <Frame32 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[163px] left-0 rounded-tl-[15px] rounded-tr-[15px] top-0 w-[270px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[15px] rounded-tr-[15px] size-full" src={imgRectangle72} />
      </div>
      <Component35 />
    </div>
  );
}

function Component10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p1c768b00} fill="var(--fill-0, #388896)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <Component10 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Free- subsidized cost</p>
      </div>
    </div>
  );
}

function Frame6() {
  return <div className="absolute h-[16px] left-0 top-0 w-[145px]" />;
}

function Frame33() {
  return (
    <div className="absolute h-[16px] left-0 top-[102px] w-[145px]">
      <Frame6 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-[26px] relative shrink-0 w-full">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] left-0 text-[14px] text-black text-nowrap top-[10px] tracking-[0.1px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">NGO/Non-Profit</p>
      </div>
    </div>
  );
}

function Component11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component">
          <path d={svgPaths.p25042d00} fill="var(--fill-0, #388896)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[145px]">
      <Component11 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">BMVSS 23+ centers</p>
      </div>
    </div>
  );
}

function Component12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d="M8 4L16 12L8 20" id="Vector" stroke="var(--stroke-0, #C7C8D5)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryButtonIconMobile2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="primary button icon mobile">
      <Component12 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[58px] items-end relative shrink-0 w-full">
      <Frame41 />
      <PrimaryButtonIconMobile2 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[243px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Affordable solutions and inclusive care programs. Offering customized fittings, high-end materials</p>
      </div>
      <Frame42 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[254px]">
      <Frame24 />
      <Frame43 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-[130px] relative shrink-0 w-full">
      <Frame33 />
      <Frame44 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Frame5 />
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[133px] pt-0 px-0 shadow-[0px_0px_10px_0px_#dddddd] top-[163px] w-[270px]">
      <Frame16 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="h-[345px] relative shrink-0 w-[270px]">
      <Group1 />
      <Frame21 />
    </div>
  );
}

function Component13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Component">
          <path d={svgPaths.p34461a80} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component13 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Delhi, India</p>
      </div>
    </div>
  );
}

function Component36() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center justify-center left-[13px] px-[8px] py-[4px] rounded-[20.268px] top-[10px]" data-name="Component 56">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[20.268px] shadow-[0px_0px_10px_0px_#dddddd]" />
      <Frame34 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[163px] left-0 rounded-tl-[15px] rounded-tr-[15px] top-0 w-[270px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[15px] rounded-tr-[15px] size-full" src={imgRectangle71} />
      </div>
      <Component36 />
    </div>
  );
}

function Component14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p1c768b00} fill="var(--fill-0, #388896)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <Component14 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Basic model from Rs.20,000+</p>
      </div>
    </div>
  );
}

function Frame8() {
  return <div className="absolute h-[16px] left-0 top-0 w-[145px]" />;
}

function Frame35() {
  return (
    <div className="absolute h-[16px] left-0 top-[102px] w-[145px]">
      <Frame8 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="h-[26px] relative shrink-0 w-full">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] left-0 text-[#192126] text-[14px] text-nowrap top-[10px] tracking-[0.1px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Private Clinics</p>
      </div>
    </div>
  );
}

function Component15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component">
          <path d={svgPaths.p25042d00} fill="var(--fill-0, #388896)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[145px]">
      <Component15 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Endolite 250+ centers</p>
      </div>
    </div>
  );
}

function Component16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d="M8 4L16 12L8 20" id="Vector" stroke="var(--stroke-0, #C7C8D5)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryButtonIconMobile3() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="primary button icon mobile">
      <Component16 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[58px] items-end relative shrink-0 w-full">
      <Frame45 />
      <PrimaryButtonIconMobile3 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[243px]">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Offering customized, specialised technology fittings, high-end materials</p>
      </div>
      <Frame46 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[254px]">
      <Frame29 />
      <Frame47 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-[130px] relative shrink-0 w-full">
      <Frame35 />
      <Frame48 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Frame7 />
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[133px] pt-0 px-0 shadow-[0px_0px_10px_0px_#dddddd] top-[163px] w-[270px]">
      <Frame17 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-[345px] relative shrink-0 w-[270px]">
      <Group2 />
      <Frame22 />
    </div>
  );
}

function HelpCardContent1() {
  return (
    <div className="box-border content-stretch flex gap-[24px] h-[367px] items-center overflow-x-auto overflow-y-clip p-[8px] relative shrink-0 w-[368px]" data-name="Help card content">
      <CenterCategory />
      <Frame27 />
      <Frame28 />
    </div>
  );
}

function HelpCard2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Help card">
      <HelpCardHeader />
      <HelpCardContent1 />
    </div>
  );
}

function HelpCenter() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[7px] top-[1343px] w-[368px]" data-name="help center\'">
      <HelpSection />
      <HelpCard2 />
    </div>
  );
}

function StatisticsCardContent() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Statistics card content">
      <div className="[grid-area:1_/_1] h-[264.306px] ml-0 mt-[17.694px] relative rounded-bl-[20px] rounded-br-[20px] w-[277px]" data-name="Statistics card image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-bl-[20px] rounded-br-[20px] size-full" src={imgStatisticsCardImage} />
      </div>
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#ffffff] from-[18.103%] h-[128.282px] ml-0 mt-0 rounded-bl-[20px] rounded-br-[20px] to-[rgba(255,255,255,0)] w-[277px]" data-name="Statistics card background" />
    </div>
  );
}

function StatisticsCard() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Statistics card">
      <StatisticsCardContent />
    </div>
  );
}

function StatisticsCardDetailsContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center justify-center leading-[0] relative shrink-0 w-full" data-name="Statistics card details container">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center min-w-full relative shrink-0 text-[#192126] text-[16px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Your story can inspire someone today</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-[274px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Add photos, videos, or proud moments to inspire, motivate, and support others.</p>
      </div>
    </div>
  );
}

function StatisticsCardDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0" data-name="Statistics card details">
      <StatisticsCardDetailsContainer />
    </div>
  );
}

function Component32() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 52">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 52">
          <path d={svgPaths.p3a16f780} id="Vector" stroke="var(--stroke-0, #388896)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryButtonIconAndTextMobile1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="secondary button icon and text mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#8ac0ad] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Share your story</p>
      </div>
      <Component32 />
    </div>
  );
}

function Component17() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <div className="absolute bottom-0 left-0 right-[-0.01%] top-[-0.01%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="Component">
            <path d={svgPaths.p15675d00} fill="var(--fill-0, #C7C8D5)" id="Vector" stroke="var(--stroke-0, #C7C8D5)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconButtonDesktop() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="icon button desktop">
      <Component17 />
    </div>
  );
}

function Component18() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p31ec8500} fill="var(--fill-0, #C7C8D5)" id="Vector" stroke="var(--stroke-0, #C7C8D5)" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonDesktop1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="icon button desktop">
      <Component18 />
    </div>
  );
}

function Component19() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p10602900} fill="var(--fill-0, #C7C8D5)" id="Vector" stroke="var(--stroke-0, #C7C8D5)" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonDesktop2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="icon button desktop">
      <Component19 />
    </div>
  );
}

function Component20() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.pb35e800} fill="var(--fill-0, #C7C8D5)" id="Vector" stroke="var(--stroke-0, #C7C8D5)" />
        </g>
      </svg>
    </div>
  );
}

function IconButtonDesktop3() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 size-[40px]" data-name="icon button desktop">
      <Component20 />
    </div>
  );
}

function ContentUploadOptions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content upload options">
      <IconButtonDesktop />
      <IconButtonDesktop1 />
      <IconButtonDesktop2 />
      <IconButtonDesktop3 />
    </div>
  );
}

function StatisticsCardButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0" data-name="Statistics card buttons">
      <SecondaryButtonIconAndTextMobile1 />
      <ContentUploadOptions />
    </div>
  );
}

function StatisticsContainer() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] from-[22.305%] gap-[10px] items-center justify-center px-[46px] py-[30px] relative rounded-[15px] shrink-0 to-[#69b57c] to-[110.04%] w-[343px]" data-name="Statistics container">
      <StatisticsCard />
      <StatisticsCardDetails />
      <StatisticsCardButtons />
    </div>
  );
}

function StatisticsCardDetailsContainer1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0 w-full" data-name="Statistics card details container">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px] whitespace-pre">+2 million</p>
      </div>
    </div>
  );
}

function StatisticsCardDetails1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[227px]" data-name="Statistics card details">
      <StatisticsCardDetailsContainer1 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.25px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`BMVSS: Changing lives `}</p>
        <p>through rehabilitation.</p>
      </div>
    </div>
  );
}

function StatisticsCardDetailsContainer2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[159px]" data-name="Statistics card details container">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px] text-nowrap whitespace-pre">{`+700 `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[20px] relative shrink-0 text-[14px] tracking-[0.25px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Private and public</p>
        <p>centers nationwide.</p>
      </div>
    </div>
  );
}

function StatisticsCardDetails2() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center justify-center relative shrink-0" data-name="Statistics card details">
      <StatisticsCardDetailsContainer2 />
    </div>
  );
}

function StatisticsCardDetails3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[193px]" data-name="Statistics card details">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px] text-nowrap whitespace-pre">380,000+</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[20px] relative shrink-0 text-[14px] text-center tracking-[0.25px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Beneficiaries assisted</p>
        <p>through camps</p>
      </div>
    </div>
  );
}

function StatisticsCardContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center justify-center relative shrink-0" data-name="Statistics card content">
      <StatisticsCardDetails1 />
      <StatisticsCardDetails2 />
      <StatisticsCardDetails3 />
    </div>
  );
}

function StatisticsCard1() {
  return (
    <div className="relative rounded-[20px] shrink-0 w-full" data-name="Statistics card">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[41px] py-[26px] relative w-full">
          <StatisticsCardContent1 />
        </div>
      </div>
    </div>
  );
}

function StatisticsSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[20px] top-[2344px] w-[343px]" data-name="Statistics section">
      <StatisticsContainer />
      <StatisticsCard1 />
    </div>
  );
}

function CommunityText() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow h-[120px] items-start leading-[0] min-h-px min-w-px relative shrink-0" data-name="Community text">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#192126] text-[16px] w-[203px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Join a community that understands you.</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[14px] tracking-[0.25px] w-[340px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Connect with inspiring members who share your journey, celebrate milestones, exchange tips, and support each other every step of the way</p>
      </div>
    </div>
  );
}

function TextUnderlineMobile1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-0 py-[2px] relative shrink-0" data-name="text underline mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#505050] text-[0px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[20px] text-[#8ac0ad] text-[14px] underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Join Now
        </p>
      </div>
    </div>
  );
}

function CommunityHeader() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[340px]" data-name="Community header">
      <CommunityText />
      <TextUnderlineMobile1 />
    </div>
  );
}

function CommunityCardImage() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Community card image">
      <div className="[grid-area:1_/_1] h-[163px] ml-0 mt-0 relative rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] w-[270px]" data-name="Community card image content">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[8px] rounded-tr-[8px]">
          <img alt="" className="absolute h-[142.67%] left-[-2.59%] max-w-none top-[-8.62%] w-[110.74%]" src={imgCommunityCardImageContent} />
        </div>
      </div>
    </div>
  );
}

function Component21() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p2546a00} fill="var(--fill-0, #69B57C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsNameContainer() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-0 w-[153px]" data-name="Community card details name container">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#192126] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Manisha Rajput</p>
      </div>
      <Component21 />
    </div>
  );
}

function CommunityCardDetailsName() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[153px]" data-name="Community card details name">
      <CommunityCardDetailsNameContainer />
    </div>
  );
}

function CommunityCardDetailsLocation() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start justify-center left-0 top-[24px] w-[153px]" data-name="Community card details location">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#979797] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Andhra Pradesh, India</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsHeaderContent() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[153px]" data-name="Community card details header content">
      <CommunityCardDetailsName />
      <CommunityCardDetailsLocation />
    </div>
  );
}

function CommunityCardDetailsHeaderContainer() {
  return (
    <div className="h-[40px] mr-[-50px] relative shrink-0 w-[153px]" data-name="Community card details header container">
      <CommunityCardDetailsHeaderContent />
    </div>
  );
}

function CommunityCardDetailsHeader() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[50px] py-0 relative shrink-0" data-name="Community card details header">
      <CommunityCardDetailsHeaderContainer />
    </div>
  );
}

function CommunityCardDetailsTagsItem() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-0 px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Skincare</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[67px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Fatigue</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[127px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Phantom Pain</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsMore() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[225px] p-[4px] rounded-[100px] top-0 w-[30px]" data-name="Community card details tags more">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">+5</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsContainer() {
  return (
    <div className="h-[30px] relative shrink-0 w-[279px]" data-name="Community card details tags container">
      <CommunityCardDetailsTagsItem />
      <CommunityCardDetailsTagsItem1 />
      <CommunityCardDetailsTagsItem2 />
      <CommunityCardDetailsTagsMore />
    </div>
  );
}

function CommunityCardDetailsTags() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[258px]" data-name="Community card details tags">
      <CommunityCardDetailsTagsContainer />
    </div>
  );
}

function Component22() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[247px]" data-name="Community card details achievements item">
      <Component22 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Professional Yoga Teacher</p>
      </div>
    </div>
  );
}

function Component23() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[36px] w-[247px]" data-name="Community card details achievements item">
      <Component23 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Community Volunteer</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievements() {
  return (
    <div className="h-[60px] relative shrink-0 w-[335px]" data-name="Community card details achievements">
      <CommunityCardDetailsAchievementsItem />
      <CommunityCardDetailsAchievementsItem1 />
    </div>
  );
}

function CommunityCardDetailsInfoContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Community card details info container">
      <CommunityCardDetailsTags />
      <CommunityCardDetailsAchievements />
    </div>
  );
}

function PrimaryButtonMobile1() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[28px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[120px]" data-name="Primary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonMobile() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#388896] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsButtons() {
  return (
    <div className="content-stretch flex gap-[29px] items-center justify-end relative shrink-0" data-name="Community card details buttons">
      <PrimaryButtonMobile1 />
      <TextButtonMobile />
    </div>
  );
}

function CommunityCardDetailsInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[255px]" data-name="Community card details info">
      <CommunityCardDetailsInfoContainer />
      <CommunityCardDetailsButtons />
    </div>
  );
}

function CommunityCardDetailsContainer() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full" data-name="Community card details container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <CommunityCardDetailsHeader />
          <CommunityCardDetailsInfo />
        </div>
      </div>
    </div>
  );
}

function CommunityCardDetails() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[133px] pt-0 px-0 relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Community card details">
      <CommunityCardDetailsContainer />
    </div>
  );
}

function CommunityCard() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Community card">
      <CommunityCardImage />
      <CommunityCardDetails />
    </div>
  );
}

function CommunityCardImage1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Community card image">
      <div className="[grid-area:1_/_1] h-[163px] ml-0 mt-0 relative rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] w-[270px]" data-name="Community card image content">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[8px] rounded-tr-[8px] size-full" src={imgCommunityCardImageContent1} />
      </div>
    </div>
  );
}

function CommunityCardDetailsNameIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details name icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Community card details name icon"></g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsNameContainer1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-0 w-[153px]" data-name="Community card details name container">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#192126] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Ramesh Raj</p>
      </div>
      <CommunityCardDetailsNameIcon />
    </div>
  );
}

function CommunityCardDetailsName1() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[153px]" data-name="Community card details name">
      <CommunityCardDetailsNameContainer1 />
    </div>
  );
}

function CommunityCardDetailsLocation1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start justify-center left-0 top-[24px] w-[153px]" data-name="Community card details location">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#979797] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Rajasthan, India</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsHeaderContent1() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[153px]" data-name="Community card details header content">
      <CommunityCardDetailsName1 />
      <CommunityCardDetailsLocation1 />
    </div>
  );
}

function CommunityCardDetailsHeaderContainer1() {
  return (
    <div className="h-[40px] mr-[-50px] relative shrink-0 w-[153px]" data-name="Community card details header container">
      <CommunityCardDetailsHeaderContent1 />
    </div>
  );
}

function CommunityCardDetailsHeader1() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[50px] py-0 relative shrink-0" data-name="Community card details header">
      <CommunityCardDetailsHeaderContainer1 />
    </div>
  );
}

function CommunityCardDetailsTagsItem3() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-0 px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Daily Tips</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem4() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[74px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Skin Care</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem5() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[146px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Athletics</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsMore1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[215px] p-[4px] rounded-[100px] top-0 w-[30px]" data-name="Community card details tags more">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">+2</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsContainer1() {
  return (
    <div className="h-[30px] relative shrink-0 w-[279px]" data-name="Community card details tags container">
      <CommunityCardDetailsTagsItem3 />
      <CommunityCardDetailsTagsItem4 />
      <CommunityCardDetailsTagsItem5 />
      <CommunityCardDetailsTagsMore1 />
    </div>
  );
}

function CommunityCardDetailsTags1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[258px]" data-name="Community card details tags">
      <CommunityCardDetailsTagsContainer1 />
    </div>
  );
}

function CommunityCardDetailsAchievementsIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details achievements icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[335px]" data-name="Community card details achievements item">
      <CommunityCardDetailsAchievementsIcon />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Jaipur Marathon Winner</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievementsIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details achievements icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[36px] w-[335px]" data-name="Community card details achievements item">
      <CommunityCardDetailsAchievementsIcon1 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Peer Mentor</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievements1() {
  return (
    <div className="h-[60px] relative shrink-0 w-[335px]" data-name="Community card details achievements">
      <CommunityCardDetailsAchievementsItem2 />
      <CommunityCardDetailsAchievementsItem3 />
    </div>
  );
}

function CommunityCardDetailsInfoContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Community card details info container">
      <CommunityCardDetailsTags1 />
      <CommunityCardDetailsAchievements1 />
    </div>
  );
}

function PrimaryButtonMobile2() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[28px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[120px]" data-name="Primary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonMobile1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#388896] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsButtons1() {
  return (
    <div className="content-stretch flex gap-[29px] items-center justify-end relative shrink-0" data-name="Community card details buttons">
      <PrimaryButtonMobile2 />
      <TextButtonMobile1 />
    </div>
  );
}

function CommunityCardDetailsInfo1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Community card details info">
      <CommunityCardDetailsInfoContainer1 />
      <CommunityCardDetailsButtons1 />
    </div>
  );
}

function CommunityCardDetailsContainer1() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full" data-name="Community card details container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <CommunityCardDetailsHeader1 />
          <CommunityCardDetailsInfo1 />
        </div>
      </div>
    </div>
  );
}

function CommunityCardDetails1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[133px] pt-0 px-0 relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Community card details">
      <CommunityCardDetailsContainer1 />
    </div>
  );
}

function CommunityCard1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Community card">
      <CommunityCardImage1 />
      <CommunityCardDetails1 />
    </div>
  );
}

function CommunityCardImage2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Community card image">
      <div className="[grid-area:1_/_1] h-[163px] ml-0 mt-0 relative rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] w-[270px]" data-name="Community card image content">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[8px] rounded-tr-[8px]">
          <img alt="" className="absolute h-[178.22%] left-[-1.85%] max-w-none top-[-46.93%] w-[107.59%]" src={imgStatisticsCardImage} />
        </div>
      </div>
    </div>
  );
}

function CommunityCardDetailsNameContainer2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-0 w-[153px]" data-name="Community card details name container">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#192126] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Hakim Ali</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsName2() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[153px]" data-name="Community card details name">
      <CommunityCardDetailsNameContainer2 />
    </div>
  );
}

function CommunityCardDetailsLocation2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start justify-center left-0 top-[24px] w-[153px]" data-name="Community card details location">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#979797] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">UP, India</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsHeaderContent2() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[153px]" data-name="Community card details header content">
      <CommunityCardDetailsName2 />
      <CommunityCardDetailsLocation2 />
    </div>
  );
}

function CommunityCardDetailsHeaderContainer2() {
  return (
    <div className="h-[40px] mr-[-50px] relative shrink-0 w-[153px]" data-name="Community card details header container">
      <CommunityCardDetailsHeaderContent2 />
    </div>
  );
}

function CommunityCardDetailsHeader2() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[50px] py-0 relative shrink-0" data-name="Community card details header">
      <CommunityCardDetailsHeaderContainer2 />
    </div>
  );
}

function CommunityCardDetailsTagsItem6() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-0 px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Rehabilitation</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem7() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[97px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Sports</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem8() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[153px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Community</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsMore2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[236px] p-[4px] rounded-[100px] top-0 w-[30px]" data-name="Community card details tags more">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">+3</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsContainer2() {
  return (
    <div className="h-[30px] relative shrink-0 w-[279px]" data-name="Community card details tags container">
      <CommunityCardDetailsTagsItem6 />
      <CommunityCardDetailsTagsItem7 />
      <CommunityCardDetailsTagsItem8 />
      <CommunityCardDetailsTagsMore2 />
    </div>
  );
}

function CommunityCardDetailsTags2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[258px]" data-name="Community card details tags">
      <CommunityCardDetailsTagsContainer2 />
    </div>
  );
}

function CommunityCardDetailsAchievementsIcon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details achievements icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[335px]" data-name="Community card details achievements item">
      <CommunityCardDetailsAchievementsIcon2 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Cricket State Player</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievementsIcon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details achievements icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[36px] w-[335px]" data-name="Community card details achievements item">
      <CommunityCardDetailsAchievementsIcon3 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Public Speaker in Community</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievements2() {
  return (
    <div className="h-[60px] relative shrink-0 w-[335px]" data-name="Community card details achievements">
      <CommunityCardDetailsAchievementsItem4 />
      <CommunityCardDetailsAchievementsItem5 />
    </div>
  );
}

function CommunityCardDetailsInfoContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Community card details info container">
      <CommunityCardDetailsTags2 />
      <CommunityCardDetailsAchievements2 />
    </div>
  );
}

function PrimaryButtonMobile3() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[28px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[120px]" data-name="Primary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonMobile2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#388896] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsButtons2() {
  return (
    <div className="content-stretch flex gap-[29px] items-center justify-end relative shrink-0" data-name="Community card details buttons">
      <PrimaryButtonMobile3 />
      <TextButtonMobile2 />
    </div>
  );
}

function CommunityCardDetailsInfo2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Community card details info">
      <CommunityCardDetailsInfoContainer2 />
      <CommunityCardDetailsButtons2 />
    </div>
  );
}

function CommunityCardDetailsContainer2() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full" data-name="Community card details container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <CommunityCardDetailsHeader2 />
          <CommunityCardDetailsInfo2 />
        </div>
      </div>
    </div>
  );
}

function CommunityCardDetails2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[133px] pt-0 px-0 relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Community card details">
      <CommunityCardDetailsContainer2 />
    </div>
  );
}

function CommunityCard2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Community card">
      <CommunityCardImage2 />
      <CommunityCardDetails2 />
    </div>
  );
}

function CommunityCardImage3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Community card image">
      <div className="[grid-area:1_/_1] h-[163px] ml-0 mt-0 relative rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] w-[270px]" data-name="Community card image content">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[8px] rounded-tr-[8px]">
          <img alt="" className="absolute h-[226.99%] left-[0.37%] max-w-none top-[-45.09%] w-full" src={imgCommunityCardImageContent2} />
        </div>
      </div>
    </div>
  );
}

function CommunityCardDetailsNameContainer3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-0 w-[153px]" data-name="Community card details name container">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#192126] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Raj Mohan</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsName3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[153px]" data-name="Community card details name">
      <CommunityCardDetailsNameContainer3 />
    </div>
  );
}

function CommunityCardDetailsLocation3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start justify-center left-0 top-[24px] w-[153px]" data-name="Community card details location">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#979797] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Bangalore, India</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsHeaderContent3() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[153px]" data-name="Community card details header content">
      <CommunityCardDetailsName3 />
      <CommunityCardDetailsLocation3 />
    </div>
  );
}

function CommunityCardDetailsHeaderContainer3() {
  return (
    <div className="h-[40px] mr-[-50px] relative shrink-0 w-[153px]" data-name="Community card details header container">
      <CommunityCardDetailsHeaderContent3 />
    </div>
  );
}

function CommunityCardDetailsHeader3() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[50px] py-0 relative shrink-0" data-name="Community card details header">
      <CommunityCardDetailsHeaderContainer3 />
    </div>
  );
}

function CommunityCardDetailsTagsItem9() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-0 px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Skincare</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem10() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[67px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Art</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsItem11() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[102px] px-[8px] py-[4px] rounded-[20px] top-0" data-name="Community card details tags item">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Accessibility</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsMore3() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] items-center justify-center left-[192px] p-[4px] rounded-[100px] top-0 w-[30px]" data-name="Community card details tags more">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">+2</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsTagsContainer3() {
  return (
    <div className="h-[30px] relative shrink-0 w-[279px]" data-name="Community card details tags container">
      <CommunityCardDetailsTagsItem9 />
      <CommunityCardDetailsTagsItem10 />
      <CommunityCardDetailsTagsItem11 />
      <CommunityCardDetailsTagsMore3 />
    </div>
  );
}

function CommunityCardDetailsTags3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[258px]" data-name="Community card details tags">
      <CommunityCardDetailsTagsContainer3 />
    </div>
  );
}

function CommunityCardDetailsAchievementsIcon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details achievements icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[335px]" data-name="Community card details achievements item">
      <CommunityCardDetailsAchievementsIcon4 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Artist/Speaker</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievementsIcon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Community card details achievements icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CommunityCardDetailsAchievementsItem7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[36px] w-[335px]" data-name="Community card details achievements item">
      <CommunityCardDetailsAchievementsIcon5 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Peer Mentor</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsAchievements3() {
  return (
    <div className="h-[60px] relative shrink-0 w-[335px]" data-name="Community card details achievements">
      <CommunityCardDetailsAchievementsItem6 />
      <CommunityCardDetailsAchievementsItem7 />
    </div>
  );
}

function CommunityCardDetailsInfoContainer3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Community card details info container">
      <CommunityCardDetailsTags3 />
      <CommunityCardDetailsAchievements3 />
    </div>
  );
}

function PrimaryButtonMobile4() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[28px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[120px]" data-name="Primary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonMobile3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#388896] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function CommunityCardDetailsButtons3() {
  return (
    <div className="content-stretch flex gap-[29px] items-center justify-end relative shrink-0" data-name="Community card details buttons">
      <PrimaryButtonMobile4 />
      <TextButtonMobile3 />
    </div>
  );
}

function CommunityCardDetailsInfo3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Community card details info">
      <CommunityCardDetailsInfoContainer3 />
      <CommunityCardDetailsButtons3 />
    </div>
  );
}

function CommunityCardDetailsContainer3() {
  return (
    <div className="bg-white mb-[-133px] relative rounded-bl-[15px] rounded-br-[15px] shrink-0 w-full" data-name="Community card details container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <CommunityCardDetailsHeader3 />
          <CommunityCardDetailsInfo3 />
        </div>
      </div>
    </div>
  );
}

function CommunityCardDetails3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[133px] pt-0 px-0 relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Community card details">
      <CommunityCardDetailsContainer3 />
    </div>
  );
}

function CommunityCard3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Community card">
      <CommunityCardImage3 />
      <CommunityCardDetails3 />
    </div>
  );
}

function CommunityContent() {
  return (
    <div className="box-border content-stretch flex gap-[24px] items-center overflow-x-auto overflow-y-clip p-[8px] relative shrink-0 w-[362px]" data-name="Community content">
      <CommunityCard />
      <CommunityCard1 />
      <CommunityCard2 />
      <CommunityCard3 />
    </div>
  );
}

function CommunitySection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[16px] top-[3270px] w-[362px]" data-name="Community section">
      <CommunityHeader />
      <CommunityContent />
    </div>
  );
}

function PrimaryButtonMobile5() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[28px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[120px]" data-name="Primary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Register</p>
      </div>
    </div>
  );
}

function SecondaryButtonMobile() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[120px]" data-name="secondary button mobile">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#388896] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Login</p>
      </div>
    </div>
  );
}

function MainMessageButtons() {
  return (
    <div className="content-stretch flex gap-[18px] items-center relative shrink-0" data-name="Main message buttons">
      <PrimaryButtonMobile5 />
      <SecondaryButtonMobile />
    </div>
  );
}

function MainMessage() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[calc(50%-0.5px)] top-[3878px] translate-x-[-50%]" data-name="Main message">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#192126] text-[24px] text-center w-[316px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">Together, we move forward.Every step, with you.</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-center tracking-[0.4px] w-[274px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Restoring confidence through human connection. Built with care, made for you.</p>
      </div>
      <MainMessageButtons />
    </div>
  );
}

function FooterIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Footer icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Footer icon">
          <path d={svgPaths.p39bb3400} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function FooterTextAndIcon() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Footer text and icon">
      <div className="bg-clip-text bg-gradient-to-b flex flex-col font-['Roboto:Regular',_sans-serif] font-normal from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap to-[#388896] tracking-[0.4px]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Designed for inclusion</p>
      </div>
      <FooterIcon />
      <div className="bg-clip-text bg-gradient-to-b flex flex-col font-['Roboto:Regular',_sans-serif] font-normal from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap to-[#388896] tracking-[0.4px]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">Built for change</p>
      </div>
    </div>
  );
}

function FooterInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center relative shrink-0" data-name="Footer info">
      <FooterTextAndIcon />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[12px] text-center text-nowrap tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">© 2025 Sarathi.co.in</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#f2f2f7] box-border content-stretch flex flex-col gap-[80px] items-start left-1/2 px-[64px] py-[20px] top-[4114px] translate-x-[-50%]" data-name="Footer">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#505050] text-[12px] tracking-[0.4px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">About • Contact • Privacy • Explore Stories</p>
      </div>
      <FooterInfo />
    </div>
  );
}

function Component24() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p3bdb8380} fill="var(--fill-0, #979797)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 w-[56px]">
      <Component24 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#979797] text-[12px] text-center tracking-[0.4px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Daily Tips</p>
      </div>
    </div>
  );
}

function Component25() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p10dfe900} fill="var(--fill-0, #979797)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[65px]">
      <Component25 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#979797] text-[12px] text-center tracking-[0.4px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Community</p>
      </div>
    </div>
  );
}

function Component26() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.pdd1b780} fill="var(--fill-0, #979797)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-[67px]">
      <Component26 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#979797] text-[12px] text-center tracking-[0.4px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Help Center</p>
      </div>
    </div>
  );
}

function Component27() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path clipRule="evenodd" d={svgPaths.p18fb9000} fill="var(--fill-0, #979797)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[37px]">
      <Component27 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#979797] text-[12px] text-center tracking-[0.4px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex gap-[36px] items-end left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%]">
      <Frame13 />
      <Frame12 />
      <Frame11 />
      <Frame10 />
    </div>
  );
}

function BottomNavbar() {
  return (
    <div className="absolute h-[65px] left-0 top-[752px] w-[375px]" data-name="Bottom navbar">
      <div aria-hidden="true" className="absolute border border-[#192126] border-solid inset-0 pointer-events-none shadow-[0px_-1px_4px_0px_rgba(166,166,166,0.25)]" />
      <div className="absolute bg-white inset-0 shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]" />
      <Frame9 />
    </div>
  );
}

function StatusIcons() {
  return (
    <div className="h-[13px] relative shrink-0 w-[77.67px]" data-name="Status icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 13">
        <g id="Status icons">
          <path clipRule="evenodd" d={svgPaths.p24b4d380} fill="var(--fill-0, #192126)" fillRule="evenodd" id="Cellular Connection" />
          <path clipRule="evenodd" d={svgPaths.p24e99f00} fill="var(--fill-0, #192126)" fillRule="evenodd" id="Wifi" />
          <g id="Battery">
            <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, #192126)" width="24" x="50.8416" y="0.5" />
            <path d={svgPaths.p3bd2ae80} fill="var(--fill-0, #192126)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, #192126)" height="9" id="Capacity" rx="2.5" width="21" x="52.3416" y="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="box-border content-stretch flex gap-[229px] items-center justify-center px-[2px] py-0 relative shrink-0 w-[347px]" data-name="Status bar">
      <p className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[22px] relative shrink-0 text-[#192126] text-[17px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:41
      </p>
      <StatusIcons />
    </div>
  );
}

function Sarathi() {
  return (
    <div className="h-[22.432px] relative shrink-0 w-[88.53px]" data-name="Sarathi">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 23">
        <g id="Sarathi">
          <g id="Sarathi_2">
            <path d={svgPaths.p32945ef0} fill="url(#paint0_linear_1_3950)" />
            <path d={svgPaths.p18583c80} fill="url(#paint1_linear_1_3950)" />
            <path d={svgPaths.p860ac70} fill="url(#paint2_linear_1_3950)" />
            <path d={svgPaths.p20cd3200} fill="url(#paint3_linear_1_3950)" />
            <path d={svgPaths.p25dd2bc0} fill="url(#paint4_linear_1_3950)" />
            <path d={svgPaths.p3617b780} fill="url(#paint5_linear_1_3950)" />
            <path d={svgPaths.p1586fc00} fill="url(#paint6_linear_1_3950)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_1_3950" x1="44.265" x2="44.265" y1="0" y2="22.432">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Component28() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
      <g clipPath="url(#clip0_1_4002)" id="Component">
        <path d={svgPaths.p468480} fill="var(--fill-0, #C7C8D5)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_1_4002">
          <rect fill="white" height="33" width="33" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Component29() {
  return (
    <div className="relative shrink-0 size-[33px]" data-name="Component">
      <Component28 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] items-center justify-center p-[4px] relative rounded-[12.5px] shrink-0 size-[25px]">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#69b57c] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">EN</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#69b57c] box-border content-stretch flex flex-col gap-[8px] items-center justify-center p-[4px] relative rounded-[12.5px] shrink-0 size-[25px]">
      <div className="flex flex-col font-['Roboto:Medium',_'Noto_Sans_Devanagari:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#8ac0ad] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">हि</p>
      </div>
    </div>
  );
}

function Component33() {
  return (
    <div className="bg-[#69b57c] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[25px] shrink-0" data-name="Component 52">
      <Frame18 />
      <Frame19 />
    </div>
  );
}

function RightSideIcons() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="right side icons">
      <Component29 />
      <Component33 />
    </div>
  );
}

function TopNavigation() {
  return (
    <div className="box-border content-stretch flex items-center justify-between p-[2px] relative shrink-0 w-[345px]" data-name="Top navigation">
      <Sarathi />
      <RightSideIcons />
    </div>
  );
}

function TopNavigationBar() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[31px] h-[117px] items-start left-0 p-[15px] top-0 w-[375px]" data-name="Top navigation bar">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <StatusBar />
      <TopNavigation />
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] size-full" data-name="Homepage">
      <TopNavigationBar />
      <HeroSection />
      <QuoteSection />
      <HealingSection />
      <ProstheticSection />
      <HelpCenter />
      <StatisticsSection />
      <CommunitySection />
      <MainMessage />
      <Footer />
      <BottomNavbar />
    </div>
  );
}