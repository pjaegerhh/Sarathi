import svgPaths from "./svg-b4t3bur0kw";
import imgImage from "figma:asset/4038b380ca66816e136f836132bca1b8cc0db251.png";
import imgRectangle31 from "figma:asset/dc47787b499eb83f6a39d48d318b9dac108c4c7d.png";
import imgRectangle33 from "figma:asset/617b3f3d9b67780e89a5c8d624b5d8b0f13ea0bf.png";
import imgRectangle34 from "figma:asset/14532ada289a40c010c9ed2d41fc6fc11a3aae7f.png";
import imgRectangle70 from "figma:asset/4769aeb444c6cbe05dc0663fb5c35a853e49584c.png";
import imgRectangle71 from "figma:asset/ceb4eb08f4449d6be9cb7d76be55ca0ad330384c.png";
import imgRectangle72 from "figma:asset/16c794c6e6a2fd5ee8632dc15dc85640607f1b9a.png";
import imgImage1 from "figma:asset/9e46f3be7b5472cd8a3b304c1ba73356f2cd2099.png";
import imgImage2 from "figma:asset/8fb8fc34b439a14d915eca2570a2d283a90cabb5.png";

function Icon() {
  return (
    <div className="mr-[-12px] relative shrink-0 size-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p3cb5b100} fill="url(#paint0_linear_1_5077)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_5077" x1="20" x2="20" y1="5" y2="35.5833">
            <stop stopColor="#69B57C" />
            <stop offset="1" stopColor="#388896" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Overview() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[12px] py-0 relative shrink-0" data-name="Overview">
      <div className="bg-clip-text bg-gradient-to-b flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold from-[#69b57c] justify-center leading-[0] mr-[-12px] relative shrink-0 text-[40px] text-center to-[#388896] w-[134px]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px]">{`+250 `}</p>
      </div>
      <Icon />
    </div>
  );
}

function InformationFrame() {
  return (
    <div className="content-stretch flex flex-col gap-px items-center relative shrink-0 w-full" data-name="Information frame">
      <Overview />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#505050] text-[22px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Members in the community</p>
      </div>
    </div>
  );
}

function FactualNumbers() {
  return (
    <div className="content-stretch flex flex-col gap-px items-center justify-center relative shrink-0 w-full" data-name="Factual numbers">
      <InformationFrame />
    </div>
  );
}

function Next() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="next">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="next ">
          <path d="M3.5 1L8.5 6L3.5 11" id="Vector" stroke="var(--stroke-0, #388896)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[43px] relative rounded-[15px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative w-full">
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#388896] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px] whitespace-pre">Join the Community</p>
          </div>
          <Next />
        </div>
      </div>
    </div>
  );
}

function OnboardingOption() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[calc(100%+130px)] top-[calc(75%+952.75px)] w-[214px]" data-name="Onboarding option">
      <FactualNumbers />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Footer icon">
          <path d={svgPaths.p39bb3400} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Quotes() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Quotes">
      <div className="bg-clip-text bg-gradient-to-b flex flex-col font-['Roboto:Medium',_sans-serif] font-medium from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[18px] text-nowrap to-[#388896]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] whitespace-pre">Designed for inclusion</p>
      </div>
      <Icon1 />
      <div className="bg-clip-text bg-gradient-to-b flex flex-col font-['Roboto:Medium',_sans-serif] font-medium from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[18px] text-nowrap to-[#388896]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] whitespace-pre">Built for change</p>
      </div>
    </div>
  );
}

function SarathiCoIn() {
  return (
    <div className="content-stretch flex gap-[195px] items-center relative shrink-0" data-name="Sarathi.co.in">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#505050] text-[18px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] whitespace-pre">© 2025 Sarathi.co.in</p>
      </div>
      <Quotes />
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#505050] text-[18px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] whitespace-pre">About • Contact • Privacy • Explore Stories</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#f2f2f7] bottom-px box-border content-stretch flex flex-col gap-[10px] h-[100px] items-start left-[2px] pb-[39px] pt-[36px] px-[27px] w-[1280px]" data-name="Footer">
      <SarathiCoIn />
    </div>
  );
}

function AuthorDetail() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[8px] items-center leading-[0] relative shrink-0 text-[18px] text-center" data-name="Author, detail">
      <div className="flex flex-col justify-center relative shrink-0 text-[#388896] w-[269px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Dr. Pooja Mukul, MD</p>
      </div>
      <div className="flex flex-col justify-center min-w-full relative shrink-0 text-[#979797] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">B.M.V.S.S, Jaipur</p>
      </div>
    </div>
  );
}

function IntroductoryQuote() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[calc(50%-0.5px)] top-[calc(12.5%+328.625px)] translate-x-[-50%] translate-y-[-50%]" data-name="Introductory Quote">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[22px] text-center w-[967px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">{`"It's time we shared the global knowledge of the developers of the prosthesis community and worked together on shared solutions to better and better help those in need"`}</p>
      </div>
      <AuthorDetail />
    </div>
  );
}

function SectionTitleIntroText() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 w-[906px]" data-name="Section title, intro text">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[#192126] text-[40px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px]">Redefining the Way You Heal</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[22px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Your journey is unique — our platform adapts to your rhythm, supporting confidence and comfort at every stage.</p>
      </div>
    </div>
  );
}

function CategoryCard() {
  return (
    <div className="absolute bottom-[0.7%] contents left-0 right-0 top-0" data-name="Category card">
      <div className="absolute bg-[#e0ebe3] bottom-[1.63%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10.134px_0px_#dddddd] top-[0.01%]" data-name="Background" />
      <div className="absolute bottom-[0.7%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-0" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[30px] rounded-tr-[30px]">
          <img alt="" className="absolute h-[129.25%] left-[-0.36%] max-w-none top-[-38.83%] w-full" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p602f900} id="Vector" stroke="var(--stroke-0, #8AC0AD)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryButtonIconTextDesktop() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[124px]" data-name="secondary button icon text desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8ac0ad] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Training</p>
      </div>
      <Component />
    </div>
  );
}

