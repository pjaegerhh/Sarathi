function Group() {
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

function Group1() {
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

export default function Component() {
  return (
    <div className="bg-[#69b57c] relative rounded-[25px] size-full" data-name="Component 56">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center leading-[0] p-[4px] relative size-full">
          <Group />
          <Group1 />
        </div>
      </div>
    </div>
  );
}