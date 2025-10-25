function Container() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Container">
      <div className="[grid-area:1_/_1] flex flex-col font-['Ubuntu:Regular',_sans-serif] h-[22px] justify-center leading-[0] ml-[19px] mt-[75px] not-italic relative text-[13px] text-gray-500 tracking-[-0.13px] translate-y-[-50%] w-[54px]">
        <p className="leading-[normal]">Regular</p>
      </div>
      <div className="[grid-area:1_/_1] h-[115.946px] ml-0 mt-0 relative rounded-[10px] w-[165px]" data-name="Font Preview Background">
        <div aria-hidden="true" className="absolute border-[3px] border-gray-300 border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] ml-[19.324px] mt-[36.946px] relative text-[#116acc] text-[40px] text-nowrap translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[42px] whitespace-pre">Aa</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Container">
      <div className="[grid-area:1_/_1] flex flex-col font-['Ubuntu:Regular',_sans-serif] h-[22.308px] justify-center leading-[0] ml-[19.333px] mt-[75.103px] not-italic relative text-[13px] text-gray-500 tracking-[-0.13px] translate-y-[-50%] w-[66.923px]">
        <p className="leading-[normal]">Medium</p>
      </div>
      <div className="[grid-area:1_/_1] h-[116px] ml-0 mt-0 relative rounded-[10px] w-[165.077px]" data-name="Font Preview Background">
        <div aria-hidden="true" className="absolute border-[3px] border-gray-300 border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] ml-[19.333px] mt-[36.949px] relative text-[#116acc] text-[40px] text-nowrap translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[42px] whitespace-pre">Aa</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Container">
      <div className="[grid-area:1_/_1] flex flex-col font-['Ubuntu:Regular',_sans-serif] h-[22.557px] justify-center leading-[0] ml-[19.55px] mt-[75.942px] not-italic relative text-[13px] text-gray-500 tracking-[-0.13px] translate-y-[-50%] w-[72.183px]">
        <p className="leading-[normal]">Semi Bold</p>
      </div>
      <div className="[grid-area:1_/_1] h-[117.297px] ml-0 mt-0 relative rounded-[10px] w-[166.923px]" data-name="Font Preview Background">
        <div aria-hidden="true" className="absolute border-[3px] border-gray-300 border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] ml-[19.55px] mt-[37.015px] relative text-[#116acc] text-[40px] text-nowrap translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[42px] whitespace-pre">Aa</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Container">
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-[22.308px] justify-center leading-[0] ml-[19.333px] mt-[75.103px] relative text-[13px] text-gray-500 tracking-[-0.13px] translate-y-[-50%] w-[40.154px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Bold</p>
      </div>
      <div className="[grid-area:1_/_1] h-[116px] ml-0 mt-0 relative rounded-[10px] w-[165.077px]" data-name="Font Preview Background">
        <div aria-hidden="true" className="absolute border-[3px] border-gray-300 border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] ml-[19.333px] mt-[36.949px] relative text-[#116acc] text-[40px] text-nowrap translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] whitespace-pre">Aa</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[20px] items-start leading-[0] relative shrink-0" data-name="Container">
      <Container />
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[25px] items-start left-[40px] top-[205px]" data-name="Container">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[22px] text-gray-700 text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Text Weight</p>
      </div>
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute contents font-['Roboto:Regular',_sans-serif] font-normal leading-[0] left-[75.17px] text-[22px] text-black top-[460px]" data-name="Container">
      <div className="absolute flex flex-col justify-center left-[75.17px] top-[476px] translate-y-[-50%] w-[79.199px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Name</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[495.33px] top-[476px] translate-y-[-50%] w-[91.281px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Weight</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[746.35px] top-[476px] translate-y-[-50%] w-[55.037px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Size</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[924.89px] top-[476px] translate-y-[-50%] w-[150.345px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Line Height</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[1146px] top-[476px] translate-y-[-50%] w-[99.335px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Sample</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute contents left-[40px] top-[446px]" data-name="Container">
      <div className="absolute bg-[gainsboro] h-[60px] left-[40px] rounded-[10px] top-[446px] w-[2182px]" data-name="Divider" />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute contents font-['Roboto:Regular',_sans-serif] font-normal leading-[0] left-[75.17px] text-[22px] text-black top-[1136px]" data-name="Container">
      <div className="absolute flex flex-col justify-center left-[75.17px] top-[1152px] translate-y-[-50%] w-[79.813px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Name</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[495px] top-[1152px] translate-y-[-50%] w-[91.988px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Weight</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[745px] top-[1152px] translate-y-[-50%] w-[55.463px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Size</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[925px] top-[1152px] translate-y-[-50%] w-[151.509px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Line Height</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[1146px] top-[1152px] translate-y-[-50%] w-[100.104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Sample</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute contents left-[40px] top-[1122px]" data-name="Container">
      <div className="absolute bg-[gainsboro] h-[60px] left-[40px] rounded-[10px] top-[1122px] w-[2182px]" data-name="Divider" />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute contents leading-[0] left-[76px] text-black top-[511px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[76px] text-[18px] top-[544px] translate-y-[-50%] w-[246.477px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop Hero Text</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[544px] translate-y-[-50%] w-[111.05px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Semi Bold</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[746px] text-[18px] top-[544px] translate-y-[-50%] w-[54.171px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">64px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[926px] text-[18px] top-[544px] translate-y-[-50%] w-[54.171px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">66px</p>
      </div>
      <div className="absolute capitalize flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center left-[1146px] text-[64px] text-nowrap top-[544px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[66px] whitespace-pre">{`The quick brown fox jumps `}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute contents leading-[0] left-[76px] text-black top-[598px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[76px] text-[18px] top-[628px] translate-y-[-50%] w-[246.477px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop Heading 40px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[628px] translate-y-[-50%] w-[111.05px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Semi Bold</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[746px] text-[18px] top-[628px] translate-y-[-50%] w-[54.171px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">40px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[926px] text-[18px] top-[628px] translate-y-[-50%] w-[54.171px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">60px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold h-[60px] justify-center left-[1146px] text-[40px] top-[628px] translate-y-[-50%] w-[1082.06px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-black top-[1205px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[75px] text-[18px] top-[1221px] translate-y-[-50%] w-[232.877px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Mobile Heading 24px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[1221px] translate-y-[-50%] w-[50.389px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Bold</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[745px] text-[18px] top-[1221px] translate-y-[-50%] w-[54.474px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">24px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[925px] text-[18px] top-[1221px] translate-y-[-50%] w-[54.474px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">30px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center left-[1146px] text-[24px] top-[1220px] translate-y-[-50%] w-[655.051px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute contents left-[75px] top-[1205px]" data-name="Container">
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute contents font-['Roboto:Medium',_sans-serif] font-medium leading-[0] left-[75px] text-black top-[688px]" data-name="Container">
      <div className="absolute flex flex-col justify-center left-[75px] text-[18px] top-[708px] translate-y-[-50%] w-[246.7px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop Heading 32px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[495px] text-[18px] top-[708px] translate-y-[-50%] w-[89.463px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Medium</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[746px] text-[18px] top-[708px] translate-y-[-50%] w-[54.22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">32px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[925px] text-[18px] top-[708px] translate-y-[-50%] w-[54.22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">40px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[1146px] text-[32px] top-[708px] translate-y-[-50%] w-[863.449px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[40px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute contents left-[75px] top-[688px]" data-name="Container">
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute contents font-['Roboto:Medium',_sans-serif] font-medium leading-[0] left-[75px] text-black top-[1282px]" data-name="Container">
      <div className="absolute flex flex-col justify-center left-[75px] text-[18px] top-[1296px] translate-y-[-50%] w-[231.742px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Mobile Heading 16px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[495px] text-[18px] top-[1296px] translate-y-[-50%] w-[89.444px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Medium</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[745px] text-[18px] top-[1296px] translate-y-[-50%] w-[54.209px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">16px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[925px] text-[18px] top-[1296px] translate-y-[-50%] w-[54.209px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">24px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[1146px] text-[16px] top-[1296px] translate-y-[-50%] w-[432.314px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute contents left-[75px] top-[1282px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-black top-[769px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[75px] text-[18px] top-[783px] translate-y-[-50%] w-[246.174px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop Heading 22px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[783px] translate-y-[-50%] w-[83.862px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Regular</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[746px] text-[18px] top-[783px] translate-y-[-50%] w-[54.104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">22px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[925px] text-[18px] top-[783px] translate-y-[-50%] w-[54.104px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">32px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center left-[1146px] text-[22px] top-[785px] translate-y-[-50%] w-[588.384px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute contents left-[75px] top-[769px]" data-name="Container">
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute contents font-['Roboto:Medium',_sans-serif] font-medium leading-[0] left-[75px] text-black top-[1360px]" data-name="Container">
      <div className="absolute flex flex-col justify-center left-[75px] text-[18px] top-[1374px] translate-y-[-50%] w-[194.299px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Mobile label 14px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[495px] text-[18px] top-[1374px] translate-y-[-50%] w-[89.677px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Medium</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[746px] text-[18px] top-[1374px] translate-y-[-50%] w-[54.349px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">14px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[925px] text-[18px] top-[1374px] translate-y-[-50%] w-[54.349px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">20px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[1146px] text-[14px] top-[1374px] tracking-[0.1px] translate-y-[-50%] w-[384.522px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute contents left-[75px] top-[1360px]" data-name="Container">
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-black top-[1437px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[75px] text-[18px] top-[1451px] translate-y-[-50%] w-[194.933px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Mobile Body 14px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[1451px] translate-y-[-50%] w-[83.93px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Regular</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[746px] text-[18px] top-[1451px] translate-y-[-50%] w-[54.148px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">14px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[925px] text-[18px] top-[1451px] translate-y-[-50%] w-[54.148px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">20px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center left-[1146px] text-[14px] top-[1451px] tracking-[0.25px] translate-y-[-50%] w-[388.513px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute contents left-[75px] top-[1437px]" data-name="Container">
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-black top-[1514px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[75px] text-[18px] top-[1528px] translate-y-[-50%] w-[182.882px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Small Body 12px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[1528px] translate-y-[-50%] w-[83.99px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Regular</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[745px] text-[18px] top-[1528px] translate-y-[-50%] w-[54.187px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">12px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[925px] text-[18px] top-[1528px] translate-y-[-50%] w-[54.187px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">16px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center left-[1146px] text-[12px] top-[1528px] tracking-[0.4px] translate-y-[-50%] w-[344.09px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute contents left-[75px] top-[1514px]" data-name="Container">
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute contents font-['Roboto:Medium',_sans-serif] font-medium leading-[0] left-[75px] text-[18px] text-black top-[848px]" data-name="Container">
      <div className="absolute flex flex-col justify-center left-[75px] top-[862px] translate-y-[-50%] w-[211.298px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop Body 18px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[495px] top-[862px] translate-y-[-50%] w-[89.395px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Medium</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[746px] top-[862px] translate-y-[-50%] w-[54.179px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">28px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[925px] top-[862px] translate-y-[-50%] w-[54.179px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">18px</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[1144px] top-[862px] translate-y-[-50%] w-[486.256px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute contents left-[75px] top-[848px]" data-name="Container">
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-black top-[925px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[75px] text-[18px] top-[939px] translate-y-[-50%] w-[208.329px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop label 16px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[939px] translate-y-[-50%] w-[50.053px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Bold</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[746px] text-[18px] top-[939px] translate-y-[-50%] w-[54.111px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">16px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[925px] text-[18px] top-[939px] translate-y-[-50%] w-[54.111px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">24px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center left-[1144px] text-[16px] top-[939px] translate-y-[-50%] w-[434.243px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute contents left-[75px] top-[925px]" data-name="Container">
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-black top-[1002px]" data-name="Container">
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[75px] text-[18px] top-[1016px] translate-y-[-50%] w-[211.402px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Desktop Body 14px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[495px] text-[18px] top-[1016px] translate-y-[-50%] w-[84.019px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">Regular</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[746px] text-[18px] top-[1016px] translate-y-[-50%] w-[54.206px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">14px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center left-[925px] text-[18px] top-[1016px] translate-y-[-50%] w-[54.206px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px]">22px</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center left-[1146px] text-[14px] top-[1016px] translate-y-[-50%] w-[375.374px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute contents left-[75px] top-[1002px]" data-name="Container">
      <Container30 />
    </div>
  );
}

export default function Typography() {
  return (
    <div className="bg-gray-100 overflow-clip relative rounded-[15px] size-full" data-name="Typography">
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[40px] text-[22px] text-gray-700 top-[113px] translate-y-[-50%] w-[274px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Font StyleGuide</p>
      </div>
      <Container5 />
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[40px] text-[22px] text-gray-700 text-nowrap top-[422px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Text Style (Desktop)</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[40px] text-[22px] text-gray-700 text-nowrap top-[1098px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px] whitespace-pre">Text Style (Handy)</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] left-[40px] text-[#116acc] text-[32px] text-nowrap top-[173px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[40px] whitespace-pre">Roboto</p>
      </div>
      <Container7 />
      <Container9 />
      <Container10 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[584px] w-[2182px]" data-name="Divider" />
      <Container11 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[668px] w-[2182px]" data-name="Divider" />
      <Container13 />
      <div className="absolute flex h-px items-center justify-center left-[40px] top-[1257px] w-[2175px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="bg-[#d9d9d9] h-px w-[2175px]" data-name="Divider" />
        </div>
      </div>
      <Container15 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[746px] w-[2182px]" data-name="Divider" />
      <Container17 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[1335px] w-[2175px]" data-name="Divider" />
      <Container19 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[823px] w-[2182px]" data-name="Divider" />
      <Container21 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[1412px] w-[2175px]" data-name="Divider" />
      <Container23 />
      <div className="absolute flex h-px items-center justify-center left-[40px] top-[1489px] w-[2175px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="bg-[#d9d9d9] h-px w-[2175px]" data-name="Divider" />
        </div>
      </div>
      <Container25 />
      <Container27 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[900px] w-[2182px]" data-name="Divider" />
      <Container29 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[977px] w-[2175px]" data-name="Divider" />
      <Container31 />
      <div className="absolute bg-[#d9d9d9] h-px left-[40px] top-[1054px] w-[2175px]" data-name="Divider" />
      <div className="absolute flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold h-[53px] justify-center leading-[0] left-[40px] text-[0px] text-gray-700 top-[66.5px] translate-y-[-50%] w-[360px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[60px] text-[40px]">
          <span style={{ fontVariationSettings: "'wdth' 100" }}>{`01. `}</span>
          <span className="text-[#116acc]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Typography
          </span>
        </p>
      </div>
    </div>
  );
}