function SecondaryButtonIconTextDesktop1() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex items-start ml-0 mt-[88.058px] relative" data-name="secondary button icon text desktop">
      <SecondaryButtonIconTextDesktop />
    </div>
  );
}

function CategoryCard1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Category card">
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-[80.058px] justify-center ml-0 mt-[40.029px] relative text-[22px] text-white translate-y-[-50%] w-[334.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Relearning motion, rebuilding trust through training</p>
      </div>
      <SecondaryButtonIconTextDesktop1 />
    </div>
  );
}

function CategoryCard2() {
  return (
    <div className="absolute bg-gradient-to-b bottom-0 box-border content-stretch flex flex-col from-[#69b57c] items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] to-[#388896] top-[59.95%]" data-name="Category card">
      <CategoryCard1 />
    </div>
  );
}

function CategoryCardDesktop() {
  return (
    <div className="h-[432.719px] relative shrink-0 w-[555.339px]" data-name="category card desktop">
      <CategoryCard />
      <CategoryCard2 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute bottom-[1.64%] contents left-0 right-0 top-0">
      <div className="absolute bg-[#e0ebe3] bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10.134px_0px_#dddddd] top-0" />
      <div className="absolute bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-[0.23%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgRectangle31} />
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component">
          <path d={svgPaths.p602f900} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryButtonIconTextDesktop() {
  return (
    <div className="[grid-area:1_/_1] bg-[#8ac0ad] box-border content-stretch flex gap-[12px] h-[46px] items-center justify-center ml-0 mt-[92.33px] px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd]" data-name="primary button icon text desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Rehabilitation</p>
      </div>
      <Component1 />
    </div>
  );
}

function Group10() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-[80.058px] justify-center ml-0 mt-[40.029px] relative text-[#192126] text-[22px] translate-y-[-50%] w-[334.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre-wrap">{`Reconnecting body and mind in  motion with rehabilitation`}</p>
      </div>
      <PrimaryButtonIconTextDesktop />
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group10 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex flex-col items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] top-[59.95%]">
      <Group9 />
    </div>
  );
}

function CategoryCardDesktop1() {
  return (
    <div className="h-[432.719px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[555.339px]" data-name="category card desktop">
      <Group8 />
      <Frame31 />
    </div>
  );
}

function ContentCards() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Content Cards">
      <CategoryCardDesktop />
      <CategoryCardDesktop1 />
    </div>
  );
}

function ServiceCategories() {
  return (
    <div className="absolute content-end flex flex-wrap gap-[50px] items-end left-[calc(54.167%-40.333px)] top-[1140px] translate-x-[-50%] w-[1146px]" data-name="Service categories">
      <SectionTitleIntroText />
      <ContentCards />
    </div>
  );
}

function ProsthesisCategory() {
  return (
    <div className="content-stretch flex gap-[265px] items-center relative shrink-0" data-name="Prosthesis Category">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[#192126] text-[40px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] whitespace-pre">Find What Fits You Best</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-[64px] justify-center relative shrink-0 text-[#505050] text-[22px] text-right w-[419px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Explore prosthetic solutions designed around your needs, comfort, and lifestyle.</p>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-0 rounded-[15px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
          <img alt="" className="absolute h-[359.84%] left-[-11.54%] max-w-none top-[-251.64%] w-[140.71%]" src={imgRectangle31} />
        </div>
      </div>
      <div className="absolute bg-white inset-0 opacity-20 rounded-[15px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[90px] left-[88.62%] right-[-3.04%] top-[174px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <g id="Group 92">
          <circle cx="45" cy="45" fill="var(--fill-0, white)" id="Ellipse 38" r="45" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
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

function IconButtonDesktop() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[574px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[195px]" data-name="icon button desktop">
      <Component2 />
    </div>
  );
}

function BelowKneeCard() {
  return (
    <div className="h-[244px] overflow-clip relative rounded-[30px] shrink-0 w-[624px]" data-name="below knee card">
      <Group5 />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal inset-[81.56%_-2.56%_5.33%_84.61%] justify-center leading-[0] opacity-0 text-[22px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Below knee</p>
      </div>
      <Group />
      <IconButtonDesktop />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-0 rounded-[15px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
          <img alt="" className="absolute h-[280.74%] left-[-3.21%] max-w-none top-[-157.79%] w-[109.78%]" src={imgRectangle33} />
        </div>
      </div>
      <div className="absolute bg-white inset-0 opacity-20 rounded-[15px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[90px] left-[88.62%] right-[-3.04%] top-[174px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <g id="Group 92">
          <circle cx="45" cy="45" fill="var(--fill-0, white)" id="Ellipse 38" r="45" />
        </g>
      </svg>
    </div>
  );
}

function Component3() {
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

function IconButtonDesktop1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[574px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[195px]" data-name="icon button desktop">
      <Component3 />
    </div>
  );
}

function AboveKneeCard() {
  return (
    <div className="h-[244px] overflow-clip relative rounded-[30px] shrink-0 w-[624px]" data-name="Above knee card">
      <Group6 />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal inset-[81.56%_-2.56%_5.33%_84.3%] justify-center leading-[0] opacity-0 text-[22px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Above knee</p>
      </div>
      <Group1 />
      <IconButtonDesktop1 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-0 rounded-[15px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
          <img alt="" className="absolute h-[357.76%] left-[-1.12%] max-w-none top-[-184.62%] w-[102.08%]" src={imgRectangle34} />
        </div>
      </div>
      <div className="absolute bg-white inset-0 opacity-20 rounded-[15px]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[90px] left-[88.62%] right-[-3.04%] top-[174px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <g id="Group 92">
          <circle cx="45" cy="45" fill="var(--fill-0, white)" id="Ellipse 38" r="45" />
        </g>
      </svg>
    </div>
  );
}

function Component4() {
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

function IconButtonDesktop2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[574px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[195px]" data-name="icon button desktop">
      <Component4 />
    </div>
  );
}

function WheelchairCard() {
  return (
    <div className="h-[244px] overflow-clip relative rounded-[30px] shrink-0 w-[624px]" data-name="wheelchair card">
      <Group7 />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal inset-[81.56%_-2.56%_5.33%_84.61%] justify-center leading-[0] opacity-0 text-[22px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Below knee</p>
      </div>
      <Group2 />
      <IconButtonDesktop2 />
    </div>
  );
}

function KneeCards() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[22px] items-center ml-0 mt-0 overflow-x-auto overflow-y-clip relative w-[1120px]" data-name="Knee cards">
      <BelowKneeCard />
      <AboveKneeCard />
      <WheelchairCard />
    </div>
  );
}

function CategoryCarousel() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Category carousel">
      <KneeCards />
    </div>
  );
}

function ProsthesisCategory1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[46px] items-center leading-[0] left-[calc(50%+0.5px)] top-[calc(25%+511.969px)] translate-x-[-50%] w-[1121px]" data-name="Prosthesis Category">
      <ProsthesisCategory />
      <CategoryCarousel />
    </div>
  );
}

function PrimaryButtonDesktop() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[24px] py-[8px] relative rounded-[26px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[160px]" data-name="Primary button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Register</p>
      </div>
    </div>
  );
}

