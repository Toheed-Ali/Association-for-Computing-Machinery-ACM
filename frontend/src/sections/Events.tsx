export default function Events() {
  return (
    <section id="events">
      <div className="deco deco-dots" style={{ top: "40px", left: "120px" }}>
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      
      <div className="wrap">
        <div className="section-head">
          <span className="pill">02 / Events</span>
          <h2>Events</h2>
        </div>
        
        <div className="empty-state clay-surface-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <h3>No upcoming events yet.</h3>
          <p>We’re preparing what’s next. Upcoming ACM ITU events will appear here.</p>
        </div>
      </div>
    </section>
  );
}
