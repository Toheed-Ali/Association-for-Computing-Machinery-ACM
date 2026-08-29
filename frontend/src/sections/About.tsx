export default function About() {
  return (
    <section id="about">
      <div className="deco deco-grid" style={{ bottom: "20px", left: "0px" }}></div>
      <div className="deco deco-dots" style={{ top: "96px", right: "60px" }}>
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    
      <div className="wrap two-col" style={{ alignItems: "start" }}>
        <div className="about-copy">
          <span className="pill">01 / The Community</span>
          <h2>More than a society, a computing community,</h2>
          <p>ITUxACM is a community of innovators, developers, and problem-solvers united by a passion for computing. We empower students through technology, collaboration, learning, and leadership, creating opportunities to build skills, explore ideas, and shape the future.</p>
    
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-top">100+</div>
              <div className="stat-bottom">
                <span>Members</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-top">20+</div>
              <div className="stat-bottom">
                <span>Events</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-top">10+</div>
              <div className="stat-bottom">
                <span>Workshops</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-top">15+</div>
              <div className="stat-bottom">
                <span>Projects</span>
              </div>
            </div>
          </div>
        </div>
    
        <div className="about-art">
          <div className="history">
            <span className="history-head">Our history</span>
            <div className="timeline">
              <div className="t-item">
                <h4>1947 — The Beginning</h4>
                <p>ACM was founded, uniting computing pioneers to advance knowledge, collaboration, and professional excellence worldwide.</p>
              </div>
              <div className="t-item">
                <h4>1960<small style={{ fontSize: "0.65em", verticalAlign: "baseline" }}>s</small> — Shaping Computer Science</h4>
                <p>ACM expanded technical communities, influencing computer science education, research, publications, and emerging professional practices worldwide.</p>
              </div>
              <div className="t-item">
                <h4>1980<small style={{ fontSize: "0.65em", verticalAlign: "baseline" }}>s</small>–2000<small style={{ fontSize: "0.65em", verticalAlign: "baseline" }}>s</small> — A Global Community</h4>
                <p>ACM grew internationally, connecting researchers, educators, professionals, and students as computing transformed society.</p>
              </div>
              <div className="t-item">
                <h4>Today — Shaping the Future</h4>
                <p>ACM advances computing through research, education, conferences, publications, and communities, empowering innovators worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