function SecondaryButtonDesktop() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[50px] items-center justify-center px-[24px] py-[8px] relative rounded-[26px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[160px]" data-name="secondary button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#388896] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Login</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[18px] items-center relative shrink-0" data-name="Buttons">
      <PrimaryButtonDesktop />
      <SecondaryButtonDesktop />
    </div>
  );
}

function ClosingContent() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-1/2 top-[calc(75%+955.469px)] translate-x-[-50%] w-[864px]" data-name="Closing content">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[#192126] text-[40px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px]">Together, we move forward.Every step, with you.</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#505050] text-[22px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Restoring confidence through human connection. Built with care, made for you.</p>
      </div>
      <Buttons />
    </div>
  );
}

function ImageSection() {
  return (
    <div className="absolute bottom-[84.12%] contents left-0 right-0 top-0" data-name="Image section">
      <div className="absolute bottom-[84.12%] left-0 right-0 rounded-br-[20px] rounded-tr-[20px] top-0" data-name="Background Image">
        <video autoPlay className="absolute max-w-none object-cover rounded-br-[20px] rounded-tr-[20px] size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/fa354ed52501118ff5c9557ed256befe125c3fca" />
        </video>
      </div>
      <div className="absolute bottom-[84.12%] flex items-center justify-center left-0 right-0 top-[9.66%]">
        <div className="flex-none h-[329px] scale-y-[-100%] w-[1280px]">
          <div className="bg-gradient-to-b from-[#ffffff] from-[18.103%] rounded-bl-[20px] rounded-br-[20px] size-full to-[rgba(255,255,255,0)]" data-name="Gradient overlay" />
        </div>
      </div>
    </div>
  );
}

function Scroll() {
  return (
    <div className="absolute h-[17px] left-[calc(41.667%+80.667px)] top-[582.92px] w-[70px]" data-name="scroll">
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

function HeroSection() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Hero Section">
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

function TextFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 w-full" data-name="Text frame">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[#192126] text-[40px] w-[411px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px]">Your story can inspire someone today</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[22px] w-[405px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Add photos, videos, or proud moments to inspire, motivate, and support others.</p>
      </div>
    </div>
  );
}

function Component34() {
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

function SecondaryButtonIconTextDesktop2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="secondary button icon text desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8ac0ad] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Share your story</p>
      </div>
      <Component34 />
    </div>
  );
}

function Component5() {
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

function IconButtonDesktop3() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component5 />
    </div>
  );
}

function Component6() {
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

function IconButtonDesktop4() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component6 />
    </div>
  );
}

function Component7() {
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

function IconButtonDesktop5() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component7 />
    </div>
  );
}

function Component8() {
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

function IconButtonDesktop6() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component8 />
    </div>
  );
}

function ContentUploadOptions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content upload options">
      <IconButtonDesktop3 />
      <IconButtonDesktop4 />
      <IconButtonDesktop5 />
      <IconButtonDesktop6 />
    </div>
  );
}

function StorySharingOptions() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0" data-name="Story sharing options">
      <SecondaryButtonIconTextDesktop2 />
      <ContentUploadOptions />
    </div>
  );
}

function TextAndButtonsFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-end relative shrink-0 w-[531.576px]" data-name="Text and buttons frame">
      <TextFrame />
      <StorySharingOptions />
    </div>
  );
}

function ImageSection1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Image Section">
      <div className="[grid-area:1_/_1] h-[478px] ml-0 mt-[32px] relative rounded-bl-[20px] rounded-br-[20px] w-[436px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-bl-[20px] rounded-br-[20px]">
          <img alt="" className="absolute h-[126.73%] left-[-30.91%] max-w-none top-[-17.74%] w-[138.94%]" src={imgRectangle33} />
        </div>
      </div>
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#ffffff] from-[18.103%] h-[232px] ml-0 mt-0 rounded-bl-[20px] rounded-br-[20px] to-[rgba(255,255,255,0)] w-[436px]" data-name="Gradient overlay" />
    </div>
  );
}

function TextButtonsImageFrame() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative rounded-bl-[20px] rounded-br-[20px] shrink-0" data-name="Text, buttons, image frame">
      <TextAndButtonsFrame />
      <ImageSection1 />
    </div>
  );
}

function TopFrame() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] from-[22.305%] gap-[10px] items-start px-[46px] py-[30px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 to-[#69b57c] to-[110.04%]" data-name="Top frame">
      <TextButtonsImageFrame />
    </div>
  );
}

function Overview1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0 w-full" data-name="Overview">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[40px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] whitespace-pre">+2 million</p>
      </div>
    </div>
  );
}

