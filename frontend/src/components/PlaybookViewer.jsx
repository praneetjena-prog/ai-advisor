import React, { useState } from 'react';

export default function PlaybookViewer({ playbooks = {} }) {
  const [activeCategory, setActiveCategory] = useState('coding');
  const [stepLanguages, setStepLanguages] = useState({});
  const [copiedSteps, setCopiedSteps] = useState({});

  const categories = [
    { id: 'coding', label: 'Coding Agent' },
    { id: 'research', label: 'Research Agent' },
    { id: 'data', label: 'Data Pipeline' },
    { id: 'content', label: 'Content Agent' },
    { id: 'support', label: 'Support Agent' }
  ];

  // Safe accessor for current playbook
  const currentPlaybook = playbooks[activeCategory] || null;

  const handleCopyCode = (stepIndex, codeText) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText).then(() => {
      setCopiedSteps(prev => ({ ...prev, [stepIndex]: true }));
      setTimeout(() => {
        setCopiedSteps(prev => ({ ...prev, [stepIndex]: false }));
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const getStepLanguage = (stepIndex) => {
    return stepLanguages[stepIndex] || 'python';
  };

  const setStepLanguage = (stepIndex, lang) => {
    setStepLanguages(prev => ({ ...prev, [stepIndex]: lang }));
  };

  return (
    <section id="section-playbooks" className="section section-playbooks">
      <h2 className="section-title">
        <span className="gradient-text">Implementation</span> Playbooks
      </h2>
      <p className="section-subtitle">
        Access detailed, step-by-step developer guides complete with code snippets, tips, and common pitfalls for building custom agent systems.
      </p>

      {/* Category Selectors */}
      <div className="playbook-categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`playbook-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {currentPlaybook ? (
        <div id="playbook-content">
          
          {/* Playbook Header Details */}
          <div className="playbook-header">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem' }}>
              {currentPlaybook.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {currentPlaybook.description}
            </p>
          </div>

          {/* Steps */}
          {currentPlaybook.steps && currentPlaybook.steps.length > 0 ? (
            currentPlaybook.steps.map((step, index) => {
              const activeLang = getStepLanguage(index);
              const codeText = step.code?.[activeLang] || '';
              const isCopied = !!copiedSteps[index];

              return (
                <div key={index} className="playbook-step">
                  <div className="playbook-step-number">{index + 1}</div>
                  
                  <h4 className="playbook-step-title">{step.title}</h4>
                  <p className="playbook-step-desc">{step.description}</p>

                  {/* Tabs */}
                  {step.code && (
                    <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="code-tabs">
                        <button
                          type="button"
                          className={`code-tab ${activeLang === 'python' ? 'active' : ''}`}
                          onClick={() => setStepLanguage(index, 'python')}
                        >
                          Python
                        </button>
                        <button
                          type="button"
                          className={`code-tab ${activeLang === 'javascript' ? 'active' : ''}`}
                          onClick={() => setStepLanguage(index, 'javascript')}
                        >
                          JavaScript
                        </button>
                      </div>

                      {/* Code Block Container */}
                      <div style={{ position: 'relative' }}>
                        <button
                          type="button"
                          className={`copy-btn ${isCopied ? 'copied' : ''}`}
                          onClick={() => handleCopyCode(index, codeText)}
                          aria-label="Copy code block"
                        >
                          {isCopied ? 'Copied!' : 'Copy Code'}
                        </button>
                        
                        <pre className="code-block">
                          <code>{codeText}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Pitfalls & Tips list */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                    {step.pitfalls && step.pitfalls.length > 0 && (
                      <div>
                        <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-warning)' }}>
                          ⚠️ Pitfalls to Avoid
                        </h5>
                        <ul className="pitfall-list">
                          {step.pitfalls.map((pitfall, pitIndex) => (
                            <li key={pitIndex}>
                              ⚠️ <strong>Heuristic:</strong> {pitfall}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.tips && step.tips.length > 0 && (
                      <div>
                        <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-success)' }}>
                          💡 Optimization Tips
                        </h5>
                        <ul className="tip-list">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>
                              💡 <strong>Best Tip:</strong> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No steps defined for this playbook yet.</p>
          )}

          {/* Bottom Error Prevention & Best Practices Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            
            {currentPlaybook.errorPrevention && currentPlaybook.errorPrevention.length > 0 && (
              <div className="error-prevention">
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '1rem' }}>
                  ⚠️ Error Prevention Checklist
                </h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  {currentPlaybook.errorPrevention.map((rule, idx) => (
                    <li key={idx} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentPlaybook.bestPractices && currentPlaybook.bestPractices.length > 0 && (
              <div className="best-practices">
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: '1rem' }}>
                  💡 Best Practices & Guidelines
                </h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  {currentPlaybook.bestPractices.map((practice, idx) => (
                    <li key={idx} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.2rem' }}>Selected playbook is unavailable or not configured.</p>
        </div>
      )}
    </section>
  );
}
