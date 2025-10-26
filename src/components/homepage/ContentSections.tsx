import React from 'react';
import svgPaths from "../../imports/svg-xq60h88j1a";
import svgPaths2 from "../../imports/svg-agdqtxqehn";
import imgImage from '../../assets/4038b380ca66816e136f836132bca1b8cc0db251.png';
import imgRectangle31 from '../../assets/dc47787b499eb83f6a39d48d318b9dac108c4c7d.png';
import imgRectangle33 from '../../assets/617b3f3d9b67780e89a5c8d624b5d8b0f13ea0bf.png';
import imgRectangle34 from '../../assets/14532ada289a40c010c9ed2d41fc6fc11a3aae7f.png';
import imgRectangle70 from '../../assets/4769aeb444c6cbe05dc0663fb5c35a853e49584c.png';
import imgRectangle71 from '../../assets/ceb4eb08f4449d6be9cb7d76be55ca0ad330384c.png';
import imgRectangle72 from '../../assets/16c794c6e6a2fd5ee8632dc15dc85640607f1b9a.png';
import imgImage1 from '../../assets/9e46f3be7b5472cd8a3b304c1ba73356f2cd2099.png';
import imgImage2 from '../../assets/8fb8fc34b439a14d915eca2570a2d283a90cabb5.png';
import imgImage3 from '../../assets/14532ada289a40c010c9ed2d41fc6fc11a3aae7f.png';