function Component2Million() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[227px]" data-name="+2million">
      <Overview1 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[32px] relative shrink-0 text-[22px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`BMVSS: Changing lives `}</p>
        <p>through rehabilitation.</p>
      </div>
    </div>
  );
}

function NumberOfCenters() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[159px]" data-name="Number of centers">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[40px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] text-nowrap whitespace-pre">{`+700 `}</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[32px] relative shrink-0 text-[22px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Private and public</p>
        <p>centers nationwide.</p>
      </div>
    </div>
  );
}

function NumberOfCenters1() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center justify-center relative shrink-0" data-name="Number of centers">
      <NumberOfCenters />
    </div>
  );
}

function BeneficiariesNumber() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[193px]" data-name="Beneficiaries number">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[40px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] text-nowrap whitespace-pre">380,000+</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[32px] relative shrink-0 text-[22px] text-center whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Beneficiaries assisted</p>
        <p>through camps</p>
      </div>
    </div>
  );
}

function Overview2() {
  return (
    <div className="content-stretch flex gap-[158px] items-center justify-center relative shrink-0 w-[895px]" data-name="Overview">
      <Component2Million />
      <NumberOfCenters1 />
      <BeneficiariesNumber />
    </div>
  );
}

function BottomFrame() {
  return (
    <div className="bg-gradient-to-b from-[#69b57c] h-[169px] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 to-[#388896] w-full" data-name="Bottom frame">
      <div aria-hidden="true" className="absolute border-[4px_0px_0px] border-solid border-white inset-0 pointer-events-none rounded-bl-[30px] rounded-br-[30px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[169px] items-center justify-center px-[41px] py-[26px] relative w-full">
          <Overview2 />
        </div>
      </div>
    </div>
  );
}

function StoryContent() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[calc(50%-0.212px)] top-[calc(50%+677.219px)] translate-x-[-50%]" data-name="Story content">
      <TopFrame />
      <BottomFrame />
    </div>
  );
}

function TextUnderlineButtonDesktop() {
  return (
    <div className="h-[24px] relative shrink-0 w-[59px]" data-name="text underline button desktop">
      <div className="absolute flex flex-col font-['Roboto:Bold',_sans-serif] font-bold inset-0 justify-center leading-[0] text-[#505050] text-[0px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[text-underline-position:from-font] decoration-solid leading-[24px] text-[#8ac0ad] text-[16px] underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          View All
        </p>
      </div>
    </div>
  );
}

function SelectingCategoryHyperlink() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[15px] top-[-8px] w-[1123px]" data-name="Selecting Category, Hyperlink">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[22px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Select Center Category</p>
      </div>
      <TextUnderlineButtonDesktop />
    </div>
  );
}

function Component9() {
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

function Frame21() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center left-[calc(50%-98.5px)] p-[8px] rounded-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] top-[calc(50%-231px)] translate-x-[-50%] translate-y-[-50%]">
      <Component9 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Kanpur, UP</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#192126] text-[22px] w-[223px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Government Centers</p>
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p2ae87100} fill="var(--fill-0, #8AC0AD)" id="Vector" />
          <path d="M10.5 22V17H13.5V22H10.5Z" fill="var(--fill-0, #8AC0AD)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Component10 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">170+ ALIMCO centers nationwide</p>
      </div>
    </div>
  );
}

function Component11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path clipRule="evenodd" d={svgPaths.p35487b00} fill="var(--fill-0, #8AC0AD)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Component11 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Subsidized cost, ADIP scheme</p>
      </div>
    </div>
  );
}

function Component12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Footer icon">
          <path d={svgPaths.p39bb3400} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Component12 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Accessible for All, Certified Specialists</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Frame3 />
      <Frame4 />
      <Frame7 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] inset-[50.19%_3.83%_12.83%_3.06%] items-start">
      <Frame5 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#505050] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Offer prosthesis fitting, financial aid, and personalized rehabilitation services.</p>
      </div>
      <Frame6 />
    </div>
  );
}

function Component13() {
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

function IconButtonDesktop7() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[336px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[474px]" data-name="icon button desktop">
      <Component13 />
    </div>
  );
}

function LocationCards() {
  return (
    <div className="absolute bg-white bottom-0 left-[-2.81%] right-[2.81%] rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd] top-0" data-name="Location cards">
      <div className="absolute bg-white inset-0 rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd]" />
      <div className="absolute bottom-[52.08%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[30px] rounded-tr-[30px]">
          <img alt="" className="absolute h-[204.89%] left-0 max-w-none top-[-45.36%] w-full" src={imgRectangle70} />
        </div>
      </div>
      <Frame21 />
      <Frame18 />
      <IconButtonDesktop7 />
    </div>
  );
}

function Group11() {
  return (
    <div className="h-[530px] relative shrink-0 w-[392px]">
      <LocationCards />
    </div>
  );
}

function Component14() {
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

function Frame22() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center left-[calc(50%-98.5px)] p-[8px] rounded-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] top-[calc(50%-231px)] translate-x-[-50%] translate-y-[-50%]">
      <Component14 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Jaipur, Rajasthan</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#192126] text-[22px] w-[223px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">NGO/Non-Profit</p>
      </div>
    </div>
  );
}

function Component15() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p2ae87100} fill="var(--fill-0, #8AC0AD)" id="Vector" />
          <path d="M10.5 22V17H13.5V22H10.5Z" fill="var(--fill-0, #8AC0AD)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Component15 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">BMVSS 23 branches in India</p>
      </div>
    </div>
  );
}

function Component16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path clipRule="evenodd" d={svgPaths.p35487b00} fill="var(--fill-0, #8AC0AD)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Component16 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Free- subsidized cost</p>
      </div>
    </div>
  );
}

