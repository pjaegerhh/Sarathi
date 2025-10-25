import svgPaths from "./svg-xq60h88j1a";
import imgImage from '/src/assets/4038b380ca66816e136f836132bca1b8cc0db251.png';
import imgRectangle31 from '/src/assets/dc47787b499eb83f6a39d48d318b9dac108c4c7d.png';
import imgRectangle33 from '/src/assets/617b3f3d9b67780e89a5c8d624b5d8b0f13ea0bf.png';
import imgRectangle34 from '/src/assets/14532ada289a40c010c9ed2d41fc6fc11a3aae7f.png';
import imgRectangle70 from '/src/assets/4769aeb444c6cbe05dc0663fb5c35a853e49584c.png';
import imgRectangle71 from '/src/assets/ceb4eb08f4449d6be9cb7d76be55ca0ad330384c.png';
import imgRectangle72 from '/src/assets/16c794c6e6a2fd5ee8632dc15dc85640607f1b9a.png';

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
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[calc(50%-47.5px)] top-[calc(50%-1091.36px)] translate-x-[-50%] translate-y-[-50%]" data-name="Introductory Quote">
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

function Group6() {
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

function Group8() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-[80.058px] justify-center ml-0 mt-[40.029px] relative text-[#192126] text-[22px] translate-y-[-50%] w-[334.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre-wrap">{`Reconnecting body and mind in  motion with rehabilitation`}</p>
      </div>
      <PrimaryButtonIconTextDesktop />
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group8 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex flex-col items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] top-[59.95%]">
      <Group7 />
    </div>
  );
}

function CategoryCardDesktop1() {
  return (
    <div className="h-[432.719px] relative shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[555.339px]" data-name="category card desktop">
      <Group6 />
      <Frame24 />
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
    <div className="absolute content-end flex flex-wrap gap-[50px] items-end left-[calc(50%-34px)] top-[220px] translate-x-[-50%] w-[1146px]" data-name="Service categories">
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

function Group3() {
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
      <Group3 />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal inset-[81.56%_-2.56%_5.33%_84.61%] justify-center leading-[0] opacity-0 text-[22px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Below knee</p>
      </div>
      <Group />
      <IconButtonDesktop />
    </div>
  );
}

function Group4() {
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
      <Group4 />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal inset-[81.56%_-2.56%_5.33%_84.3%] justify-center leading-[0] opacity-0 text-[22px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Above knee</p>
      </div>
      <Group1 />
      <IconButtonDesktop1 />
    </div>
  );
}

function Group5() {
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
      <Group5 />
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
    <div className="absolute content-stretch flex flex-col gap-[46px] items-center leading-[0] left-[calc(50%-46.5px)] top-[914.72px] translate-x-[-50%] w-[1121px]" data-name="Prosthesis Category">
      <ProsthesisCategory />
      <CategoryCarousel />
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

function Component5() {
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
      <Component5 />
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

function Component6() {
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
      <Component6 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">170+ ALIMCO centers nationwide</p>
      </div>
    </div>
  );
}

function Component7() {
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
      <Component7 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Subsidized cost, ADIP scheme</p>
      </div>
    </div>
  );
}

function Component8() {
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
      <Component8 />
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

function Component9() {
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

function IconButtonDesktop3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[336px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[474px]" data-name="icon button desktop">
      <Component9 />
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
      <IconButtonDesktop3 />
    </div>
  );
}

function Group9() {
  return (
    <div className="h-[530px] relative shrink-0 w-[392px]">
      <LocationCards />
    </div>
  );
}

function Component10() {
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
      <Component10 />
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

function Component11() {
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
      <Component11 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">BMVSS 23 branches in India</p>
      </div>
    </div>
  );
}

function Component12() {
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
      <Component12 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Free- subsidized cost</p>
      </div>
    </div>
  );
}

function Component13() {
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
      <Component13 />
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

function Component14() {
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

function IconButtonDesktop4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[336px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[474px]" data-name="icon button desktop">
      <Component14 />
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
      <IconButtonDesktop4 />
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

function Component15() {
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
      <Component15 />
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

function Component16() {
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
      <Component16 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Endolite India: 250+ clinics / franchises (network)</p>
      </div>
    </div>
  );
}

function Component17() {
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
      <Component17 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Basic model from Rs.20,000+</p>
      </div>
    </div>
  );
}

function Component18() {
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
      <Component18 />
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

function Component19() {
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

function IconButtonDesktop5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[336px] p-[12px] rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] top-[474px]" data-name="icon button desktop">
      <Component19 />
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
      <IconButtonDesktop5 />
    </div>
  );
}

function Group10() {
  return (
    <div className="h-[530px] relative shrink-0 w-[392px]">
      <LocationCards2 />
    </div>
  );
}

function LocationCards3() {
  return (
    <div className="absolute content-stretch flex gap-[32px] items-center left-[15px] top-[16px]" data-name="Location cards">
      <Group9 />
      <LocationCard />
      <Group10 />
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
    <div className="absolute h-[606px] left-0 top-[1716.72px] w-[1244px]" data-name="Service centers">
      <SelectingCategoryHyperlink />
      <LocationsCards />
      <div className="absolute backdrop-blur-[1.5px] backdrop-filter h-[530px] left-[1132px] top-[50px] w-[82px]" data-name="Blur overlay" />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute contents left-[15px] top-[1348.72px]" data-name="Background">
      <div className="absolute h-[327.281px] left-[15px] rounded-[30px] top-[1348.72px] w-[1112px]" data-name="Background" />
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

function Component20() {
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
      <Component20 />
      <p className="[white-space-collapse:collapse] font-['Roboto:Regular',_sans-serif] font-normal h-[21px] leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#505050] text-[14px] text-nowrap w-[207px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search Location
      </p>
    </div>
  );
}

function Component21() {
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
        <Component21 />
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

function Component22() {
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
      <Component22 />
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

function Component23() {
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
      <Component23 />
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

function Component24() {
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
      <Component24 />
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
    <div className="absolute box-border content-stretch flex flex-col gap-[21px] h-[236px] items-center left-[62px] px-[8px] py-0 top-[1403px]" data-name="Help center finder">
      <TitleAndDescription />
      <InputFields1 />
    </div>
  );
}

function HelpCenterFinder1() {
  return (
    <div className="absolute contents left-[15px] top-[1348.72px]" data-name="Help center finder">
      <Background />
      <HelpCenterFinder />
    </div>
  );
}

export default function Group11() {
  return (
    <div className="relative size-full">
      <IntroductoryQuote />
      <ServiceCategories />
      <ProsthesisCategory1 />
      <ServiceCenters />
      <HelpCenterFinder1 />
    </div>
  );
}