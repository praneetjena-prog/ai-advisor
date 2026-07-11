import React, { useState, useEffect } from 'react';

export default function ModelDatabase({ models = [], agents = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Models', 'Agents'
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Keyboard Listener for Escape ───────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Combine and Format Items ───────────────────────────────
  const combinedItems = [
    ...models.map(m => ({ ...m, itemType: 'model' })),
    ...agents.map(a => ({ ...a, itemType: 'agent' }))
  ];

  // ── Filtering Logic ────────────────────────────────────────
  const filteredItems = combinedItems.filter(item => {
    // 1. Filter by tab selection
    if (activeFilter === 'Models' && item.itemType !== 'model') return false;
    if (activeFilter === 'Agents' && item.itemType !== 'agent') return false;

    // 2. Search query check
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();

    const nameMatch = item.name?.toLowerCase().includes(query);
    const descMatch = item.description?.toLowerCase().includes(query);
    const providerMatch = item.provider?.toLowerCase().includes(query);
    
    // Check if search query matches any keywords in bestFor
    const bestForMatch = Array.isArray(item.bestFor) && item.bestFor.some(bf => 
      bf.toLowerCase().includes(query)
    );

    return nameMatch || descMatch || providerMatch || bestForMatch;
  });

  // ── Selection Toggling ─────────────────────────────────────
  const handleToggleCompare = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const selectedItems = combinedItems.filter(item => selectedIds.includes(item.id));

  const handleOverlayClick = (e) => {
    // Close modal if clicking the background overlay
    if (e.target.classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  return (
    <section id="section-database" className="section section-database">
      <h2 className="section-title">
        <span className="gradient-text">Model & Agent</span> Database
      </h2>
      <p className="section-subtitle">
        Search, filter, and compare the specifications of leading foundational AI models and orchestration agent frameworks.
      </p>

      {/* Controls */}
      <div className="db-controls">
        <div className="search-wrapper">
          <input
            id="db-search"
            type="text"
            placeholder="Search by name, provider, or capability (e.g. coding)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search database"
          />
        </div>

        <div className="db-filters">
          {['All', 'Models', 'Agents'].map(filter => (
            <button
              key={filter}
              type="button"
              className={`db-filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cards */}
      <div id="db-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="model-card">
            <div className="model-card-header">
              <div>
                <div className="model-card-provider">
                  {item.provider || (item.openSource ? 'Open Source' : 'Proprietary')}
                </div>
                <h4 className="model-card-name">
                  {item.icon} {item.name}
                </h4>
              </div>
              <span className={`model-card-type tag ${item.itemType === 'model' ? 'tag--violet' : 'tag--pink'}`}>
                {item.itemType === 'model' ? 'Model' : item.type || 'Agent'}
              </span>
            </div>

            <p className="model-card-desc">{item.description}</p>

            <div className="model-card-tags">
              {item.bestFor?.slice(0, 3).map((bf, idx) => (
                <span key={idx} className="tag tag--cyan">
                  {bf}
                </span>
              ))}
            </div>

            <div className="model-card-stats">
              {item.itemType === 'model' ? (
                <>
                  <div>
                    <span className="stat-label">Context</span>
                    <span className="stat-value">{item.contextWindow}</span>
                  </div>
                  <div>
                    <span className="stat-label">Pricing</span>
                    <span className="stat-value" title={item.pricing}>
                      {item.pricing?.split(' ')[0] || 'N/A'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="stat-label">Complexity</span>
                    <span className="stat-value" style={{ textTransform: 'capitalize' }}>
                      {item.complexity}
                    </span>
                  </div>
                  <div>
                    <span className="stat-label">Languages</span>
                    <span className="stat-value" title={item.languages?.join(', ')}>
                      {item.languages && item.languages.length > 1
                        ? `${item.languages[0]} +${item.languages.length - 1}`
                        : item.languages?.[0] || 'Any'}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="model-card-footer">
              <div>
                <input
                  type="checkbox"
                  id={`compare-${item.id}`}
                  className="compare-checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleToggleCompare(item.id)}
                />
                <label htmlFor={`compare-${item.id}`} className="compare-label">
                  Compare
                </label>
              </div>
              
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                >
                  Docs ↗
                </a>
              )}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.2rem' }}>No models or agents found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Floating Compare Button */}
      <button
        id="compare-btn"
        type="button"
        className={`btn btn-primary ${selectedIds.length >= 2 ? 'visible' : ''}`}
        onClick={() => setIsModalOpen(true)}
        aria-label={`Compare ${selectedIds.length} items`}
      >
        Compare <span className="compare-count">{selectedIds.length}</span>
      </button>

      {/* Comparison Modal */}
      <div
        className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Comparison Grid</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleClearSelection}
                style={{ fontSize: '0.8rem' }}
              >
                Clear All
              </button>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close comparison modal"
              >
                &times;
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Specifications</th>
                  {selectedItems.map(item => (
                    <th key={item.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                        <span style={{ fontWeight: 700 }}>{item.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Type</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id}>
                      <span className={`tag ${item.itemType === 'model' ? 'tag--violet' : 'tag--pink'}`}>
                        {item.itemType === 'model' ? 'LLM Model' : item.type || 'Agent'}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Provider / Author</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id}>{item.provider || 'Open Source Community'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Pricing / Cost</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id} style={{ fontSize: '0.85rem' }}>
                      {item.pricing || 'Free / Open Source'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Context Window</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id}>{item.contextWindow || 'N/A (Orchestrator)'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Open Source Status</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id}>
                      {item.itemType === 'model' ? 'Proprietary API' : (item.openSource ? 'Open Source (Free)' : 'Proprietary License')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Coding Capabilities</strong></td>
                  {selectedItems.map(item => {
                    const isCodingBest = item.bestFor?.some(bf => 
                      bf.toLowerCase().includes('coding') || bf.toLowerCase().includes('code')
                    );
                    const isCodingStrength = item.strengths?.some(st => 
                      st.toLowerCase().includes('coding') || st.toLowerCase().includes('code')
                    );
                    const isNativeDev = ['cursor', 'devin', 'bolt-new'].includes(item.id);
                    const support = (isCodingBest || isCodingStrength || isNativeDev)
                      ? '✅ High Excellence'
                      : '✔️ General Capabilities';
                    return <td key={item.id}>{support}</td>;
                  })}
                </tr>
                <tr>
                  <td><strong>Strengths / Features</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id}>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem' }}>
                        {(item.strengths || item.features || []).map((str, idx) => (
                          <li key={idx} style={{ marginBottom: '0.25rem' }}>{str}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Weaknesses / Limitations</strong></td>
                  {selectedItems.map(item => (
                    <td key={item.id}>
                      {item.itemType === 'model' ? (
                        <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem' }}>
                          {(item.weaknesses || []).map((wk, idx) => (
                            <li key={idx} style={{ marginBottom: '0.25rem' }}>{wk}</li>
                          ))}
                        </ul>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                          Framework setup overhead. Reliability relies directly on the selected foundational LLM model performance.
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