function Component17() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Footer icon">
          <path d={svgPaths.p39bb3400} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Component17 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Community Outreach, Schemes for rehabilitation</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Frame9 />
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] inset-[50.19%_3.83%_12.83%_3.06%] items-start">
      <Frame8 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#505050] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Affordable solutions and inclusive care programs. Offering customized fittings, high-end materials</p>
      </div>
      <Frame12 />
    </div>
  );
}

function Component18() {
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

function IconButtonDesktop8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[336px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[474px]" data-name="icon button desktop">
      <Component18 />
    </div>
  );
}

function LocationCards1() {
  return (
    <div className="absolute bg-white bottom-0 left-[-2.81%] right-[2.81%] rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd] top-0" data-name="Location cards">
      <div className="absolute bg-white inset-0 rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd]" />
      <div className="absolute bottom-[52.08%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgRectangle71} />
      </div>
      <Frame22 />
      <Frame19 />
      <IconButtonDesktop8 />
    </div>
  );
}

function LocationCard() {
  return (
    <div className="h-[530px] relative shrink-0 w-[392px]" data-name="Location card">
      <LocationCards1 />
    </div>
  );
}

function Component19() {
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

function Frame23() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center left-[calc(50%-98.5px)] p-[8px] rounded-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] top-[calc(50%-231px)] translate-x-[-50%] translate-y-[-50%]">
      <Component19 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Delhi, India</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#192126] text-[22px] w-[223px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Private Clinics</p>
      </div>
    </div>
  );
}

function Component20() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p2ae87100} fill="var(--fill-0, #8AC0AD)" id="Vector" />
          <path d="M10.5 22V17H13.5V22H10.5Z" fill="var(--fill-0, #8AC0AD)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Component20 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Endolite India: 250+ clinics / franchises (network)</p>
      </div>
    </div>
  );
}

function Component21() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path clipRule="evenodd" d={svgPaths.p35487b00} fill="var(--fill-0, #8AC0AD)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Component21 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Basic model from Rs.20,000+</p>
      </div>
    </div>
  );
}

function Component22() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Footer icon">
          <path d={svgPaths.p39bb3400} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Component22 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Personal Care</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Frame14 />
      <Frame15 />
      <Frame16 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] inset-[52.26%_3.83%_14.91%_3.06%] items-start">
      <Frame13 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#505050] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Offering customized fittings, high-end materials</p>
      </div>
      <Frame17 />
    </div>
  );
}

function Component23() {
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

function IconButtonDesktop9() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[336px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[474px]" data-name="icon button desktop">
      <Component23 />
    </div>
  );
}

function LocationCards2() {
  return (
    <div className="absolute bg-white bottom-0 left-[-2.81%] right-[2.81%] rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd] top-0" data-name="Location cards">
      <div className="absolute bg-white inset-0 rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd]" />
      <div className="absolute bottom-[52.08%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgRectangle72} />
      </div>
      <Frame23 />
      <Frame20 />
      <IconButtonDesktop9 />
    </div>
  );
}

function Group12() {
  return (
    <div className="h-[530px] relative shrink-0 w-[392px]">
      <LocationCards2 />
    </div>
  );
}

function LocationCards3() {
  return (
    <div className="absolute content-stretch flex gap-[32px] items-center left-[15px] top-[16px]" data-name="Location cards">
      <Group11 />
      <LocationCard />
      <Group12 />
    </div>
  );
}

function LocationsCards() {
  return (
    <div className="absolute h-[558px] left-0 overflow-x-auto overflow-y-clip top-[40.28px] w-[1215px]" data-name="Locations cards">
      <LocationCards3 />
    </div>
  );
}

function ServiceCenters() {
  return (
    <div className="absolute h-[606px] left-[65px] top-[calc(50%-8.781px)] w-[1244px]" data-name="Service centers">
      <SelectingCategoryHyperlink />
      <LocationsCards />
      <div className="absolute backdrop-blur-[1.5px] backdrop-filter h-[530px] left-[1132px] top-[50px] w-[82px]" data-name="Blur overlay" />
    </div>
  );
}

function Quote() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 w-[906px]" data-name="Quote">
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[#192126] text-[40px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px]">Join a community that understands you.</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#505050] text-[22px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Connect with inspiring members who share your journey, celebrate milestones, exchange tips, and support each other every step of the way</p>
      </div>
    </div>
  );
}

function TextUnderlineButtonDesktop1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[59px]" data-name="text underline button desktop">
      <div className="absolute bottom-0 flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] left-0 right-[-15.25%] text-[#505050] text-[0px] text-nowrap top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[text-underline-position:from-font] decoration-solid leading-[24px] text-[#8ac0ad] text-[16px] underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Join Now
        </p>
      </div>
    </div>
  );
}

function QuoteOnboardingOption() {
  return (
    <div className="content-stretch flex gap-[150px] items-end relative shrink-0" data-name="Quote + Onboarding option">
      <Quote />
      <TextUnderlineButtonDesktop1 />
    </div>
  );
}

function UserInformation() {
  return <div className="absolute h-[170px] left-0 top-0 w-[335px]" data-name="User Information" />;
}

function NameLocation() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal gap-[4px] items-start justify-center leading-[0] relative shrink-0 text-nowrap w-[153px]" data-name="Name, Location">
      <div className="flex flex-col justify-center relative shrink-0 text-[#192126] text-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] text-nowrap whitespace-pre">Manisha Rajput</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#979797] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] text-nowrap whitespace-pre">Andhra Pradesh, India</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Badge">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Badge">
          <path d={svgPaths.p2546a00} fill="var(--fill-0, #69B57C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NameLocationBadge() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Name, Location, Badge">
      <NameLocation />
      <Badge />
    </div>
  );
}

function Tag() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Skincare</p>
      </div>
    </div>
  );
}

function Tag1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Fatigue</p>
      </div>
    </div>
  );
}

function Tag2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Phantom Pain</p>
      </div>
    </div>
  );
}

function Tag3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[4px] relative rounded-[100px] shrink-0 w-[30px]" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">+5</p>
      </div>
    </div>
  );
}

