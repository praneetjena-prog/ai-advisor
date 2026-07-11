import React, { useState } from 'react';

export default function PromptOptimizer({ models = [] }) {
  const [task, setTask] = useState('');
  const [model, setModel] = useState('');
  const [complexity, setComplexity] = useState('moderate');
  const [format, setFormat] = useState('system-prompt');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!task.trim()) {
      setError('Please describe your task.');
      return;
    }
    if (!model) {
      setError('Please select a target model.');
      return;
    }

    setError('');
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task,
          model,
          complexity,
          format
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to optimize prompt. Please try again.');
      }

      const data = await response.json();
      setOutput(data.output || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch((err) => {
      console.error('Failed to copy to clipboard', err);
    });
  };

  return (
    <section id="section-prompt-builder" className="section section-prompt-builder">
      <h2 className="section-title">
        <span className="gradient-text">Prompt</span> Optimizer
      </h2>
      <p className="section-subtitle">
        Generate optimized system prompts and configuration templates tailored to your specific model and task.
      </p>

      <div className="pb-form">
        <div className="pb-field pb-field-full">
          <label className="pb-label" htmlFor="pb-task">Describe Your Task</label>
          <textarea
            id="pb-task"
            className="pb-textarea"
            placeholder="e.g., Build an agent that reviews pull requests and suggests improvements..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
        </div>
        
        <div className="pb-field">
          <label className="pb-label" htmlFor="pb-model">Target Model</label>
          <select
            id="pb-model"
            className="pb-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            aria-label="Select target model"
          >
            <option value="">Select a model...</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.provider})
              </option>
            ))}
          </select>
        </div>

        <div className="pb-field">
          <label className="pb-label" htmlFor="pb-complexity">Complexity</label>
          <select
            id="pb-complexity"
            className="pb-select"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            aria-label="Select complexity level"
          >
            <option value="simple">Simple</option>
            <option value="moderate">Moderate</option>
            <option value="complex">Complex</option>
          </select>
        </div>

        <div className="pb-field">
          <label className="pb-label" htmlFor="pb-format">Output Format</label>
          <select
            id="pb-format"
            className="pb-select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            aria-label="Select output format"
          >
            <option value="system-prompt">System Prompt</option>
            <option value="config">Configuration Template</option>
            <option value="full">Full Setup (Prompt + Config)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="pb-error" style={{ color: 'var(--color-danger)', marginBottom: '1.5rem', fontWeight: 600 }}>
          ⚠️ {error}
        </div>
      )}

      <button
        id="pb-generate"
        className="btn btn-primary btn-lg"
        onClick={handleGenerate}
        disabled={loading}
        aria-label="Generate optimized prompt"
      >
        {loading ? '⚡ Generating...' : '⚡ Generate Optimized Prompt'}
      </button>

      <div 
        className={`pb-output-container glass-card ${output ? 'active' : ''}`}
        id="pb-output-container"
        style={{ marginTop: '2rem' }}
      >
        <div className="pb-output-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>Generated Output</h3>
          <button 
            id="pb-copy" 
            className={`copy-btn ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
            aria-label="Copy generated output to clipboard"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
        <pre id="pb-output">{output}</pre>
      </div>
    </section>
  );
}
