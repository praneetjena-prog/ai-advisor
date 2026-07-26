# backend/data_store.py

models = [
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
        "id": "o3",
        "name": "OpenAI o3",
        "provider": "OpenAI",
        "description": "OpenAI's premier reasoning flagship model. Designed for advanced science, mathematics, coding algorithms, and deep step-by-step logic.",
        "contextWindow": "200K tokens",
        "pricing": "$15.00 / $60.00 per 1M tokens",
        "speed": "slow",
        "bestFor": ["Deep reasoning", "Complex mathematics", "Algorithmic coding", "Scientific research"],
        "strengths": ["Frontier reasoning benchmark scores", "Native chain-of-thought planning", "High precision"],
        "weaknesses": ["Higher latency due to thinking tokens", "Premium pricing tier"],
        "tier": "high",
        "icon": "🧠"
    },
    {
        "id": "o3-mini",
        "name": "OpenAI o3-mini",
        "provider": "OpenAI",
        "description": "OpenAI's high-speed reasoning model. Delivers exceptional STEM and coding performance at a fraction of the latency and cost.",
        "contextWindow": "200K tokens",
        "pricing": "$1.10 / $4.40 per 1M tokens",
        "speed": "fast",
        "bestFor": ["Fast reasoning", "STEM problem solving", "Competitive programming", "Agentic tool loops"],
        "strengths": ["Ultra-fast reasoning speeds", "Configurable reasoning effort (low/med/high)", "Cost-efficient"],
        "weaknesses": ["Lacks native multimodal image inputs"],
        "tier": "medium",
        "icon": "⚡"
    },
    {
        "id": "gpt-4o-mini",
        "name": "GPT-4o Mini",
        "provider": "OpenAI",
        "description": "OpenAI's lightweight multimodal workhorse. Built for fast, affordable text and vision processing at scale.",
        "contextWindow": "128K tokens",
        "pricing": "$0.15 / $0.60 per 1M tokens",
        "speed": "fast",
        "bestFor": ["High-volume chat", "Vision parsing", "Simple automation", "Sub-second API loops"],
        "strengths": ["Extremely low cost", "Vision multimodal capability", "Sub-second latencies"],
        "weaknesses": ["Lower reasoning depth on complex code logic"],
        "tier": "low",
        "icon": "🚀"
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
]

agents = [
    {
        "id": "langgraph",
        "name": "LangGraph",
        "type": "framework",
        "description": "A framework by LangChain for building stateful, multi-actor applications with LLMs. Ideal for creating cyclical agentic architectures.",
        "bestFor": ["Stateful multi-step workflows", "Complex chains", "Tool use", "Cyclic graphs"],
        "features": ["Graph-based workflows", "State management", "Streaming support", "Human-in-the-loop validation"],
        "languages": ["Python", "JavaScript"],
        "complexity": "advanced",
        "openSource": True,
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
        "openSource": True,
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
        "openSource": True,
        "link": "https://github.com/huggingface/smolagents",
        "icon": "🔬"
    }
]

playbooks = {
    "coding": {
        "title": "Build a Coding Agent",
        "description": "Learn to construct an autonomous software engineer that writes, tests, and refactors code using tool feedback loops.",
        "steps": [
            {
                "title": "Set Up Environment & Dependencies",
                "description": "Install required packages and set up your API credentials.",
                "code": {
                    "python": 'import os\n# Install: pip install smolagents\nfrom smolagents import CodeAgent, LiteLLMModel\n\nos.environ["GEMINI_API_KEY"] = "your-api-key-here"\nmodel = LiteLLMModel("gemini/gemini-2.5-pro")',
                    "javascript": '// Install: npm install @google/genai\nconst { GoogleGenAI } = require("@google/genai");\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });'
                },
                "pitfalls": ["Do not hardcode API keys directly in source files.", "Ensure correct package names are installed (e.g. smolagents vs smol-agents)."],
                "tips": ["Use a .env file loaded via dotenv/python-dotenv.", "Lock package versions in requirements.txt or package.json."]
            },
            {
                "title": "Implement Tool Definitions",
                "description": "Provide the agent with tools to interact with the system.",
                "code": {
                    "python": 'from smolagents import tool\n\n@tool\ndef read_file(filepath: str) -> str:\n    """Reads a file\'s contents.\n    Args:\n        filepath: The path to the file\n    """\n    with open(filepath, "r") as f:\n        return f.read()',
                    "javascript": 'const fs = require("fs");\n\nfunction readFile(filepath) {\n  return fs.readFileSync(filepath, "utf-8");\n}'
                },
                "pitfalls": ["Agents can crash if tools lack detailed docstrings or parameter type annotations.", "Unsafe tool calls can cause file destruction."],
                "tips": ["Always define clean, precise descriptions for every parameter.", "Enforce path safety restrictions (e.g., prevent directory traversal)."]
            }
        ],
        "errorPrevention": [
            "Always sand box code execution tools using Docker or secure environments.",
            "Implement a maximum loop limit to prevent run-away infinite loops."
        ],
        "bestPractices": [
            "Write granular unit tests that the agent can run to verify its own edits.",
            "Use models with high reasoning capabilities (like Gemini 2.5 Pro or Claude Sonnet) for code generation."
        ]
    },
    "research": {
        "title": "Build a Research Agent",
        "description": "Construct an agent that browses sources, extracts data, and compiles structured research reports.",
        "steps": [
            {
                "title": "Set Up Sources",
                "description": "Initialize search and document loaders.",
                "code": {
                    "python": '# pip install duckduckgo-search\nfrom duckduckgo_search import DDGS\n\ndef search_web(query: str, max_results: int = 5):\n    with DDGS() as ddgs:\n        return [r for r in ddgs.text(query, max_results=max_results)]',
                    "javascript": '// Using ddg-web-search or custom API\nconst { search } = require("duck-duck-scrape");\n\nasync function searchWeb(query) {\n  return await search(query);\n}'
                },
                "pitfalls": ["Overwhelming the model with too much raw HTML.", "Search rate limits causing unhandled exceptions."],
                "tips": ["Filter and clean HTML tags before feeding content to the LLM.", "Implement exponential backoff retry logic for search APIs."]
            }
        ],
        "errorPrevention": [
            "Parse and validate markdown output formats to ensure citations are present.",
            "Cross-validate search results across multiple search engine queries."
        ],
        "bestPractices": [
            "Use parallel agent queries for different subtopics to speed up reports.",
            "Always prompt the agent to explicitly state when it cannot find reliable sources."
        ]
    }
}