function Tags() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tags">
      <Tag />
      <Tag1 />
      <Tag2 />
      <Tag3 />
    </div>
  );
}

function Tags1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Tags">
      <Tags />
    </div>
  );
}

function Component24() {
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

function Profession() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Profession">
      <Component24 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Professional Yoga Teacher</p>
      </div>
    </div>
  );
}

function Component25() {
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

function Profession1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Profession">
      <Component25 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Community Volunteer</p>
      </div>
    </div>
  );
}

function UserDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full" data-name="User details">
      <Tags1 />
      <Profession />
      <Profession1 />
    </div>
  );
}

function UserInformation1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User Information">
      <NameLocationBadge />
      <UserDetails />
    </div>
  );
}

function PrimaryButtonDesktop1() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[130px]" data-name="Primary button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonDesktop() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#388896] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function Buttons1() {
  return (
    <div className="box-border content-stretch flex gap-[18px] items-center pl-[10px] pr-0 py-0 relative shrink-0" data-name="Buttons">
      <PrimaryButtonDesktop1 />
      <TextButtonDesktop />
    </div>
  );
}

function UserInformation2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11px] items-start left-0 top-0 w-[335px]" data-name="User Information">
      <UserInformation1 />
      <Buttons1 />
    </div>
  );
}

function InformationSection() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[10px] relative shrink-0 w-[335px]" data-name="Information section">
      <UserInformation />
      <UserInformation2 />
    </div>
  );
}

function BottomFrame1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-start px-[9px] py-[19px] relative rounded-bl-[30px] rounded-br-[30px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="Bottom frame">
      <InformationSection />
    </div>
  );
}

function UserCard() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] top-[11px] w-[353px]" data-name="User Card">
      <div className="h-[256px] relative rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[30px] rounded-tr-[30px]">
          <img alt="" className="absolute h-[147.76%] left-[-18.04%] max-w-none top-[-10.66%] w-[137.78%]" src={imgImage1} />
        </div>
      </div>
      <BottomFrame1 />
    </div>
  );
}

function NameLocation1() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal gap-[4px] items-start justify-center leading-[0] relative shrink-0 text-nowrap w-[153px]" data-name="Name, Location">
      <div className="flex flex-col justify-center relative shrink-0 text-[#192126] text-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] text-nowrap whitespace-pre">Ramesh Raj</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#979797] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] text-nowrap whitespace-pre">Rajasthan, India</p>
      </div>
    </div>
  );
}

function Tag4() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Daily Tips</p>
      </div>
    </div>
  );
}

function Tag5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Skin care</p>
      </div>
    </div>
  );
}

function Tag6() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Athletics</p>
      </div>
    </div>
  );
}

function Tag7() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[4px] relative rounded-[100px] shrink-0 w-[30px]" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">+2</p>
      </div>
    </div>
  );
}

function Tags2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tags">
      <Tag4 />
      <Tag5 />
      <Tag6 />
      <Tag7 />
    </div>
  );
}

function Tags3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Tags">
      <Tags2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Profession2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profession">
      <Icon2 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Jaipur Marathon Winner</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ProfileType() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profile type">
      <Icon3 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Peer Mentor</p>
      </div>
    </div>
  );
}

function UserDetails1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User details">
      <Tags3 />
      <Profession2 />
      <ProfileType />
    </div>
  );
}

function UserInformation3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User Information">
      <NameLocation1 />
      <UserDetails1 />
    </div>
  );
}

function PrimaryButtonDesktop2() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[130px]" data-name="Primary button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonDesktop1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#388896] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function Buttons2() {
  return (
    <div className="box-border content-stretch flex gap-[18px] items-center pl-[10px] pr-0 py-0 relative shrink-0" data-name="Buttons">
      <PrimaryButtonDesktop2 />
      <TextButtonDesktop1 />
    </div>
  );
}

function InformationSection1() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-[335px]" data-name="Information section">
      <UserInformation3 />
      <Buttons2 />
    </div>
  );
}

function BottomFrame2() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-start px-[9px] py-[19px] relative rounded-bl-[30px] rounded-br-[30px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="Bottom frame">
      <InformationSection1 />
    </div>
  );
}

function UserCard1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[402px] top-[11px] w-[353px]" data-name="User Card">
      <div className="h-[256px] relative rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgImage2} />
      </div>
      <BottomFrame2 />
    </div>
  );
}

function NameLocation2() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal gap-[4px] items-start justify-center leading-[0] relative shrink-0 text-nowrap w-[153px]" data-name="Name, Location">
      <div className="flex flex-col justify-center relative shrink-0 text-[#192126] text-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] text-nowrap whitespace-pre">Hakim Ali</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#979797] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] text-nowrap whitespace-pre">UP, India</p>
      </div>
    </div>
  );
}

function Tag8() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Rehabilitation</p>
      </div>
    </div>
  );
}

function Tag9() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Sports</p>
      </div>
    </div>
  );
}

function Tag10() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Community</p>
      </div>
    </div>
  );
}

function Tag11() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[4px] relative rounded-[100px] shrink-0 w-[30px]" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">+3</p>
      </div>
    </div>
  );
}

function Tags4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tags">
      <Tag8 />
      <Tag9 />
      <Tag10 />
      <Tag11 />
    </div>
  );
}

function Tags5() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Tags">
      <Tags4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Profession3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profession">
      <Icon4 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Cricket State Player</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ProfileType1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profile type">
      <Icon5 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Public Speaker in Community</p>
      </div>
    </div>
  );
}

function USerDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="USer details">
      <Tags5 />
      <Profession3 />
      <ProfileType1 />
    </div>
  );
}

function UserInformation4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User information">
      <NameLocation2 />
      <USerDetails />
    </div>
  );
}