// ===========================================
// SECTION 1: INTRODUCTORY QUOTE (Desktop)
// ===========================================
export function QuoteSectionDesktop() {
  return (
    <div className="absolute flex flex-col gap-3 items-center left-[calc(50%-47.5px)] top-[calc(50%-1091.36px)] translate-x-[-50%] translate-y-[-50%]" data-name="Introductory Quote">
      <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color text-center w-[967px]">
        <p className="leading-[32px]">{`"It's time we shared the global knowledge of the developers of the prosthesis community and worked together on shared solutions to better and better help those in need"`}</p>
      </div>
      <div className="flex flex-col text-body-lg gap-2 items-center text-center" data-name="Author, detail">
        <div className="flex flex-col justify-center relative shrink-0 text-primary w-[269px]">
          <p className="leading-[28px]">Dr. Pooja Mukul, MD</p>
        </div>
        <div className="flex flex-col justify-center min-w-full relative shrink-0 text-tertiary w-[min-content]">
          <p className="leading-[28px]">B.M.V.S.S, Jaipur</p>
        </div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function QuoteSectionMobile() {
  return <div>Quote Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 2: SERVICES (Desktop)
// ===========================================
export function ServicesSectionDesktop() {
  // Training Card Components
  function TrainingCard() {
    return (
      <div className="h-[432.719px] relative shrink-0 w-[555.339px]" data-name="category card desktop">
        <div className="absolute bottom-[0.7%] contents left-0 right-0 top-0" data-name="Category card">
          <div className="absolute bg-light-secondary bottom-[1.63%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] shadow-elevation top-[0.01%]" data-name="Background" />
          <div className="absolute bottom-[0.7%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-0" data-name="Image">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[30px] rounded-tr-[30px]">
              <img alt="" className="absolute h-[129.25%] left-[-0.36%] max-w-none top-[-38.83%] w-full" src={imgImage} />
            </div>
          </div>
        </div>
        <div className="absolute bg-gradient-brand bottom-0 box-border flex flex-col items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] top-[59.95%]" data-name="Category card">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Category card">
            <div className="[grid-area:1_/_1] flex flex-col text-h3 h-[80.058px] justify-center ml-0 mt-[40.029px] relative text-white translate-y-[-50%] w-[334.42px]">
              <p className="leading-[32px]">Relearning motion, rebuilding trust through training</p>
            </div>
            <div className="[grid-area:1_/_1] box-border flex items-start ml-0 mt-[88.058px] relative" data-name="secondary button icon text desktop">
              <div className="bg-white box-border flex gap-3 h-[46px] items-center justify-center px-6 py-2 relative rounded-[24px] shadow-elevation shrink-0 w-[124px]" data-name="secondary button icon text desktop">
                <div className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-disabled-primary text-nowrap">
                  <p className="leading-[24px] whitespace-pre">Training</p>
                </div>
                <div className="relative shrink-0 size-[20px]" data-name="Component">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="Component">
                      <path d={svgPaths.p602f900} id="Vector" stroke="var(--stroke-0, #8AC0AD)" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rehabilitation Card Components
  function RehabilitationCard() {
    return (
      <div className="h-[432.719px] relative shadow-elevation shrink-0 w-[555.339px]" data-name="category card desktop">
        <div className="absolute bottom-[1.64%] contents left-0 right-0 top-0">
          <div className="absolute bg-light-secondary bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] shadow-elevation top-0" />
          <div className="absolute bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-[0.23%]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={imgRectangle31} />
          </div>
        </div>
        <div className="absolute bg-white bottom-0 box-border flex flex-col items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] top-[59.95%]">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
              <div className="[grid-area:1_/_1] flex flex-col text-h3 h-[80.058px] justify-center ml-0 mt-[40.029px] relative text-heading translate-y-[-50%] w-[334.42px]">
                <p className="leading-[32px] whitespace-pre-wrap">{`Reconnecting body and mind in  motion with rehabilitation`}</p>
              </div>
              <div className="[grid-area:1_/_1] bg-disabled-primary box-border flex gap-3 h-[46px] items-center justify-center ml-0 mt-[92.33px] px-6 py-2 relative rounded-[24px] shadow-elevation" data-name="primary button icon text desktop">
                <div className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                  <p className="leading-[24px] whitespace-pre">Rehabilitation</p>
                </div>
                <div className="relative shrink-0 size-[20px]" data-name="Component">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="Component">
                      <path d={svgPaths.p602f900} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute content-end flex flex-wrap gap-[50px] items-end left-[calc(50%-34px)] top-[220px] translate-x-[-50%] w-[1146px]" data-name="Service categories">
      <div className="flex flex-col gap-3 items-start leading-[0] relative shrink-0 w-[906px]" data-name="Section title, intro text">
        <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-full">
          <p className="leading-[60px]">Redefining the Way You Heal</p>
        </div>
        <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
          <p className="leading-[32px]">Your journey is unique — our platform adapts to your rhythm, supporting confidence and comfort at every stage.</p>
        </div>
      </div>
      <div className="flex gap-6 items-center relative shrink-0" data-name="Content Cards">
        <TrainingCard />
        <RehabilitationCard />
      </div>
    </div>
  );
}

// Mobile version - TBD
export function ServicesSectionMobile() {
  return <div>Services Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 3: PROSTHESIS CATEGORY (Desktop)
// ===========================================
export function ProsthesisSectionDesktop() {
  const [currentIndex, setCurrentIndex] = React.useState(1); // Start at 1 (middle of cloned array)
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showLeftChevron, setShowLeftChevron] = React.useState(false);
  const [showRightChevron, setShowRightChevron] = React.useState(false);

  const baseCards = [
    { image: imgRectangle31, type: 'below' },
    { image: imgRectangle33, type: 'above' },
    { image: imgRectangle34, type: 'wheelchair' }
  ];

  // Create infinite loop by cloning cards: [...cards, ...cards, ...cards]
  // This allows seamless infinite scrolling
  const cards = [...baseCards, ...baseCards, ...baseCards];

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Handle the infinite loop reset
  React.useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // Reset to equivalent position in the middle set
      if (currentIndex === 0) {
        setCurrentIndex(baseCards.length);
      } else if (currentIndex === cards.length - 2) {
        setCurrentIndex(baseCards.length - 2);
      }
    }, 500); // Match transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, baseCards.length, cards.length]);

  function KneeCard({ image, type }: { image: string; type: string }) {
    return (
      <div className="h-[244px] overflow-clip relative rounded-[30px] shrink-0 w-[624px]" data-name={`${type} knee card`}>
        <div className="absolute contents inset-0">
          <div className="absolute inset-0 rounded-[15px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
              <img alt="" className="absolute max-w-none pointer-events-none" style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'bottom' }} src={image} />
            </div>
          </div>
          <div className="absolute bg-white inset-0 opacity-20 rounded-[15px]" />
        </div>
        <div className="absolute h-[90px] left-[88.62%] right-[-3.04%] top-[174px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
            <g id="Group 92">
              <circle cx="45" cy="45" fill="var(--fill-0, white)" id="Ellipse 38" r="45" />
            </g>
          </svg>
        </div>
        <div className="absolute bg-white box-border flex gap-[10px] items-center justify-center left-[574px] p-3 rounded-[50px] shadow-elevation top-[195px]" data-name="icon button desktop">
          <div className="relative shrink-0 size-[24px]" data-name="Component">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="Component">
                <path d="M8 4L16 12L8 20" id="Vector" stroke="var(--stroke-0, #C7C8D5)" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Calculate which base card is currently centered (for indicators)
  const activeIndicatorIndex = ((currentIndex % baseCards.length) + baseCards.length) % baseCards.length;

  return (
    <div className="absolute flex flex-col gap-[46px] items-center leading-[0] left-[calc(50%-46.5px)] top-[914.72px] translate-x-[-50%] w-[1121px]" data-name="Prosthesis Category">
      <div className="flex gap-[265px] items-center relative shrink-0" data-name="Prosthesis Category">
        <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading text-nowrap">
          <p className="leading-[60px] whitespace-pre">Find What Fits You Best</p>
        </div>
        <div className="flex flex-col text-h3 h-[64px] justify-center relative shrink-0 text-body-color text-right w-[419px]">
          <p className="leading-[32px]">Explore prosthetic solutions designed around your needs, comfort, and lifestyle.</p>
        </div>
      </div>
      <div 
        className="relative w-[1120px] h-[244px]" 
        data-name="Category carousel"
        onMouseEnter={() => {
          setShowLeftChevron(true);
          setShowRightChevron(true);
        }}
        onMouseLeave={() => {
          setShowLeftChevron(false);
          setShowRightChevron(false);
        }}
      >
        {/* Carousel track - shows 2 cards at a time (1120px = 624 + 22 + 624 - 150 for partial view) */}
        <div className="relative w-full h-full overflow-hidden">
          <div 
            className="flex gap-[22px] items-center h-full"
            style={{ 
              transform: `translateX(-${currentIndex * (624 + 22)}px)`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
            }}
          >
            {cards.map((card, index) => (
              <KneeCard key={`${card.type}-${index}`} image={card.image} type={card.type} />
            ))}
          </div>
        </div>

        {/* Left Chevron */}
        <div 
          className="absolute z-40"
          style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={goToPrevious}
            className={`bg-white hover:bg-gray-100 text-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-elevation transition-opacity ${
              showLeftChevron ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Previous card"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Right Chevron */}
        <div 
          className="absolute z-40"
          style={{ right: '16px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={goToNext}
            className={`bg-white hover:bg-gray-100 text-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-elevation transition-opacity ${
              showRightChevron ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Next card"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators - only show 3 dots for the base cards */}
        <div 
          className="absolute left-1/2 z-40 flex items-center"
          style={{ bottom: '-32px', transform: 'translateX(-50%)', gap: '8px' }}
        >
          {baseCards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setCurrentIndex(index + baseCards.length);
              }}
              aria-label={`Go to card ${index + 1}`}
              style={{
                width: index === activeIndicatorIndex ? '14px' : '10px',
                height: index === activeIndicatorIndex ? '14px' : '10px',
                borderRadius: '50%',
                backgroundColor: index === activeIndicatorIndex ? '#388896' : '#C7C8D5',
                boxShadow: index === activeIndicatorIndex ? '0 0 10px rgba(56,136,150,0.5)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: 'none',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (index !== activeIndicatorIndex) {
                  e.currentTarget.style.backgroundColor = '#a8a9b5';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeIndicatorIndex) {
                  e.currentTarget.style.backgroundColor = '#C7C8D5';
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function ProsthesisSectionMobile() {
  return <div>Prosthesis Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 4: SERVICE CENTERS (Desktop)
// ===========================================
export function ServiceCentersSectionDesktop() {
  function LocationCard({ image, location, title, subtitle, features }: {
    image: string;
    location: string;
    title: string;
    subtitle: string;
    features: { icon: string; text: string }[];
  }) {
    return (
      <div className="h-[530px] relative shrink-0 w-[392px]">
        <div className="absolute bg-white bottom-0 left-[-2.81%] right-[2.81%] rounded-[30px] shadow-elevation top-0" data-name="Location cards">
          <div className="absolute bg-white inset-0 rounded-[30px] shadow-elevation" />
          <div className="absolute bottom-[52.08%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-0">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={image} />
          </div>
          <div className="absolute bg-white box-border flex gap-2 items-center left-[calc(50%-98.5px)] p-[8px] rounded-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] top-[calc(50%-231px)] translate-x-[-50%] translate-y-[-50%]">
            <div className="relative shrink-0 size-[24px]" data-name="Component">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Component">
                  <path d={svgPaths.pdd1b780} fill="var(--fill-0, #979797)" id="Vector" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col text-body justify-center leading-[0] relative shrink-0 text-body-color text-nowrap">
              <p className="leading-[22px] whitespace-pre">{location}</p>
            </div>
          </div>
          <div className="absolute flex flex-col gap-3 inset-[50.19%_3.83%_12.83%_3.06%] items-start">
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-heading w-[223px]">
                <p className="leading-[32px]">{title}</p>
              </div>
            </div>
            <div className="flex flex-col text-body justify-center leading-[0] min-w-full relative shrink-0 text-body-color w-[min-content]">
              <p className="leading-[22px]">{subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 items-start relative shrink-0">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-2 items-center relative shrink-0">
                  <div className="relative shrink-0 size-[24px]" data-name="Component">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g dangerouslySetInnerHTML={{ __html: feature.icon }} />
                    </svg>
                  </div>
                  <div className="flex flex-col text-body justify-center leading-[0] relative shrink-0 text-body-color text-nowrap">
                    <p className="leading-[22px] whitespace-pre">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bg-white box-border flex gap-[10px] items-center justify-center left-[336px] p-3 rounded-[50px] shadow-elevation top-[474px]" data-name="icon button desktop">
            <div className="relative shrink-0 size-[24px]" data-name="Component">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Component">
                  <path d="M8 4L16 12L8 20" id="Vector" stroke="var(--stroke-0, #C7C8D5)" strokeWidth="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const centers = [
    {
      image: imgRectangle70,
      location: "Kanpur, UP",
      title: "Government Centers",
      subtitle: "Offer prosthesis fitting, financial aid, and personalized rehabilitation services.",
      features: [
        { icon: '<path d="' + svgPaths.p2ae87100 + '" fill="var(--fill-0, #8AC0AD)" id="Vector" /><path d="M10.5 22V17H13.5V22H10.5Z" fill="var(--fill-0, #8AC0AD)" id="Vector_2" />', text: "170+ ALIMCO centers nationwide" },
        { icon: '<path clip-rule="evenodd" d="' + svgPaths.p35487b00 + '" fill="var(--fill-0, #8AC0AD)" fill-rule="evenodd" id="Vector" />', text: "Subsidized cost, ADIP scheme" },
        { icon: '<path d="' + svgPaths2.p39bb3400 + '" fill="var(--fill-0, #8AC0AD)" id="Vector" />', text: "Accessible for All, Certified Specialists" },
      ]
    },
    {
      image: imgRectangle71,
      location: "Jaipur, Rajasthan",
      title: "NGO/Non-Profit",
      subtitle: "Affordable solutions and inclusive care programs. Offering customized fittings, high-end materials",
      features: [
        { icon: '<path d="' + svgPaths.p2ae87100 + '" fill="var(--fill-0, #8AC0AD)" id="Vector" /><path d="M10.5 22V17H13.5V22H10.5Z" fill="var(--fill-0, #8AC0AD)" id="Vector_2" />', text: "BMVSS 23 branches in India" },
        { icon: '<path clip-rule="evenodd" d="' + svgPaths.p35487b00 + '" fill="var(--fill-0, #8AC0AD)" fill-rule="evenodd" id="Vector" />', text: "Free- subsidized cost" },
        { icon: '<path d="' + svgPaths2.p39bb3400 + '" fill="var(--fill-0, #8AC0AD)" id="Vector" />', text: "Community Outreach, Schemes for rehabilitation" },
      ]
    },
    {
      image: imgRectangle72,
      location: "Delhi, India",
      title: "Private Clinics",
      subtitle: "Offering customized fittings, high-end materials",
      features: [
        { icon: '<path d="' + svgPaths.p2ae87100 + '" fill="var(--fill-0, #8AC0AD)" id="Vector" /><path d="M10.5 22V17H13.5V22H10.5Z" fill="var(--fill-0, #8AC0AD)" id="Vector_2" />', text: "Endolite India: 250+ clinics / franchises (network)" },
        { icon: '<path clip-rule="evenodd" d="' + svgPaths.p35487b00 + '" fill="var(--fill-0, #8AC0AD)" fill-rule="evenodd" id="Vector" />', text: "Basic model from Rs.20,000+" },
        { icon: '<path d="' + svgPaths2.p39bb3400 + '" fill="var(--fill-0, #8AC0AD)" id="Vector" />', text: "Personal Care" },
      ]
    }
  ];

  return (
    <div className="absolute h-[606px] left-0 top-[1716.72px] w-[1244px]" data-name="Service centers">
      <div className="absolute flex items-center justify-between left-[15px] top-[-8px] w-[1123px]" data-name="Selecting Category, Hyperlink">
        <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color text-nowrap">
          <p className="leading-[32px] whitespace-pre">Select Center Category</p>
        </div>
        <div className="h-[24px] relative shrink-0 w-[59px]" data-name="text underline button desktop">
          <div className="absolute flex flex-col font-['Roboto:Bold',_sans-serif] font-bold inset-0 justify-center leading-[0] text-body-color text-[0px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="[text-underline-position:from-font] decoration-solid leading-[24px] text-disabled-primary text-[16px] underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              View All
            </p>
          </div>
        </div>
      </div>
      <div className="absolute h-[558px] left-0 overflow-x-auto overflow-y-clip top-[40.28px] w-[1215px]" data-name="Locations cards">
        <div className="absolute flex gap-8 items-center left-[15px] top-[16px]" data-name="Location cards">
          {centers.map((center, idx) => (
            <LocationCard key={idx} {...center} />
          ))}
        </div>
      </div>
      <div className="absolute backdrop-blur-[1.5px] backdrop-filter h-[530px] left-[1132px] top-[50px] w-[82px]" data-name="Blur overlay" />
    </div>
  );
}

// Mobile version - TBD
export function ServiceCentersSectionMobile() {
  return <div>Service Centers Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 5: HELP CENTER FINDER (Desktop)
// ===========================================
export function HelpCenterSectionDesktop() {
  return (
    <div className="absolute contents left-[15px] top-[1348.72px]" data-name="Help center finder">
      <div className="absolute contents left-[15px] top-[1348.72px]" data-name="Background">
        <div className="absolute h-[327.281px] left-[15px] rounded-[30px] top-[1348.72px] w-[1112px]" data-name="Background" />
      </div>
      <div className="absolute box-border flex flex-col gap-[21px] h-[236px] items-center left-[62px] px-[8px] py-0 top-[1403px]" data-name="Help center finder">
        <div className="relative shrink-0 w-full" data-name="Title and description">
          <div className="flex flex-col items-center size-full">
            <div className="box-border flex flex-col gap-3 items-center px-6 py-0 relative w-full">
              <div className="flex flex-col text-h1 justify-center leading-[0] min-w-full relative shrink-0 text-center text-white w-[min-content]">
                <p className="leading-[60px]">Help Is Closer Than You Think</p>
              </div>
              <div className="flex gap-[316px] items-center relative shrink-0" data-name="Description">
                <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-nowrap text-right text-white">
                  <p className="leading-[32px] whitespace-pre">{` Discover all nearby centers in one click and connect with the support you need.`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white box-border flex gap-6 items-center px-[20px] py-[15px] relative rounded-[30px] shadow-[0px_0px_10px_0px_rgba(221,221,221,0.86)] shrink-0" data-name="Input fields">
          {/* Search fields would go here */}
          <div className="text-body-color text-body">Search Location • Center Type • Price Range</div>
        </div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function HelpCenterSectionMobile() {
  return <div>Help Center Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 6: SHARING/STORY CONTENT (Desktop)
// ===========================================
export function SharingSectionDesktop() {
  return (
    <div className="absolute flex flex-col items-start left-[calc(50%-5.712px)] top-0 translate-x-[-50%]" data-name="Story content">
      <div className="bg-gradient-to-b box-border flex flex-col from-[#ffffff] from-[22.305%] gap-[10px] items-start px-[46px] py-[30px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 to-[#69b57c] to-[110.04%]" data-name="Top frame">
        <div className="flex gap-[60px] items-center relative rounded-bl-[20px] rounded-br-[20px] shrink-0" data-name="Text, buttons, image frame">
          <div className="flex flex-col gap-6 items-start justify-end relative shrink-0 w-[531.576px]" data-name="Text and buttons frame">
            <div className="flex flex-col gap-3 items-start leading-[0] relative shrink-0 w-full" data-name="Text frame">
              <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-[411px]">
                <p className="leading-[60px]">Your story can inspire someone today</p>
              </div>
              <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-[405px]">
                <p className="leading-[32px]">Add photos, videos, or proud moments to inspire, motivate, and support others.</p>
              </div>
            </div>
            <div className="flex gap-6 items-end relative shrink-0" data-name="Story sharing options">
              <div className="bg-white box-border flex gap-3 h-[46px] items-center justify-center px-6 py-2 relative rounded-[24px] shadow-elevation shrink-0" data-name="secondary button icon text desktop">
                <div className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-disabled-primary text-nowrap">
                  <p className="leading-[24px] whitespace-pre">Share your story</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Image Section">
            <div className="[grid-area:1_/_1] h-[478px] ml-0 mt-[32px] relative rounded-bl-[20px] rounded-br-[20px] w-[436px]" data-name="Image">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-bl-[20px] rounded-br-[20px]">
                <img alt="" className="absolute h-[126.73%] left-[-30.91%] max-w-none top-[-17.74%] w-[138.94%]" src={imgImage} />
              </div>
            </div>
            <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#ffffff] from-[18.103%] h-[232px] ml-0 mt-0 rounded-bl-[20px] rounded-br-[20px] to-[rgba(255,255,255,0)] w-[436px]" data-name="Gradient overlay" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#69b57c] h-[169px] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 to-[#388896] w-full" data-name="Bottom frame">
        <div aria-hidden="true" className="absolute border-[4px_0px_0px] border-solid border-white inset-0 pointer-events-none rounded-bl-[30px] rounded-br-[30px]" />
        <div className="flex flex-col items-center justify-center size-full">
          <div className="box-border flex flex-col gap-[10px] h-[169px] items-center justify-center px-[41px] py-[26px] relative w-full">
            <div className="flex gap-[158px] items-center justify-center relative shrink-0 w-[895px]" data-name="Overview">
              <div className="flex flex-col items-center justify-center relative shrink-0 w-[227px]" data-name="+2million">
                <div className="flex gap-[2px] items-center justify-center relative shrink-0 w-full" data-name="Overview">
                  <div className="flex flex-col text-h1 justify-center leading-[0] relative shrink-0 text-center text-nowrap text-white">
                    <p className="leading-[60px] whitespace-pre">+2 million</p>
                  </div>
                </div>
                <div className="flex flex-col text-h3 justify-center leading-[32px] relative shrink-0 text-nowrap text-white whitespace-pre">
                  <p className="mb-0">{`BMVSS: Changing lives `}</p>
                  <p>through rehabilitation.</p>
                </div>
              </div>
              <div className="flex flex-col gap-[22px] items-center justify-center relative shrink-0" data-name="Number of centers">
                <div className="flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[159px]" data-name="Number of centers">
                  <div className="flex flex-col text-h1 justify-center relative shrink-0">
                    <p className="leading-[60px] text-nowrap whitespace-pre">{`+700 `}</p>
                  </div>
                  <div className="flex flex-col text-h3 justify-center leading-[32px] relative shrink-0 whitespace-pre">
                    <p className="mb-0">Private and public</p>
                    <p>centers nationwide.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[193px]" data-name="Beneficiaries number">
                <div className="flex flex-col text-h1 justify-center relative shrink-0">
                  <p className="leading-[60px] text-nowrap whitespace-pre">380,000+</p>
                </div>
                <div className="flex flex-col text-h3 justify-center leading-[32px] relative shrink-0 text-center whitespace-pre">
                  <p className="mb-0">Beneficiaries assisted</p>
                  <p>through camps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function SharingSectionMobile() {
  return <div>Sharing Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 7: COMMUNITY/USER PROFILES (Desktop)
// ===========================================
export function CommunitySectionDesktop() {
  // User card would be extracted as a reusable component
  return (
    <div className="absolute flex flex-col gap-6 items-start left-[78px] top-[819px] w-[1209px]" data-name="User profiles">
      <div className="flex gap-[150px] items-end relative shrink-0" data-name="Quote + Onboarding option">
        <div className="flex flex-col gap-3 items-start leading-[0] relative shrink-0 w-[906px]" data-name="Quote">
          <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-full">
            <p className="leading-[60px]">Join a community that understands you.</p>
          </div>
          <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
            <p className="leading-[32px]">Connect with inspiring members who share your journey, celebrate milestones, exchange tips, and support each other every step of the way</p>
          </div>
        </div>
        <div className="h-[24px] relative shrink-0 w-[59px]" data-name="text underline button desktop">
          <div className="absolute bottom-0 flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] left-0 right-[-15.25%] text-body-color text-[0px] text-nowrap top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="[text-underline-position:from-font] decoration-solid leading-[24px] text-disabled-primary text-[16px] underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Join Now
            </p>
          </div>
        </div>
      </div>
      <div className="h-[542px] overflow-x-auto overflow-y-clip relative shrink-0 w-[1209px]" data-name="User Cards">
        {/* User cards would go here - simplified for now */}
        <div className="text-body-color text-body">User Profile Cards Grid</div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function CommunitySectionMobile() {
  return <div>Community Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 8: CLOSING CTA (Desktop)
// ===========================================
export function ClosingCTASectionDesktop() {
  return (
    <div className="absolute flex flex-col gap-3 items-center left-[calc(50%-5.5px)] top-[1601px] translate-x-[-50%] w-[864px]" data-name="Closing content">
      <div className="flex flex-col text-h1 justify-center leading-[0] min-w-full relative shrink-0 text-heading text-center w-[min-content]">
        <p className="leading-[60px]">Together, we move forward.Every step, with you.</p>
      </div>
      <div className="flex flex-col text-h3 justify-center leading-[0] min-w-full relative shrink-0 text-body-color text-center w-[min-content]">
        <p className="leading-[32px]">Restoring confidence through human connection. Built with care, made for you.</p>
      </div>
      <div className="flex gap-[18px] items-center relative shrink-0" data-name="Buttons">
        <div className="bg-primary box-border flex gap-2 h-[48px] items-center justify-center px-6 py-2 relative rounded-[26px] shadow-elevation shrink-0 w-[160px]" data-name="Primary button desktop">
          <div className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap text-white">
            <p className="leading-[24px] whitespace-pre">Register</p>
          </div>
        </div>
        <div className="bg-white box-border flex gap-2 h-[50px] items-center justify-center px-6 py-2 relative rounded-[26px] shadow-elevation shrink-0 w-[160px]" data-name="secondary button desktop">
          <div className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-primary text-nowrap">
            <p className="leading-[24px] whitespace-pre">Login</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function ClosingCTASectionMobile() {
  return <div>Closing CTA Section Mobile - TBD</div>;
}

// ===========================================
// SECTION 9: FOOTER (Desktop)
// ===========================================
export function FooterSectionDesktop() {
  return (
    <div className="absolute bg-variation bottom-0 box-border flex flex-col gap-[10px] h-[100px] items-start left-0 pb-[39px] pt-[36px] px-[27px] w-[1280px]" data-name="Footer">
      <div className="flex gap-[195px] items-center relative shrink-0" data-name="Sarathi.co.in">
        <div className="flex flex-col text-body-lg justify-center leading-[0] relative shrink-0 text-body-color text-nowrap">
          <p className="leading-[28px] whitespace-pre">© 2025 Sarathi.co.in</p>
        </div>
        <div className="flex gap-[2px] items-center relative shrink-0" data-name="Quotes">
          <div className="bg-clip-text bg-gradient-to-b flex flex-col text-body-lg from-[#69b57c] justify-center leading-[0] relative shrink-0 text-nowrap to-[#388896]" style={{ WebkitTextFillColor: "transparent" }}>
            <p className="leading-[28px] whitespace-pre">Designed for inclusion</p>
          </div>
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="Footer icon">
                <path d={svgPaths2.p39bb3400} fill="var(--fill-0, #8AC0AD)" id="Vector" />
              </g>
            </svg>
          </div>
          <div className="bg-clip-text bg-gradient-to-b flex flex-col text-body-lg from-[#69b57c] justify-center leading-[0] relative shrink-0 text-nowrap to-[#388896]" style={{ WebkitTextFillColor: "transparent" }}>
            <p className="leading-[28px] whitespace-pre">Built for change</p>
          </div>
        </div>
        <div className="flex flex-col text-body-lg justify-center leading-[0] relative shrink-0 text-body-color text-nowrap">
          <p className="leading-[28px] whitespace-pre">About • Contact • Privacy • Explore Stories</p>
        </div>
      </div>
    </div>
  );
}

// Mobile version - TBD
export function FooterSectionMobile() {
  return <div>Footer Section Mobile - TBD</div>;
}

