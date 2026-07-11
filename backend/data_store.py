# backend/data_store.py

models = [
    {
        "id": "gemini-25-pro",
        "name": "Gemini 2.5 Pro",
        "provider": "Google",
        "description": "Google's most capable model with a massive 1M token context window and deep reasoning. Excels at complex multi-step tasks, long-document analysis, and multimodal understanding.",
        "contextWindow": "1M tokens",
        "pricing": "$1.25 / $10 per 1M tokens (>200k)",
        "speed": "medium",
        "bestFor": ["Complex reasoning", "Coding & debugging", "Long-document analysis", "Multimodal tasks", "Deep research"],
        "strengths": ["Massive 1M token context window", "Strong coding & debugging", "Native multimodal support", "Deep research capabilities"],
        "weaknesses": ["Slower than Flash variant", "Higher cost than Flash"],
        "tier": "medium",
        "icon": "🤖"
    },
    {
        "id": "gemini-25-flash",
        "name": "Gemini 2.5 Flash",
        "provider": "Google",
        "description": "Google's highly efficient, high-speed model with a 1M token context window. Designed for speed, cost-effectiveness, and high-frequency calls.",
        "contextWindow": "1M tokens",
        "pricing": "$0.15 / $0.60 per 1M tokens (>200k)",
        "speed": "fast",
        "bestFor": ["Fast prototyping", "Chat applications", "Real-time processing", "Cost-efficient scaling"],
        "strengths": ["Extremely fast", "Highly cost-effective", "1M context window"],
        "weaknesses": ["Less nuanced reasoning on highly complex tasks"],
        "tier": "low",
        "icon": "⚡"
    },
    {
        "id": "claude-opus-4",
        "name": "Claude Opus 4",
        "provider": "Anthropic",
        "description": "Anthropic's flagship model for complex analysis, deep coding, and agentic reasoning. Offers exceptional comprehension and task accuracy.",
        "contextWindow": "200K tokens",
        "pricing": "$15.00 / $75.00 per 1M tokens",
        "speed": "slow",
        "bestFor": ["Complex coding", "Deep analysis", "Agentic workflows", "Extended thinking"],
        "strengths": ["Exceptional reasoning", "Strong safety guardrails", "Excellent tool-use stability"],
        "weaknesses": ["Expensive", "Slower inference speed"],
        "tier": "high",
        "icon": "💎"
    },
    {
        "id": "claude-sonnet-4",
        "name": "Claude Sonnet 4",
        "provider": "Anthropic",
        "description": "Anthropic's state-of-the-art balanced model. Offers near-Opus capabilities with much faster speed and lower pricing.",
        "contextWindow": "200K tokens",
        "pricing": "$3.00 / $15.00 per 1M tokens",
        "speed": "fast",
        "bestFor": ["Balanced coding tasks", "Analysis", "Creative writing", "Tool use"],
        "strengths": ["Very fast", "Excellent coding capability", "Great cost/performance ratio"],
        "weaknesses": ["Smaller context window compared to Gemini"],
        "tier": "medium",
        "icon": "🌟"
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