function PrimaryButtonDesktop3() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[130px]" data-name="Primary button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonDesktop2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#388896] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function Buttons3() {
  return (
    <div className="box-border content-stretch flex gap-[18px] items-center pl-[10px] pr-0 py-0 relative shrink-0" data-name="Buttons">
      <PrimaryButtonDesktop3 />
      <TextButtonDesktop2 />
    </div>
  );
}

function InformationSection2() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-[335px]" data-name="Information section">
      <UserInformation4 />
      <Buttons3 />
    </div>
  );
}

function BottomFrame3() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-start px-[9px] py-[19px] relative rounded-bl-[30px] rounded-br-[30px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="Bottom frame">
      <InformationSection2 />
    </div>
  );
}

function UserCard2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[792px] top-[11px] w-[353px]" data-name="User Card">
      <div className="h-[256px] relative rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[30px] rounded-tr-[30px]">
          <img alt="" className="absolute h-[173.83%] left-[-25.5%] max-w-none top-[-46.29%] w-[126.06%]" src={imgRectangle33} />
        </div>
      </div>
      <BottomFrame3 />
    </div>
  );
}

function NameLocation3() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal gap-[4px] items-start justify-center leading-[0] relative shrink-0 text-nowrap w-[153px]" data-name="Name, Location">
      <div className="flex flex-col justify-center relative shrink-0 text-[#192126] text-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] text-nowrap whitespace-pre">Raj Mohan</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#979797] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] text-nowrap whitespace-pre">Bangalore, India</p>
      </div>
    </div>
  );
}

function Tag12() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Skincare</p>
      </div>
    </div>
  );
}

function Tag13() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Art</p>
      </div>
    </div>
  );
}

function Tag14() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Accessibility</p>
      </div>
    </div>
  );
}

function Tag15() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[4px] relative rounded-[100px] shrink-0 w-[30px]" data-name="Tag">
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">+2</p>
      </div>
    </div>
  );
}

function Tags6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Tags">
      <Tag12 />
      <Tag13 />
      <Tag14 />
      <Tag15 />
    </div>
  );
}

function Tags7() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Tags">
      <Tags6 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p7a2ba80} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Profession4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profession">
      <Icon6 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Artist/Speaker</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p25484420} fill="var(--fill-0, #8AC0AD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ProfileType2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profile type">
      <Icon7 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Peer Mentor</p>
      </div>
    </div>
  );
}

function UserDetails2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User details">
      <Tags7 />
      <Profession4 />
      <ProfileType2 />
    </div>
  );
}

function UserInformation5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User information">
      <NameLocation3 />
      <UserDetails2 />
    </div>
  );
}

function PrimaryButtonDesktop4() {
  return (
    <div className="bg-[#388896] box-border content-stretch flex gap-[8px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[130px]" data-name="Primary button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">View profile</p>
      </div>
    </div>
  );
}

function TextButtonDesktop3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="text button desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#388896] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Connect</p>
      </div>
    </div>
  );
}

function Buttons4() {
  return (
    <div className="box-border content-stretch flex gap-[18px] items-center pl-[10px] pr-0 py-0 relative shrink-0" data-name="Buttons">
      <PrimaryButtonDesktop4 />
      <TextButtonDesktop3 />
    </div>
  );
}

function InformationSection3() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-[335px]" data-name="Information section">
      <UserInformation5 />
      <Buttons4 />
    </div>
  );
}

function BottomFrame4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-start px-[9px] py-[19px] relative rounded-bl-[30px] rounded-br-[30px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="Bottom frame">
      <InformationSection3 />
    </div>
  );
}

function UserCard3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1182px] top-[11px] w-[353px]" data-name="User Card">
      <div className="h-[256px] relative rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgRectangle34} />
      </div>
      <BottomFrame4 />
    </div>
  );
}

function UserCards() {
  return (
    <div className="h-[542px] overflow-x-auto overflow-y-clip relative shrink-0 w-[1209px]" data-name="User Cards">
      <UserCard />
      <UserCard1 />
      <UserCard2 />
      <UserCard3 />
    </div>
  );
}

function UserProfiles() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[80px] top-[calc(75%+173.469px)] w-[1209px]" data-name="User profiles">
      <QuoteOnboardingOption />
      <UserCards />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute contents left-[80px] top-[calc(25%+945.969px)]" data-name="Background">
      <div className="absolute h-[327.281px] left-[80px] rounded-[30px] top-[calc(25%+945.969px)] w-[1112px]" data-name="Background" />
    </div>
  );
}

function Description() {
  return (
    <div className="content-stretch flex gap-[316px] items-center relative shrink-0" data-name="Description">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[22px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">{` Discover all nearby centers in one click and connect with the support you need.`}</p>
      </div>
    </div>
  );
}

function TitleAndDescription() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title and description">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-center px-[24px] py-0 relative w-full">
          <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[40px] text-center text-white w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[60px]">Help Is Closer Than You Think</p>
          </div>
          <Description />
        </div>
      </div>
    </div>
  );
}

function Component26() {
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
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0">
      <Component26 />
      <p className="[white-space-collapse:collapse] font-['Roboto:Regular',_sans-serif] font-normal h-[21px] leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[14px] text-nowrap w-[207px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search Location
      </p>
    </div>
  );
}

function Component27() {
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
        <Component27 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]" />
    </div>
  );
}

function SearchLocationField() {
  return (
    <div className="h-[52px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[364px]" data-name="search location field">
      <InputArea />
    </div>
  );
}

function Component28() {
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
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0">
      <Component28 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Center Type
      </p>
    </div>
  );
}

function InputArea1() {
  return (
    <div className="absolute bg-white inset-0 rounded-[10px]" data-name="Input Area">
      <div className="box-border content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[inherit] size-full">
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]" />
    </div>
  );
}

function CenterField() {
  return (
    <div className="h-[52px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[195px]" data-name="Center field">
      <InputArea1 />
    </div>
  );
}

function Component29() {
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
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0">
      <Component29 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Price Range
      </p>
    </div>
  );
}

