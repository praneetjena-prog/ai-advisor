import React, { useState } from 'react';

export default function AdvisorWizard({ models = [], agents = [] }) {
  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [selectedAutonomy, setSelectedAutonomy] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  // ── Step Configurations ────────────────────────────────────
  const domains = [
    { id: 'coding', icon: '💻', title: 'Coding & Development', desc: 'Software engineering, script writing, and codebase debugging.' },
    { id: 'research', icon: '🔍', title: 'Deep Research', desc: 'Information gathering, source validation, and report synthesis.' },
    { id: 'data-processing', icon: '📊', title: 'Data Processing', desc: 'Data cleaning, ETL pipelines, and automated schema inference.' },
    { id: 'content-creation', icon: '✍️', title: 'Content Creation', desc: 'Drafting blog posts, creative writing, and copy generation.' },
    { id: 'customer-support', icon: '💬', title: 'Customer Support', desc: 'Intent classification, FAQs, and human escalation management.' }
  ];

  const complexities = [
    { id: 'simple', icon: '🟢', title: 'Simple', desc: 'Straightforward request-response tasks with minimal steps.' },
    { id: 'moderate', icon: '🟡', title: 'Moderate', desc: 'Multi-turn conversations, tool use, and structured outputs.' },
    { id: 'complex', icon: '🔴', title: 'Complex', desc: 'Advanced multi-step reasoning, execution loops, and code generation.' }
  ];

  const autonomyLevels = [
    { id: 'autonomous-agent', icon: '🤖', title: 'Autonomous Agent', desc: 'Allows the model to self-correct and execute tasks in a loop.' },
    { id: 'human-in-loop', icon: '👥', title: 'Human-in-the-Loop', desc: 'Requires checkpoints and approvals for critical actions.' },
    { id: 'single-llm', icon: '🧠', title: 'Single LLM Call', desc: 'Direct request-response model call without agent scaffolding.' }
  ];

  const budgets = [
    { id: 'free', icon: '🎁', title: 'Free', desc: 'Zero cost options, local models, or free tier endpoints.' },
    { id: 'low', icon: '💵', title: 'Low Budget', desc: 'Highly optimized models for cheap high-volume scaling.' },
    { id: 'medium', icon: '💳', title: 'Medium Budget', desc: 'Balanced price-to-performance ratio for production systems.' },
    { id: 'high', icon: '💎', title: 'High Budget', desc: 'Premium reasoning-heavy models for extremely difficult tasks.' }
  ];

  // ── Handlers ───────────────────────────────────────────────
  const handleNext = () => {
    if (step < 5) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedDomain('');
    setSelectedComplexity('');
    setSelectedAutonomy('');
    setSelectedBudget('');
    setStep(1);
  };

  const isNextDisabled = () => {
    if (step === 1 && !selectedDomain) return true;
    if (step === 2 && !selectedComplexity) return true;
    if (step === 3 && !selectedAutonomy) return true;
    if (step === 4 && !selectedBudget) return true;
    return false;
  };

  // ── Recommendation Algorithm ───────────────────────────────
  const calculateRecommendations = () => {
    if (!selectedDomain || !selectedComplexity || !selectedAutonomy || !selectedBudget) {
      return { model: null, agent: null, modelScore: 0, agentScore: 0 };
    }

    // 1. Model Scoring Logic
    const scoredModels = models.map(model => {
      let score = 0;

      // Domain keywords match in model.bestFor (+3 points/match)
      const domainKeywords = {
        'coding': ['coding', 'code', 'debugging', 'developer', 'program'],
        'research': ['research', 'analysis', 'document', 'reasoning', 'thinking'],
        'data-processing': ['data', 'processing', 'pipeline', 'etl', 'classification', 'structured'],
        'content-creation': ['content', 'creation', 'writing', 'creative', 'text'],
        'customer-support': ['support', 'customer', 'chat', 'conversational', 'assistant']
      };

      const keywords = domainKeywords[selectedDomain] || [];
      let domainMatches = 0;
      if (Array.isArray(model.bestFor)) {
        model.bestFor.forEach(item => {
          const itemLower = item.toLowerCase();
          const matches = keywords.some(kw => itemLower.includes(kw));
          if (matches) domainMatches++;
        });
      }
      score += domainMatches * 3;

      // Budget Tier matching (+5 if matching tier, +2 if adjacent tier)
      const tierValues = { 'free': 0, 'low': 1, 'medium': 2, 'high': 3 };
      const userBudgetVal = tierValues[selectedBudget] ?? 1;
      const modelTierVal = tierValues[model.tier] ?? 2; // Default to medium if not defined

      if (userBudgetVal === modelTierVal) {
        score += 5;
      } else if (Math.abs(userBudgetVal - modelTierVal) === 1) {
        score += 2;
      }

      // Complexity matching (+3 if simple & model is fast, +2 if complex & model is medium/slow)
      if (selectedComplexity === 'simple' && model.speed === 'fast') {
        score += 3;
      } else if (selectedComplexity === 'complex' && (model.speed === 'medium' || model.speed === 'slow')) {
        score += 2;
      }

      return { model, score };
    });

    // Sort descending and choose highest
    scoredModels.sort((a, b) => b.score - a.score);
    const recommendedModel = scoredModels[0]?.model || null;
    const modelScore = scoredModels[0]?.score || 0;

    // 2. Agent Scoring Logic (evaluated if autonomy is not 'single-llm')
    let recommendedAgent = null;
    let agentScore = 0;

    if (selectedAutonomy !== 'single-llm') {
      const scoredAgents = agents.map(agent => {
        let score = 0;

        // Domain keywords match in agent.bestFor (+3 points/match)
        const agentDomainKeywords = {
          'coding': ['coding', 'code', 'debugging', 'developer', 'engineering', 'software'],
          'research': ['research', 'analysis', 'document', 'reasoning', 'information', 'search'],
          'data-processing': ['data', 'processing', 'pipeline', 'etl', 'structured', 'ingest'],
          'content-creation': ['content', 'creation', 'writing', 'creative', 'blog'],
          'customer-support': ['support', 'customer', 'chat', 'conversational', 'assistant', 'faq']
        };

        const keywords = agentDomainKeywords[selectedDomain] || [];
        let domainMatches = 0;
        if (Array.isArray(agent.bestFor)) {
          agent.bestFor.forEach(item => {
            const itemLower = item.toLowerCase();
            const matches = keywords.some(kw => itemLower.includes(kw));
            if (matches) domainMatches++;
          });
        }
        score += domainMatches * 3;

        // Complexity matching (+3 for advanced/complex, +2 for beginner/simple)
        if (selectedComplexity === 'complex' && agent.complexity === 'advanced') {
          score += 3;
        } else if (selectedComplexity === 'simple' && agent.complexity === 'beginner') {
          score += 2;
        }

        // Autonomy matching (+3 for autonomous/advanced, +4 for human-in-loop if agent features mention 'human-in-the-loop')
        if (selectedAutonomy === 'autonomous-agent' && agent.complexity === 'advanced') {
          score += 3;
        }

        if (selectedAutonomy === 'human-in-loop' && Array.isArray(agent.features)) {
          const hasHumanInLoop = agent.features.some(f => f.toLowerCase().includes('human-in-the-loop'));
          if (hasHumanInLoop) {
            score += 4;
          }
        }

        return { agent, score };
      });

      scoredAgents.sort((a, b) => b.score - a.score);
      recommendedAgent = scoredAgents[0]?.agent || null;
      agentScore = scoredAgents[0]?.score || 0;
    }

    return { model: recommendedModel, agent: recommendedAgent, modelScore, agentScore };
  };

  const { model, agent } = calculateRecommendations();

  // ── Reasoning and Tips Generators ────────────────────────
  const getModelReasoning = (modelObj) => {
    if (!modelObj) return '';
    const reasons = [];
    if (selectedDomain === 'coding') {
      reasons.push(`outstanding performance on software engineering and code generation tasks`);
    } else if (selectedDomain === 'research') {
      reasons.push(`exceptional reasoning, deep instruction-following, and broad knowledge synthesis capabilities`);
    } else if (selectedDomain === 'data-processing') {
      reasons.push(`stellar performance in processing structured variables and schema generation`);
    } else {
      reasons.push(`well-rounded performance across general reasoning requirements`);
    }

    if (modelObj.contextWindow === '1M tokens' || modelObj.contextWindow.includes('1M')) {
      reasons.push(`its massive 1M token context window, which is ideal for ingestion of full codebases or long documents`);
    }

    if (modelObj.speed === 'fast' && selectedComplexity === 'simple') {
      reasons.push(`very low latency processing speeds, fitting simple throughput demands perfectly`);
    }

    return `${modelObj.name} is recommended because of its ${reasons.join(', and ')}. It matches your budget tier (${modelObj.tier}) and delivers the performance required for your project.`;
  };

  const getAgentReasoning = (agentObj) => {
    if (!agentObj) return 'A direct LLM request-response architecture is recommended, bypassing extra framework overhead.';
    
    let reason = `${agentObj.name} is the optimal framework for this architecture. `;
    if (selectedAutonomy === 'autonomous-agent') {
      reason += `It supports advanced autonomous loops and self-correction flows. `;
    } else if (selectedAutonomy === 'human-in-loop') {
      reason += `It provides first-class support for human intervention, checkpoints, and manual state inspection. `;
    }

    if (selectedComplexity === 'complex') {
      reason += `Its orchestration capabilities easily scale to complex, nested workflows.`;
    } else {
      reason += `It matches your workflow without introducing unnecessary codebase complexity.`;
    }
    return reason;
  };

  const getModelTips = (modelObj) => {
    if (!modelObj) return [];
    const tips = [
      `Set the temperature parameter to 0.2 for analytical tasks or 0.7 for creative generation.`,
      `Structure outputs as schema-validated JSON to ensure reliability in production pipelines.`,
      `Leverage system instructions to enforce alignment and response guidelines explicitly.`
    ];
    if (modelObj.contextWindow.includes('1M') || modelObj.contextWindow.includes('200K')) {
      tips.push(`Organize complex input context (like docs, codebases) with clear XML tags for maximum recall.`);
    }
    return tips;
  };

  const getAgentTips = (agentObj) => {
    if (!agentObj) {
      return [
        `Write custom retry loops with exponential backoff to handle transient model errors.`,
        `Employ system prompts with strict instruction sets to keep the LLM focused on a single task.`,
        `Define clean validation functions (e.g. AST parses) to verify generated outputs automatically.`
      ];
    }
    const tips = [
      `Enforce a 'max_iterations' limit (e.g. 15-20) to prevent runaway agent execution loops.`,
      `Write descriptive tool docstrings; models rely on description text to select which tool to call.`,
      `Log all intermediate steps, thoughts, and tool actions to a persistent database for telemetry.`
    ];
    if (selectedAutonomy === 'human-in-loop') {
      tips.push(`Configure check-pointed persistence so the agent can resume seamlessly after human approval.`);
    }
    return tips;
  };

  // Progress calculations
  const progressPercent = step === 5 ? 100 : step * 25;

  return (
    <section id="section-wizard" className="section section-wizard">
      <h2 className="section-title">
        <span className="gradient-text">AI Strategy</span> Advisor
      </h2>
      <p className="section-subtitle">
        Find the perfect combination of Large Language Models and Agent Frameworks tailored to your unique project requirements.
      </p>

      <div className="wizard-container">
        {step < 5 && (
          <div className="wizard-header">
            <span className="wizard-step-indicator">Step {step} of 4</span>
          </div>
        )}

        <div className="wizard-progress">
          <div
            className="wizard-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* ── STEP 1: Task Domain ── */}
        <div className={`wizard-step ${step === 1 ? 'active' : ''}`}>
          <h3 className="wizard-step-title">Select Task Domain</h3>
          <p className="wizard-step-description">What is the primary focus area of your AI application?</p>
          <div className="wizard-options">
            {domains.map((dom) => (
              <button
                key={dom.id}
                type="button"
                className={`wizard-option ${selectedDomain === dom.id ? 'selected' : ''}`}
                onClick={() => setSelectedDomain(dom.id)}
              >
                <span className="wizard-option-icon">{dom.icon}</span>
                <span className="wizard-option-title">{dom.title}</span>
                <span className="wizard-option-desc">{dom.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── STEP 2: Complexity ── */}
        <div className={`wizard-step ${step === 2 ? 'active' : ''}`}>
          <h3 className="wizard-step-title">Determine Complexity</h3>
          <p className="wizard-step-description">How complex are the tasks the AI needs to handle?</p>
          <div className="wizard-options">
            {complexities.map((comp) => (
              <button
                key={comp.id}
                type="button"
                className={`wizard-option ${selectedComplexity === comp.id ? 'selected' : ''}`}
                onClick={() => setSelectedComplexity(comp.id)}
              >
                <span className="wizard-option-icon">{comp.icon}</span>
                <span className="wizard-option-title">{comp.title}</span>
                <span className="wizard-option-desc">{comp.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── STEP 3: Autonomy Level ── */}
        <div className={`wizard-step ${step === 3 ? 'active' : ''}`}>
          <h3 className="wizard-step-title">Select Autonomy Level</h3>
          <p className="wizard-step-description">How much independent decision-making should the AI possess?</p>
          <div className="wizard-options">
            {autonomyLevels.map((auto) => (
              <button
                key={auto.id}
                type="button"
                className={`wizard-option ${selectedAutonomy === auto.id ? 'selected' : ''}`}
                onClick={() => setSelectedAutonomy(auto.id)}
              >
                <span className="wizard-option-icon">{auto.icon}</span>
                <span className="wizard-option-title">{auto.title}</span>
                <span className="wizard-option-desc">{auto.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── STEP 4: Budget ── */}
        <div className={`wizard-step ${step === 4 ? 'active' : ''}`}>
          <h3 className="wizard-step-title">Specify Budget</h3>
          <p className="wizard-step-description">What is your cost tolerance for LLM API calls and execution?</p>
          <div className="wizard-options">
            {budgets.map((bud) => (
              <button
                key={bud.id}
                type="button"
                className={`wizard-option ${selectedBudget === bud.id ? 'selected' : ''}`}
                onClick={() => setSelectedBudget(bud.id)}
              >
                <span className="wizard-option-icon">{bud.icon}</span>
                <span className="wizard-option-title">{bud.title}</span>
                <span className="wizard-option-desc">{bud.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── STEP 5: Results ── */}
        <div className={`wizard-results ${step === 5 ? 'active' : ''}`}>
          <h3 className="wizard-step-title" style={{ marginBottom: '1.5rem' }}>Your Recommended Solution</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            
            {/* Recommended Model Card */}
            {model && (
              <div className="result-card">
                <div className="result-header">
                  <div className="result-icon">{model.icon || '🧠'}</div>
                  <div>
                    <span className="tag tag--violet" style={{ marginBottom: '0.25rem' }}>{model.provider}</span>
                    <h4 className="result-title">{model.name}</h4>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span className="tag tag--cyan">Context: {model.contextWindow}</span>
                  <span className="tag tag--pink">Speed: {model.speed}</span>
                  <span className="tag tag--emerald">Tier: {model.tier}</span>
                </div>
                <p className="result-reasoning">{getModelReasoning(model)}</p>
                
                <h5 style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>Key Strengths</h5>
                <ul className="result-tips" style={{ borderLeftColor: 'var(--color-success)' }}>
                  {model.strengths?.slice(0, 3).map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>

                <h5 style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '1.25rem' }}>Model Implementation Tips</h5>
                <ul className="result-tips">
                  {getModelTips(model).map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Agent Card */}
            <div className="result-card">
              <div className="result-header">
                <div className="result-icon">{agent ? (agent.icon || '👥') : '⚙️'}</div>
                <div>
                  <span className="tag tag--pink" style={{ marginBottom: '0.25rem' }}>
                    {agent ? (agent.type || 'framework') : 'Direct API'}
                  </span>
                  <h4 className="result-title">{agent ? agent.name : 'Single LLM Pattern'}</h4>
                </div>
              </div>
              {agent && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span className="tag tag--cyan">Complexity: {agent.complexity}</span>
                  <span className="tag tag--amber">
                    {agent.openSource ? 'Open Source' : 'Proprietary'}
                  </span>
                  <span className="tag tag--violet">
                    {agent.languages?.join(', ') || 'Language Agnostic'}
                  </span>
                </div>
              )}
              <p className="result-reasoning">{getAgentReasoning(agent)}</p>
              
              {agent && agent.features && (
                <>
                  <h5 style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>Key Features</h5>
                  <ul className="result-tips" style={{ borderLeftColor: 'var(--color-success)' }}>
                    {agent.features.slice(0, 3).map((fe, i) => (
                      <li key={i}>{fe}</li>
                    ))}
                  </ul>
                </>
              )}

              <h5 style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '1.25rem' }}>
                {agent ? 'Framework Integration Tips' : 'Integration Guidelines'}
              </h5>
              <ul className="result-tips">
                {getAgentTips(agent).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Navigation Buttons ── */}
        <div className="wizard-nav">
          {step > 1 ? (
            <button type="button" className="btn btn-secondary" onClick={handlePrev}>
              ← Back
            </button>
          ) : (
            <div></div> // Spacing placeholder
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" onClick={handleRestart}>
              Restart
            </button>
            {step < 4 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                Next Step
              </button>
            ) : step === 4 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                View Recommendations
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
