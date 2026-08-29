import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const UNIVERSITIES = [
  'Information Technology University (ITU)',
  'Quaid-i-Azam University (QAU)',
  'National University of Sciences & Technology (NUST)',
  'Lahore University of Management Sciences (LUMS)',
  'Pakistan Institute of Engineering & Applied Sciences (PIEAS)',
  'University of the Punjab (PU)',
  'COMSATS University Islamabad (CUI)',
  'Aga Khan University (AKU)',
  'University of Engineering & Technology Lahore (UET Lahore)',
  'University of Agriculture Faisalabad (UAF)',
  'Ghulam Ishaq Khan Institute (GIKI)',
  'FAST National University of Computer & Emerging Sciences (FAST-NUCES)',
  'NED University of Engineering & Technology (NED)',
  'Government College University Lahore (GCU Lahore)',
  'University of Karachi (UoK)',
  'University of Peshawar (UoP)',
  'Bahauddin Zakariya University (BZU)',
  'Institute of Space Technology (IST)',
  'Institute of Business Administration Karachi (IBA Karachi)',
  'Air University (AU)',
  'University of Engineering & Technology Taxila (UET Taxila)',
  'Government College University Faisalabad (GCUF)',
  'University of Lahore (UoL)',
  'University of Veterinary and Animal Sciences (UVAS)',
  'University of Management and Technology (UMT)',
  'Bahria University (BU)',
  'National University of Modern Languages (NUML)',
  'Riphah International University (RIU)',
  'University of Sargodha (UoS)',
  'Habib University (HU)',
  'University of Engineering & Technology Peshawar (UET Peshawar)',
  'IBA Sukkur (IBA Sukkur)',
  'National Textile University (NTU)',
  'University of Central Punjab (UCP)',
  'Kinnaird College for Women University (KCWU)',
  'Lahore College for Women University (LCWU)',
  'Forman Christian College University (FCCU)',
  'University of Gujrat (UoG)',
  'University of Haripur (UoH)',
  'International Islamic University Islamabad (IIUI)',
  'Capital University of Science and Technology (CUST)',
  'University of Malakand (UoM)',
  'University of Swat (UoSwat)',
  'University of Sindh (USINDH)',
  'Mehran University of Engineering & Technology (MUET)',
  'National University of Technology (NUTECH)',
  'Superior University (SU)',
  'Fatima Jinnah Women University (FJWU)',
  'University of Education Lahore (UE)',
  'University of Balochistan (UoB)',
  'Dow University of Health Sciences (DUHS)',
  'Khyber Medical University (KMU)',
  'King Edward Medical University (KEMU)',
  'Fatima Jinnah Medical University (FJMU)',
  'University of Health Sciences Lahore (UHS)',
  'Rawalpindi Medical University (RMU)',
  'Shaheed Zulfiqar Ali Bhutto Medical University (SZABMU)',
  'Liaquat University of Medical & Health Sciences (LUMHS)',
  'Bolan University of Medical & Health Sciences (BUMHS)',
  'University of Azad Jammu and Kashmir (UAJK)',
  'Karakoram International University (KIU)',
  'University of Baltistan (UoBA)',
  'Mirpur University of Science and Technology (MUST)',
  'University of Kotli AJK (UoKotli)',
  'University of Poonch Rawalakot (UPR)',
  'University of Swabi (UoSwabi)',
  'Abdul Wali Khan University Mardan (AWKUM)',
  'Hazara University (HU Mansehra)',
  'Gomal University (GU)',
  'Kohat University of Science & Technology (KUST)',
  'University of Chitral (UoC)',
  'Shaheed Benazir Bhutto Women University Peshawar (SBBWUP)',
  'University of Turbat (UoT)',
  'Sardar Bahadur Khan Women\'s University (SBKWU)',
  'Lasbela University of Agriculture Water and Marine Sciences (LUAWMS)',
  'Balochistan University of IT Engineering & Management Sciences (BUITEMS)',
  'University of Larkana (UoLarkana)',
  'Shah Abdul Latif University (SALU)',
  'Sukkur IBA University (SIBAУ)',
  'Benazir Bhutto Shaheed University Lyari (BBSUL)',
  'Dawood University of Engineering & Technology (DUET)',
  'Federal Urdu University of Arts Science & Technology (FUUAST)',
  'Institute of Business Management (IoBM)',
  'Sir Syed University of Engineering & Technology (SSUET)',
  'Hamdard University (HamdardU)',
  'Ziauddin University (ZU)',
  'Indus University (IU)',
  'Karachi Institute of Economics & Technology (KIET)',
  'Jinnah University for Women (JUW)',
  'Greenwich University Pakistan (GUP)',
  'Beaconhouse National University (BNU)',
  'Allama Iqbal Open University (AIOU)',
  'Virtual University of Pakistan (VU)'
];