function InputArea2() {
  return (
    <div className="absolute bg-white inset-0 rounded-[10px]" data-name="Input Area">
      <div className="box-border content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[14px] relative rounded-[inherit] size-full">
        <Frame2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c7c8d5] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]" />
    </div>
  );
}

function PriceField() {
  return (
    <div className="h-[52px] relative shrink-0 w-[195px]" data-name="Price field">
      <InputArea2 />
    </div>
  );
}

function InputFields() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0" data-name="Input fields">
      <SearchLocationField />
      <div className="bg-[#c7c8d5] h-[44px] shrink-0 w-[3px]" data-name="Divider" />
      <CenterField />
      <div className="bg-[#c7c8d5] h-[44px] shrink-0 w-[3px]" data-name="Divider" />
      <PriceField />
    </div>
  );
}

function Component30() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p10c4d300} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchButton() {
  return (
    <div className="bg-[#5f9ca6] box-border content-stretch flex gap-[7.998px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="search button">
      <Component30 />
    </div>
  );
}

function InputFields1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[24px] items-center px-[20px] py-[15px] relative rounded-[30px] shadow-[0px_0px_10px_0px_rgba(221,221,221,0.86)] shrink-0" data-name="Input fields">
      <InputFields />
      <SearchButton />
    </div>
  );
}

function HelpCenterFinder() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[21px] h-[236px] items-center left-[127px] px-[8px] py-0 top-[calc(25%+1000.25px)]" data-name="Help center finder">
      <TitleAndDescription />
      <InputFields1 />
    </div>
  );
}

function HelpCenterFinder1() {
  return (
    <div className="absolute contents left-[80px] top-[calc(25%+945.969px)]" data-name="Help center finder">
      <Background />
      <HelpCenterFinder />
    </div>
  );
}

function Component31() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path clipRule="evenodd" d={svgPaths.p18fb9000} fill="var(--fill-0, #C7C8D5)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[45px]" data-name="Profile">
      <Component31 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#c7c8d5] text-[14px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Profile</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[72px]">
      <div className="h-[24px] relative shrink-0 w-[26px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <path d={svgPaths.p3983d80} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </svg>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#c7c8d5] text-[14px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Community</p>
      </div>
    </div>
  );
}

function Component32() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.p3bdb8380} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[61px]">
      <Component32 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#c7c8d5] text-[14px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Daily Tips</p>
      </div>
    </div>
  );
}

function Component33() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component">
          <path d={svgPaths.pdd1b780} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[74px]">
      <Component33 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#c7c8d5] text-[14px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Help Center</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Profile />
      <Frame24 />
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function LogoRestState() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 44">
      <g id="logo rest state">
        <g id="Vector">
          <path d={svgPaths.p2d64900} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p42620c0} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p77ea100} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p1262cb00} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.peaad480} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p1e943e00} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p3a30b300} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p27f6c000} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p11eb3cc0} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p1be64400} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p28cbaef2} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.p155df500} fill="var(--fill-0, #69B57C)" />
          <path d={svgPaths.pad5f000} fill="var(--fill-0, #69B57C)" />
        </g>
      </g>
    </svg>
  );
}

function Logo() {
  return (
    <div className="h-[43.014px] relative shrink-0 w-[39.238px]" data-name="logo">
      <LogoRestState />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[138px] items-center relative shrink-0">
      <Frame28 />
      <Logo />
    </div>
  );
}

function MaterialSymbolsHelp() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:help">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:help">
          <path d={svgPaths.p331abd00} fill="var(--fill-0, #C7C8D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Tutorial() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[72px]" data-name="tutorial">
      <MaterialSymbolsHelp />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#c7c8d5] text-[14px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Tutorial</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[42.857px] ml-0 mt-0 relative w-[42.667px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
          <ellipse cx="21.3333" cy="21.4286" fill="var(--fill-0, white)" id="Ellipse 260" rx="21.3333" ry="21.4286" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Bold',_sans-serif] font-bold h-[23.256px] justify-center leading-[0] ml-[21.392px] mt-[21.47px] relative text-[#69b57c] text-[16px] text-center translate-x-[-50%] translate-y-[-50%] w-[20.784px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">EN</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[42.857px] ml-0 mt-0 relative w-[42.667px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
          <ellipse cx="21.3333" cy="21.4286" fill="var(--fill-0, #69B57C)" id="Ellipse 261" rx="21.3333" ry="21.4286" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Bold',_'Noto_Sans_Devanagari:Bold',_sans-serif] font-bold h-[18.605px] justify-center leading-[0] ml-[21.333px] mt-[21.47px] relative text-[#8ac0ad] text-[16px] text-center translate-x-[-50%] translate-y-[-50%] w-[42.667px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">हि</p>
      </div>
    </div>
  );
}

function Component35() {
  return (
    <div className="bg-[#69b57c] box-border content-stretch flex gap-[4px] h-[50px] items-center leading-[0] p-[4px] relative rounded-[25px] shrink-0" data-name="Component 56">
      <Group3 />
      <Group4 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0">
      <Tutorial />
      <Component35 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[31px] top-[11px] w-[962.333px]">
      <Frame29 />
      <Frame27 />
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="absolute bg-white h-[72px] left-[calc(50%-0.5px)] overflow-clip rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[40px] translate-x-[-50%] w-[1025px]" data-name="Navigation Bar">
      <Frame30 />
    </div>
  );
}

export default function HomePageDesktop() {
  return (
    <div className="bg-white relative size-full" data-name="Home Page desktop">
      <div className="absolute bg-[#69b57c] h-[39px] left-[-209px] top-[calc(50%+862.5px)] w-[26px]" data-name="Divider" />
      <OnboardingOption />
      <Footer />
      <IntroductoryQuote />
      <ServiceCategories />
      <ProsthesisCategory1 />
      <ClosingContent />
      <HeroSection />
      <StoryContent />
      <ServiceCenters />
      <UserProfiles />
      <HelpCenterFinder1 />
      <NavigationBar />
    </div>
  );
}