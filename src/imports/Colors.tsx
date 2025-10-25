function PrimaryColorContainer() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium items-start leading-[0] left-[40px] text-[18px] text-black text-nowrap top-[502px] w-[102px]" data-name="Primary Color Container">
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] text-nowrap whitespace-pre">Primary</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] text-nowrap whitespace-pre">#388896</p>
      </div>
    </div>
  );
}

function SecondaryColorNameContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[153px]" data-name="Secondary Color Name Container">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-black w-[139px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Secondary</p>
      </div>
    </div>
  );
}

function SecondaryColorContainer() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[379px] top-[502px]" data-name="Secondary Color Container">
      <SecondaryColorNameContainer />
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-black w-[153px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">#69B57C</p>
      </div>
    </div>
  );
}

function ColorSwatchContainer() {
  return (
    <div className="bg-[#f25a3c] h-[100px] relative rounded-[10px] shrink-0 w-full" data-name="Color Swatch Container">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="h-[100px] w-full" />
      </div>
    </div>
  );
}

function ColorLabelContainer() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[14px] text-black w-[59px]" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Error</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#F25A3C</p>
      </div>
    </div>
  );
}

function ColorSwatchContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[100px]" data-name="Color Swatch Container">
      <ColorSwatchContainer />
      <ColorLabelContainer />
    </div>
  );
}

function ColorSwatchContainer2() {
  return (
    <div className="bg-[#8ac0ad] h-[100px] relative rounded-[10px] shrink-0 w-full" data-name="Color Swatch Container">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="h-[100px] w-full" />
      </div>
    </div>
  );
}

function ColorLabelContainer1() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[14px] text-black w-full" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Disabled Primary</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#8AC0AD</p>
      </div>
    </div>
  );
}

function ColorLabelContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]" data-name="Color Label Container">
      <ColorSwatchContainer2 />
      <ColorLabelContainer1 />
    </div>
  );
}

function ColorSwatchContainer3() {
  return <div className="bg-[#5f9ca6] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorLabelContainer3() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[14px] text-black w-full" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Disabled Secondary</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#5F9CA6</p>
      </div>
    </div>
  );
}

function ColorLabelContainer4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[125px]" data-name="Color Label Container">
      <ColorSwatchContainer3 />
      <ColorLabelContainer3 />
    </div>
  );
}

function ColorSwatchContainer4() {
  return <div className="bg-[#e0ebe3] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorLabelContainer5() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[14px] text-black w-full" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Light secondary</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#E0EBE3</p>
      </div>
    </div>
  );
}

function ColorLabelContainer6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[125px]" data-name="Color Label Container">
      <ColorSwatchContainer4 />
      <ColorLabelContainer5 />
    </div>
  );
}

function ColorSwatchContainer5() {
  return <div className="bg-[#f2f2f7] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorLabelContainer7() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[14px] text-black w-full" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Bg variation</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#F2F2F7</p>
      </div>
    </div>
  );
}

function ColorLabelContainer8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[125px]" data-name="Color Label Container">
      <ColorSwatchContainer5 />
      <ColorLabelContainer7 />
    </div>
  );
}

function ColorSwatchContainer6() {
  return <div className="rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)" }} />;
}

function ColorLabelContainer9() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[14px] text-black w-full" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Bg blur</p>
      </div>
      <div className="flex flex-col justify-center leading-[22px] relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">#000000 20%</p>
        <p>#FFFFFF 10%</p>
      </div>
    </div>
  );
}

function ColorLabelContainer10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[125px]" data-name="Color Label Container">
      <ColorSwatchContainer6 />
      <ColorLabelContainer9 />
    </div>
  );
}

function StateColorsSwatchesContainer() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="State Colors Swatches Container">
      <ColorSwatchContainer1 />
      <ColorLabelContainer2 />
      <ColorLabelContainer4 />
      <ColorLabelContainer6 />
      <ColorLabelContainer8 />
      <ColorLabelContainer10 />
    </div>
  );
}

