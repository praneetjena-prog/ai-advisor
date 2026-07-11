import React from 'react';

export default function Hero() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="section-hero" class="section section-hero">
      <div className="hero-content">
        <div className="hero-badge">
          🚀 AI-Powered Recommendations
        </div>
        
        <h1 className="hero-title">
          Find the <span className="gradient-text">Perfect AI</span> for Your Project
        </h1>
        
        <p className="hero-description">
          Stop guessing which AI model or agent to use. Get personalized recommendations, 
          implementation playbooks, and error-free code templates — all in one place.
        </p>
        
        <div className="hero-cta">
          <button 
            onClick={(e) => handleScrollTo(e, 'section-advisor')} 
            className="btn btn-primary btn-lg"
          >
            🎯 Get Recommendations
          </button>
          <a 
            href="#section-database" 
            onClick={(e) => handleScrollTo(e, 'section-database')} 
            className="btn btn-secondary btn-lg"
          >
            📊 Explore Database
          </a>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">12+</span>
            <span className="hero-stat-label">Models Compared</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">9+</span>
            <span className="hero-stat-label">Agent Frameworks</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">5</span>
            <span className="hero-stat-label">Playbooks</span>
          </div>
        </div>
      </div>
      
      {/* Background Orbs */}
      <div className="hero-orb hero-orb-1" style={orbStyle1}></div>
      <div className="hero-orb hero-orb-2" style={orbStyle2}></div>
    </section>
  );
}

const orbStyle1 = {
  position: 'absolute',
  top: '10%',
  left: '-5%',
  width: '400px',
  height: '400px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)',
  filter: 'blur(80px)',
  opacity: 0.5,
  pointerEvents: 'none',
  zIndex: 0
};

const orbStyle2 = {
  position: 'absolute',
  bottom: '10%',
  right: '-5%',
  width: '350px',
  height: '350px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%)',
  filter: 'blur(80px)',
  opacity: 0.5,
  pointerEvents: 'none',
  zIndex: 0
};
