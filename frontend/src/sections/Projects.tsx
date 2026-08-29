export default function Projects() {
  return (
    <section id="projects" style={{ background: "var(--off)" }}>
      <div className="deco deco-grid" style={{ bottom: "60px", right: "40px" }}></div>
    
      <div className="wrap">
        <div className="section-head">
          <span className="pill">03 / Projects</span>
          <h2>Projects</h2>
        </div>
        
        <div className="empty-state clay-surface-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <h3>No projects published yet.</h3>
          <p>ACM ITU projects and community work will appear here once they’re published.</p>
        </div>
      </div>
    </section>
  );
}
