document.addEventListener('DOMContentLoaded', () => {
  const data = window.AIAdvisorData;

  /* ========================================================================
     1. NAVIGATION & SCROLL
     ======================================================================== */

  // Smooth scroll on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile nav if open
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });

  // Active nav link tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => navObserver.observe(s));

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.toggle('open');
    });
  }

  // Sticky nav shadow on scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ========================================================================
     2. HERO
     ======================================================================== */

  const heroBtn = document.getElementById('hero-start-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      document.getElementById('section-advisor')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ========================================================================
     3. WIZARD LOGIC
     ======================================================================== */

  const wizardState = { currentStep: 1, answers: {} };
  const STEP_KEYS = { 1: 'domain', 2: 'complexity', 3: 'autonomy', 4: 'budget' };

  const wizardSteps    = document.querySelectorAll('.wizard-step');
  const prevBtn        = document.getElementById('wizard-prev');
  const nextBtn        = document.getElementById('wizard-next');
  const progressFill   = document.getElementById('wizard-progress-fill');
  const stepIndicator  = document.getElementById('wizard-step-indicator');
  const resultsContainer = document.getElementById('wizard-results');
  const restartBtn     = document.getElementById('wizard-restart');

  // Option click delegation
  document.querySelectorAll('.wizard-step').forEach(step => {
    step.addEventListener('click', e => {
      const option = e.target.closest('.wizard-option');
      if (!option) return;
      step.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      const key = STEP_KEYS[wizardState.currentStep];
      if (key) wizardState.answers[key] = option.dataset.value;
    });
    // Keyboard accessibility for wizard options
    step.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const option = e.target.closest('.wizard-option');
        if (option) { e.preventDefault(); option.click(); }
      }
    });
  });

  function updateWizardUI() {
    const step = wizardState.currentStep;
    wizardSteps.forEach((el, i) => {
      el.style.display = (i === step - 1) ? '' : 'none';
    });
    if (progressFill) progressFill.style.width = `${(Math.min(step, 4) / 4) * 100}%`;
    if (stepIndicator) stepIndicator.textContent = step <= 4 ? `Step ${step} of 4` : 'Results';
    if (prevBtn) prevBtn.style.display = step > 1 && step <= 4 ? '' : 'none';
    if (nextBtn) nextBtn.style.display = step <= 4 ? '' : 'none';
    if (restartBtn) restartBtn.style.display = step > 4 ? '' : 'none';
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const key = STEP_KEYS[wizardState.currentStep];
      if (key && !wizardState.answers[key]) {
        showToast('Please select an option before continuing.', 'warning');
        return;
      }
      wizardState.currentStep++;
      if (wizardState.currentStep > 4) renderWizardResults();
      updateWizardUI();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (wizardState.currentStep > 1) { wizardState.currentStep--; updateWizardUI(); }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      wizardState.currentStep = 1;
      wizardState.answers = {};
      wizardSteps.forEach(s => s.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected')));
      if (resultsContainer) resultsContainer.innerHTML = '';
      updateWizardUI();
    });
  }

  updateWizardUI();

  /* -- Recommendation Engine -- */

  function generateRecommendation() {
    const { domain, complexity, autonomy, budget } = wizardState.answers;
    const tierOrder = ['free', 'low', 'medium', 'high', 'enterprise'];

    // Score models
    const scoredModels = data.models.map(model => {
      let score = 0;
      // Domain matching
      if (Array.isArray(model.bestFor)) {
        model.bestFor.forEach(bf => {
          if (bf.toLowerCase().includes(domain)) score += 3;
        });
      }
      // Budget / tier matching
      const budgetIdx = tierOrder.indexOf(budget);
      const tierIdx   = tierOrder.indexOf(model.tier);
      if (budgetIdx !== -1 && tierIdx !== -1) {
        if (budgetIdx === tierIdx) score += 5;
        else if (Math.abs(budgetIdx - tierIdx) === 1) score += 2;
      }
      // Speed / complexity preference
      if (complexity === 'simple' && model.speed === 'fast') score += 3;
      if (complexity === 'complex' && (model.speed === 'medium' || model.speed === 'slow')) score += 2;
      return { ...model, score };
    }).sort((a, b) => b.score - a.score);

    // Score agents
    let recommendedAgent = null;
    if (autonomy !== 'single-llm') {
      const scoredAgents = data.agents.map(agent => {
        let score = 0;
        if (Array.isArray(agent.bestFor)) {
          agent.bestFor.forEach(bf => {
            if (bf.toLowerCase().includes(domain)) score += 3;
          });
        }
        if (complexity === 'complex' && agent.complexity === 'advanced') score += 3;
        if (complexity === 'simple' && agent.complexity === 'beginner') score += 2;
        if (autonomy === 'autonomous-agent' && agent.complexity === 'advanced') score += 3;
        if (autonomy === 'human-in-loop') {
          const hasHIL = (agent.features || []).some(f => /human.in.loop/i.test(f));
          if (hasHIL) score += 4;
        }
        return { ...agent, score };
      }).sort((a, b) => b.score - a.score);
      recommendedAgent = scoredAgents[0] || null;
    }

    const topModel = scoredModels[0];

    // Generate reasoning
    let reasoning = `Based on your focus on **${domain}** tasks with **${complexity}** complexity, `;
    reasoning += `a **${budget}** budget, and preference for **${autonomy.replace(/-/g, ' ')}** workflows, `;
    reasoning += `we recommend **${topModel.name}** by ${topModel.provider}. `;
    reasoning += `It excels at ${(topModel.bestFor || []).slice(0, 3).join(', ')} `;
    reasoning += `and offers ${topModel.speed} inference speed with ${topModel.pricing} pricing.`;
    if (recommendedAgent) {
      reasoning += ` Paired with **${recommendedAgent.name}**, you get a robust ${recommendedAgent.type} `;
      reasoning += `framework that handles ${(recommendedAgent.bestFor || []).slice(0, 2).join(' and ')}.`;
    }

    // Implementation tips
    const tips = [
      `Start with ${topModel.name}'s default parameters, then fine-tune temperature for your ${domain} use case.`,
      `Use structured output (JSON mode) for reliable parsing in production pipelines.`,
      `Implement exponential back-off retry logic to handle rate limits gracefully.`,
    ];
    if (recommendedAgent) {
      tips.push(`Integrate ${recommendedAgent.name} incrementally — begin with a single-agent setup before scaling to multi-agent.`);
      tips.push(`Add logging and observability early to debug agent decision chains.`);
    }

    return { model: topModel, agent: recommendedAgent, reasoning, tips };
  }

  function renderWizardResults() {
    const rec = generateRecommendation();
    if (!resultsContainer) return;

    let html = `
      <div class="result-card fade-in">
        <div class="result-header">
          <div class="result-icon">${rec.model.icon}</div>
          <div>
            <div class="result-title">Recommended Model: ${rec.model.name}</div>
            <div class="result-provider">${rec.model.provider}</div>
          </div>
        </div>
        <p class="result-reasoning">${rec.reasoning}</p>
        <div class="result-specs">
          <div class="tag tag--violet">Context: ${rec.model.contextWindow}</div>
          <div class="tag tag--pink">Speed: ${rec.model.speed}</div>
          <div class="tag tag--cyan">Pricing: ${rec.model.pricing}</div>
        </div>
        <div class="result-strengths">
          <strong>Strengths</strong>
          <ul>${(rec.model.strengths || []).map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
      </div>`;

    if (rec.agent) {
      html += `
      <div class="result-card fade-in">
        <div class="result-header">
          <div class="result-icon">${rec.agent.icon}</div>
          <div>
            <div class="result-title">Recommended Agent: ${rec.agent.name}</div>
            <div class="result-provider">${rec.agent.type}</div>
          </div>
        </div>
        <p class="result-reasoning">${rec.agent.description}</p>
        <div class="result-specs">
          <div class="tag tag--cyan">Complexity: ${rec.agent.complexity}</div>
          <div class="tag tag--pink">Open Source: ${rec.agent.openSource ? 'Yes' : 'No'}</div>
        </div>
        <div class="result-strengths">
          <strong>Key Features</strong>
          <ul>${(rec.agent.features || []).slice(0, 5).map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
      </div>`;
    }

    html += `
      <div class="result-card fade-in">
        <div class="result-header">
          <div class="result-icon">🚀</div>
          <div><div class="result-title">Implementation Tips</div></div>
        </div>
        <ul class="result-tips">${rec.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>`;

    resultsContainer.innerHTML = html;
  }

  /* ========================================================================
     4. DATABASE – Render Cards, Search, Filter, Compare
     ======================================================================== */

  const dbGrid       = document.getElementById('db-grid');
  const dbSearch     = document.getElementById('db-search');
  const compareBtn   = document.getElementById('compare-btn');
  const compareCount = document.getElementById('compare-count');
  const compareSet   = new Set();

  function renderDBCards(filter = 'all', query = '') {
    if (!dbGrid) return;
    const q = query.toLowerCase();

    const items = [
      ...data.models.map(m => ({ ...m, _type: 'model' })),
      ...data.agents.map(a => ({ ...a, _type: 'agent' })),
    ].filter(item => {
      if (filter !== 'all' && item._type !== filter) return false;
      if (q) {
        const haystack = [
          item.name, item.provider || '', item.type || '',
          item.description, ...(item.bestFor || []),
        ].join(' ').toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });

    dbGrid.innerHTML = items.map(item => {
      const colorTag = item._type === 'model' ? 'violet' : 'cyan';
      const label    = item._type === 'model' ? 'Model' : 'Agent';
      const statsHTML = item._type === 'model'
        ? `<span>📐 ${item.contextWindow}</span><span>⚡ ${item.speed}</span><span>💰 ${item.pricing}</span><span>🏷️ ${item.tier}</span>`
        : `<span>🧩 ${item.complexity}</span><span>🌐 ${(item.languages || []).slice(0, 3).join(', ')}</span><span>📖 ${item.openSource ? 'Open Source' : 'Proprietary'}</span>`;
      const checked = compareSet.has(`${item._type}:${item.id}`) ? 'checked' : '';

      return `
        <div class="model-card glass-card fade-in" data-type="${item._type}" data-id="${item.id}">
          <div class="model-card-header">
            <div>
              <div class="model-card-name">${item.icon} ${item.name}</div>
              <div class="model-card-provider">${item.provider || item.type}</div>
            </div>
            <span class="tag tag--${colorTag}">${label}</span>
          </div>
          <p class="model-card-desc">${item.description}</p>
          <div class="model-card-tags">
            ${(item.bestFor || []).map(t => `<span class="tag tag--pink">${t}</span>`).join('')}
          </div>
          <div class="model-card-stats">${statsHTML}</div>
          <div class="model-card-footer">
            <label class="compare-label">
              <input type="checkbox" class="compare-checkbox" data-id="${item.id}" data-type="${item._type}" ${checked}>
              Compare
            </label>
          </div>
        </div>`;
    }).join('');

    // Observe new cards for scroll animations
    dbGrid.querySelectorAll('.glass-card').forEach(c => animObserver.observe(c));
  }

  // Search handler
  if (dbSearch) {
    dbSearch.addEventListener('input', () => {
      const activeFilter = document.querySelector('.db-filter-btn.active')?.dataset.filter || 'all';
      renderDBCards(activeFilter, dbSearch.value);
    });
  }

  // Filter buttons
  document.querySelectorAll('.db-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.db-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDBCards(btn.dataset.filter, dbSearch?.value || '');
    });
  });

  // Compare checkbox delegation
  if (dbGrid) {
    dbGrid.addEventListener('change', e => {
      if (!e.target.classList.contains('compare-checkbox')) return;
      const key = `${e.target.dataset.type}:${e.target.dataset.id}`;
      if (e.target.checked) compareSet.add(key); else compareSet.delete(key);
      updateCompareButton();
    });
  }

  function updateCompareButton() {
    if (compareBtn) compareBtn.style.display = compareSet.size >= 2 ? '' : 'none';
    if (compareCount) compareCount.textContent = compareSet.size;
  }

  if (compareBtn) {
    compareBtn.addEventListener('click', openComparisonModal);
  }

  // Initial render
  renderDBCards();
  updateCompareButton();

  /* ========================================================================
     5. COMPARISON MODAL
     ======================================================================== */

  const comparisonModal = document.getElementById('comparison-modal');
  const comparisonClose = document.getElementById('comparison-modal-close');

  function openComparisonModal() {
    if (!comparisonModal) return;
    const items = [...compareSet].map(key => {
      const [type, id] = key.split(':');
      return type === 'model'
        ? { ...data.models.find(m => m.id === id), _type: 'model' }
        : { ...data.agents.find(a => a.id === id), _type: 'agent' };
    }).filter(Boolean);

    if (items.length < 2) { showToast('Select at least 2 items to compare.', 'warning'); return; }

    const fields = [
      { label: 'Provider / Type', fn: i => i.provider || i.type || '—' },
      { label: 'Description',     fn: i => i.description || '—' },
      { label: 'Context Window',  fn: i => i.contextWindow || '—' },
      { label: 'Pricing',         fn: i => i.pricing || '—' },
      { label: 'Speed',           fn: i => i.speed || '—' },
      { label: 'Best For',        fn: i => (i.bestFor || []).join(', ') || '—' },
      { label: 'Strengths',       fn: i => (i.strengths || []).join(', ') || '—' },
      { label: 'Weaknesses',      fn: i => (i.weaknesses || []).join(', ') || '—' },
      { label: 'Complexity',      fn: i => i.complexity || '—' },
      { label: 'Languages',       fn: i => (i.languages || []).join(', ') || '—' },
      { label: 'Open Source',     fn: i => i.openSource != null ? (i.openSource ? 'Yes' : 'No') : '—' },
      { label: 'Features',        fn: i => (i.features || []).join(', ') || '—' },
    ];

    const headerCells = items.map(i => `<th>${i.icon} ${i.name}</th>`).join('');
    const rows = fields.map(f => {
      const cells = items.map(i => `<td>${f.fn(i)}</td>`).join('');
      return `<tr><td class="compare-feature-label">${f.label}</td>${cells}</tr>`;
    }).join('');

    const tableHTML = `
      <table class="comparison-table">
        <thead><tr><th>Feature</th>${headerCells}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;

    const body = comparisonModal.querySelector('.modal-body') || comparisonModal;
    body.innerHTML = tableHTML;
    comparisonModal.classList.add('active');
  }

  function closeComparisonModal() {
    if (comparisonModal) comparisonModal.classList.remove('active');
  }

  if (comparisonClose) comparisonClose.addEventListener('click', closeComparisonModal);
  if (comparisonModal) {
    comparisonModal.addEventListener('click', e => {
      if (e.target === comparisonModal) closeComparisonModal();
    });
  }

  /* ========================================================================
     6. PLAYBOOKS
     ======================================================================== */

  const playbookContainer = document.getElementById('playbook-container');

  function renderPlaybook(category) {
    if (!playbookContainer) return;
    const pb = data.playbooks[category];
    if (!pb) return;

    let html = `
      <div class="playbook-header glass-card fade-in">
        <h3>${pb.title}</h3>
        <p>${pb.description}</p>
      </div>`;

    pb.steps.forEach((step, idx) => {
      const hasPython = step.code?.python;
      const hasJS     = step.code?.javascript;
      const pitfalls  = (step.pitfalls || []).map(p => `<li>⚠️ ${p}</li>`).join('');
      const tips      = (step.tips || []).map(t => `<li>💡 ${t}</li>`).join('');

      html += `
        <div class="playbook-step glass-card fade-in" data-step-index="${idx}">
          <div class="step-badge">Step ${idx + 1}</div>
          <h4>${step.title}</h4>
          <p>${step.description}</p>
          ${(hasPython || hasJS) ? `
          <div class="code-tabs">
            ${hasPython ? `<button class="code-tab active" data-lang="python">Python</button>` : ''}
            ${hasJS     ? `<button class="code-tab${!hasPython ? ' active' : ''}" data-lang="javascript">JavaScript</button>` : ''}
          </div>
          ${hasPython ? `<pre class="code-block" data-lang="python" style="display:block"><code>${escapeHTML(step.code.python)}</code></pre>` : ''}
          ${hasJS     ? `<pre class="code-block" data-lang="javascript" style="display:${hasPython ? 'none' : 'block'}"><code>${escapeHTML(step.code.javascript)}</code></pre>` : ''}
          <button class="copy-btn" data-step="${idx}">📋 Copy Code</button>` : ''}
          ${pitfalls ? `<ul class="pitfalls-list">${pitfalls}</ul>` : ''}
          ${tips     ? `<ul class="tips-list">${tips}</ul>` : ''}
        </div>`;
    });

    if (pb.errorPrevention) {
      html += `
        <div class="playbook-card glass-card fade-in">
          <h4>🛡️ Error Prevention</h4>
          <ul>${pb.errorPrevention.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>`;
    }
    if (pb.bestPractices) {
      html += `
        <div class="playbook-card glass-card fade-in">
          <h4>✅ Best Practices</h4>
          <ul>${pb.bestPractices.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>`;
    }

    playbookContainer.innerHTML = html;
    playbookContainer.querySelectorAll('.glass-card').forEach(c => animObserver.observe(c));
  }

  // Code tab switching (delegation)
  if (playbookContainer) {
    playbookContainer.addEventListener('click', e => {
      // Tab click
      const tab = e.target.closest('.code-tab');
      if (tab) {
        const step = tab.closest('.playbook-step');
        step.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const lang = tab.dataset.lang;
        step.querySelectorAll('.code-block').forEach(block => {
          block.style.display = block.dataset.lang === lang ? 'block' : 'none';
        });
        return;
      }
      // Copy button click
      const copyBtn = e.target.closest('.copy-btn');
      if (copyBtn) {
        const step = copyBtn.closest('.playbook-step');
        const visibleBlock = step.querySelector('.code-block[style*="display:block"], .code-block[style*="display: block"]') || step.querySelector('.code-block');
        if (visibleBlock) {
          navigator.clipboard.writeText(visibleBlock.textContent).then(() => {
            copyBtn.textContent = '✓ Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => { copyBtn.textContent = '📋 Copy Code'; copyBtn.classList.remove('copied'); }, 2000);
          });
        }
      }
    });
  }

  // Playbook category buttons
  document.querySelectorAll('.playbook-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.playbook-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPlaybook(btn.dataset.category);
    });
  });

  // Default playbook
  renderPlaybook('coding');

  /* ========================================================================
     7. PROMPT BUILDER
     ======================================================================== */

  const pbModelSelect   = document.getElementById('pb-model');
  const pbGenerate      = document.getElementById('pb-generate');
  const pbCopy          = document.getElementById('pb-copy');
  const pbOutput        = document.getElementById('pb-output');
  const pbOutputContainer = document.getElementById('pb-output-container');

  // Populate model select
  if (pbModelSelect) {
    data.models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.icon} ${m.name} (${m.provider})`;
      pbModelSelect.appendChild(opt);
    });
  }

  if (pbGenerate) {
    pbGenerate.addEventListener('click', () => {
      const task       = document.getElementById('pb-task')?.value.trim();
      const modelId    = pbModelSelect?.value;
      const complexity = document.getElementById('pb-complexity')?.value || 'medium';
      const format     = document.getElementById('pb-format')?.value || 'system-prompt';

      if (!task) { showToast('Please describe your task first.', 'warning'); return; }

      const model = data.models.find(m => m.id === modelId) || data.models[0];
      let output = '';

      if (format === 'system-prompt' || format === 'full') {
        output += generateSystemPrompt(task, model, complexity);
      }
      if (format === 'config' || format === 'full') {
        if (output) output += '\n\n' + '─'.repeat(60) + '\n\n';
        output += generateConfig(task, model, complexity);
      }

      if (pbOutput) pbOutput.textContent = output;
      if (pbOutputContainer) pbOutputContainer.classList.add('active');
      showToast('Prompt generated successfully!', 'success');
    });
  }

  if (pbCopy) {
    pbCopy.addEventListener('click', () => {
      if (pbOutput) {
        navigator.clipboard.writeText(pbOutput.textContent).then(() => {
          showToast('Copied to clipboard!', 'success');
        });
      }
    });
  }

  function generateSystemPrompt(task, model, complexity) {
    const depth = complexity === 'simple' ? 'concise' : complexity === 'complex' ? 'highly detailed and exhaustive' : 'thorough';
    return [
      `# System Prompt — ${model.name} (${model.provider})`,
      ``,
      `## Role`,
      `You are an expert AI assistant specialized in: ${task}.`,
      `You leverage the capabilities of ${model.name}, which excels at ${(model.bestFor || []).join(', ')}.`,
      ``,
      `## Core Instructions`,
      `1. Provide ${depth} responses tailored to the user's request.`,
      `2. Always structure output clearly with headings, bullet points, or numbered steps.`,
      `3. When generating code, include comments explaining each significant block.`,
      `4. If the request is ambiguous, ask a clarifying question before proceeding.`,
      `5. Prioritize accuracy over speed; verify facts and logic carefully.`,
      ``,
      `## Output Format`,
      `- Use Markdown formatting for readability.`,
      `- For code: use fenced code blocks with the correct language identifier.`,
      `- For data: use tables or JSON as appropriate.`,
      `- Conclude each response with a brief "Next Steps" section when applicable.`,
      ``,
      `## Constraints & Safety`,
      `- Never fabricate sources or data. Clearly state when you are uncertain.`,
      `- Respect rate limits: keep responses within ${model.contextWindow} context window.`,
      `- Do not produce harmful, biased, or misleading content.`,
      `- Follow the principle of least surprise — be predictable and consistent.`,
      ``,
      `## Error Handling`,
      `- If the input is malformed or missing required fields, respond with a structured error:`,
      `  { "error": "<type>", "message": "<human-readable description>", "suggestion": "<fix>" }`,
      `- For multi-step tasks, checkpoint progress and report partial results on failure.`,
      ``,
      `## Validation Rules`,
      `- All generated code must be syntactically valid.`,
      `- JSON output must conform to the schema provided by the user.`,
      `- Numerical results should include units and precision context.`,
      ``,
      `## Model-Specific Optimizations (${model.name})`,
      `- Strengths to leverage: ${(model.strengths || []).join('; ')}.`,
      `- Known limitations to mitigate: ${(model.weaknesses || []).join('; ')}.`,
      `- Recommended temperature: ${complexity === 'simple' ? '0.3' : complexity === 'complex' ? '0.7' : '0.5'} for this task type.`,
      ``,
      `## Task Context`,
      `"${task}"`,
    ].join('\n');
  }

  function generateConfig(task, model, complexity) {
    const temp = complexity === 'simple' ? 0.3 : complexity === 'complex' ? 0.7 : 0.5;
    const maxTokens = complexity === 'simple' ? 1024 : complexity === 'complex' ? 8192 : 4096;
    const config = {
      model: { id: model.id, provider: model.provider, name: model.name },
      parameters: { temperature: temp, max_tokens: maxTokens, top_p: 0.95, frequency_penalty: 0.1, presence_penalty: 0.05 },
      context: { system_prompt_file: './prompts/system.md', task_description: task },
      tools: { enabled: complexity !== 'simple', definitions_path: './tools/', max_tool_calls: complexity === 'complex' ? 10 : 5 },
      retry: { max_retries: 3, backoff_base_ms: 500, backoff_multiplier: 2 },
      safety: { content_filter: true, max_context_usage: 0.85 },
      logging: { level: 'info', output: './logs/run.jsonl' },
    };
    return `// Configuration Template for ${model.name}\n` + JSON.stringify(config, null, 2);
  }

  /* ========================================================================
     8. TOAST NOTIFICATION SYSTEM
     ======================================================================== */

  function getToastIcon(type) {
    const icons = { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️' };
    return icons[type] || icons.info;
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span>${getToastIcon(type)}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ========================================================================
     9. INTERSECTION OBSERVER FOR ANIMATIONS
     ======================================================================== */

  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.glass-card').forEach(card => animObserver.observe(card));

  /* ========================================================================
     10. KEYBOARD SHORTCUTS
     ======================================================================== */

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeComparisonModal();
  });

  /* ========================================================================
     UTILITY
     ======================================================================== */

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
