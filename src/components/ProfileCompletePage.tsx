import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

interface ProfileCompletePageProps {
  onNavigate: (page: string) => void;
}

export function ProfileCompletePage({ onNavigate }: ProfileCompletePageProps) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1139px',
        backgroundColor: 'white',
        borderRadius: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '600px'
      }}>
        
        {/* LEFT: Logo Section */}
        <div style={{
          width: '479px',
          background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <img 
            src={sarathiLogo} 
            alt="Sarathi" 
            style={{ width: '120px', height: 'auto' }}
          />
        </div>

        {/* RIGHT: Success Message */}
        <div style={{
          flex: 1,
          padding: '60px 140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            {/* Success Icon with decorative dots */}
            <div style={{
              width: '160px',
              height: '160px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Decorative dots */}
              <div style={{ position: 'absolute', top: '20px', right: '40px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '35px', right: '10px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', bottom: '40px', right: '10px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '50px', left: '5px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', bottom: '10px', left: '45px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '140px', right: '85px', width: '3px', height: '3px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '100px', right: '158px', width: '3px', height: '3px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '8px', right: '70px', width: '3px', height: '3px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', bottom: '20px', right: '115px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', bottom: '18px', right: '132px', width: '3px', height: '3px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '60px', right: '142px', width: '3px', height: '3px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '85px', right: '149px', width: '11px', height: '11px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', bottom: '5px', right: '38px', width: '11px', height: '11px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '0', right: '25px', width: '3px', height: '3px', borderRadius: '50%', background: '#8AC0AD' }} />
              <div style={{ position: 'absolute', top: '3px', right: '33px', width: '11px', height: '11px', borderRadius: '50%', background: '#8AC0AD' }} />
              
              {/* User Icon */}
              <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            {/* Text Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 500,
                color: '#192126',
                lineHeight: '40px',
                margin: 0,
                fontFamily: 'Roboto, sans-serif'
              }}>
                Profile created successfully!
              </h1>
              <p style={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#979797',
                lineHeight: '28px',
                margin: 0,
                fontFamily: 'Roboto, sans-serif'
              }}>
                You have successfully created a profile. Access the profile in homepage to add or edit
              </p>
            </div>

            {/* Explore Button */}
            <button
              onClick={() => onNavigate('home')}
              style={{
                width: '200px',
                height: '52px',
                backgroundColor: '#388896',
                color: 'white',
                border: 'none',
                borderRadius: '28px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(221,221,221,1)',
                fontFamily: 'Roboto, sans-serif',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Explore Sarathi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

