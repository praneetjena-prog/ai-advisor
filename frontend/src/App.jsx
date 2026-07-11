import React, { useState, useEffect, useMemo } from 'react';
import AgentSimulator from './components/AgentSimulator';

// Static local fallback datasets matching data_store.py structure
const FALLBACK_DATA = {
  models: [
    {
      "id": "gemini-35-pro",
      "name": "Gemini 3.5 Pro",
      "provider": "Google",
      "description": "Google's latest reasoning flagship. Designed for extreme reasoning tasks, coding operations, and long-context understanding with a 2M+ context window.",
      "contextWindow": "2M tokens",
      "pricing": "$1.50 / $12.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Flagship reasoning", "Multi-file coding", "Massive repository parsing", "Multimodal inputs"],
      "strengths": ["Advanced logic capability", "Industry leading 2M context window", "Strong multimodal grounding"],
      "weaknesses": ["Higher latency than Flash variants", "Higher relative cost"],
      "tier": "high",
      "icon": "🧠"
    },
    {
      "id": "gemini-35-flash",
      "name": "Gemini 3.5 Flash",
      "provider": "Google",
      "description": "Google's premium production-tier model. Delivers frontier-level reasoning scores at the pricing and execution speed of Flash models.",
      "contextWindow": "2M tokens",
      "pricing": "$0.075 / $0.30 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Agentic workflows", "High-frequency API loops", "Interactive coding assistant", "Fast parsing"],
      "strengths": ["Frontier speed/intelligence balance", "Affordable pricing", "Massive 2M context window"],
      "weaknesses": ["Slightly lower reasoning depth than Pro on complex logic"],
      "tier": "low",
      "icon": "⚡"
    },
    {
      "id": "gemini-31-pro",
      "name": "Gemini 3.1 Pro",
      "provider": "Google",
      "description": "Google's stable Reasoning Core model, highly optimized for deep coding tasks and multi-agent planning loops.",
      "contextWindow": "1.5M tokens",
      "pricing": "$1.25 / $10.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Multi-agent loops", "Complex coding & tests", "Data schema design"],
      "strengths": ["Excellent structured instructions", "Consistent output schema integration"],
      "weaknesses": ["Older than 3.5 Pro variant"],
      "tier": "medium",
      "icon": "🤖"
    },
    {
      "id": "gemini-31-flash-lite",
      "name": "Gemini 3.1 Flash-Lite",
      "provider": "Google",
      "description": "Google's ultra-light, ultra-fast model built for micro-tasks, categorization, and massive batch classification runs.",
      "contextWindow": "1M tokens",
      "pricing": "$0.03 / $0.12 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Micro-tasks", "Text classification", "Metadata extraction", "Simple search filtering"],
      "strengths": ["Extremely low cost", "Sub-second response latencies"],
      "weaknesses": ["Poor multi-step reasoning capabilities"],
      "tier": "low",
      "icon": "✨"
    },
    {
      "id": "gemini-25-pro",
      "name": "Gemini 2.5 Pro",
      "provider": "Google",
      "description": "Google's stable 2.5 generation model with a 1M token context window. Strong at general coding, data pipelines, and research.",
      "contextWindow": "1M tokens",
      "pricing": "$1.25 / $10.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Complex reasoning", "Coding & debugging", "Long-document analysis"],
      "strengths": ["Balanced 1M token context window", "Strong coding capabilities"],
      "weaknesses": ["Outperformed by Gemini 3.5 Pro"],
      "tier": "medium",
      "icon": "🦾"
    },
    {
      "id": "gemini-25-flash",
      "name": "Gemini 2.5 Flash",
      "provider": "Google",
      "description": "Google's efficient 2.5 generation model. Great for fast prototypes, standard chat, and general text processing.",
      "contextWindow": "1M tokens",
      "pricing": "$0.15 / $0.60 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Fast prototyping", "Chat applications", "Real-time processing"],
      "strengths": ["High speed", "Cost-effective", "1M context window"],
      "weaknesses": ["Outperformed by Gemini 3.5 Flash"],
      "tier": "low",
      "icon": "💡"
    },
    {
      "id": "claude-fable-5",
      "name": "Claude Fable 5",
      "provider": "Anthropic",
      "description": "Anthropic's latest frontier model designed specifically for long-running, autonomous agentic operations and creative reasoning.",
      "contextWindow": "1M tokens",
      "pricing": "$10.00 / $50.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Long-running agents", "Complex workflows", "Creative analysis", "Codebase generation"],
      "strengths": ["Exceptional agentic planning", "Large 1M context window", "Strong safety guardrails"],
      "weaknesses": ["High API pricing", "Slower response times compared to Sonnet"],
      "tier": "high",
      "icon": "🎭"
    },
    {
      "id": "claude-sonnet-5",
      "name": "Claude Sonnet 5",
      "provider": "Anthropic",
      "description": "Anthropic's newly balanced model. Acts as the default standard for performance, combining frontier logic with mid-range API pricing.",
      "contextWindow": "1M tokens",
      "pricing": "$2.50 / $12.50 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Balanced coding", "Text synthesis", "API parsing", "Standard tools integrations"],
      "strengths": ["Frontier-level code completion", "Highly stable tool calling"],
      "weaknesses": ["Context window smaller than Gemini on massive uploads"],
      "tier": "medium",
      "icon": "🌟"
    },
    {
      "id": "claude-opus-48",
      "name": "Claude Opus 4.8",
      "provider": "Anthropic",
      "description": "Anthropic's flagship workspace model featuring Adaptive Thinking logic, dynamically adjusting reasoning effort based on task complexity.",
      "contextWindow": "500K tokens",
      "pricing": "$12.00 / $60.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Complex agentic coding", "Logic puzzles", "Multi-layered reasoning", "High precision workflows"],
      "strengths": ["Adaptive Thinking reasoning depth", "High comprehension safety"],
      "weaknesses": ["Expensive", "Context window smaller than Claude 5"],
      "tier": "high",
      "icon": "💎"
    },
    {
      "id": "claude-sonnet-4",
      "name": "Claude Sonnet 4",
      "provider": "Anthropic",
      "description": "Anthropic's older generation model. Remains stable for legacy agentic integrations and standard document summarization.",
      "contextWindow": "200K tokens",
      "pricing": "$3.00 / $15.00 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Balanced coding tasks", "Legacy pipeline operations", "Creative writing"],
      "strengths": ["Stable output format", "Great cost/performance ratio"],
      "weaknesses": ["Small context window compared to new models"],
      "tier": "medium",
      "icon": "💫"
    },
    {
      "id": "claude-haiku-45",
      "name": "Claude Haiku 4.5",
      "provider": "Anthropic",
      "description": "Anthropic's latest high-speed, cost-efficient model. Ideal for sub-second classification and high-frequency tool queries.",
      "contextWindow": "200K tokens",
      "pricing": "$0.25 / $1.25 per 1M tokens",
      "speed": "fast",
      "bestFor": ["High-frequency tool calling", "Text classification", "Summarization"],
      "strengths": ["Extremely low latencies", "Low API cost"],
      "weaknesses": ["Poor reasoning on deep mathematical logic"],
      "tier": "low",
      "icon": "🪁"
    },
    {
      "id": "claude-opus-4",
      "name": "Claude Opus 4",
      "provider": "Anthropic",
      "description": "Anthropic's legacy flagship model, noted for deep analytical comprehension and strong coding structure.",
      "contextWindow": "200K tokens",
      "pricing": "$15.00 / $75.00 per 1M tokens",
      "speed": "slow",
      "bestFor": ["Analytical reasoning", "Code structuring", "Historical review"],
      "strengths": ["Strong logic comprehension", "Safe output generation"],
      "weaknesses": ["Extremely expensive", "Outperformed by Fable 5"],
      "tier": "high",
      "icon": "🕯️"
    },
    {
      "id": "gpt-4-1",
      "name": "GPT-4.1",
      "provider": "OpenAI",
      "description": "OpenAI's strong instruction-following model with an expanded context window. Superb at systematic task execution and programming.",
      "contextWindow": "1M tokens",
      "pricing": "$2.00 / $8.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Instruction following", "Coding & code review", "Systematic planning", "Long-context tasks"],
      "strengths": ["Excellent structured format output", "Highly stable tool calling", "Consistent output formatting"],
      "weaknesses": ["Less creative expression than Claude", "Expensive on huge outputs"],
      "tier": "medium",
      "icon": "🎯"
    },
    {
      "id": "gpt-4-1-mini",
      "name": "GPT-4.1 Mini",
      "provider": "OpenAI",
      "description": "OpenAI's lightweight model optimized for high-volume tasks. Offers high speed and low cost for classification and quick prototyping.",
      "contextWindow": "1M tokens",
      "pricing": "$0.40 / $1.60 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Cost-effective scaling", "Summarization", "Classification", "Quick prototyping"],
      "strengths": ["Very affordable", "Fast execution speeds", "1M context support"],
      "weaknesses": ["Lower reasoning capability for multi-step logic"],
      "tier": "low",
      "icon": "🎈"
    },
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "provider": "OpenAI",
      "description": "OpenAI's flagship multimodal model, highly optimized for real-time applications and complex multimedia asset parsing.",
      "contextWindow": "128K tokens",
      "pricing": "$2.50 / $10.00 per 1M tokens",
      "speed": "fast",
      "bestFor": ["Multimodal tasks", "Image & document parsing", "Real-time chat", "API orchestrations"],
      "strengths": ["Industry-leading image parsing", "Fast processing speed", "Strong standard reasoning"],
      "weaknesses": ["Context window is smaller compared to Gemini"],
      "tier": "medium",
      "icon": "👁️"
    },
    {
      "id": "llama-4-maverick",
      "name": "Llama 4 Maverick",
      "provider": "Meta",
      "description": "Meta's flagship open-weights model. Offers competitive logic reasoning and complete deployment control for privacy-centric local environments.",
      "contextWindow": "1M tokens",
      "pricing": "Free (Open Weights)",
      "speed": "medium",
      "bestFor": ["Self-hosted deployments", "Data privacy", "Fine-tuning", "Custom configurations"],
      "strengths": ["Fully open-weights", "Completely custom configurations", "No vendor API lock-in"],
      "weaknesses": ["Requires self-hosted infrastructure", "Lower support resources"],
      "tier": "free",
      "icon": "🦙"
    },
    {
      "id": "deepseek-r1",
      "name": "DeepSeek R1",
      "provider": "DeepSeek",
      "description": "Open-weights reasoning model with a transparent chain-of-thought process. Excels at mathematics, logic, and scientific problem-solving.",
      "contextWindow": "128K tokens",
      "pricing": "$0.55 / $2.19 per 1M tokens",
      "speed": "slow",
      "bestFor": ["Mathematical reasoning", "Scientific analysis", "Complex problem-solving", "Logic verification"],
      "strengths": ["Exceptional logic reasoning", "Affordable pricing", "Visible chain-of-thought"],
      "weaknesses": ["Slower response times due to CoT", "Less polished general conversation"],
      "tier": "low",
      "icon": "🧠"
    },
    {
      "id": "mistral-large",
      "name": "Mistral Large",
      "provider": "Mistral AI",
      "description": "Mistral AI's premier European model. Specifically fine-tuned for multilingual logic parsing and strict compliance standards.",
      "contextWindow": "128K tokens",
      "pricing": "$2.00 / $6.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Multilingual tasks", "European compliance", "Code generation", "Entity extraction"],
      "strengths": ["Superb French/German/Spanish logic", "EU compliance friendly", "Strong base capabilities"],
      "weaknesses": ["Smaller developer ecosystem", "Slower API update cycles"],
      "tier": "medium",
      "icon": "🇫🇷"
    },
    {
      "id": "grok-3",
      "name": "Grok 3",
      "provider": "xAI",
      "description": "xAI's latest model designed with real-time access to information and strong mathematical reasoning skills.",
      "contextWindow": "128K tokens",
      "pricing": "$3.00 / $15.00 per 1M tokens",
      "speed": "medium",
      "bestFor": ["Real-time data research", "Mathematical tasks", "Creative problem solving", "Conversational AI"],
      "strengths": ["Access to real-time search corpus", "Strong math & logic score", "Witty conversational mode"],
      "weaknesses": ["Smaller developer integrations library", "Higher billing tier"],
      "tier": "medium",
      "icon": "🛸"
    }
  ],
  agents: [
    {
      "id": "langgraph",
      "name": "LangGraph",
      "type": "framework",
      "description": "A framework by LangChain for building stateful, multi-actor applications with LLMs. Ideal for creating cyclical agentic architectures.",
      "bestFor": ["Stateful multi-step workflows", "Complex chains", "Tool use", "Cyclic graphs"],
      "features": ["Graph-based workflows", "State management", "Streaming support", "Human-in-the-loop validation"],
      "languages": ["Python", "JavaScript"],
      "complexity": "advanced",
      "openSource": true,
      "link": "https://github.com/langchain-ai/langgraph",
      "icon": "🕸️"
    },
    {
      "id": "crewai",
      "name": "CrewAI",
      "type": "framework",
      "description": "A framework for orchestrating role-playing, autonomous AI agents. Promotes collaborative intelligence to perform complex tasks.",
      "bestFor": ["Multi-agent collaboration", "Role-based teams", "Complex workflows"],
      "features": ["Role-based agents", "Task delegation", "Sequential/parallel execution", "Agent memory"],
      "languages": ["Python"],
      "complexity": "intermediate",
      "openSource": true,
      "link": "https://github.com/crewAIInc/crewAI",
      "icon": "👥"
    },
    {
      "id": "smolagents",
      "name": "Smolagents",
      "type": "framework",
      "description": "A lightweight agent library by HuggingFace. Focuses on code-based tool calling where agents write Python snippets to invoke tools.",
      "bestFor": ["Lightweight agents", "Code-based tool calling", "Simple setups"],
      "features": ["Python code writing agents", "Minimalist abstractions", "Multi-model support"],
      "languages": ["Python"],
      "complexity": "beginner",
      "openSource": true,
      "link": "https://github.com/huggingface/smolagents",
      "icon": "🔬"
    }
  ],
  playbooks: {
    coding: {
      title: "Build a Coding Agent",
      description: "Learn to construct an autonomous software engineer that writes, tests, and refactors code using tool feedback loops.",
      steps: [
        {
          title: "Set Up Environment & Dependencies",
          description: "Install required packages and set up your API credentials.",
          code: {
            python: 'import os\n# Install: pip install smolagents\nfrom smolagents import CodeAgent, LiteLLMModel\n\nos.environ["GEMINI_API_KEY"] = "your-api-key-here"\nmodel = LiteLLMModel("gemini/gemini-2.5-pro")',
            javascript: '// Install: npm install @google/genai\nconst { GoogleGenAI } = require("@google/genai");\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });'
          },
          pitfalls: ["Do not hardcode API keys directly in source files.", "Ensure correct package names are installed (e.g. smolagents vs smol-agents)."],
          tips: ["Use a .env file loaded via dotenv/python-dotenv.", "Lock package versions in requirements.txt or package.json."]
        },
        {
          title: "Implement Tool Definitions",
          description: "Provide the agent with tools to interact with the system.",
          code: {
            python: 'from smolagents import tool\n\n@tool\ndef read_file(filepath: str) -> str:\n    """Reads a file\'s contents.\n    Args:\n        filepath: The path to the file\n    """\n    with open(filepath, "r") as f:\n        return f.read()',
            javascript: 'const fs = require("fs");\n\nfunction readFile(filepath) {\n  return fs.readFileSync(filepath, "utf-8");\n}'
          },
          pitfalls: ["Agents can crash if tools lack detailed docstrings or parameter type annotations.", "Unsafe tool calls can cause file destruction."],
          tips: ["Always define clean, precise descriptions for every parameter.", "Enforce path safety restrictions (e.g., prevent directory traversal)."]
        }
      ],
      errorPrevention: [
        "Always sandbox code execution tools using Docker or secure environments.",
        "Implement a maximum loop limit to prevent run-away infinite loops."
      ],
      bestPractices: [
        "Write granular unit tests that the agent can run to verify its own edits.",
        "Use models with high reasoning capabilities (like Gemini 2.5 Pro or Claude Sonnet) for code generation."
      ]
    },
    research: {
      title: "Build a Research Agent",
      description: "Construct an agent that browses sources, extracts data, and compiles structured research reports.",
      steps: [
        {
          title: "Set Up Sources",
          description: "Initialize search and document loaders.",
          code: {
            python: '# pip install duckduckgo-search\nfrom duckduckgo_search import DDGS\n\ndef search_web(query: str, max_results: int = 5):\n    with DDGS() as ddgs:\n        return [r for r in ddgs.text(query, max_results=max_results)]',
            javascript: '// Using ddg-web-search or custom API\nconst { search } = require("duck-duck-scrape");\n\nasync function searchWeb(query) {\n  return await search(query);\n}'
          },
          pitfalls: ["Overwhelming the model with too much raw HTML.", "Search rate limits causing unhandled exceptions."],
          tips: ["Filter and clean HTML tags before feeding content to the LLM.", "Implement exponential backoff retry logic for search APIs."]
        }
      ],
      errorPrevention: [
        "Parse and validate markdown output formats to ensure citations are present.",
        "Cross-validate search results across multiple search engine queries."
      ],
      bestPractices: [
        "Use parallel agent queries for different subtopics to speed up reports.",
        "Always prompt the agent to explicitly state when it cannot find reliable sources."
      ]
    }
  }
};

