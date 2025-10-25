import svgPaths from "./svg-agdqtxqehn";
import imgImage from "figma:asset/617b3f3d9b67780e89a5c8d624b5d8b0f13ea0bf.png";
import imgImage1 from "figma:asset/9e46f3be7b5472cd8a3b304c1ba73356f2cd2099.png";
import imgImage2 from "figma:asset/8fb8fc34b439a14d915eca2570a2d283a90cabb5.png";
import imgImage3 from "figma:asset/14532ada289a40c010c9ed2d41fc6fc11a3aae7f.png";

function Icon() {
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
      <Icon />
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
    <div className="absolute bg-[#f2f2f7] bottom-0 box-border content-stretch flex flex-col gap-[10px] h-[100px] items-start left-0 pb-[39px] pt-[36px] px-[27px] w-[1280px]" data-name="Footer">
      <SarathiCoIn />
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
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[calc(50%-5.5px)] top-[1601px] translate-x-[-50%] w-[864px]" data-name="Closing content">
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

function Component6() {
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

function SecondaryButtonIconTextDesktop() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="secondary button icon text desktop">
      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8ac0ad] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Share your story</p>
      </div>
      <Component6 />
    </div>
  );
}

function Component() {
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
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component />
    </div>
  );
}

function Component1() {
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
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component1 />
    </div>
  );
}

function Component2() {
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
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component2 />
    </div>
  );
}

function Component3() {
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
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0" data-name="icon button desktop">
      <Component3 />
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

function StorySharingOptions() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0" data-name="Story sharing options">
      <SecondaryButtonIconTextDesktop />
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

function ImageSection() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Image Section">
      <div className="[grid-area:1_/_1] h-[478px] ml-0 mt-[32px] relative rounded-bl-[20px] rounded-br-[20px] w-[436px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-bl-[20px] rounded-br-[20px]">
          <img alt="" className="absolute h-[126.73%] left-[-30.91%] max-w-none top-[-17.74%] w-[138.94%]" src={imgImage} />
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
      <ImageSection />
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

function Overview() {
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
      <Overview />
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

function Overview1() {
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
          <Overview1 />
        </div>
      </div>
    </div>
  );
}

function StoryContent() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[calc(50%-5.712px)] top-0 translate-x-[-50%]" data-name="Story content">
      <TopFrame />
      <BottomFrame />
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

function TextUnderlineButtonDesktop() {
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
      <TextUnderlineButtonDesktop />
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

function Component4() {
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
      <Component4 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Professional Yoga Teacher</p>
      </div>
    </div>
  );
}

function Component5() {
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
      <Component5 />
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

function Icon1() {
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
      <Icon1 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Jaipur Marathon Winner</p>
      </div>
    </div>
  );
}

function Icon2() {
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
      <Icon2 />
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

function Icon3() {
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
      <Icon3 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Cricket State Player</p>
      </div>
    </div>
  );
}

function Icon4() {
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
      <Icon4 />
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
          <img alt="" className="absolute h-[173.83%] left-[-25.5%] max-w-none top-[-46.29%] w-[126.06%]" src={imgImage} />
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

function Icon5() {
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
      <Icon5 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#505050] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] whitespace-pre">Artist/Speaker</p>
      </div>
    </div>
  );
}

function Icon6() {
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
      <Icon6 />
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
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgImage3} />
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
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[78px] top-[819px] w-[1209px]" data-name="User profiles">
      <QuoteOnboardingOption />
      <UserCards />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Footer />
      <ClosingContent />
      <StoryContent />
      <UserProfiles />
    </div>
  );
}