function StateColorsInnerContainer() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[15px] items-start left-[32px] p-[10px] top-[974px] w-[771px]" data-name="State Colors Inner Container">
      <StateColorsSwatchesContainer />
    </div>
  );
}

function StateColorsContainer() {
  return (
    <div className="absolute contents left-[32px] top-[921px]" data-name="State Colors Container">
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[39px] text-[22px] text-gray-700 top-[937px] translate-y-[-50%] w-[380px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">State Colors</p>
      </div>
      <StateColorsInnerContainer />
    </div>
  );
}

function ColorSwatchContainer7() {
  return <div className="bg-[#192126] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorSwatchContainer8() {
  return <div className="bg-[#505050] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorSwatchContainer9() {
  return <div className="bg-[#979797] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorSwatchContainer10() {
  return <div className="bg-[#c7c8d5] rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function ColorSwatchContainer11() {
  return <div className="bg-white rounded-[10px] shrink-0 size-[100px]" data-name="Color Swatch Container" />;
}

function GreyColorsSwatchesContainer() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0 w-full" data-name="Grey Colors Swatches Container">
      <ColorSwatchContainer7 />
      <ColorSwatchContainer8 />
      <ColorSwatchContainer9 />
      <ColorSwatchContainer10 />
      <ColorSwatchContainer11 />
    </div>
  );
}

function GreyColorsInnerContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Grey Colors Inner Container">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[22px] text-gray-700 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Grey Colors</p>
      </div>
      <GreyColorsSwatchesContainer />
    </div>
  );
}

function ColorLabelContainer11() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start justify-center ml-0 mt-0 relative text-[14px] text-black w-[78px]" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Black</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#192126</p>
      </div>
    </div>
  );
}

function ColorLabelContainer12() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start justify-center ml-[141px] mt-0 relative text-[14px] text-black w-[93px]" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">Sub Color Dark</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#505050</p>
      </div>
    </div>
  );
}

function ColorNameContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Color Name Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[11px] py-0 relative w-full">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black w-[89px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[22px]">Sub Heading</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorLabelContainer13() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col items-start justify-center ml-[281px] mt-0 relative w-[86px]" data-name="Color Label Container">
      <ColorNameContainer />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black w-[89px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#979797</p>
      </div>
    </div>
  );
}

function ColorLabelContainer14() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start justify-center ml-[421px] mt-0 relative text-[14px] text-black text-nowrap w-[62px]" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] text-nowrap whitespace-pre">Sub Icons</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px] text-nowrap whitespace-pre">#C7C8D5</p>
      </div>
    </div>
  );
}

function ColorLabelContainer15() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col font-['Roboto:Regular',_sans-serif] font-normal items-start justify-center ml-[561px] mt-0 relative text-[14px] text-black w-[78px]" data-name="Color Label Container">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">White</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">#FFFFFF</p>
      </div>
    </div>
  );
}

function GreyColorsLabelsContainer() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Grey Colors Labels Container">
      <ColorLabelContainer11 />
      <ColorLabelContainer12 />
      <ColorLabelContainer13 />
      <ColorLabelContainer14 />
      <ColorLabelContainer15 />
    </div>
  );
}

function GreyColorsInnerContainer1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[-1px] top-0 w-[661px]" data-name="Grey Colors Inner Container">
      <GreyColorsInnerContainer />
      <GreyColorsLabelsContainer />
    </div>
  );
}

function GreyColorsContainer() {
  return (
    <div className="absolute h-[186px] left-[49px] top-[710px] w-[660px]" data-name="Grey Colors Container">
      <GreyColorsInnerContainer1 />
    </div>
  );
}

function ColorSwatchContainer12() {
  return <div className="absolute bg-[#388896] left-0 rounded-[10px] size-[300px] top-[12.5px]" data-name="Color Swatch Container" />;
}