function App() {
  const [models, setModels] = useState(FALLBACK_DATA.models);
  const [agents, setAgents] = useState(FALLBACK_DATA.agents);
  const [playbooks, setPlaybooks] = useState(FALLBACK_DATA.playbooks);
  
  const [view, setView] = useState('home'); // 'home' | 'dashboard'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'advisor' | 'database' | 'playbooks' | 'prompt' | 'simulator'
  
  const [toasts, setToasts] = useState([]);
  const [compareSet, setCompareSet] = useState(new Set());
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Fetch datasets from backend on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mRes = await fetch('/api/models');
        if (mRes.ok) {
          const mData = await mRes.json();
          setModels(mData);
        }
      } catch (err) {
        console.warn("Could not fetch models from backend, using fallback data.");
      }

      try {
        const aRes = await fetch('/api/agents');
        if (aRes.ok) {
          const aData = await aRes.json();
          setAgents(aData);
        }
      } catch (err) {
        console.warn("Could not fetch agents from backend, using fallback data.");
      }

      try {
        const pRes = await fetch('/api/playbooks');
        if (pRes.ok) {
          const pData = await pRes.json();
          setPlaybooks(prev => ({ ...prev, ...pData }));
        }
      } catch (err) {
        console.warn("Could not fetch playbooks from backend, using fallback data.");
      }
    };

    fetchData();
  }, []);

  // Key bindings for modal closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const handleRouteToDashboard = (tabName) => {
    setView('dashboard');
    setActiveTab(tabName);
    window.scrollTo({ top: 0 });
  };

  if (view === 'home') {
    return (
      <>
        <Header 
          view={view} 
          setView={setView} 
          setActiveTab={setActiveTab} 
          handleRoute={handleRouteToDashboard} 
          onSignUpClick={() => setIsSignUpOpen(true)}
        />
        
        <main style={{ marginTop: '70px' }}>
          <section id="section-hero" className="section section-hero" style={{ padding: '8rem 2rem' }}>
            <div className="hero-content">
              <div className="hero-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-primary-light)', border: '1px solid var(--glass-border)' }}>
                🚀 AI-Powered Recommendations
              </div>
              <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                Empower Your Organization <br />
                with <span className="gradient-text">Scalable AI Insights</span>
              </h1>
              <p className="hero-description text-center" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
                Drive efficiency and growth with our secure, professional advisor platform designed for enterprise AI agent selection and logic implementation.
              </p>
              
              <div className="hero-centered-cta" style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', marginTop: '0' }}>
                <button 
                  className="btn btn-secondary btn-lg" 
                  onClick={() => handleRouteToDashboard('database')}
                  style={{ padding: '1rem 2rem', borderRadius: '8px', fontWeight: 700, border: '2px solid rgba(255, 255, 255, 0.15)', background: 'transparent', color: 'var(--text-primary)' }}
                >
                  Request a Demo
                </button>
                <button 
                  className="btn btn-primary btn-lg" 
                  onClick={() => setIsSignUpOpen(true)}
                  style={{ padding: '1rem 2rem', borderRadius: '8px', fontWeight: 700, boxShadow: '0 0 15px var(--color-primary-glow)' }}
                >
                  Sign Up Free
                </button>
              </div>

              {/* Compatible technology provider strip in dark glassmorphism */}
              <div className="integration-strip">
                <span className="integration-label">INTEGRATES WITH</span>
                <div className="integration-logo-container">
                  <span className="integration-logo" onClick={() => handleRouteToDashboard('database')}>
                    <span>🪐</span> Google Gemini
                  </span>
                  <span className="integration-logo" onClick={() => handleRouteToDashboard('database')}>
                    <span>🍁</span> Anthropic Claude
                  </span>
                  <span className="integration-logo" onClick={() => handleRouteToDashboard('database')}>
                    <span>🟢</span> OpenAI GPT
                  </span>
                  <span className="integration-logo" onClick={() => handleRouteToDashboard('database')}>
                    <span>🦙</span> Meta Llama
                  </span>
                  <span className="integration-logo" onClick={() => handleRouteToDashboard('database')}>
                    <span>🧠</span> DeepSeek
                  </span>
                  <span className="integration-logo" onClick={() => handleRouteToDashboard('database')}>
                    <span>🌀</span> Mistral AI
                  </span>
                </div>
              </div>
              <p className="text-center" style={{
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                marginTop: '1rem',
                opacity: 0.65,
                letterSpacing: '0.3px'
              }}>
                * All product names, logos, and brands are property of their respective owners. All company, product, and service names used in this website are for identification purposes only.
              </p>
            </div>
            <div className="hero-orb hero-orb-1"></div>
            <div className="hero-orb hero-orb-2"></div>
          </section>

          {/* Features Grid Section on Home Page */}
          <section className="section" style={{ borderTop: '1px solid var(--glass-border)', padding: '5rem 2rem' }}>
            <h2 className="section-title text-center">Complete <span className="gradient-text">Agent Toolkit</span></h2>
            <p className="section-subtitle text-center">Explore all the capabilities built into your interactive workspace</p>
            
            <div className="shortcuts-grid" style={{ marginTop: '3.5rem' }}>
              <div className="glass-card shortcut-card" onClick={() => handleRouteToDashboard('advisor')}>
                <div className="shortcut-icon">🎯</div>
                <h3 className="shortcut-name">Smart Advisor Wizard</h3>
                <p className="shortcut-desc">Answer key questions about your task domain, complexity, and budget to get custom recommendations.</p>
                <div className="shortcut-arrow">Open Wizard →</div>
              </div>

              <div className="glass-card shortcut-card" onClick={() => handleRouteToDashboard('database')}>
                <div className="shortcut-icon">📊</div>
                <h3 className="shortcut-name">Model & Agent Database</h3>
                <p className="shortcut-desc">Browse, search, and filter leading models (Gemini, Claude, GPT) and frameworks with side-by-side comparisons.</p>
                <div className="shortcut-arrow">Explore Database →</div>
              </div>

              <div className="glass-card shortcut-card" onClick={() => handleRouteToDashboard('playbooks')}>
                <div className="shortcut-icon">📖</div>
                <h3 className="shortcut-name">Code Playbooks</h3>
                <p className="shortcut-desc">Step-by-step guides with robust, copy-pasteable Python and JavaScript boilerplate integrations.</p>
                <div className="shortcut-arrow">View Playbooks →</div>
              </div>

              <div className="glass-card shortcut-card" onClick={() => handleRouteToDashboard('simulator')}>
                <div className="shortcut-icon">🎮</div>
                <h3 className="shortcut-name">Live Agent Simulator</h3>
                <p className="shortcut-desc">Watch mock agent executions stream live logs, tool usage, errors, and self-corrections via SSE.</p>
                <div className="shortcut-arrow">Launch Simulator →</div>
              </div>

              <div className="glass-card shortcut-card" onClick={() => handleRouteToDashboard('prompt')}>
                <div className="shortcut-icon">⚡</div>
                <h3 className="shortcut-name">Prompt Optimizer</h3>
                <p className="shortcut-desc">Generate error-free system prompts and configuration templates optimized for specific models.</p>
                <div className="shortcut-arrow">Optimize Prompts →</div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <SignUpModal 
          isOpen={isSignUpOpen} 
          onClose={() => setIsSignUpOpen(false)} 
          onSuccess={() => handleRouteToDashboard('overview')} 
          showToast={showToast} 
        />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  // Render Dashboard View
  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">⚡ AI Advisor</div>
        <nav className="sidebar-menu">
          <button 
            className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="sidebar-link-icon">🏠</span>
            <span>Workspace Home</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'advisor' ? 'active' : ''}`}
            onClick={() => setActiveTab('advisor')}
          >
            <span className="sidebar-link-icon">🎯</span>
            <span>Advisor Wizard</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            <span className="sidebar-link-icon">📊</span>
            <span>Models & Agents</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'playbooks' ? 'active' : ''}`}
            onClick={() => setActiveTab('playbooks')}
          >
            <span className="sidebar-link-icon">📖</span>
            <span>Code Playbooks</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulator')}
          >
            <span className="sidebar-link-icon">🎮</span>
            <span>Agent Simulator</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'prompt' ? 'active' : ''}`}
            onClick={() => setActiveTab('prompt')}
          >
            <span className="sidebar-link-icon">⚡</span>
            <span>Prompt Builder</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={() => setView('home')}>
            <span className="sidebar-link-icon">←</span>
            <span>Exit to Home</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <h2 className="topbar-title">
            {activeTab === 'overview' && 'Workspace Overview'}
            {activeTab === 'advisor' && 'AI Advisor Wizard'}
            {activeTab === 'database' && 'AI Model & Agent Database'}
            {activeTab === 'playbooks' && 'Implementation Playbooks'}
            {activeTab === 'simulator' && 'Interactive Agent Simulator'}
            {activeTab === 'prompt' && 'Prompt Optimizer'}
          </h2>
          <div className="topbar-status">
            <span className="status-dot"></span>
            <span>Connected to API Server</span>
          </div>
        </header>

        <div className="dashboard-body">
          {activeTab === 'overview' && (
            <div className="overview-hub fade-in">
              <header className="overview-header">
                <h1 className="overview-title">Welcome to your AI Agent Workspace</h1>
                <p className="section-subtitle">Select a tool from the sidebar or choose a quick shortcut below to start building.</p>
              </header>

              <div className="overview-grid">
                <div className="glass-card overview-card">
                  <div className="overview-card-icon">🤖</div>
                  <div>
                    <div className="overview-card-value">{models.length}</div>
                    <div className="overview-card-label">Verified Models</div>
                  </div>
                </div>
                <div className="glass-card overview-card">
                  <div className="overview-card-icon pink">👥</div>
                  <div>
                    <div className="overview-card-value">{agents.length}</div>
                    <div className="overview-card-label">Agent Frameworks</div>
                  </div>
                </div>
                <div className="glass-card overview-card">
                  <div className="overview-card-icon cyan">📖</div>
                  <div>
                    <div className="overview-card-value">5</div>
                    <div className="overview-card-label">Structured Playbooks</div>
                  </div>
                </div>
              </div>

              <div className="shortcuts-section">
                <h3 className="shortcuts-title">Quick Actions</h3>
                <div className="shortcuts-grid">
                  <div className="glass-card shortcut-card" onClick={() => setActiveTab('advisor')}>
                    <div className="shortcut-icon">🎯</div>
                    <h3 className="shortcut-name">Find the Best AI</h3>
                    <p className="shortcut-desc">Run the 4-step wizard to find which model and agent framework to choose for your project constraints.</p>
                    <div className="shortcut-arrow">Configure Wizard →</div>
                  </div>

                  <div className="glass-card shortcut-card" onClick={() => setActiveTab('simulator')}>
                    <div className="shortcut-icon">🎮</div>
                    <h3 className="shortcut-name">Run Live Simulation</h3>
                    <p className="shortcut-desc">Open the logs stream to watch an autonomous agent write code, parse files, detect errors, and perform self-corrections.</p>
                    <div className="shortcut-arrow">Launch Sandbox →</div>
                  </div>

                  <div className="glass-card shortcut-card" onClick={() => setActiveTab('prompt')}>
                    <div className="shortcut-icon">⚡</div>
                    <h3 className="shortcut-name">Write System Prompt</h3>
                    <p className="shortcut-desc">Generate model-specific optimized system prompts and parameters config to receive perfect outputs.</p>
                    <div className="shortcut-arrow">Build Prompts →</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advisor' && (
            <AdvisorWizard models={models} agents={agents} showToast={showToast} />
          )}

          {activeTab === 'database' && (
            <ModelDatabase 
              models={models} 
              agents={agents} 
              compareSet={compareSet} 
              setCompareSet={setCompareSet}
              isModalActive={isModalActive}
              setIsModalActive={setIsModalActive}
              showToast={showToast} 
            />
          )}

          {activeTab === 'playbooks' && (
            <PlaybookViewer playbooks={playbooks} showToast={showToast} />
          )}

          {activeTab === 'simulator' && (
            <AgentSimulator />
          )}

          {activeTab === 'prompt' && (
            <PromptOptimizer models={models} showToast={showToast} />
          )}
        </div>
      </main>

      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
        onSuccess={() => handleRouteToDashboard('overview')} 
        showToast={showToast} 
      />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

/* ========================================================================
   SUB-COMPONENT: HEADER
   ======================================================================== */
const Header = ({ view, setView, setActiveTab, handleRoute, onSignUpClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="main-nav" 
      style={{
        background: scrolled ? 'rgba(10, 14, 26, 0.95)' : 'rgba(10, 14, 26, 0.8)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setView('home'); }}>
          ⚡ AI Advisor
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => handleRoute('overview')}
            style={{ borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Launch Workspace
          </button>
          
          <button 
            className="btn btn-primary btn-sm" 
            onClick={onSignUpClick}
            style={{ borderRadius: '20px', padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}
          >
            Sign Up Free
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ========================================================================
   SUB-COMPONENT: HERO
   ======================================================================== */
const Hero = () => {
  const handleStart = () => {
    const el = document.getElementById('section-advisor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExplore = () => {
    const el = document.getElementById('section-database');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="section-hero" className="section section-hero">
      <div className="hero-content">
        <div className="hero-badge">🚀 AI-Powered Recommendations</div>
        <h1 className="hero-title">Find the <span className="gradient-text">Perfect AI</span> for Your Project</h1>
        <p className="hero-description text-center">
          Stop guessing which AI model or agent to use. Get personalized recommendations, implementation playbooks, and error-free code templates — all in one place.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={handleStart}>🎯 Get Recommendations</button>
          <button className="btn btn-secondary btn-lg" onClick={handleExplore}>📊 Explore Database</button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">12+</span>
            <span className="hero-stat-label">Models Compared</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">9+</span>
            <span className="hero-stat-label">Agent Frameworks</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">5</span>
            <span className="hero-stat-label">Implementation Playbooks</span>
          </div>
        </div>
      </div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
    </section>
  );
};

/* ========================================================================
   SUB-COMPONENT: ADVISOR WIZARD
   ======================================================================== */
const AdvisorWizard = ({ models, agents, showToast }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    domain: '',
    complexity: '',
    autonomy: '',
    budget: ''
  });
  const [results, setResults] = useState(null);

  const STEP_KEYS = { 1: 'domain', 2: 'complexity', 3: 'autonomy', 4: 'budget' };

  const handleSelectOption = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const currentKey = STEP_KEYS[step];
    if (currentKey && !answers[currentKey]) {
      showToast('Please select an option before continuing.', 'warning');
      return;
    }
    
    const nextStep = step + 1;
    setStep(nextStep);
    if (nextStep > 4) {
      calculateRecommendation();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setAnswers({ domain: '', complexity: '', autonomy: '', budget: '' });
    setResults(null);
  };

  const calculateRecommendation = () => {
    const { domain, complexity, autonomy, budget } = answers;
    const tierOrder = ['free', 'low', 'medium', 'high', 'enterprise'];

    // Score Models
    const scoredModels = models.map(model => {
      let score = 0;
      if (Array.isArray(model.bestFor)) {
        model.bestFor.forEach(bf => {
          if (bf.toLowerCase().includes(domain.toLowerCase())) score += 3;
        });
      }
      
      const budgetIdx = tierOrder.indexOf(budget);
      const tierIdx = tierOrder.indexOf(model.tier);
      if (budgetIdx !== -1 && tierIdx !== -1) {
        if (budgetIdx === tierIdx) score += 5;
        else if (Math.abs(budgetIdx - tierIdx) === 1) score += 2;
      }

      if (complexity === 'simple' && model.speed === 'fast') score += 3;
      if (complexity === 'complex' && (model.speed === 'medium' || model.speed === 'slow')) score += 2;

      return { ...model, score };
    }).sort((a, b) => b.score - a.score);

    // Score Agents
    let recommendedAgent = null;
    if (autonomy !== 'single-llm') {
      const scoredAgents = agents.map(agent => {
        let score = 0;
        if (Array.isArray(agent.bestFor)) {
          agent.bestFor.forEach(bf => {
            if (bf.toLowerCase().includes(domain.toLowerCase())) score += 3;
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

    const topModel = scoredModels[0] || models[0];

    // Generate rationale string
    let reasoning = `Based on your focus on ${domain} tasks with ${complexity} complexity, `;
    reasoning += `a ${budget} budget, and preference for ${autonomy.replace(/-/g, ' ')} workflows, `;
    reasoning += `we recommend ${topModel.name} by ${topModel.provider}. `;
    reasoning += `It excels at ${(topModel.bestFor || []).slice(0, 3).join(', ')} `;
    reasoning += `and offers ${topModel.speed} inference speed with ${topModel.pricing} pricing.`;
    if (recommendedAgent) {
      reasoning += ` Paired with ${recommendedAgent.name}, you get a robust ${recommendedAgent.type} `;
      reasoning += `framework that handles ${(recommendedAgent.bestFor || []).slice(0, 2).join(' and ')}.`;
    }

    // Generate tips
    const tips = [
      `Start with ${topModel.name}'s default parameters, then fine-tune temperature for your ${domain} use case.`,
      `Use structured output (JSON mode) for reliable parsing in production pipelines.`,
      `Implement exponential back-off retry logic to handle rate limits gracefully.`
    ];

    if (recommendedAgent) {
      tips.push(`Integrate ${recommendedAgent.name} incrementally — begin with a single-agent setup before scaling to multi-agent.`);
      tips.push(`Add logging and observability early to debug agent decision chains.`);
    }

    setResults({ model: topModel, agent: recommendedAgent, reasoning, tips });
  };

  const progressPct = step <= 4 ? (step / 4) * 100 : 100;

  return (
    <section id="section-advisor" className="section section-advisor">
      <h2 className="section-title"><span className="gradient-text">Smart Advisor</span> Wizard</h2>
      <p className="section-subtitle">Answer 4 simple questions and get a personalized AI recommendation tailored to your project needs.</p>

      <div className="wizard-container glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="wizard-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
          <span className="wizard-step-indicator" style={{ fontWeight: '600' }}>
            {step <= 4 ? `Step ${step} of 4` : 'Results'}
          </span>
          {step > 4 && (
            <button className="btn btn-ghost btn-sm" onClick={handleRestart}>↺ Restart</button>
          )}
        </div>

        <div className="wizard-progress" style={{ width: '100%', height: '6px', background: 'var(--bg-surface)', borderRadius: '3px', marginBottom: '2.5rem', overflow: 'hidden' }}>
          <div className="wizard-progress-fill" style={{ width: `${progressPct}%`, height: '100%', background: 'var(--gradient-primary)', transition: 'width 0.3s ease' }}></div>
        </div>

        {/* STEP 1: Task Domain */}
        {step === 1 && (
          <div className="wizard-step">
            <h3 className="wizard-step-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>What type of project are you building?</h3>
            <p className="wizard-step-description" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Select the primary domain of your AI-powered project.</p>
            <div className="wizard-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { val: 'coding', icon: '💻', title: 'Coding & Dev', desc: 'Build, debug, or refactor code' },
                { val: 'research', icon: '🔍', title: 'Research & Analysis', desc: 'Deep research, summaries' },
                { val: 'data-processing', icon: '📊', title: 'Data Processing', desc: 'Pipelines, analytics, ETL' },
                { val: 'content-creation', icon: '✍️', title: 'Content Creation', desc: 'Blogs, copywriting, marketing' },
                { val: 'customer-support', icon: '🎧', title: 'Customer Support', desc: 'Chatbots and support automation' }
              ].map(opt => (
                <button
                  key={opt.val}
                  className={`wizard-option ${answers.domain === opt.val ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('domain', opt.val)}
                  style={{
                    background: answers.domain === opt.val ? 'rgba(139, 92, 246, 0.15)' : 'rgba(26, 31, 53, 0.4)',
                    border: answers.domain === opt.val ? '2px solid var(--color-primary)' : '1px solid var(--glass-border)',
                    padding: '1.25rem', borderRadius: '12px', textAlign: 'left', cursor: 'pointer'
                  }}
                >
                  <span className="wizard-option-icon" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                  <span className="wizard-option-title" style={{ fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>{opt.title}</span>
                  <span className="wizard-option-desc" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Complexity */}
        {step === 2 && (
          <div className="wizard-step">
            <h3 className="wizard-step-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>How complex is your project?</h3>
            <p className="wizard-step-description" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>This helps us recommend the right level of AI capability.</p>
            <div className="wizard-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { val: 'simple', icon: '🟢', title: 'Simple', desc: 'Single task, straightforward inputs/outputs' },
                { val: 'moderate', icon: '🟡', title: 'Moderate', desc: 'Multi-step chains, simple tool integration' },
                { val: 'complex', icon: '🔴', title: 'Complex', desc: 'Agentic loops, custom tools, self-correction' }
              ].map(opt => (
                <button
                  key={opt.val}
                  className={`wizard-option ${answers.complexity === opt.val ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('complexity', opt.val)}
                  style={{
                    background: answers.complexity === opt.val ? 'rgba(139, 92, 246, 0.15)' : 'rgba(26, 31, 53, 0.4)',
                    border: answers.complexity === opt.val ? '2px solid var(--color-primary)' : '1px solid var(--glass-border)',
                    padding: '1.25rem', borderRadius: '12px', textAlign: 'left', cursor: 'pointer'
                  }}
                >
                  <span className="wizard-option-icon" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                  <span className="wizard-option-title" style={{ fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>{opt.title}</span>
                  <span className="wizard-option-desc" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Autonomy */}
        {step === 3 && (
          <div className="wizard-step">
            <h3 className="wizard-step-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>How autonomous should the AI be?</h3>
            <p className="wizard-step-description" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Choose between direct models or collaborative frameworks.</p>
            <div className="wizard-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { val: 'autonomous-agent', icon: '🤖', title: 'Fully Autonomous', desc: 'AI plans, executes and corrects independently' },
                { val: 'human-in-loop', icon: '🤝', title: 'Human-in-the-Loop', desc: 'AI proposes, human signs off before execution' },
                { val: 'single-llm', icon: '💬', title: 'Single LLM (No Agent)', desc: 'Direct prompt engineering response' }
              ].map(opt => (
                <button
                  key={opt.val}
                  className={`wizard-option ${answers.autonomy === opt.val ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('autonomy', opt.val)}
                  style={{
                    background: answers.autonomy === opt.val ? 'rgba(139, 92, 246, 0.15)' : 'rgba(26, 31, 53, 0.4)',
                    border: answers.autonomy === opt.val ? '2px solid var(--color-primary)' : '1px solid var(--glass-border)',
                    padding: '1.25rem', borderRadius: '12px', textAlign: 'left', cursor: 'pointer'
                  }}
                >
                  <span className="wizard-option-icon" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                  <span className="wizard-option-title" style={{ fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>{opt.title}</span>
                  <span className="wizard-option-desc" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Budget */}
        {step === 4 && (
          <div className="wizard-step">
            <h3 className="wizard-step-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>What's your budget tier?</h3>
            <p className="wizard-step-description" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Select optimal API costing constraints.</p>
            <div className="wizard-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { val: 'free', icon: '🆓', title: 'Free / Open Source', desc: 'Self-hosted or free trial APIs' },
                { val: 'low', icon: '💰', title: 'Low ($0 - $50/mo)', desc: 'Affordable developer APIs' },
                { val: 'medium', icon: '💎', title: 'Medium ($50 - $200/mo)', desc: 'Balanced cost and performance' },
                { val: 'high', icon: '🏆', title: 'High ($200+/mo)', desc: 'Enterprise power, unconstrained' }
              ].map(opt => (
                <button
                  key={opt.val}
                  className={`wizard-option ${answers.budget === opt.val ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('budget', opt.val)}
                  style={{
                    background: answers.budget === opt.val ? 'rgba(139, 92, 246, 0.15)' : 'rgba(26, 31, 53, 0.4)',
                    border: answers.budget === opt.val ? '2px solid var(--color-primary)' : '1px solid var(--glass-border)',
                    padding: '1.25rem', borderRadius: '12px', textAlign: 'left', cursor: 'pointer'
                  }}
                >
                  <span className="wizard-option-icon" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                  <span className="wizard-option-title" style={{ fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>{opt.title}</span>
                  <span className="wizard-option-desc" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Results */}
        {step > 4 && results && (
          <div className="wizard-step fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem' }}>Your Recommended Setup</h3>
            
            <div className="result-card glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--color-primary)' }}>
              <div className="result-header" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>{results.model.icon}</span>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{results.model.name}</h4>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Provider: {results.model.provider}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{results.reasoning}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <span className="tag tag--violet">Context: {results.model.contextWindow}</span>
                <span className="tag tag--pink">Speed: {results.model.speed}</span>
                <span className="tag tag--cyan">Pricing: {results.model.pricing}</span>
              </div>
            </div>

            {results.agent && (
              <div className="result-card glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--color-accent)' }}>
                <div className="result-header" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '2.5rem' }}>{results.agent.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{results.agent.name}</h4>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Type: {results.agent.type}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{results.agent.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <span className="tag tag--cyan">Complexity: {results.agent.complexity}</span>
                  <span className="tag tag--pink">Open Source: {results.agent.openSource ? 'Yes' : 'No'}</span>
                </div>
              </div>
            )}

            <div className="result-card glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="result-header" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Next Steps & Implementation Tips</h4>
              </div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                {results.tips.map((tip, idx) => (
                  <li key={idx} style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="wizard-nav" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
          {step > 1 && step <= 4 && (
            <button className="btn btn-secondary" onClick={handlePrev}>← Previous</button>
          )}
          {step <= 4 ? (
            <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={handleNext}>Next →</button>
          ) : (
            <button className="btn btn-primary" style={{ margin: '0 auto' }} onClick={handleRestart}>↺ Try Again</button>
          )}
        </div>
      </div>
    </section>
  );
};

/* ========================================================================
   SUB-COMPONENT: DATABASE
   ======================================================================== */
const ModelDatabase = ({ models, agents, compareSet, setCompareSet, isModalActive, setIsModalActive, showToast }) => {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const dbItems = useMemo(() => {
    const list = [
      ...models.map(m => ({ ...m, _type: 'model' })),
      ...agents.map(a => ({ ...a, _type: 'agent' }))
    ];
    return list.filter(item => {
      if (filter !== 'all' && item._type !== filter) return false;
      if (query.trim() !== '') {
        const q = query.toLowerCase();
        const searchPool = [
          item.name,
          item.provider || '',
          item.type || '',
          item.description || '',
          ...(item.bestFor || [])
        ].join(' ').toLowerCase();
        return searchPool.includes(q);
      }
      return true;
    });
  }, [models, agents, filter, query]);

  const handleCheckboxChange = (type, id, checked) => {
    const key = `${type}:${id}`;
    setCompareSet(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

  const handleOpenCompare = () => {
    if (compareSet.size < 2) {
      showToast('Select at least 2 items to compare.', 'warning');
      return;
    }
    setIsModalActive(true);
  };

  const compareItemsList = useMemo(() => {
    return [...compareSet].map(key => {
      const [type, id] = key.split(':');
      if (type === 'model') {
        return { ...models.find(m => m.id === id), _type: 'model' };
      } else {
        return { ...agents.find(a => a.id === id), _type: 'agent' };
      }
    }).filter(i => i.id !== undefined);
  }, [compareSet, models, agents]);

  return (
    <section id="section-database" className="section section-database">
      <h2 className="section-title"><span className="gradient-text">AI Model & Agent</span> Database</h2>
      <p className="section-subtitle">Explore and compare the leading AI models and agent frameworks.</p>

      <div className="db-controls" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div className="search-wrapper" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '0.2rem 1rem', minWidth: '280px' }}>
          <span className="search-icon" style={{ marginRight: '0.5rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search models and agents..." 
            className="pb-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', padding: '0.6rem 0', width: '100%' }}
          />
        </div>
        <div className="db-filters">
          <button className={`db-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`db-filter-btn ${filter === 'model' ? 'active' : ''}`} onClick={() => setFilter('model')}>Models</button>
          <button className={`db-filter-btn ${filter === 'agent' ? 'active' : ''}`} onClick={() => setFilter('agent')}>Agents</button>
        </div>
      </div>

      <div id="db-grid">
        {dbItems.map(item => {
          const isModel = item._type === 'model';
          const tagColor = isModel ? 'violet' : 'cyan';
          const isChecked = compareSet.has(`${item._type}:${item.id}`);

          return (
            <div key={`${item._type}-${item.id}`} className="model-card glass-card fade-in">
              <div className="model-card-header">
                <div>
                  <div className="model-card-name" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{item.icon}</span> {item.name}
                  </div>
                  <div className="model-card-provider">{item.provider || item.type}</div>
                </div>
                <span className={`tag tag--${tagColor}`}>{isModel ? 'Model' : 'Agent'}</span>
              </div>
              <p className="model-card-desc">{item.description}</p>
              <div className="model-card-tags">
                {(item.bestFor || []).map((b, i) => (
                  <span key={i} className="tag tag--pink">{b}</span>
                ))}
              </div>
              
              <div className="model-card-stats" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem', marginTop: '1rem' }}>
                {isModel ? (
                  <>
                    <div>
                      <span className="stat-label">Context</span>
                      <div className="stat-value">{item.contextWindow}</div>
                    </div>
                    <div>
                      <span className="stat-label">Speed</span>
                      <div className="stat-value" style={{ textTransform: 'capitalize' }}>{item.speed}</div>
                    </div>
                    <div>
                      <span className="stat-label">Pricing</span>
                      <div className="stat-value" style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>{item.pricing}</div>
                    </div>
                    <div>
                      <span className="stat-label">Tier</span>
                      <div className="stat-value" style={{ textTransform: 'capitalize' }}>{item.tier}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="stat-label">Complexity</span>
                      <div className="stat-value" style={{ textTransform: 'capitalize' }}>{item.complexity}</div>
                    </div>
                    <div>
                      <span className="stat-label">Languages</span>
                      <div className="stat-value">{item.languages?.join(', ') || '—'}</div>
                    </div>
                    <div>
                      <span className="stat-label">License</span>
                      <div className="stat-value">{item.openSource ? 'Open Source' : 'Proprietary'}</div>
                    </div>
                    <div>
                      <span className="stat-label">GitHub</span>
                      <div className="stat-value">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem' }}>View Source</a>
                        ) : '—'}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="model-card-footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '1rem', paddingTop: '0.75rem' }}>
                <input 
                  type="checkbox" 
                  id={`compare-${item._type}-${item.id}`}
                  className="compare-checkbox" 
                  checked={isChecked}
                  onChange={(e) => handleCheckboxChange(item._type, item.id, e.target.checked)}
                />
                <label htmlFor={`compare-${item._type}-${item.id}`} className="compare-label">
                  Compare
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* FLOATING COMPARE BUTTON */}
      <button 
        id="compare-btn" 
        className={`btn btn-primary ${compareSet.size >= 2 ? 'visible' : ''}`}
        onClick={handleOpenCompare}
      >
        Compare <span className="compare-count">{compareSet.size}</span>
      </button>

      {/* COMPARISON MODAL */}
      {isModalActive && (
        <div className="modal-overlay active" onClick={() => setIsModalActive(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: '#0F1322', border: '1px solid var(--color-primary)', boxShadow: '0 8px 32px var(--color-primary-glow)' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.4rem', fontWeight: '700' }}>Model & Agent Comparison</h3>
              <button className="modal-close" onClick={() => setIsModalActive(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className="comparison-table" style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)', color: 'var(--text-dim)', width: '180px' }}>Attribute</th>
                    {compareItemsList.map(item => (
                      <th key={item.id} style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>
                        {item.icon} {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'provider', label: 'Provider / Type', fn: i => i.provider || i.type || '—' },
                    { key: 'desc', label: 'Description', fn: i => i.description || '—' },
                    { key: 'ctx', label: 'Context Window', fn: i => i.contextWindow || '—' },
                    { key: 'price', label: 'Pricing', fn: i => i.pricing || '—' },
                    { key: 'speed', label: 'Speed', fn: i => i.speed || '—' },
                    { key: 'best', label: 'Best For', fn: i => i.bestFor?.join(', ') || '—' },
                    { key: 'strength', label: 'Strengths', fn: i => i.strengths?.join(', ') || '—' },
                    { key: 'weak', label: 'Weaknesses', fn: i => i.weaknesses?.join(', ') || '—' },
                    { key: 'complexity', label: 'Complexity', fn: i => i.complexity || '—' },
                    { key: 'languages', label: 'Languages', fn: i => i.languages?.join(', ') || '—' },
                    { key: 'open', label: 'Open Source', fn: i => i.openSource != null ? (i.openSource ? 'Yes' : 'No') : '—' },
                    { key: 'features', label: 'Features', fn: i => i.features?.join(', ') || '—' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.01)', color: 'var(--text-secondary)', fontWeight: '600' }}>{row.label}</td>
                      {compareItemsList.map(item => (
                        <td key={item.id} style={{ padding: '0.85rem 1rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                          {row.fn(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* ========================================================================
   SUB-COMPONENT: PLAYBOOKS
   ======================================================================== */
const PlaybookViewer = ({ playbooks, showToast }) => {
  const [activeCategory, setActiveCategory] = useState('coding');
  
  // Track selected programming language tab per playbook step index
  const [stepLanguages, setStepLanguages] = useState({});

  const currentPlaybook = playbooks[activeCategory];

  const handleCopyCode = (stepIdx, codeText) => {
    navigator.clipboard.writeText(codeText).then(() => {
      showToast('Code copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Could not copy code.', 'error');
    });
  };

  const getStepLanguage = (stepIdx, stepObj) => {
    if (stepLanguages[stepIdx]) return stepLanguages[stepIdx];
    // Default to python if exists, else first available
    if (stepObj.code?.python) return 'python';
    if (stepObj.code?.javascript) return 'javascript';
    return '';
  };

  const setStepLanguage = (stepIdx, lang) => {
    setStepLanguages(prev => ({ ...prev, [stepIdx]: lang }));
  };

  return (
    <section id="section-playbooks" className="section section-playbooks">
      <h2 className="section-title"><span className="gradient-text">Implementation</span> Playbooks</h2>
      <p className="section-subtitle">Step-by-step guides with working code to build AI agents that produce perfect, error-free outputs.</p>

      <div className="playbook-categories" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {[
          { key: 'coding', icon: '💻', title: 'Coding Agent' },
          { key: 'research', icon: '🔍', title: 'Research Agent' },
          { key: 'data', icon: '📊', title: 'Data Pipeline' },
          { key: 'content', icon: '✍️', title: 'Content Agent' },
          { key: 'support', icon: '🎧', title: 'Support Agent' }
        ].map(cat => (
          <button 
            key={cat.key}
            className={`playbook-category-btn ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              background: activeCategory === cat.key ? 'var(--color-primary)' : 'rgba(26, 31, 53, 0.4)',
              border: activeCategory === cat.key ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
              color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '20px', cursor: 'pointer',
              fontWeight: '600', transition: 'all 0.3s ease'
            }}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      <div id="playbook-content">
        {!currentPlaybook ? (
          <div className="glass-card fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🏗️</span>
            <h4>Playbook Coming Soon!</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>We are compiling code structures and error guardrails for this agent framework.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header info */}
            <div className="playbook-header glass-card fade-in" style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{currentPlaybook.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{currentPlaybook.description}</p>
            </div>

            {/* Steps */}
            {currentPlaybook.steps.map((step, idx) => {
              const selectedLang = getStepLanguage(idx, step);
              const codeString = step.code?.[selectedLang] || '';
              
              return (
                <div key={idx} className="playbook-step glass-card fade-in" style={{ position: 'relative' }}>
                  <div className="step-badge" style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    background: 'rgba(139, 92, 246, 0.15)', color: 'var(--color-primary-light)',
                    fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.6rem', borderRadius: '20px'
                  }}>
                    Step {idx + 1}
                  </div>
                  
                  <h4 style={{ fontFamily: 'Outfit', fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem', paddingRight: '4rem' }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>{step.description}</p>
                  
                  {step.code && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <div className="code-tabs" style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
                        {step.code.python && (
                          <button 
                            className={`code-tab ${selectedLang === 'python' ? 'active' : ''}`}
                            onClick={() => setStepLanguage(idx, 'python')}
                            style={{
                              background: 'none', border: 'none', color: selectedLang === 'python' ? 'var(--color-primary-light)' : 'var(--text-dim)',
                              fontWeight: '600', padding: '0.4rem 0.8rem', cursor: 'pointer', borderBottom: selectedLang === 'python' ? '2px solid var(--color-primary)' : 'none',
                              fontSize: '0.85rem'
                            }}
                          >
                            Python
                          </button>
                        )}
                        {step.code.javascript && (
                          <button 
                            className={`code-tab ${selectedLang === 'javascript' ? 'active' : ''}`}
                            onClick={() => setStepLanguage(idx, 'javascript')}
                            style={{
                              background: 'none', border: 'none', color: selectedLang === 'javascript' ? 'var(--color-primary-light)' : 'var(--text-dim)',
                              fontWeight: '600', padding: '0.4rem 0.8rem', cursor: 'pointer', borderBottom: selectedLang === 'javascript' ? '2px solid var(--color-primary)' : 'none',
                              fontSize: '0.85rem'
                            }}
                          >
                            JavaScript
                          </button>
                        )}
                      </div>
                      
                      <div style={{ position: 'relative' }}>
                        <pre className="code-block" style={{
                          background: '#070A13', border: '1px solid var(--glass-border)',
                          borderRadius: '8px', padding: '1.25rem', overflowX: 'auto',
                          fontSize: '0.85rem', color: '#fff', fontFamily: 'Fira Code, monospace', lineHeight: '1.6'
                        }}>
                          <code>{codeString}</code>
                        </pre>
                        <button 
                          className="copy-btn" 
                          onClick={() => handleCopyCode(idx, codeString)}
                          style={{
                            position: 'absolute', top: '0.75rem', right: '0.75rem',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px', color: 'var(--text-secondary)', padding: '0.3rem 0.75rem',
                            fontSize: '0.75rem', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s'
                          }}
                        >
                          📋 Copy
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pitfalls and Tips */}
                  {step.pitfalls && step.pitfalls.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-danger)', letterSpacing: '0.05em' }}>⚠️ Common Pitfalls</span>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {step.pitfalls.map((p, i) => <li key={i} style={{ marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--color-danger)' }}>•</span> {p}</li>)}
                      </ul>
                    </div>
                  )}

                  {step.tips && step.tips.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-success)', letterSpacing: '0.05em' }}>💡 Integration Tips</span>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {step.tips.map((t, i) => <li key={i} style={{ marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--color-success)' }}>•</span> {t}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Error prevention summary */}
            {currentPlaybook.errorPrevention && (
              <div className="playbook-card glass-card fade-in" style={{ borderLeft: '4px solid var(--color-danger)' }}>
                <h4 style={{ fontFamily: 'Outfit', fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>🛡️ Error Prevention Guardrails</h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {currentPlaybook.errorPrevention.map((e, idx) => <li key={idx}>{e}</li>)}
                </ul>
              </div>
            )}

            {/* Best practices summary */}
            {currentPlaybook.bestPractices && (
              <div className="playbook-card glass-card fade-in" style={{ borderLeft: '4px solid var(--color-success)' }}>
                <h4 style={{ fontFamily: 'Outfit', fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>✅ Framework Best Practices</h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {currentPlaybook.bestPractices.map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

/* ========================================================================
   SUB-COMPONENT: PROMPT OPTIMIZER
   ======================================================================== */
const PromptOptimizer = ({ models, showToast }) => {
  const [task, setTask] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [complexity, setComplexity] = useState('moderate');
  const [format, setFormat] = useState('system-prompt');
  
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Set default model once loaded
  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0].id);
    }
  }, [models]);

  const handleGenerate = async () => {
    if (!task.trim()) {
      showToast('Please describe your task first.', 'warning');
      return;
    }

    setIsGenerating(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task,
          model: selectedModel || 'gemini-25-pro',
          complexity,
          format
        })
      });

      if (res.ok) {
        const data = await res.json();
        setOutput(data.output);
        showToast('Prompt generated successfully!', 'success');
      } else {
        throw new Error('API server returned error');
      }
    } catch (err) {
      console.warn("API request failed, generating client-side mock prompt.");
      // Fallback generator
      const activeModelObj = models.find(m => m.id === selectedModel) || models[0];
      let genText = '';
      if (format === 'system-prompt' || format === 'full') {
        genText += clientGenerateSystemPrompt(task, activeModelObj, complexity);
      }
      if (format === 'config' || format === 'full') {
        if (genText) genText += '\n\n' + '═'.repeat(60) + '\n\n';
        genText += clientGenerateConfig(task, activeModelObj, complexity);
      }
      setOutput(genText);
      showToast('Prompt generated successfully (local engine)!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  const clientGenerateSystemPrompt = (taskText, modelObj, comp) => {
    const depth = comp === 'simple' ? 'concise' : comp === 'complex' ? 'highly detailed and exhaustive' : 'thorough';
    return `# System Prompt — ${modelObj.name} (${modelObj.provider})

## Role
You are an expert AI assistant specialized in: ${taskText}.
You leverage the capabilities of ${modelObj.name}, which excels at ${(modelObj.bestFor || []).join(', ')}.

## Core Instructions
1. Provide ${depth} responses tailored to the user's request.
2. Always structure output clearly with headings, bullet points, or numbered steps.
3. When generating code, include comments explaining each significant block.
4. If the request is ambiguous, ask a clarifying question before proceeding.
5. Prioritize accuracy over speed; verify facts and logic carefully.

## Output Format
- Use Markdown formatting for readability.
- For code: use fenced code blocks with the correct language identifier.
- For data: use tables or JSON as appropriate.
- Conclude each response with a brief "Next Steps" section when applicable.

## Constraints & Safety
- Never fabricate sources or data. Clearly state when you are uncertain.
- Respect rate limits: keep responses within ${modelObj.contextWindow} context window.
- Do not produce harmful, biased, or misleading content.
- Follow the principle of least surprise — be predictable and consistent.

## Error Handling
- If the input is malformed or missing required fields, respond with a structured error:
  { "error": "<type>", "message": "<human-readable description>", "suggestion": "<fix>" }
- For multi-step tasks, checkpoint progress and report partial results on failure.

## Validation Rules
- All generated code must be syntactically valid.
- JSON output must conform to the schema provided by the user.
- Numerical results should include units and precision context.

## Model-Specific Optimizations (${modelObj.name})
- Strengths to leverage: ${(modelObj.strengths || []).join('; ')}.
- Known limitations to mitigate: ${(modelObj.weaknesses || []).join('; ')}.
- Recommended temperature: ${comp === 'simple' ? '0.3' : comp === 'complex' ? '0.7' : '0.5'} for this task type.

## Task Context
"${taskText}"`;
  };

  const clientGenerateConfig = (taskText, modelObj, comp) => {
    const temp = comp === 'simple' ? 0.3 : comp === 'complex' ? 0.7 : 0.5;
    const maxTokens = comp === 'simple' ? 1024 : comp === 'complex' ? 8192 : 4096;
    const configObj = {
      model: { id: modelObj.id, provider: modelObj.provider, name: modelObj.name },
      parameters: { temperature: temp, max_tokens: maxTokens, top_p: 0.95, frequency_penalty: 0.1, presence_penalty: 0.05 },
      context: { system_prompt_file: './prompts/system.md', task_description: taskText },
      tools: { enabled: comp !== 'simple', definitions_path: './tools/', max_tool_calls: comp === 'complex' ? 10 : 5 },
      retry: { max_retries: 3, backoff_base_ms: 500, backoff_multiplier: 2 },
      safety: { content_filter: true, max_context_usage: 0.85 },
      logging: { level: 'info', output: './logs/run.jsonl' }
    };
    return `// Configuration Template for ${modelObj.name}\n` + JSON.stringify(configObj, null, 2);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        showToast('Copied to clipboard!', 'success');
      });
    }
  };

  return (
    <section id="section-prompt-builder" className="section section-prompt-builder">
      <h2 className="section-title"><span className="gradient-text">Prompt</span> Optimizer</h2>
      <p className="section-subtitle">Generate optimized system prompts and configuration templates tailored to your specific model and task.</p>

      <div className="pb-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="pb-field pb-field-full" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="pb-label" htmlFor="pb-task" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Describe Your Task</label>
          <textarea 
            id="pb-task" 
            className="pb-textarea" 
            placeholder="e.g., Build an agent that reviews pull requests and suggests improvements..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              width: '100%', minHeight: '120px', background: 'var(--bg-surface)',
              border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem',
              color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="pb-label" htmlFor="pb-model" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Target Model</label>
          <select 
            id="pb-model" 
            className="pb-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
              borderRadius: '12px', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem',
              outline: 'none', cursor: 'pointer'
            }}
          >
            {models.map(m => (
              <option key={m.id} value={m.id} style={{ background: '#111625' }}>
                {m.icon} {m.name} ({m.provider})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="pb-label" htmlFor="pb-complexity" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Complexity</label>
          <select 
            id="pb-complexity" 
            className="pb-select"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
              borderRadius: '12px', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem',
              outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="simple" style={{ background: '#111625' }}>Simple (Linear)</option>
            <option value="moderate" style={{ background: '#111625' }}>Moderate (Chained)</option>
            <option value="complex" style={{ background: '#111625' }}>Complex (Agent Loop)</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="pb-label" htmlFor="pb-format" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Output Format</label>
          <select 
            id="pb-format" 
            className="pb-select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
              borderRadius: '12px', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem',
              outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="system-prompt" style={{ background: '#111625' }}>System Prompt</option>
            <option value="config" style={{ background: '#111625' }}>Configuration File</option>
            <option value="full" style={{ background: '#111625' }}>Full Package (Prompt + Config)</option>
          </select>
        </div>
      </div>

      <button 
        id="pb-generate" 
        className="btn btn-primary btn-lg" 
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? '⚡ Generating...' : '⚡ Generate Optimized Prompt'}
      </button>

      {output && (
        <div id="pb-output-container" className="pb-output-container active" style={{ marginTop: '2rem' }}>
          <div className="pb-output-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'Outfit' }}>Generated Structure</h3>
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>📋 Copy to Clipboard</button>
          </div>
          <pre id="pb-output" style={{ background: '#070A13', border: '1px solid var(--glass-border)', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto' }}>
            <code>{output}</code>
          </pre>
        </div>
      )}
    </section>
  );
};

/* ========================================================================
   SUB-COMPONENT: SITE FOOTER
   ======================================================================== */
const Footer = () => {
  return (
    <footer className="site-footer" style={{ borderTop: '1px solid var(--glass-border)', padding: '3rem 2rem', marginTop: '6rem' }}>
      <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <p className="footer-text" style={{ fontSize: '1rem', fontWeight: '600' }}>
          Built with ⚡ by <span className="gradient-text">AI Advisor</span> — Making AI selection effortless
        </p>
        <p className="footer-sub" style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
          Data updated July 2026 • Not affiliated with any AI provider
        </p>
      </div>
    </footer>
  );
};

/* ========================================================================
   SUB-COMPONENT: TOAST CONTAINER
   ======================================================================== */
const ToastContainer = ({ toasts }) => {
  const getIcon = (type) => {
    const icons = { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️' };
    return icons[type] || icons.info;
  };

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span>{getIcon(t.type)}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};

/* ========================================================================
   SUB-COMPONENT: SIGN UP MODAL
   ======================================================================== */
const SignUpModal = ({ isOpen, onClose, onSuccess, showToast }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    provider: 'gemini'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    showToast(`⚡ Welcome, ${formData.name}! Your free account was created.`, "success");
    onClose();
    onSuccess();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }} className="gradient-text">Create Free Account</h2>
          <button className="btn-ghost" onClick={onClose} style={{ fontSize: '1.25rem', padding: '0.25rem 0.5rem', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>✕</button>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Get instant access to recommendations, interactive playbooks, and simulated test loops.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Alex Carter"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Work Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Primary AI Interest</label>
            <select 
              className="form-control"
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.6rem', borderRadius: '6px', width: '100%' }}
            >
              <option value="gemini">Google Gemini (Massive Context)</option>
              <option value="claude">Anthropic Claude (Complex Coding)</option>
              <option value="openai">OpenAI GPT (Structured Output)</option>
              <option value="llama">Meta Llama (Self-Hosted)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem', padding: '0.8rem' }}>
            Get Started Free
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
