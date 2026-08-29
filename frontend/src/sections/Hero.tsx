export default function Hero() {
  return (
    <section id="home">
      <div className="deco deco-grid" style={{ top: "50px", left: "40px" }}></div>
      <div className="deco deco-grid" style={{ top: "-40px", right: "560px" }}></div>
      <div className="deco deco-grid" style={{ bottom: "50px", right: "340px" }}></div>
      <div className="deco deco-grid" style={{ bottom: "50px", right: "160.3px" }}></div>
      <div className="deco deco-dots" style={{ top: "100px", right: "60px" }}>
        <span></span><span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
    
      <div className="wrap two-col">
        <div className="hero-copy">
          <span className="pill">ITU ACM Student Chapter</span>
          <h1>Building<br />the future,<br /><span className="accent">together.</span></h1>
          <p>ITUxACM is a community of students passionate about computing. We learn, build, compete and innovate together.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-fill">Join our community
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
            </a>
            <a href="#events" className="btn">Explore events
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
            </a>
          </div>
        </div>
    
        <div className="hero-art">
          <img src="/ACM_logo.png" alt="ACM 3D logo" />
          <div className="float-card">
            <span className="swatch"></span>
            <p>Association for<br /> Computing Machinery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