function fuzzyScore(query: string, target: string) {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  if(!q) return 1;
  if(t.includes(q)) return 1;

  const qWords = q.split(/\s+/);
  const tWords = t.split(/[\s()&,\/]+/);
  const allTokensMatch = qWords.every(qw =>
    tWords.some(tw => tw.startsWith(qw) || tw.includes(qw))
  );
  if(allTokensMatch) return 0.9;

  function bigrams(str: string){ const b=new Set(); for(let i=0;i<str.length-1;i++) b.add(str.slice(i,i+2)); return b; }
  const qBi = bigrams(q);
  const tBi = bigrams(t);
  let inter = 0;
  qBi.forEach(b => { if(tBi.has(b)) inter++; });
  const bigramSim = (2 * inter) / (qBi.size + tBi.size + 0.001);
  if(bigramSim > 0.25) return bigramSim;

  let matched = 0;
  const tChars = t.split('');
  for(const c of q){
    const idx = tChars.indexOf(c);
    if(idx !== -1){ matched++; tChars.splice(idx,1); }
  }
  const coverage = matched / q.length;
  if(coverage > 0.7) return coverage * 0.6;

  return 0;
}

export default function AuthPage() {
  const [view, setView] = useState<"login" | "signup">("login");
  const [loginPwVisible, setLoginPwVisible] = useState(false);
  const [signupPwVisible, setSignupPwVisible] = useState(false);
  const [signupPw2Visible, setSignupPw2Visible] = useState(false);

  const [uniQuery, setUniQuery] = useState("");
  const [isUniDropdownOpen, setIsUniDropdownOpen] = useState(false);
  const [showOtherUniInput, setShowOtherUniInput] = useState(false);
  const uniWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle('show-signup', view === 'signup'); document.body.classList.add('auth-page-active');
    return () => {
      document.body.classList.remove('show-signup'); document.body.classList.remove('auth-page-active');
    };
  }, [view]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (uniWrapRef.current && !uniWrapRef.current.contains(e.target as Node)) {
        setIsUniDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scoredUnis = UNIVERSITIES
    .map(u => ({ u, score: fuzzyScore(uniQuery === 'Other' ? '' : uniQuery, u) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const displayUnis = (!uniQuery || uniQuery === 'Other')
    ? UNIVERSITIES
    : scoredUnis.filter(({ score }) => score > 0.18).map(({ u }) => u);

  const selectUni = (val: string, isOther: boolean) => {
    if (isOther) {
      setUniQuery('Other');
      setShowOtherUniInput(true);
    } else {
      setUniQuery(val);
      setShowOtherUniInput(false);
    }
    setIsUniDropdownOpen(false);
  };

  return (
    <>
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
      <div className="glow glow-3"></div>

      <div className="deco-grid" style={{ top: "24px", left: "24px" }}></div>
      <div className="deco-grid" style={{ bottom: "24px", right: "24px" }}></div>

      <div className="deco-dots" style={{ top: "110px", right: "90px" }}>
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div className="deco-dots" style={{ bottom: "120px", left: "80px" }}>
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <Link to="/" className="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
        Home
      </Link>

      {/* LOGIN VIEW */}
      <div className="view" id="view-login">
        <div className="card">
          <div className="card-logo">
            <img src="/ACM_logo.png" alt="ACM logo" />
          </div>

          <div className="card-header">
            <h1>Welcome back</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <div className="input-wrap">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                </span>
                <input type="email" placeholder="Enter your email" autoComplete="email" required />
              </div>

              <div className="input-wrap">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                </span>
                <input type={loginPwVisible ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" required />
                <button type="button" className="toggle-pw" onClick={() => setLoginPwVisible(!loginPwVisible)} aria-label="Show password">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="btn-submit">Sign In</button>
          </form>

          <p className="card-footer-text">
            Don't have an account? <button type="button" onClick={() => setView('signup')}>Sign up</button>
          </p>
        </div>
      </div>

      {/* SIGNUP VIEW */}
      <div className="view" id="view-signup">
        <div className="card-wide">
          <div className="card-logo">
            <img src="/ACM_logo.png" alt="ACM logo" />
          </div>

          <div className="card-header">
            <h1>Join ACM</h1>
            <p>Create your account and become part of the community</p>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <div className="form-row">
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </span>
                  <input type="text" placeholder="Full name" required />
                </div>

                <div className={`uni-wrap ${isUniDropdownOpen ? 'open' : ''}`} ref={uniWrapRef}>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                    </span>
                    <input 
                      type="text" 
                      placeholder="Select university" 
                      autoComplete="off" 
                      value={uniQuery}
                      onChange={e => {
                        setUniQuery(e.target.value);
                        if (e.target.value !== 'Other') setShowOtherUniInput(false);
                      }}
                      onFocus={() => setIsUniDropdownOpen(true)}
                      required 
                    />
                    <span className="uni-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </div>
                  <div className="uni-dropdown">
                    <div className="uni-option special" onClick={() => selectUni('— No University Affiliation —', false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg> I don't belong to any university
                    </div>
                    
                    {displayUnis.length === 0 && uniQuery !== '' ? (
                      <div className="uni-no-results">No close match found — choose "Other" to enter manually</div>
                    ) : (
                      displayUnis.map(u => (
                        <div key={u} className="uni-option" onClick={() => selectUni(u, false)}>{u}</div>
                      ))
                    )}
                    
                    <div className="uni-option" onClick={() => selectUni('other', true)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"13px", height:"13px", flexShrink:0, color:"var(--blue)"}}><path d="M12 5v14M5 12h14"/></svg> Other
                    </div>
                  </div>
                  
                  {showOtherUniInput && (
                    <div className="input-wrap" style={{ marginTop: "12px" }}>
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                      </span>
                      <input type="text" placeholder="Enter your university name" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  </span>
                  <input type="email" placeholder="University or Personal email" autoComplete="email" required />
                </div>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.06 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </span>
                  <input type="tel" placeholder="Phone number" />
                </div>
              </div>

              <div className="form-row">
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  </span>
                  <input type={signupPwVisible ? "text" : "password"} placeholder="Create password" autoComplete="new-password" required />
                  <button type="button" className="toggle-pw" onClick={() => setSignupPwVisible(!signupPwVisible)} aria-label="Show password">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><path d="M9 16l2 2 4-4"/></svg>
                  </span>
                  <input type={signupPw2Visible ? "text" : "password"} placeholder="Confirm password" autoComplete="new-password" required />
                  <button type="button" className="toggle-pw" onClick={() => setSignupPw2Visible(!signupPw2Visible)} aria-label="Show password">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="terms-row">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link> of ACM ITU Student Chapter</label>
            </div>

            <button type="submit" className="btn-submit">Create Account</button>
          </form>

          <p className="card-footer-text">
            Already have an account? <button type="button" onClick={() => setView('login')}>Sign in</button>
          </p>
        </div>
      </div>
    </>
  );
}