function ColorSwatchContainer13() {
  return <div className="absolute bg-[#69b57c] left-[340px] rounded-[10px] size-[300px] top-[12.5px]" data-name="Color Swatch Container" />;
}

function ColorSwatchInnerContainer() {
  return <div className="absolute bg-gradient-to-b from-[#69b57c] left-[680px] rounded-[10px] size-[300px] to-[#388896] top-[18.88px]" data-name="Color Swatch Inner Container" />;
}

function ColorSwatchContainer14() {
  return (
    <div className="absolute contents left-[680px] top-[18.88px]" data-name="Color Swatch Container">
      <ColorSwatchInnerContainer />
    </div>
  );
}

function ColorSwatchContainer15() {
  return (
    <div className="absolute contents left-[963px] top-[6.13px]" data-name="Color Swatch Container">
      <div className="absolute h-[35px] left-[963px] top-[6.13px] w-[52px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 35">
          <path d="M12 0H52V35H12L0 17.5L12 0Z" fill="var(--fill-0, #69B57C)" id="Rectangle 20" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium h-[16px] justify-center leading-[0] left-[1016px] text-[18px] text-black top-[14.13px] translate-y-[-50%] w-[81px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">#69B57C</p>
      </div>
    </div>
  );
}

function BrandColorsInnerContainer() {
  return (
    <div className="absolute contents left-[680px] top-[6.13px]" data-name="Brand Colors Inner Container">
      <ColorSwatchContainer14 />
      <ColorSwatchContainer15 />
    </div>
  );
}

function BrandColorsContainer() {
  return (
    <div className="absolute h-[325px] left-[40px] top-[173px] w-[1085px]" data-name="Brand Colors Container">
      <ColorSwatchContainer12 />
      <ColorSwatchContainer13 />
      <BrandColorsInnerContainer />
    </div>
  );
}

function ColorSwatchContainer16() {
  return (
    <div className="absolute contents left-[1004px] top-[468px]" data-name="Color Swatch Container">
      <div className="absolute h-[35px] left-[1004px] top-[468px] w-[52px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 35">
          <path d="M12 0H52V35H12L0 17.5L12 0Z" fill="var(--fill-0, #388896)" id="Rectangle 21" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium h-[16px] justify-center leading-[0] left-[1057px] text-[18px] text-black top-[495px] translate-y-[-50%] w-[112px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">#388896</p>
      </div>
    </div>
  );
}

function GradientContainer() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium items-start leading-[0] left-[719px] text-[18px] text-black top-[502px] w-[249px]" data-name="Gradient Container">
      <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Gradient</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[249px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] mb-0">Type: Linear</p>
        <p className="leading-[28px] mb-0">Angle: 90°</p>
        <p className="leading-[28px] mb-0">Stops:</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[28px]">#69B57C (0%)</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[28px]">#388896 (100%)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Colors() {
  return (
    <div className="bg-gray-100 overflow-clip relative rounded-[15px] size-full" data-name="Colors">
      <div className="absolute flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold h-[53px] justify-center leading-[0] left-[40px] text-[0px] text-gray-700 top-[66.5px] translate-y-[-50%] w-[360px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] text-[40px]">
          <span className="font-['Roboto:SemiBold',_sans-serif] font-semibold" style={{ fontVariationSettings: "'wdth' 100" }}>
            0
          </span>
          2<span className="font-['Roboto:SemiBold',_sans-serif] font-semibold" style={{ fontVariationSettings: "'wdth' 100" }}>{`. `}</span>
          <span className="font-['Roboto:SemiBold',_sans-serif] font-semibold text-[#116acc]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Colors
          </span>
        </p>
      </div>
      <PrimaryColorContainer />
      <SecondaryColorContainer />
      <StateColorsContainer />
      <GreyColorsContainer />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[40px] text-[22px] text-gray-700 top-[149px] translate-y-[-50%] w-[127px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Brand Colors</p>
      </div>
      <BrandColorsContainer />
      <ColorSwatchContainer16 />
      <GradientContainer />
    </div>
  );
}