// ============================================================
// AI Advisor — Structured Data
// Contains all models, agent frameworks, and playbooks
// ============================================================

const models = [
  {
    id: 'gemini-25-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    description:
      'Google\'s most capable model with a massive 1M token context window and deep reasoning. Excels at complex multi-step tasks, long-document analysis, and multimodal understanding across text, images, audio, and video.',
    contextWindow: '1M tokens',
    pricing: '$1.25 / $10 per 1M tokens (>200k)',
    speed: 'medium',
    bestFor: [
      'Complex reasoning',
      'Coding & debugging',
      'Long-document analysis',
      'Multimodal tasks',
      'Deep research'
    ],
    strengths: [
      'Massive 1M token context window',
      'Strong coding & debugging ability',
      'Native multimodal support',
      'Deep research capabilities'
    ],
    weaknesses: [
      'Slower than Flash variant',
      'Higher cost for high-volume workloads',
      'Can be verbose on simple tasks'
    ],
    tier: 'medium',
    icon: '✨'
  },
  {
    id: 'gemini-25-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description:
      'Google\'s speed-optimized model delivering extremely fast inference while retaining a 1M token context window. Ideal for latency-sensitive applications and cost-efficient scaling at production volumes.',
    contextWindow: '1M tokens',
    pricing: '$0.15 / $0.60 per 1M tokens (>200k)',
    speed: 'fast',
    bestFor: [
      'Fast prototyping',
      'Chat applications',
      'Real-time processing',
      'Cost-efficient scaling'
    ],
    strengths: [
      'Extremely fast inference',
      'Very cost-effective',
      '1M token context window',
      'Great throughput at scale'
    ],
    weaknesses: [
      'Less nuanced reasoning than Pro',
      'May struggle with very complex multi-step tasks'
    ],
    tier: 'low',
    icon: '⚡'
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    description:
      'Anthropic\'s most powerful model, purpose-built for complex coding, deep analytical reasoning, and autonomous agentic workflows. Features extended thinking for transparent chain-of-thought on hard problems.',
    contextWindow: '200K tokens',
    pricing: '$15 / $75 per 1M tokens',
    speed: 'medium',
    bestFor: [
      'Complex coding',
      'Deep analysis',
      'Agentic workflows',
      'Extended thinking tasks'
    ],
    strengths: [
      'Exceptional coding ability',
      'Strong safety & alignment',
      'Agentic tool use',
      'Extended thinking mode'
    ],
    weaknesses: [
      'Expensive at scale',
      'Smaller context than Gemini',
      'Can be overly cautious'
    ],
    tier: 'high',
    icon: '🎭'
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    description:
      'Anthropic\'s balanced model offering strong coding, analysis, and creative writing capabilities at a moderate price point. An excellent all-rounder for production applications needing reliability and speed.',
    contextWindow: '200K tokens',
    pricing: '$3 / $15 per 1M tokens',
    speed: 'fast',
    bestFor: [
      'Balanced coding tasks',
      'Analysis & summarization',
      'Creative writing',
      'Tool use'
    ],
    strengths: [
      'Fast response times',
      'Great coding performance',
      'Good cost-to-performance ratio',
      'Reliable tool use'
    ],
    weaknesses: [
      'Smaller context than Gemini models',
      'Less capable than Opus on very hard tasks'
    ],
    tier: 'medium',
    icon: '🎵'
  },
  {
    id: 'gpt-4-1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    description:
      'OpenAI\'s flagship model optimized for instruction following and coding with a massive 1M token context window. Delivers strong performance across structured tasks, long-context understanding, and code generation.',
    contextWindow: '1M tokens',
    pricing: '$2 / $8 per 1M tokens',
    speed: 'medium',
    bestFor: [
      'Instruction following',
      'Coding & code review',
      'Long-context tasks',
      'Structured output'
    ],
    strengths: [
      'Strong instruction following',
      '1M token context window',
      'Good coding ability',
      'Reliable structured output'
    ],
    weaknesses: [
      'Less creative than some competitors',
      'Mid-range pricing',
      'Can be formulaic in creative tasks'
    ],
    tier: 'medium',
    icon: '🧠'
  },
  {
    id: 'gpt-4-1-mini',
    name: 'GPT-4.1 Mini',
    provider: 'OpenAI',
    description:
      'OpenAI\'s cost-optimized model retaining the 1M token context window at a fraction of the price. Perfect for high-volume workloads like classification, summarization, and rapid prototyping.',
    contextWindow: '1M tokens',
    pricing: '$0.40 / $1.60 per 1M tokens',
    speed: 'fast',
    bestFor: [
      'Cost-effective tasks',
      'Summarization',
      'Classification',
      'Quick prototyping'
    ],
    strengths: [
      'Very affordable pricing',
      'Fast inference speed',
      '1M token context window',
      'Good for batch processing'
    ],
    weaknesses: [
      'Less capable on complex reasoning',
      'Lower quality on nuanced tasks',
      'Not ideal for creative writing'
    ],
    tier: 'low',
    icon: '🔹'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description:
      'OpenAI\'s natively multimodal model processing text, images, and audio in a unified architecture. Delivers fast, high-quality responses with strong visual understanding for real-time applications.',
    contextWindow: '128K tokens',
    pricing: '$2.50 / $10 per 1M tokens',
    speed: 'fast',
    bestFor: [
      'Multimodal tasks',
      'Image understanding',
      'Real-time applications',
      'Voice interactions'
    ],
    strengths: [
      'Native multimodal processing',
      'Fast response times',
      'Good overall quality',
      'Strong image understanding'
    ],
    weaknesses: [
      'Smaller 128K context window',
      'Mid-range pricing',
      'Outpaced by newer models on coding'
    ],
    tier: 'medium',
    icon: '🌀'
  },
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    description:
      'Meta\'s open-source powerhouse with a 1M token context window and competitive quality. Ideal for organizations needing full control over their AI infrastructure without vendor lock-in.',
    contextWindow: '1M tokens',
    pricing: 'Free (self-hosted) / varies by provider',
    speed: 'medium',
    bestFor: [
      'Self-hosted deployments',
      'Privacy-sensitive tasks',
      'Customization & fine-tuning',
      'Cost control'
    ],
    strengths: [
      'Fully open source',
      '1M token context window',
      'Competitive quality',
      'No vendor lock-in'
    ],
    weaknesses: [
      'Requires infrastructure for self-hosting',
      'Community support only',
      'Higher ops overhead'
    ],
    tier: 'free',
    icon: '🦙'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    description:
      'A specialized reasoning model with transparent chain-of-thought capabilities excelling at mathematical and scientific problem-solving. Offers exceptional reasoning at a very competitive price point.',
    contextWindow: '128K tokens',
    pricing: '$0.55 / $2.19 per 1M tokens',
    speed: 'slow',
    bestFor: [
      'Mathematical reasoning',
      'Scientific analysis',
      'Complex problem-solving',
      'Step-by-step proofs'
    ],
    strengths: [
      'Exceptional reasoning ability',
      'Transparent chain-of-thought',
      'Affordable pricing',
      'Strong on STEM tasks'
    ],
    weaknesses: [
      'Slower inference speed',
      'Less polished for general chat',
      'Limited multimodal support'
    ],
    tier: 'low',
    icon: '🔬'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description:
      'Mistral AI\'s flagship model with strong multilingual capabilities and EU compliance. A solid choice for European enterprises needing regulatory compliance alongside powerful code generation and analysis.',
    contextWindow: '128K tokens',
    pricing: '$2 / $6 per 1M tokens',
    speed: 'medium',
    bestFor: [
      'Multilingual tasks',
      'European compliance',
      'Code generation',
      'Enterprise deployments'
    ],
    strengths: [
      'Strong multilingual performance',
      'Good coding ability',
      'EU-compliant infrastructure',
      'Competitive pricing'
    ],
    weaknesses: [
      'Smaller ecosystem than OpenAI/Google',
      'Fewer third-party integrations',
      'Less community tooling'
    ],
    tier: 'medium',
    icon: '🌊'
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    provider: 'xAI',
    description:
      'xAI\'s flagship conversational model with real-time knowledge and strong reasoning capabilities. Brings a unique, direct personality to creative tasks and data analysis with up-to-date information.',
    contextWindow: '128K tokens',
    pricing: '$3 / $15 per 1M tokens',
    speed: 'medium',
    bestFor: [
      'Real-time data analysis',
      'Creative tasks',
      'Conversational AI',
      'Current events research'
    ],
    strengths: [
      'Real-time knowledge access',
      'Strong reasoning ability',
      'Unique conversational style',
      'Good at data analysis'
    ],
    weaknesses: [
      'Smaller ecosystem',
      'Newer platform with fewer integrations',
      'Limited enterprise tooling'
    ],
    tier: 'medium',
    icon: '🚀'
  }
];

// ============================================================
// Agent Frameworks & Tools
// ============================================================

const agents = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    type: 'framework',
    description:
      'A graph-based orchestration framework from LangChain for building stateful, multi-step agent workflows. Provides fine-grained control over agent state, tool execution order, and human-in-the-loop patterns.',
    bestFor: [
      'Stateful multi-step workflows',
      'Complex chains with branching logic',
      'Tool use orchestration',
      'Human-in-the-loop agents'
    ],
    features: [
      'Graph-based workflow definition',
      'Persistent state management',
      'Streaming support',
      'Human-in-the-loop checkpoints',
      'Built-in retry & error handling'
    ],
    languages: ['Python', 'JavaScript'],
    complexity: 'intermediate',
    openSource: true,
    link: 'https://langchain-ai.github.io/langgraph/',
    icon: '🔗'
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    type: 'framework',
    description:
      'A multi-agent orchestration framework enabling role-based teams of AI agents that collaborate on complex tasks. Agents can delegate work, share context, and execute tasks sequentially or in parallel.',
    bestFor: [
      'Multi-agent collaboration',
      'Role-based agent teams',
      'Complex project workflows',
      'Task delegation patterns'
    ],
    features: [
      'Role-based agent design',
      'Automatic task delegation',
      'Sequential & parallel execution',
      'Shared memory across agents',
      'Built-in tool integration'
    ],
    languages: ['Python'],
    complexity: 'intermediate',
    openSource: true,
    link: 'https://www.crewai.com/',
    icon: '👥'
  },
  {
    id: 'autogen',
    name: 'Microsoft AutoGen',
    type: 'framework',
    description:
      'Microsoft\'s framework for building multi-agent conversational systems with flexible interaction topologies. Supports code execution, group chats, and complex agent communication patterns for research and production.',
    bestFor: [
      'Multi-agent conversations',
      'Research tasks',
      'Complex problem-solving',
      'Code generation & execution'
    ],
    features: [
      'Conversational agent patterns',
      'Built-in code execution',
      'Group chat orchestration',
      'Flexible agent topologies',
      'Human proxy agent support'
    ],
    languages: ['Python'],
    complexity: 'advanced',
    openSource: true,
    link: 'https://microsoft.github.io/autogen/',
    icon: '🤖'
  },
  {
    id: 'google-adk',
    name: 'Google Agent Development Kit',
    type: 'framework',
    description:
      'Google\'s official framework for building AI agents powered by Gemini and other models. Provides multi-agent orchestration, built-in tools, and seamless integration with Google Cloud services.',
    bestFor: [
      'Building agents with Google models',
      'Multi-agent systems',
      'Tool orchestration',
      'Google Cloud integration'
    ],
    features: [
      'Multi-agent orchestration',
      'Built-in Google tools (Search, Code Exec)',
      'Streaming responses',
      'Session & state management',
      'Model-agnostic design'
    ],
    languages: ['Python', 'Java'],
    complexity: 'intermediate',
    openSource: true,
    link: 'https://google.github.io/adk-docs/',
    icon: '🔧'
  },
  {
    id: 'openai-agents-sdk',
    name: 'OpenAI Agents SDK',
    type: 'framework',
    description:
      'OpenAI\'s lightweight SDK for building agentic workflows with handoffs, guardrails, and tracing. Designed for simplicity and quick prototyping with minimal boilerplate.',
    bestFor: [
      'Simple agent workflows',
      'OpenAI model integration',
      'Quick prototyping',
      'Production-ready agents'
    ],
    features: [
      'Agent handoffs',
      'Input/output guardrails',
      'Built-in tracing',
      'Tool use integration',
      'Minimal boilerplate'
    ],
    languages: ['Python'],
    complexity: 'beginner',
    openSource: true,
    link: 'https://openai.github.io/openai-agents-python/',
    icon: '🛡️'
  },
  {
    id: 'smolagents',
    name: 'Smolagents',
    type: 'framework',
    description:
      'HuggingFace\'s minimalist agent framework that uses code-based tool calling for maximum flexibility. Supports multiple model providers with very low abstraction overhead for rapid experimentation.',
    bestFor: [
      'Lightweight agents',
      'Code-based tool calling',
      'HuggingFace model integration',
      'Rapid experimentation'
    ],
    features: [
      'Code-based agent execution',
      'Minimal abstraction layer',
      'Multi-model provider support',
      'Built-in tool library',
      'Easy custom tool creation'
    ],
    languages: ['Python'],
    complexity: 'beginner',
    openSource: true,
    link: 'https://huggingface.co/docs/smolagents/',
    icon: '🐿️'
  },
  {
    id: 'cursor',
    name: 'Cursor IDE',
    type: 'tool',
    description:
      'An AI-native code editor built on VS Code that deeply integrates LLMs into the development workflow. Offers intelligent tab completion, multi-file editing, and codebase-aware chat for rapid development.',
    bestFor: [
      'AI-assisted coding',
      'Intelligent code completion',
      'Codebase-wide refactoring',
      'Rapid feature development'
    ],
    features: [
      'Smart tab completion',
      'Multi-file editing',
      'Codebase-wide context',
      'Built-in AI chat',
      'Natural language commands'
    ],
    languages: ['All'],
    complexity: 'beginner',
    openSource: false,
    link: 'https://www.cursor.com/',
    icon: '💻'
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    type: 'platform',
    description:
      'StackBlitz\'s AI-powered platform for generating and deploying full-stack web applications entirely in the browser. Turns natural language prompts into working apps with instant deployment capabilities.',
    bestFor: [
      'Full-stack web app generation',
      'Rapid prototyping',
      'No-code / low-code development',
      'Instant deployment'
    ],
    features: [
      'In-browser development environment',
      'Instant deployment to production',
      'AI-driven full-stack generation',
      'Real-time preview',
      'Package management built-in'
    ],
    languages: ['JavaScript', 'TypeScript'],
    complexity: 'beginner',
    openSource: false,
    link: 'https://bolt.new/',
    icon: '⚡'
  },
  {
    id: 'devin',
    name: 'Devin',
    type: 'platform',
    description:
      'Cognition AI\'s autonomous software engineering agent capable of planning, coding, debugging, and deploying end-to-end features. Operates in its own full development environment with terminal, browser, and editor.',
    bestFor: [
      'Autonomous software engineering',
      'End-to-end feature development',
      'Bug fixing & debugging',
      'Codebase onboarding'
    ],
    features: [
      'Autonomous coding & planning',
      'Full development environment',
      'Built-in debugging tools',
      'Browser & terminal access',
      'Git integration'
    ],
    languages: ['All'],
    complexity: 'beginner',
    openSource: false,
    link: 'https://devin.ai/',
    icon: '🦾'
  }
];

// ============================================================
// Playbooks — Step-by-step implementation guides
// ============================================================

const playbooks = {
  // ── Coding Agent Playbook ─────────────────────────────────
  coding: {
    title: 'Build a Coding Agent',
    description:
      'Step-by-step guide to building an autonomous coding agent that can read files, write code, execute commands, and iteratively fix errors using an LLM-powered observe-think-act loop.',
    steps: [
      {
        title: 'Set Up Environment & Dependencies',
        description:
          'Install required packages, configure API keys, and set up the project structure for your coding agent.',
        code: {
          python: `import os
import subprocess
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini client with your API key
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

# Define the working directory for the agent
WORKSPACE = Path("./agent_workspace")
WORKSPACE.mkdir(exist_ok=True)

# Verify the setup is working
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Say 'Agent environment ready!' if you can read this."
)
print(f"Setup verified: {response.text}")
print(f"Workspace: {WORKSPACE.resolve()}")`,
          javascript: `import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";

// Load environment variables
config();

// Configure the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the working directory for the agent
const WORKSPACE = path.resolve("./agent_workspace");
await fs.mkdir(WORKSPACE, { recursive: true });

// Verify the setup is working
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Say 'Agent environment ready!' if you can read this.",
});
console.log(\`Setup verified: \${response.text}\`);
console.log(\`Workspace: \${WORKSPACE}\`);`
        },
        pitfalls: [
          'Forgetting to set GEMINI_API_KEY in your .env file',
          'Not creating the workspace directory before file operations',
          'Using an invalid or expired API key without proper error handling'
        ],
        tips: [
          'Use python-dotenv to keep API keys out of your codebase',
          'Always verify the API connection on startup before processing tasks',
          'Set up a dedicated workspace directory to sandbox agent file operations'
        ]
      },
      {
        title: "Define the Agent's System Prompt",
        description:
          'Create a detailed system prompt that defines the agent\'s role, capabilities, constraints, and output format for consistent, reliable behavior.',
        code: {
          python: `# System prompt that defines the coding agent's behavior
SYSTEM_PROMPT = """You are an expert coding agent. You help users by writing,
debugging, and refactoring code.

## Capabilities
You can use these tools:
- read_file(path): Read a file's contents
- write_file(path, content): Write content to a file
- run_command(cmd): Execute a shell command
- list_files(directory): List files in a directory

## Constraints
- Always read existing files before modifying them
- Never delete files without explicit user confirmation
- Run tests after making code changes
- Keep changes minimal and focused

## Output Format
Respond with a JSON object:
{
  "thought": "Your reasoning about what to do",
  "action": "tool_name",
  "args": { "arg1": "value1" }
}

When the task is complete, respond with:
{ "thought": "...", "action": "done", "result": "summary of changes" }
"""

def build_prompt(task: str, context: list[dict]) -> str:
    """Build the full prompt with system instructions, task, and context."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(context)
    messages.append({"role": "user", "content": task})
    return messages`,
          javascript: `/** System prompt defining the coding agent's behavior and tool use. */
const SYSTEM_PROMPT = \`You are an expert coding agent. You help users by writing,
debugging, and refactoring code.

## Capabilities
You can use these tools:
- read_file(path): Read a file's contents
- write_file(path, content): Write content to a file
- run_command(cmd): Execute a shell command
- list_files(directory): List files in a directory

## Constraints
- Always read existing files before modifying them
- Never delete files without explicit user confirmation
- Run tests after making code changes
- Keep changes minimal and focused

## Output Format
Respond with a JSON object:
{
  "thought": "Your reasoning about what to do",
  "action": "tool_name",
  "args": { "arg1": "value1" }
}

When the task is complete, respond with:
{ "thought": "...", "action": "done", "result": "summary of changes" }
\`;

/**
 * Build the full prompt with system instructions, task, and context.
 * @param {string} task - The user's coding task
 * @param {Array<{role: string, content: string}>} context - Conversation history
 * @returns {Array<{role: string, content: string}>} Formatted messages
 */
function buildPrompt(task, context = []) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...context,
    { role: "user", content: task },
  ];
}`
        },
        pitfalls: [
          'Making the system prompt too vague — be explicit about output format',
          'Not including constraints, which leads to unpredictable agent behavior',
          'Overloading the prompt with too many instructions causing confusion'
        ],
        tips: [
          'Use structured output (JSON) so you can parse agent actions reliably',
          'Include examples of expected tool calls in the system prompt',
          'Iterate on the prompt by testing with diverse tasks and edge cases'
        ]
      },
      {
        title: 'Implement Tool Definitions',
        description:
          'Define the tools your agent can invoke — file I/O, shell commands, and search — with proper sandboxing and error handling.',
        code: {
          python: `import json
from typing import Any

def read_file(path: str) -> dict[str, Any]:
    """Read a file and return its contents with metadata."""
    try:
        full_path = WORKSPACE / path
        content = full_path.read_text(encoding="utf-8")
        return {"success": True, "content": content, "lines": len(content.splitlines())}
    except FileNotFoundError:
        return {"success": False, "error": f"File not found: {path}"}
    except Exception as e:
        return {"success": False, "error": str(e)}

def write_file(path: str, content: str) -> dict[str, Any]:
    """Write content to a file, creating directories as needed."""
    try:
        full_path = WORKSPACE / path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        full_path.write_text(content, encoding="utf-8")
        return {"success": True, "path": str(full_path), "bytes": len(content)}
    except Exception as e:
        return {"success": False, "error": str(e)}

def run_command(cmd: str, timeout: int = 30) -> dict[str, Any]:
    """Execute a shell command in the workspace with a timeout."""
    try:
        result = subprocess.run(
            cmd, shell=True, capture_output=True, text=True,
            cwd=WORKSPACE, timeout=timeout
        )
        return {
            "success": result.returncode == 0,
            "stdout": result.stdout[-2000:],  # Truncate long output
            "stderr": result.stderr[-1000:],
            "exit_code": result.returncode
        }
    except subprocess.TimeoutExpired:
        return {"success": False, "error": f"Command timed out after {timeout}s"}

# Tool registry mapping names to functions
TOOLS = {
    "read_file": read_file,
    "write_file": write_file,
    "run_command": run_command,
}`,
          javascript: `import { execSync } from "child_process";

/**
 * Read a file and return its contents with metadata.
 * @param {string} filePath - Relative path within workspace
 * @returns {Promise<{success: boolean, content?: string, error?: string}>}
 */
async function readFile(filePath) {
  try {
    const fullPath = path.join(WORKSPACE, filePath);
    const content = await fs.readFile(fullPath, "utf-8");
    return { success: true, content, lines: content.split("\\n").length };
  } catch (err) {
    return { success: false, error: \`File not found: \${filePath}\` };
  }
}

/**
 * Write content to a file, creating directories as needed.
 * @param {string} filePath - Relative path within workspace
 * @param {string} content - File content to write
 * @returns {Promise<{success: boolean, path?: string, error?: string}>}
 */
async function writeFile(filePath, content) {
  try {
    const fullPath = path.join(WORKSPACE, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, "utf-8");
    return { success: true, path: fullPath, bytes: content.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Execute a shell command in the workspace with a timeout.
 * @param {string} cmd - Shell command to execute
 * @returns {{success: boolean, stdout?: string, error?: string}}
 */
function runCommand(cmd) {
  try {
    const stdout = execSync(cmd, {
      cwd: WORKSPACE, timeout: 30000, encoding: "utf-8",
    });
    return { success: true, stdout: stdout.slice(-2000) };
  } catch (err) {
    return { success: false, error: err.stderr?.slice(-1000) || err.message };
  }
}

/** Tool registry mapping names to handler functions. */
const TOOLS = { read_file: readFile, write_file: writeFile, run_command: runCommand };`
        },
        pitfalls: [
          'Not sandboxing file operations to the workspace directory',
          'Allowing shell commands without a timeout — can hang indefinitely',
          'Returning unbounded output that blows up the context window'
        ],
        tips: [
          'Always truncate tool output to prevent context window overflow',
          'Add a timeout to every external command to prevent hanging',
          'Use a tool registry (dict/object) so adding new tools is trivial'
        ]
      },
      {
        title: 'Build the Agent Loop',
        description:
          'Implement the core observe-think-act loop where the agent iteratively calls the LLM, parses actions, executes tools, and feeds results back until the task is complete.',
        code: {
          python: `import json

MAX_ITERATIONS = 15

async def run_agent(task: str) -> str:
    """Run the coding agent loop until task completion or max iterations."""
    context: list[dict] = []
    
    for i in range(MAX_ITERATIONS):
        print(f"\\n--- Iteration {i + 1}/{MAX_ITERATIONS} ---")
        
        # Build prompt and call the LLM
        messages = build_prompt(task, context)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=messages[-1]["content"],
            config={"system_instruction": SYSTEM_PROMPT}
        )
        
        # Parse the agent's response as JSON
        try:
            raw_text = response.text.strip()
            # Strip markdown code fences if present
            if raw_text.startswith("\`\`\`"):
                raw_text = raw_text.split("\\n", 1)[1].rsplit("\`\`\`", 1)[0]
            action = json.loads(raw_text)
        except json.JSONDecodeError:
            context.append({"role": "user", "content": "Invalid JSON. Please respond with valid JSON."})
            continue
        
        print(f"Thought: {action.get('thought', 'N/A')}")
        print(f"Action: {action.get('action', 'N/A')}")
        
        # Check if the agent says it's done
        if action.get("action") == "done":
            return action.get("result", "Task completed.")
        
        # Execute the requested tool
        tool_name = action.get("action")
        if tool_name in TOOLS:
            result = TOOLS[tool_name](**action.get("args", {}))
            context.append({"role": "assistant", "content": json.dumps(action)})
            context.append({"role": "user", "content": f"Tool result: {json.dumps(result)}"})
        else:
            context.append({"role": "user", "content": f"Unknown tool: {tool_name}"})
    
    return "Max iterations reached. Task may be incomplete."`,
          javascript: `const MAX_ITERATIONS = 15;

/**
 * Run the coding agent loop until task completion or max iterations.
 * @param {string} task - The user's coding task description
 * @returns {Promise<string>} Summary of completed work
 */
async function runAgent(task) {
  const context = [];

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    console.log(\`\\n--- Iteration \${i + 1}/\${MAX_ITERATIONS} ---\`);

    // Build prompt and call the LLM
    const messages = buildPrompt(task, context);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages[messages.length - 1].content,
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    // Parse the agent's response as JSON
    let action;
    try {
      let raw = response.text.trim();
      if (raw.startsWith("\`\`\`")) {
        raw = raw.split("\\n").slice(1).join("\\n").replace(/\`\`\`$/, "");
      }
      action = JSON.parse(raw);
    } catch {
      context.push({ role: "user", content: "Invalid JSON. Please respond with valid JSON." });
      continue;
    }

    console.log(\`Thought: \${action.thought ?? "N/A"}\`);
    console.log(\`Action: \${action.action ?? "N/A"}\`);

    // Check if the agent says it's done
    if (action.action === "done") return action.result ?? "Task completed.";

    // Execute the requested tool
    const toolFn = TOOLS[action.action];
    if (toolFn) {
      const result = await toolFn(...Object.values(action.args ?? {}));
      context.push({ role: "assistant", content: JSON.stringify(action) });
      context.push({ role: "user", content: \`Tool result: \${JSON.stringify(result)}\` });
    } else {
      context.push({ role: "user", content: \`Unknown tool: \${action.action}\` });
    }
  }
  return "Max iterations reached. Task may be incomplete.";
}`
        },
        pitfalls: [
          'Not setting a maximum iteration limit — the agent can loop forever',
          'Failing to handle malformed JSON responses from the LLM',
          'Accumulating too much context history without summarization'
        ],
        tips: [
          'Always strip markdown code fences before parsing JSON',
          'Log each iteration so you can debug agent behavior',
          'Consider summarizing older context to stay within token limits'
        ]
      },
      {
        title: 'Add Validation & Testing',
        description:
          'Implement output validation, automated testing, and retry logic to ensure the agent produces correct, reliable results.',
        code: {
          python: `import ast
import traceback

def validate_python_code(code: str) -> dict[str, Any]:
    """Validate Python code by checking syntax and basic quality."""
    errors = []
    warnings = []
    try:
        tree = ast.parse(code)
        # Check for basic quality indicators
        functions = [n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef)]
        if not functions:
            warnings.append("No functions defined — consider modularizing")
        for func in functions:
            if not ast.get_docstring(func):
                warnings.append(f"Function '{func.name}' lacks a docstring")
    except SyntaxError as e:
        errors.append(f"Syntax error at line {e.lineno}: {e.msg}")
    
    return {"valid": len(errors) == 0, "errors": errors, "warnings": warnings}

async def run_agent_with_retries(task: str, max_retries: int = 3) -> str:
    """Run the agent with automatic retries on failure."""
    for attempt in range(max_retries):
        try:
            result = await run_agent(task)
            # Validate any generated Python files
            for py_file in WORKSPACE.rglob("*.py"):
                validation = validate_python_code(py_file.read_text())
                if not validation["valid"]:
                    print(f"Validation failed for {py_file}: {validation['errors']}")
                    task += f"\\nFix errors in {py_file.name}: {validation['errors']}"
                    continue
            return result
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            traceback.print_exc()
            if attempt == max_retries - 1:
                raise
    return "All retry attempts exhausted."`,
          javascript: `import { parse } from "acorn";

/**
 * Validate JavaScript code by parsing its AST.
 * @param {string} code - JavaScript source code to validate
 * @returns {{valid: boolean, errors: string[], warnings: string[]}}
 */
function validateJavaScript(code) {
  const errors = [];
  const warnings = [];
  try {
    parse(code, { ecmaVersion: "latest", sourceType: "module" });
    if (!code.includes("function") && !code.includes("=>")) {
      warnings.push("No functions defined — consider modularizing");
    }
  } catch (err) {
    errors.push(\`Syntax error at line \${err.loc?.line}: \${err.message}\`);
  }
  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Run the agent with automatic retries on failure.
 * @param {string} task - The coding task
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<string>} Result summary
 */
async function runAgentWithRetries(task, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await runAgent(task);
      // Validate generated JS files in the workspace
      const files = await fs.readdir(WORKSPACE, { recursive: true });
      for (const file of files.filter((f) => f.endsWith(".js"))) {
        const code = await fs.readFile(path.join(WORKSPACE, file), "utf-8");
        const validation = validateJavaScript(code);
        if (!validation.valid) {
          console.warn(\`Validation failed for \${file}:\`, validation.errors);
          task += \`\\nFix errors in \${file}: \${validation.errors.join(", ")}\`;
          continue;
        }
      }
      return result;
    } catch (err) {
      console.error(\`Attempt \${attempt + 1} failed:\`, err.message);
      if (attempt === maxRetries - 1) throw err;
    }
  }
  return "All retry attempts exhausted.";
}`
        },
        pitfalls: [
          'Skipping validation — syntax errors slip into production code',
          'Retrying without modifying the prompt leads to the same failure',
          'Not logging errors makes debugging agent issues very difficult'
        ],
        tips: [
          'Use AST parsing for validation instead of regex — it catches real errors',
          'Append error details to the task prompt on retry so the agent can self-correct',
          'Set up structured logging from the start for observability'
        ]
      }
    ],
    errorPrevention: [
      'Always sandbox file operations to a dedicated workspace directory',
      'Set timeouts on all external processes and API calls',
      'Validate generated code with AST parsing before execution',
      'Limit context window usage by summarizing old conversation turns'
    ],
    bestPractices: [
      'Start with a well-defined system prompt and iterate based on failures',
      'Use structured JSON output for reliable action parsing',
      'Implement comprehensive logging for debugging agent behavior',
      'Add human-in-the-loop confirmation for destructive operations'
    ]
  },

  // ── Research Agent Playbook ───────────────────────────────
  research: {
    title: 'Build a Research Agent',
    description:
      'Step-by-step guide to building an AI research agent that searches multiple sources, validates information, and generates structured reports with proper citations.',
    steps: [
      {
        title: 'Configure Research Sources',
        description:
          'Set up web search APIs, document loaders, and data connectors for your research agent to query.',
        code: {
          python: `import os
import requests
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Configure search API (using Google Custom Search)
SEARCH_API_KEY = os.environ["GOOGLE_SEARCH_API_KEY"]
SEARCH_ENGINE_ID = os.environ["GOOGLE_SEARCH_ENGINE_ID"]
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

def web_search(query: str, num_results: int = 5) -> list[dict]:
    """Search the web and return structured results."""
    url = "https://www.googleapis.com/customsearch/v1"
    params = {"key": SEARCH_API_KEY, "cx": SEARCH_ENGINE_ID, "q": query, "num": num_results}
    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        items = resp.json().get("items", [])
        return [{"title": r["title"], "url": r["link"], "snippet": r["snippet"]} for r in items]
    except requests.RequestException as e:
        return [{"error": str(e)}]

# Test the search setup
results = web_search("latest AI agent frameworks 2026")
print(f"Found {len(results)} results")`,
          javascript: `import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

const SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Search the web using Google Custom Search API.
 * @param {string} query - Search query
 * @param {number} numResults - Number of results to return
 * @returns {Promise<Array<{title: string, url: string, snippet: string}>>}
 */
async function webSearch(query, numResults = 5) {
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", SEARCH_API_KEY);
  url.searchParams.set("cx", SEARCH_ENGINE_ID);
  url.searchParams.set("q", query);
  url.searchParams.set("num", numResults);
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const data = await resp.json();
    return (data.items ?? []).map((r) => ({
      title: r.title, url: r.link, snippet: r.snippet,
    }));
  } catch (err) {
    return [{ error: err.message }];
  }
}

const results = await webSearch("latest AI agent frameworks 2026");
console.log(\`Found \${results.length} results\`);`
        },
        pitfalls: ['Not handling search API rate limits', 'Missing timeout on HTTP requests'],
        tips: ['Cache search results to reduce API calls', 'Use multiple search providers for broader coverage']
      },
      {
        title: 'Build the Research Pipeline',
        description: 'Decompose queries, execute parallel searches, and aggregate results into a unified knowledge base.',
        code: {
          python: `import asyncio
import json

async def decompose_query(topic: str) -> list[str]:
    """Use the LLM to break a research topic into sub-queries."""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Break this research topic into 3-5 specific search queries.
Topic: {topic}
Respond with a JSON array of strings only.""",
    )
    try:
        text = response.text.strip().strip("\`\`\`json").strip("\`\`\`")
        return json.loads(text)
    except json.JSONDecodeError:
        return [topic]  # Fallback to original topic

async def research_pipeline(topic: str) -> dict:
    """Run the full research pipeline: decompose → search → aggregate."""
    # Step 1: Decompose the topic into sub-queries
    sub_queries = await decompose_query(topic)
    print(f"Sub-queries: {sub_queries}")
    
    # Step 2: Search all sub-queries
    all_results = {}
    for query in sub_queries:
        results = web_search(query)
        all_results[query] = results
    
    # Step 3: Aggregate and deduplicate by URL
    seen_urls = set()
    unique_results = []
    for query, results in all_results.items():
        for r in results:
            if r.get("url") and r["url"] not in seen_urls:
                seen_urls.add(r["url"])
                r["source_query"] = query
                unique_results.append(r)
    
    return {"topic": topic, "sub_queries": sub_queries, "sources": unique_results}`,
          javascript: `/**
 * Use the LLM to decompose a research topic into specific sub-queries.
 * @param {string} topic - The broad research topic
 * @returns {Promise<string[]>} Array of specific search queries
 */
async function decomposeQuery(topic) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`Break this research topic into 3-5 specific search queries.
Topic: \${topic}
Respond with a JSON array of strings only.\`,
  });
  try {
    const text = response.text.trim().replace(/\`\`\`json?/g, "").replace(/\`\`\`/g, "");
    return JSON.parse(text);
  } catch {
    return [topic];
  }
}

/**
 * Run the full research pipeline: decompose → search → aggregate.
 * @param {string} topic - Research topic
 * @returns {Promise<{topic: string, sub_queries: string[], sources: object[]}>}
 */
async function researchPipeline(topic) {
  const subQueries = await decomposeQuery(topic);
  console.log("Sub-queries:", subQueries);

  // Search all sub-queries in parallel
  const searchResults = await Promise.all(subQueries.map((q) => webSearch(q)));
  const allResults = Object.fromEntries(subQueries.map((q, i) => [q, searchResults[i]]));

  // Aggregate and deduplicate by URL
  const seenUrls = new Set();
  const uniqueResults = [];
  for (const [query, results] of Object.entries(allResults)) {
    for (const r of results) {
      if (r.url && !seenUrls.has(r.url)) {
        seenUrls.add(r.url);
        uniqueResults.push({ ...r, sourceQuery: query });
      }
    }
  }
  return { topic, subQueries, sources: uniqueResults };
}`
        },
        pitfalls: ['Not deduplicating results from overlapping queries', 'Sequential searches when parallel is possible'],
        tips: ['Run sub-query searches in parallel for faster results', 'Track which query each result came from for better citations']
      },
      {
        title: 'Implement Source Validation',
        description: 'Cross-reference sources, score credibility, and filter unreliable information.',
        code: {
          python: `def score_credibility(source: dict) -> float:
    """Score a source's credibility based on domain and content signals."""
    score = 0.5  # Base score
    url = source.get("url", "")
    
    # Domain authority heuristics
    trusted_domains = [".edu", ".gov", ".org", "arxiv.org", "nature.com", "ieee.org"]
    if any(domain in url for domain in trusted_domains):
        score += 0.3
    
    news_domains = ["reuters.com", "apnews.com", "bbc.com"]
    if any(domain in url for domain in news_domains):
        score += 0.2
    
    # Penalize user-generated content platforms
    ugc_domains = ["reddit.com", "quora.com", "medium.com"]
    if any(domain in url for domain in ugc_domains):
        score -= 0.15
    
    return min(max(score, 0.0), 1.0)  # Clamp to [0, 1]

def validate_sources(sources: list[dict], min_score: float = 0.4) -> list[dict]:
    """Filter and rank sources by credibility score."""
    scored = []
    for source in sources:
        source["credibility"] = score_credibility(source)
        if source["credibility"] >= min_score:
            scored.append(source)
    return sorted(scored, key=lambda s: s["credibility"], reverse=True)`,
          javascript: `/**
 * Score a source's credibility based on domain and content signals.
 * @param {{url: string}} source - The source to score
 * @returns {number} Credibility score between 0 and 1
 */
function scoreCredibility(source) {
  let score = 0.5;
  const url = source.url ?? "";

  const trusted = [".edu", ".gov", ".org", "arxiv.org", "nature.com", "ieee.org"];
  if (trusted.some((d) => url.includes(d))) score += 0.3;

  const news = ["reuters.com", "apnews.com", "bbc.com"];
  if (news.some((d) => url.includes(d))) score += 0.2;

  const ugc = ["reddit.com", "quora.com", "medium.com"];
  if (ugc.some((d) => url.includes(d))) score -= 0.15;

  return Math.min(Math.max(score, 0), 1);
}

/**
 * Filter and rank sources by credibility score.
 * @param {object[]} sources - Array of source objects
 * @param {number} minScore - Minimum credibility threshold
 * @returns {object[]} Filtered and sorted sources
 */
function validateSources(sources, minScore = 0.4) {
  return sources
    .map((s) => ({ ...s, credibility: scoreCredibility(s) }))
    .filter((s) => s.credibility >= minScore)
    .sort((a, b) => b.credibility - a.credibility);
}`
        },
        pitfalls: ['Trusting all sources equally without validation', 'Using only domain as a proxy for quality'],
        tips: ['Combine domain heuristics with LLM-based fact-checking for best results', 'Track credibility scores in your citations for transparency']
      },
      {
        title: 'Generate Research Report',
        description: 'Use the LLM to synthesize validated sources into a structured research report with proper citations.',
        code: {
          python: `async def generate_report(research_data: dict) -> str:
    """Generate a structured research report from validated sources."""
    sources = validate_sources(research_data["sources"])
    source_text = "\\n".join(
        f"[{i+1}] {s['title']} ({s['url']}) — Score: {s['credibility']:.1f}\\n    {s['snippet']}"
        for i, s in enumerate(sources[:10])
    )
    
    prompt = f"""Write a comprehensive research report on: {research_data['topic']}

Use ONLY these validated sources for information. Cite sources using [N] notation.

Sources:
{source_text}

Format the report as:
# Research Report: [Topic]
## Executive Summary
## Key Findings
## Detailed Analysis
## Conclusions
## References
"""
    response = client.models.generate_content(model="gemini-2.5-pro", contents=prompt)
    return response.text`,
          javascript: `/**
 * Generate a structured research report from validated sources.
 * @param {object} researchData - Output from researchPipeline
 * @returns {Promise<string>} Formatted research report in Markdown
 */
async function generateReport(researchData) {
  const sources = validateSources(researchData.sources);
  const sourceText = sources
    .slice(0, 10)
    .map((s, i) => \`[\${i + 1}] \${s.title} (\${s.url}) — Score: \${s.credibility.toFixed(1)}\\n    \${s.snippet}\`)
    .join("\\n");

  const prompt = \`Write a comprehensive research report on: \${researchData.topic}

Use ONLY these validated sources for information. Cite sources using [N] notation.

Sources:
\${sourceText}

Format the report as:
# Research Report: [Topic]
## Executive Summary
## Key Findings
## Detailed Analysis
## Conclusions
## References\`;

  const response = await ai.models.generateContent({ model: "gemini-2.5-pro", contents: prompt });
  return response.text;
}`
        },
        pitfalls: ['Not providing sources to the LLM, leading to hallucinated citations', 'Using too many sources which dilutes focus'],
        tips: ['Limit to the top 10 most credible sources for focused reports', 'Ask the model to explicitly cite which source each claim comes from']
      },
      {
        title: 'Add Iterative Refinement',
        description: 'Implement follow-up queries and gap analysis to improve research completeness.',
        code: {
          python: `async def identify_gaps(report: str, topic: str) -> list[str]:
    """Identify knowledge gaps in the report and suggest follow-up queries."""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Analyze this research report for gaps and missing information.

Topic: {topic}
Report: {report[:3000]}

Respond with a JSON array of follow-up search queries to fill gaps. Max 3 queries.""",
    )
    try:
        text = response.text.strip().strip("\`\`\`json").strip("\`\`\`")
        return json.loads(text)
    except json.JSONDecodeError:
        return []

async def iterative_research(topic: str, max_rounds: int = 2) -> str:
    """Run research iteratively, filling gaps between rounds."""
    data = await research_pipeline(topic)
    report = await generate_report(data)
    
    for round_num in range(max_rounds):
        gaps = await identify_gaps(report, topic)
        if not gaps:
            print(f"No gaps found after round {round_num + 1}. Research complete.")
            break
        print(f"Round {round_num + 2}: Filling {len(gaps)} gaps...")
        for query in gaps:
            new_results = web_search(query)
            data["sources"].extend(new_results)
        report = await generate_report(data)
    
    return report`,
          javascript: `/**
 * Identify knowledge gaps in the report and suggest follow-up queries.
 * @param {string} report - The current research report
 * @param {string} topic - The research topic
 * @returns {Promise<string[]>} Follow-up search queries
 */
async function identifyGaps(report, topic) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`Analyze this research report for gaps and missing information.

Topic: \${topic}
Report: \${report.slice(0, 3000)}

Respond with a JSON array of follow-up search queries to fill gaps. Max 3 queries.\`,
  });
  try {
    const text = response.text.trim().replace(/\`\`\`json?/g, "").replace(/\`\`\`/g, "");
    return JSON.parse(text);
  } catch {
    return [];
  }
}

/**
 * Run research iteratively, filling gaps between rounds.
 * @param {string} topic - The research topic
 * @param {number} maxRounds - Maximum refinement iterations
 * @returns {Promise<string>} Final research report
 */
async function iterativeResearch(topic, maxRounds = 2) {
  const data = await researchPipeline(topic);
  let report = await generateReport(data);

  for (let round = 0; round < maxRounds; round++) {
    const gaps = await identifyGaps(report, topic);
    if (gaps.length === 0) {
      console.log(\`No gaps after round \${round + 1}. Done.\`);
      break;
    }
    console.log(\`Round \${round + 2}: Filling \${gaps.length} gaps...\`);
    const newResults = await Promise.all(gaps.map((q) => webSearch(q)));
    data.sources.push(...newResults.flat());
    report = await generateReport(data);
  }
  return report;
}`
        },
        pitfalls: ['Infinite refinement loops without a round limit', 'Not deduplicating sources across rounds'],
        tips: ['Cap refinement to 2–3 rounds for practical time limits', 'Deduplicate sources by URL across all rounds']
      }
    ],
    errorPrevention: [
      'Always validate search API responses before processing',
      'Set timeouts on all HTTP requests to prevent hanging',
      'Deduplicate sources by URL to avoid redundant information',
      'Limit the number of sources passed to the LLM to prevent context overflow'
    ],
    bestPractices: [
      'Decompose broad topics into focused sub-queries for better coverage',
      'Score and rank source credibility before synthesis',
      'Use iterative refinement to fill knowledge gaps automatically',
      'Include proper citations in all generated reports'
    ]
  },

  // ── Data Processing Playbook ──────────────────────────────
  data: {
    title: 'Build a Data Processing Agent',
    description:
      'Step-by-step guide to building an AI-powered data processing pipeline that extracts, transforms, and loads data with intelligent error handling and schema inference.',
    steps: [
      {
        title: 'Set Up Data Connectors',
        description: 'Create connectors for databases, APIs, and file systems to ingest data from multiple sources.',
        code: {
          python: `import csv
import json
import sqlite3
from pathlib import Path
from dataclasses import dataclass, field

@dataclass
class DataSource:
    """Represents a data source with its connection details."""
    name: str
    source_type: str  # "csv", "json", "sqlite", "api"
    path: str
    schema: dict = field(default_factory=dict)

def load_csv(path: str) -> list[dict]:
    """Load a CSV file and return a list of row dictionaries."""
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)

def load_json(path: str) -> list[dict]:
    """Load a JSON file (array or newline-delimited)."""
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data if isinstance(data, list) else [data]

def load_sqlite(path: str, table: str) -> list[dict]:
    """Load all rows from a SQLite table."""
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    cursor = conn.execute(f"SELECT * FROM {table}")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

LOADERS = {"csv": load_csv, "json": load_json, "sqlite": load_sqlite}`,
          javascript: `import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import Database from "better-sqlite3";

/**
 * Load a CSV file and return an array of row objects.
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<object[]>} Parsed rows
 */
async function loadCsv(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  return parse(content, { columns: true, skip_empty_lines: true });
}

/**
 * Load a JSON file (array or single object).
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<object[]>} Parsed data as array
 */
async function loadJson(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : [data];
}

/**
 * Load all rows from a SQLite table.
 * @param {string} dbPath - Path to the SQLite database
 * @param {string} table - Table name
 * @returns {object[]} Array of row objects
 */
function loadSqlite(dbPath, table) {
  const db = new Database(dbPath, { readonly: true });
  const rows = db.prepare(\`SELECT * FROM \${table}\`).all();
  db.close();
  return rows;
}

const LOADERS = { csv: loadCsv, json: loadJson, sqlite: loadSqlite };`
        },
        pitfalls: ['Not handling file encoding issues (always use UTF-8)', 'SQL injection when passing user-provided table names'],
        tips: ['Use a data class or type to standardize source metadata', 'Always close database connections after loading']
      },
      {
        title: 'Build Extraction Pipeline',
        description: 'Infer schemas automatically and extract data with type validation.',
        code: {
          python: `def infer_schema(rows: list[dict]) -> dict[str, str]:
    """Infer column types from sample data rows."""
    if not rows:
        return {}
    schema = {}
    sample = rows[:100]  # Sample first 100 rows
    for key in sample[0].keys():
        values = [row.get(key) for row in sample if row.get(key) is not None]
        if not values:
            schema[key] = "unknown"
            continue
        # Try numeric detection
        try:
            [float(v) for v in values[:10]]
            schema[key] = "integer" if all("." not in str(v) for v in values[:10]) else "float"
        except (ValueError, TypeError):
            # Check for boolean
            if all(str(v).lower() in ("true", "false", "0", "1") for v in values[:10]):
                schema[key] = "boolean"
            else:
                schema[key] = "string"
    return schema

def extract_with_validation(source: DataSource) -> dict:
    """Extract data from a source and validate against inferred schema."""
    loader = LOADERS.get(source.source_type)
    if not loader:
        return {"success": False, "error": f"Unknown source type: {source.source_type}"}
    
    rows = loader(source.path) if source.source_type != "sqlite" else loader(source.path, "main")
    schema = infer_schema(rows)
    
    return {"success": True, "rows": rows, "schema": schema, "count": len(rows)}`,
          javascript: `/**
 * Infer column types from sample data rows.
 * @param {object[]} rows - Data rows to analyze
 * @returns {Record<string, string>} Column name to type mapping
 */
function inferSchema(rows) {
  if (!rows.length) return {};
  const schema = {};
  const sample = rows.slice(0, 100);
  for (const key of Object.keys(sample[0])) {
    const values = sample.map((r) => r[key]).filter((v) => v != null);
    if (!values.length) { schema[key] = "unknown"; continue; }
    const isNumeric = values.slice(0, 10).every((v) => !isNaN(Number(v)));
    if (isNumeric) {
      schema[key] = values.slice(0, 10).every((v) => !String(v).includes(".")) ? "integer" : "float";
    } else if (values.slice(0, 10).every((v) => ["true","false","0","1"].includes(String(v).toLowerCase()))) {
      schema[key] = "boolean";
    } else {
      schema[key] = "string";
    }
  }
  return schema;
}

/**
 * Extract data from a source and validate against inferred schema.
 * @param {{sourceType: string, path: string}} source - Source configuration
 * @returns {Promise<{success: boolean, rows?: object[], schema?: object}>}
 */
async function extractWithValidation(source) {
  const loader = LOADERS[source.sourceType];
  if (!loader) return { success: false, error: \`Unknown type: \${source.sourceType}\` };
  const rows = await loader(source.path);
  const schema = inferSchema(rows);
  return { success: true, rows, schema, count: rows.length };
}`
        },
        pitfalls: ['Not sampling data for schema inference (scanning all rows is slow)', 'Assuming all rows have the same keys'],
        tips: ['Sample the first 100 rows for fast schema inference', 'Store the inferred schema alongside the data for downstream use']
      },
      {
        title: 'Implement Transformation Logic',
        description: 'Clean, normalize, and enrich data with AI-assisted transformations.',
        code: {
          python: `import re
from datetime import datetime

def clean_value(value: str, expected_type: str) -> any:
    """Clean and cast a value to its expected type."""
    if value is None or str(value).strip() == "":
        return None
    value = str(value).strip()
    if expected_type == "integer":
        return int(float(value))
    elif expected_type == "float":
        return float(value)
    elif expected_type == "boolean":
        return value.lower() in ("true", "1", "yes")
    return value

def normalize_row(row: dict, schema: dict) -> dict:
    """Normalize a single data row based on the schema."""
    cleaned = {}
    for key, expected_type in schema.items():
        cleaned[key] = clean_value(row.get(key), expected_type)
    return cleaned

def transform_dataset(rows: list[dict], schema: dict) -> dict:
    """Transform an entire dataset: clean, normalize, and compute stats."""
    cleaned_rows = [normalize_row(row, schema) for row in rows]
    null_counts = {k: sum(1 for r in cleaned_rows if r.get(k) is None) for k in schema}
    
    return {
        "rows": cleaned_rows,
        "total": len(cleaned_rows),
        "null_counts": null_counts,
        "completeness": {k: 1 - (v / len(cleaned_rows)) for k, v in null_counts.items()},
    }`,
          javascript: `/**
 * Clean and cast a value to its expected type.
 * @param {*} value - Raw value
 * @param {string} expectedType - Target type
 * @returns {*} Cleaned value
 */
function cleanValue(value, expectedType) {
  if (value == null || String(value).trim() === "") return null;
  const v = String(value).trim();
  if (expectedType === "integer") return Math.round(Number(v));
  if (expectedType === "float") return Number(v);
  if (expectedType === "boolean") return ["true", "1", "yes"].includes(v.toLowerCase());
  return v;
}

/**
 * Transform an entire dataset: clean, normalize, and compute stats.
 * @param {object[]} rows - Raw data rows
 * @param {Record<string, string>} schema - Column type mapping
 * @returns {{rows: object[], total: number, nullCounts: object, completeness: object}}
 */
function transformDataset(rows, schema) {
  const cleaned = rows.map((row) => {
    const out = {};
    for (const [key, type] of Object.entries(schema)) out[key] = cleanValue(row[key], type);
    return out;
  });
  const nullCounts = {};
  for (const key of Object.keys(schema)) {
    nullCounts[key] = cleaned.filter((r) => r[key] == null).length;
  }
  const completeness = {};
  for (const [k, v] of Object.entries(nullCounts)) completeness[k] = 1 - v / cleaned.length;
  return { rows: cleaned, total: cleaned.length, nullCounts, completeness };
}`
        },
        pitfalls: ['Not handling null/empty values before type casting', 'Mutating original data instead of creating cleaned copies'],
        tips: ['Always create new objects during transformation — never mutate originals', 'Track null counts and completeness metrics for data quality monitoring']
      },
      {
        title: 'Add Error Handling & Retry',
        description: 'Implement robust error handling with exponential backoff for transient failures.',
        code: {
          python: `import time
import logging
from functools import wraps

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("data_agent")

def retry_with_backoff(max_retries: int = 3, base_delay: float = 1.0):
    """Decorator that retries a function with exponential backoff."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    delay = base_delay * (2 ** attempt)
                    logger.warning(f"Attempt {attempt+1}/{max_retries} failed: {e}. Retrying in {delay}s...")
                    if attempt == max_retries - 1:
                        logger.error(f"All {max_retries} attempts failed for {func.__name__}")
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

@retry_with_backoff(max_retries=3, base_delay=1.0)
def safe_extract(source: DataSource) -> dict:
    """Extract data with automatic retry on transient failures."""
    return extract_with_validation(source)`,
          javascript: `/**
 * Retry a function with exponential backoff.
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum attempts
 * @param {number} baseDelay - Initial delay in milliseconds
 * @returns {Promise<*>} Result of the function
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const delay = baseDelay * 2 ** attempt;
      console.warn(\`Attempt \${attempt + 1}/\${maxRetries} failed: \${err.message}. Retrying in \${delay}ms...\`);
      if (attempt === maxRetries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

/**
 * Extract data with automatic retry on transient failures.
 * @param {{sourceType: string, path: string}} source - Source configuration
 * @returns {Promise<object>} Extraction result
 */
async function safeExtract(source) {
  return retryWithBackoff(() => extractWithValidation(source));
}`
        },
        pitfalls: ['Retrying on non-transient errors (e.g., invalid file path)', 'Not using exponential backoff — hammering a failing service'],
        tips: ['Use exponential backoff to avoid overwhelming services', 'Log every retry attempt for debugging and monitoring']
      },
      {
        title: 'Output & Monitoring',
        description: 'Write processed data to output targets and set up logging and metrics for pipeline monitoring.',
        code: {
          python: `import json
from datetime import datetime

def write_output(data: dict, output_path: str, format: str = "json") -> dict:
    """Write processed data to the specified output format."""
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    
    if format == "json":
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data["rows"], f, indent=2, default=str)
    elif format == "csv":
        if data["rows"]:
            with open(path, "w", encoding="utf-8", newline="") as f:
                writer = csv.DictWriter(f, fieldnames=data["rows"][0].keys())
                writer.writeheader()
                writer.writerows(data["rows"])
    
    stats = {
        "output_path": str(path),
        "format": format,
        "rows_written": data["total"],
        "completeness": data.get("completeness", {}),
        "timestamp": datetime.now().isoformat(),
    }
    logger.info(f"Pipeline complete: {stats['rows_written']} rows written to {path}")
    return stats`,
          javascript: `/**
 * Write processed data to the specified output format.
 * @param {object} data - Transformed dataset with rows and metadata
 * @param {string} outputPath - File path for the output
 * @param {string} format - Output format ("json" or "csv")
 * @returns {Promise<object>} Pipeline statistics
 */
async function writeOutput(data, outputPath, format = "json") {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  if (format === "json") {
    await fs.writeFile(outputPath, JSON.stringify(data.rows, null, 2), "utf-8");
  } else if (format === "csv" && data.rows.length) {
    const headers = Object.keys(data.rows[0]).join(",");
    const rows = data.rows.map((r) => Object.values(r).map((v) => \`"\${v ?? ""}"\`).join(","));
    await fs.writeFile(outputPath, [headers, ...rows].join("\\n"), "utf-8");
  }

  const stats = {
    outputPath,
    format,
    rowsWritten: data.total,
    completeness: data.completeness ?? {},
    timestamp: new Date().toISOString(),
  };
  console.log(\`Pipeline complete: \${stats.rowsWritten} rows written to \${outputPath}\`);
  return stats;
}`
        },
        pitfalls: ['Not creating parent directories before writing output files', 'Forgetting to log pipeline statistics for auditing'],
        tips: ['Always log a summary with row counts, timestamp, and completeness', 'Support multiple output formats (JSON, CSV) for flexibility']
      }
    ],
    errorPrevention: [
      'Validate source files exist before attempting extraction',
      'Use exponential backoff for all external service calls',
      'Track data completeness metrics through the entire pipeline',
      'Write output atomically — write to a temp file then rename'
    ],
    bestPractices: [
      'Infer schema automatically but allow manual overrides',
      'Never mutate source data — always create transformed copies',
      'Log every pipeline stage with row counts and timing',
      'Store pipeline metadata alongside output for reproducibility'
    ]
  },

  // ── Content Creation Playbook ─────────────────────────────
  content: {
    title: 'Build a Content Creation Agent',
    description:
      'Step-by-step guide to building an AI content pipeline that researches topics, generates drafts, applies quality checks, and outputs in multiple formats.',
    steps: [
      {
        title: 'Define Content Strategy',
        description: 'Set up templates, tone guidelines, audience profiles, and style rules for consistent content.',
        code: {
          python: `from dataclasses import dataclass

@dataclass
class ContentStrategy:
    """Defines the content strategy for the generation pipeline."""
    audience: str
    tone: str
    style_rules: list[str]
    word_count_range: tuple[int, int]
    formats: list[str]

# Define a strategy for technical blog content
blog_strategy = ContentStrategy(
    audience="Software developers with 2-5 years of experience",
    tone="Professional yet approachable, technically precise, avoids jargon where possible",
    style_rules=[
        "Use active voice throughout",
        "Include code examples for every concept",
        "Start with a real-world problem statement",
        "End with actionable takeaways",
        "Use short paragraphs (3-4 sentences max)",
    ],
    word_count_range=(1200, 2000),
    formats=["blog", "social_media", "newsletter"],
)

def build_style_prompt(strategy: ContentStrategy) -> str:
    """Convert a content strategy into LLM-ready instructions."""
    rules = "\\n".join(f"- {rule}" for rule in strategy.style_rules)
    return f"""Write for: {strategy.audience}
Tone: {strategy.tone}
Word count: {strategy.word_count_range[0]}-{strategy.word_count_range[1]} words
Style rules:
{rules}"""`,
          javascript: `/**
 * @typedef {Object} ContentStrategy
 * @property {string} audience - Target audience description
 * @property {string} tone - Writing tone guidelines
 * @property {string[]} styleRules - List of style rules
 * @property {[number, number]} wordCountRange - Min and max word count
 * @property {string[]} formats - Output formats to generate
 */

/** Technical blog content strategy. */
const blogStrategy = {
  audience: "Software developers with 2-5 years of experience",
  tone: "Professional yet approachable, technically precise, avoids jargon where possible",
  styleRules: [
    "Use active voice throughout",
    "Include code examples for every concept",
    "Start with a real-world problem statement",
    "End with actionable takeaways",
    "Use short paragraphs (3-4 sentences max)",
  ],
  wordCountRange: [1200, 2000],
  formats: ["blog", "social_media", "newsletter"],
};

/**
 * Convert a content strategy into LLM-ready instructions.
 * @param {ContentStrategy} strategy
 * @returns {string} Formatted style prompt
 */
function buildStylePrompt(strategy) {
  const rules = strategy.styleRules.map((r) => \`- \${r}\`).join("\\n");
  return \`Write for: \${strategy.audience}
Tone: \${strategy.tone}
Word count: \${strategy.wordCountRange[0]}-\${strategy.wordCountRange[1]} words
Style rules:
\${rules}\`;
}`
        },
        pitfalls: ['Vague audience definitions lead to unfocused content', 'Not enforcing word count ranges in the prompt'],
        tips: ['Be very specific about audience — "developers" is too broad', 'Include style rules as explicit instructions in every generation prompt']
      },
      {
        title: 'Build the Content Pipeline',
        description: 'Implement the research → outline → draft → review flow for end-to-end content generation.',
        code: {
          python: `async def generate_outline(topic: str, strategy: ContentStrategy) -> str:
    """Generate a structured outline before writing the full draft."""
    style = build_style_prompt(strategy)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Create a detailed outline for an article about: {topic}

{style}

Format as a numbered outline with main sections and 2-3 sub-points each.
Include an estimated word count per section.""",
    )
    return response.text

async def generate_draft(topic: str, outline: str, strategy: ContentStrategy) -> str:
    """Generate a full draft based on the outline and strategy."""
    style = build_style_prompt(strategy)
    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=f"""Write a complete article based on this outline.

Topic: {topic}
{style}

Outline:
{outline}

Write the full article in Markdown format. Follow the outline structure closely.""",
    )
    return response.text

async def content_pipeline(topic: str, strategy: ContentStrategy) -> dict:
    """Run the full content pipeline: outline → draft → return both."""
    outline = await generate_outline(topic, strategy)
    draft = await generate_draft(topic, outline, strategy)
    word_count = len(draft.split())
    return {"topic": topic, "outline": outline, "draft": draft, "word_count": word_count}`,
          javascript: `/**
 * Generate a structured outline before writing the full draft.
 * @param {string} topic - Article topic
 * @param {ContentStrategy} strategy - Content strategy config
 * @returns {Promise<string>} Structured outline
 */
async function generateOutline(topic, strategy) {
  const style = buildStylePrompt(strategy);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`Create a detailed outline for an article about: \${topic}

\${style}

Format as a numbered outline with main sections and 2-3 sub-points each.
Include an estimated word count per section.\`,
  });
  return response.text;
}

/**
 * Run the full content pipeline: outline → draft.
 * @param {string} topic - Article topic
 * @param {ContentStrategy} strategy - Content strategy
 * @returns {Promise<{topic: string, outline: string, draft: string, wordCount: number}>}
 */
async function contentPipeline(topic, strategy) {
  const outline = await generateOutline(topic, strategy);
  const style = buildStylePrompt(strategy);
  const draftResp = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: \`Write a complete article based on this outline.
Topic: \${topic}
\${style}

Outline:
\${outline}

Write the full article in Markdown format. Follow the outline structure closely.\`,
  });
  const draft = draftResp.text;
  return { topic, outline, draft, wordCount: draft.split(/\\s+/).length };
}`
        },
        pitfalls: ['Skipping the outline step — leads to unfocused drafts', 'Using the same model for both outline and draft (waste of budget)'],
        tips: ['Use a cheaper, faster model for outlines and a powerful one for drafts', 'Always generate an outline first — it dramatically improves quality']
      },
      {
        title: 'Implement Quality Checks',
        description: 'Automated grammar, factuality, and style consistency checks using the LLM.',
        code: {
          python: `async def quality_check(draft: str, strategy: ContentStrategy) -> dict:
    """Run automated quality checks on the draft content."""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Review this article for quality issues. Check for:
1. Grammar and spelling errors
2. Factual accuracy concerns
3. Style consistency with these rules: {strategy.style_rules}
4. Readability and flow

Article:
{draft[:4000]}

Respond with JSON:
{{
  "score": 0-100,
  "grammar_issues": ["issue1", ...],
  "factual_concerns": ["concern1", ...],
  "style_violations": ["violation1", ...],
  "suggestions": ["suggestion1", ...]
}}""",
    )
    try:
        text = response.text.strip().strip("\`\`\`json").strip("\`\`\`")
        return json.loads(text)
    except json.JSONDecodeError:
        return {"score": 0, "error": "Failed to parse quality check results"}`,
          javascript: `/**
 * Run automated quality checks on the draft content.
 * @param {string} draft - The article draft
 * @param {ContentStrategy} strategy - Content strategy for style rules
 * @returns {Promise<{score: number, grammar_issues: string[], suggestions: string[]}>}
 */
async function qualityCheck(draft, strategy) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`Review this article for quality issues. Check for:
1. Grammar and spelling errors
2. Factual accuracy concerns
3. Style consistency with these rules: \${strategy.styleRules.join(", ")}
4. Readability and flow

Article:
\${draft.slice(0, 4000)}

Respond with JSON:
{
  "score": 0-100,
  "grammar_issues": [],
  "factual_concerns": [],
  "style_violations": [],
  "suggestions": []
}\`,
  });
  try {
    const text = response.text.trim().replace(/\`\`\`json?/g, "").replace(/\`\`\`/g, "");
    return JSON.parse(text);
  } catch {
    return { score: 0, error: "Failed to parse quality check" };
  }
}`
        },
        pitfalls: ['Trusting LLM quality scores as absolute truth', 'Not truncating long drafts before sending for review'],
        tips: ['Use quality scores as signals, not final verdicts', 'Run multiple quality check passes for different concerns']
      },
      {
        title: 'Add Multi-Format Output',
        description: 'Transform the approved draft into multiple formats: blog post, social media, newsletter.',
        code: {
          python: `async def transform_to_format(draft: str, target_format: str) -> str:
    """Transform a blog draft into a different content format."""
    format_instructions = {
        "social_media": "Convert to a Twitter/X thread (5-8 tweets, each under 280 chars). Use emojis and hashtags.",
        "newsletter": "Convert to an email newsletter with a catchy subject line, preview text, and CTA button.",
        "documentation": "Convert to technical documentation with proper headings, code blocks, and API references.",
    }
    instruction = format_instructions.get(target_format, f"Convert to {target_format} format.")
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""{instruction}

Original article:
{draft[:3000]}

Preserve the key information but adapt tone and structure for the target format.""",
    )
    return response.text

async def multi_format_output(draft: str, formats: list[str]) -> dict[str, str]:
    """Generate the content in all requested formats."""
    outputs = {"blog": draft}
    for fmt in formats:
        if fmt != "blog":
            outputs[fmt] = await transform_to_format(draft, fmt)
    return outputs`,
          javascript: `/**
 * Transform a blog draft into a different content format.
 * @param {string} draft - Original blog draft
 * @param {string} targetFormat - Target format name
 * @returns {Promise<string>} Transformed content
 */
async function transformToFormat(draft, targetFormat) {
  const instructions = {
    social_media: "Convert to a Twitter/X thread (5-8 tweets, each under 280 chars). Use emojis and hashtags.",
    newsletter: "Convert to an email newsletter with a catchy subject line, preview text, and CTA button.",
    documentation: "Convert to technical documentation with proper headings, code blocks, and API references.",
  };
  const instruction = instructions[targetFormat] ?? \`Convert to \${targetFormat} format.\`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`\${instruction}

Original article:
\${draft.slice(0, 3000)}

Preserve the key information but adapt tone and structure for the target format.\`,
  });
  return response.text;
}

/**
 * Generate the content in all requested formats.
 * @param {string} draft - Original blog draft
 * @param {string[]} formats - Target formats
 * @returns {Promise<Record<string, string>>} Format-keyed content map
 */
async function multiFormatOutput(draft, formats) {
  const outputs = { blog: draft };
  const tasks = formats.filter((f) => f !== "blog").map(async (fmt) => {
    outputs[fmt] = await transformToFormat(draft, fmt);
  });
  await Promise.all(tasks);
  return outputs;
}`
        },
        pitfalls: ['Not adapting tone and length for each format', 'Sequential format generation when parallel is possible'],
        tips: ['Generate all format variants in parallel for speed', 'Each format has different length and tone constraints — be explicit in prompts']
      },
      {
        title: 'Feedback Loop & Iteration',
        description: 'Integrate human review, collect feedback, and iteratively improve content.',
        code: {
          python: `async def apply_feedback(draft: str, feedback: str, strategy: ContentStrategy) -> str:
    """Revise the draft based on human feedback."""
    style = build_style_prompt(strategy)
    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=f"""Revise this article based on the following feedback.

{style}

Original draft:
{draft[:3000]}

Feedback:
{feedback}

Rewrite the article incorporating all feedback points. Maintain the same structure.""",
    )
    return response.text

async def iterative_content(topic: str, strategy: ContentStrategy, max_rounds: int = 3) -> dict:
    """Full content workflow with quality check loop."""
    result = await content_pipeline(topic, strategy)
    
    for round_num in range(max_rounds):
        check = await quality_check(result["draft"], strategy)
        print(f"Round {round_num + 1} — Quality score: {check.get('score', 'N/A')}")
        if check.get("score", 0) >= 85:
            print("Quality threshold met!")
            break
        # Auto-generate feedback from quality issues
        issues = check.get("suggestions", []) + check.get("style_violations", [])
        if issues:
            feedback = "Fix these issues: " + "; ".join(issues)
            result["draft"] = await apply_feedback(result["draft"], feedback, strategy)
    
    result["formats"] = await multi_format_output(result["draft"], strategy.formats)
    return result`,
          javascript: `/**
 * Revise the draft based on human or automated feedback.
 * @param {string} draft - Current draft
 * @param {string} feedback - Feedback to incorporate
 * @param {ContentStrategy} strategy - Content strategy
 * @returns {Promise<string>} Revised draft
 */
async function applyFeedback(draft, feedback, strategy) {
  const style = buildStylePrompt(strategy);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: \`Revise this article based on the following feedback.
\${style}

Original draft:
\${draft.slice(0, 3000)}

Feedback:
\${feedback}

Rewrite the article incorporating all feedback. Maintain the same structure.\`,
  });
  return response.text;
}

/**
 * Full content workflow with iterative quality check loop.
 * @param {string} topic - Article topic
 * @param {ContentStrategy} strategy - Content strategy
 * @param {number} maxRounds - Maximum revision rounds
 * @returns {Promise<object>} Final content with all formats
 */
async function iterativeContent(topic, strategy, maxRounds = 3) {
  const result = await contentPipeline(topic, strategy);
  for (let round = 0; round < maxRounds; round++) {
    const check = await qualityCheck(result.draft, strategy);
    console.log(\`Round \${round + 1} — Quality: \${check.score ?? "N/A"}\`);
    if ((check.score ?? 0) >= 85) { console.log("Quality threshold met!"); break; }
    const issues = [...(check.suggestions ?? []), ...(check.style_violations ?? [])];
    if (issues.length) {
      result.draft = await applyFeedback(result.draft, "Fix: " + issues.join("; "), strategy);
    }
  }
  result.formats = await multiFormatOutput(result.draft, strategy.formats);
  return result;
}`
        },
        pitfalls: ['Infinite revision loops without a quality threshold', 'Not preserving previous drafts for comparison'],
        tips: ['Set a clear quality score threshold (e.g., 85) to stop iteration', 'Keep all draft versions for A/B comparison and rollback']
      }
    ],
    errorPrevention: [
      'Always validate LLM output format before processing further',
      'Set maximum revision rounds to prevent infinite loops',
      'Truncate long drafts before sending for quality review',
      'Store intermediate outputs for debugging and rollback'
    ],
    bestPractices: [
      'Start every piece of content with a structured outline',
      'Use a fast model for outlines and quality checks, a powerful one for drafts',
      'Define explicit style rules and enforce them in every prompt',
      'Generate multi-format outputs in parallel for efficiency'
    ]
  },

  // ── Customer Support Playbook ─────────────────────────────
  support: {
    title: 'Build a Customer Support Agent',
    description:
      'Step-by-step guide to building an AI customer support agent with RAG-based knowledge retrieval, intent classification, escalation logic, and conversation memory.',
    steps: [
      {
        title: 'Set Up Knowledge Base',
        description: 'Create a RAG (Retrieval-Augmented Generation) system with document indexing and FAQ database.',
        code: {
          python: `import hashlib
from dataclasses import dataclass, field

@dataclass
class KBArticle:
    """A knowledge base article for support reference."""
    id: str
    title: str
    content: str
    category: str
    tags: list[str] = field(default_factory=list)

class KnowledgeBase:
    """Simple in-memory knowledge base with search capability."""
    
    def __init__(self):
        self.articles: dict[str, KBArticle] = {}
    
    def add_article(self, title: str, content: str, category: str, tags: list[str] = None):
        """Add an article to the knowledge base."""
        article_id = hashlib.md5(title.encode()).hexdigest()[:8]
        self.articles[article_id] = KBArticle(
            id=article_id, title=title, content=content,
            category=category, tags=tags or [],
        )
        return article_id
    
    def search(self, query: str, max_results: int = 3) -> list[KBArticle]:
        """Search articles by keyword matching in title, content, and tags."""
        query_lower = query.lower()
        scored = []
        for article in self.articles.values():
            score = 0
            if query_lower in article.title.lower():
                score += 3
            if query_lower in article.content.lower():
                score += 1
            if any(query_lower in tag.lower() for tag in article.tags):
                score += 2
            if score > 0:
                scored.append((score, article))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [article for _, article in scored[:max_results]]

# Initialize the knowledge base
kb = KnowledgeBase()
kb.add_article("Password Reset", "To reset your password, go to Settings > Security > Reset Password...",
    category="account", tags=["password", "reset", "login", "security"])
kb.add_article("Billing FAQ", "We accept Visa, Mastercard, and PayPal. Invoices are generated monthly...",
    category="billing", tags=["payment", "invoice", "billing", "pricing"])`,
          javascript: `import crypto from "crypto";

/**
 * Simple in-memory knowledge base with keyword-based search.
 */
class KnowledgeBase {
  constructor() {
    /** @type {Map<string, {id: string, title: string, content: string, category: string, tags: string[]}>} */
    this.articles = new Map();
  }

  /**
   * Add an article to the knowledge base.
   * @param {string} title - Article title
   * @param {string} content - Article content
   * @param {string} category - Category name
   * @param {string[]} tags - Searchable tags
   * @returns {string} Article ID
   */
  addArticle(title, content, category, tags = []) {
    const id = crypto.createHash("md5").update(title).digest("hex").slice(0, 8);
    this.articles.set(id, { id, title, content, category, tags });
    return id;
  }

  /**
   * Search articles by keyword matching.
   * @param {string} query - Search query
   * @param {number} maxResults - Maximum results to return
   * @returns {object[]} Matching articles sorted by relevance
   */
  search(query, maxResults = 3) {
    const q = query.toLowerCase();
    const scored = [...this.articles.values()]
      .map((a) => {
        let score = 0;
        if (a.title.toLowerCase().includes(q)) score += 3;
        if (a.content.toLowerCase().includes(q)) score += 1;
        if (a.tags.some((t) => t.toLowerCase().includes(q))) score += 2;
        return { score, article: a };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, maxResults).map((s) => s.article);
  }
}

const kb = new KnowledgeBase();
kb.addArticle("Password Reset", "To reset your password, go to Settings > Security > Reset Password...",
  "account", ["password", "reset", "login", "security"]);
kb.addArticle("Billing FAQ", "We accept Visa, Mastercard, and PayPal. Invoices are generated monthly...",
  "billing", ["payment", "invoice", "billing", "pricing"]);`
        },
        pitfalls: ['Using only exact match — misses synonyms and related terms', 'Not categorizing articles makes search less effective'],
        tips: ['Use tags extensively for better keyword matching', 'For production, use vector embeddings instead of keyword search']
      },
      {
        title: 'Build the Support Agent',
        description: 'Implement intent classification and context-aware response generation.',
        code: {
          python: `SUPPORT_PROMPT = """You are a helpful customer support agent. You answer questions
using ONLY the knowledge base articles provided. If the answer isn't in the articles,
say so honestly and offer to escalate.

Be concise, friendly, and professional. Always cite which article your answer comes from."""

async def classify_intent(message: str) -> dict:
    """Classify the customer's intent from their message."""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Classify this customer message into exactly one intent.
Message: "{message}"

Respond with JSON: {{"intent": "...", "confidence": 0.0-1.0, "entities": []}}
Intents: billing, account, technical, feature_request, complaint, general""",
    )
    try:
        text = response.text.strip().strip("\`\`\`json").strip("\`\`\`")
        return json.loads(text)
    except json.JSONDecodeError:
        return {"intent": "general", "confidence": 0.5, "entities": []}

async def generate_response(message: str, context: list[dict] = None) -> dict:
    """Generate a support response using KB articles and conversation context."""
    intent = await classify_intent(message)
    articles = kb.search(message)
    
    kb_context = "\\n\\n".join(
        f"[Article: {a.title}]\\n{a.content}" for a in articles
    ) if articles else "No relevant articles found."
    
    history = "\\n".join(f"{m['role']}: {m['content']}" for m in (context or []))
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""{SUPPORT_PROMPT}

Knowledge Base Articles:
{kb_context}

Conversation History:
{history}

Customer: {message}

Respond helpfully. If confidence is low, suggest escalation.""",
    )
    return {"response": response.text, "intent": intent, "articles_used": len(articles)}`,
          javascript: `const SUPPORT_PROMPT = \`You are a helpful customer support agent. You answer questions
using ONLY the knowledge base articles provided. If the answer isn't in the articles,
say so honestly and offer to escalate.

Be concise, friendly, and professional. Always cite which article your answer comes from.\`;

/**
 * Classify the customer's intent from their message.
 * @param {string} message - Customer message
 * @returns {Promise<{intent: string, confidence: number, entities: string[]}>}
 */
async function classifyIntent(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`Classify this customer message into exactly one intent.
Message: "\${message}"

Respond with JSON: {"intent": "...", "confidence": 0.0-1.0, "entities": []}
Intents: billing, account, technical, feature_request, complaint, general\`,
  });
  try {
    return JSON.parse(response.text.trim().replace(/\`\`\`json?/g, "").replace(/\`\`\`/g, ""));
  } catch {
    return { intent: "general", confidence: 0.5, entities: [] };
  }
}

/**
 * Generate a support response using KB articles and conversation context.
 * @param {string} message - Customer's current message
 * @param {Array<{role: string, content: string}>} context - Conversation history
 * @returns {Promise<{response: string, intent: object, articlesUsed: number}>}
 */
async function generateResponse(message, context = []) {
  const intent = await classifyIntent(message);
  const articles = kb.search(message);
  const kbContext = articles.length
    ? articles.map((a) => \`[Article: \${a.title}]\\n\${a.content}\`).join("\\n\\n")
    : "No relevant articles found.";
  const history = context.map((m) => \`\${m.role}: \${m.content}\`).join("\\n");
  const resp = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`\${SUPPORT_PROMPT}\\n\\nKB Articles:\\n\${kbContext}\\n\\nHistory:\\n\${history}\\n\\nCustomer: \${message}\`,
  });
  return { response: resp.text, intent, articlesUsed: articles.length };
}`
        },
        pitfalls: ['Letting the LLM hallucinate answers not in the knowledge base', 'Not classifying intent before searching — retrieves irrelevant articles'],
        tips: ['Always include "answer only from provided articles" in the system prompt', 'Classify intent first to improve search relevance']
      },
      {
        title: 'Implement Escalation Logic',
        description: 'Set confidence thresholds and rules for automatic escalation to human agents.',
        code: {
          python: `@dataclass
class EscalationRule:
    """Defines when and how to escalate to a human agent."""
    min_confidence: float = 0.6
    max_unanswered: int = 2
    escalation_intents: list[str] = field(default_factory=lambda: ["complaint"])
    
escalation_config = EscalationRule()

class EscalationManager:
    """Manages escalation decisions based on configurable rules."""
    
    def __init__(self, config: EscalationRule):
        self.config = config
        self.unanswered_count = 0
    
    def should_escalate(self, intent: dict, articles_found: int) -> dict:
        """Determine if the conversation should be escalated."""
        reasons = []
        
        # Low confidence escalation
        if intent.get("confidence", 1.0) < self.config.min_confidence:
            reasons.append(f"Low confidence: {intent['confidence']:.0%}")
        
        # No knowledge base match
        if articles_found == 0:
            self.unanswered_count += 1
            if self.unanswered_count >= self.config.max_unanswered:
                reasons.append(f"Unanswered questions: {self.unanswered_count}")
        else:
            self.unanswered_count = 0
        
        # Intent-based escalation (e.g., complaints)
        if intent.get("intent") in self.config.escalation_intents:
            reasons.append(f"Escalation intent: {intent['intent']}")
        
        return {"escalate": len(reasons) > 0, "reasons": reasons}`,
          javascript: `/**
 * Manages escalation decisions based on configurable rules.
 */
class EscalationManager {
  /**
   * @param {{minConfidence: number, maxUnanswered: number, escalationIntents: string[]}} config
   */
  constructor(config = { minConfidence: 0.6, maxUnanswered: 2, escalationIntents: ["complaint"] }) {
    this.config = config;
    this.unansweredCount = 0;
  }

  /**
   * Determine if the conversation should be escalated to a human.
   * @param {{confidence: number, intent: string}} intent - Classified intent
   * @param {number} articlesFound - Number of KB articles found
   * @returns {{escalate: boolean, reasons: string[]}}
   */
  shouldEscalate(intent, articlesFound) {
    const reasons = [];
    if ((intent.confidence ?? 1) < this.config.minConfidence) {
      reasons.push(\`Low confidence: \${Math.round((intent.confidence ?? 0) * 100)}%\`);
    }
    if (articlesFound === 0) {
      this.unansweredCount++;
      if (this.unansweredCount >= this.config.maxUnanswered) {
        reasons.push(\`Unanswered questions: \${this.unansweredCount}\`);
      }
    } else {
      this.unansweredCount = 0;
    }
    if (this.config.escalationIntents.includes(intent.intent)) {
      reasons.push(\`Escalation intent: \${intent.intent}\`);
    }
    return { escalate: reasons.length > 0, reasons };
  }
}

const escalationManager = new EscalationManager();`
        },
        pitfalls: ['Setting confidence threshold too high — escalates too many requests', 'Not resetting unanswered count after a successful answer'],
        tips: ['Start with a 0.6 confidence threshold and adjust based on data', 'Always provide escalation reasons for the human agent']
      },
      {
        title: 'Add Conversation Memory',
        description: 'Track conversation context across turns with session management.',
        code: {
          python: `from datetime import datetime

class ConversationSession:
    """Manages conversation state and history for a support session."""
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.history: list[dict] = []
        self.created_at = datetime.now()
        self.metadata: dict = {}
        self.escalated = False
    
    def add_message(self, role: str, content: str):
        """Add a message to the conversation history."""
        self.history.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat(),
        })
    
    def get_context(self, max_turns: int = 10) -> list[dict]:
        """Get recent conversation context within the turn limit."""
        return self.history[-max_turns * 2:]  # Each turn = user + assistant
    
    def get_summary(self) -> dict:
        """Get a summary of the conversation session."""
        return {
            "session_id": self.session_id,
            "turns": len(self.history) // 2,
            "duration_sec": (datetime.now() - self.created_at).seconds,
            "escalated": self.escalated,
        }

class SessionManager:
    """Manages multiple conversation sessions."""
    
    def __init__(self):
        self.sessions: dict[str, ConversationSession] = {}
    
    def get_or_create(self, session_id: str) -> ConversationSession:
        if session_id not in self.sessions:
            self.sessions[session_id] = ConversationSession(session_id)
        return self.sessions[session_id]

sessions = SessionManager()`,
          javascript: `/**
 * Manages conversation state and history for a support session.
 */
class ConversationSession {
  /** @param {string} sessionId */
  constructor(sessionId) {
    this.sessionId = sessionId;
    /** @type {Array<{role: string, content: string, timestamp: string}>} */
    this.history = [];
    this.createdAt = new Date();
    this.metadata = {};
    this.escalated = false;
  }

  /** Add a message to the conversation history. */
  addMessage(role, content) {
    this.history.push({ role, content, timestamp: new Date().toISOString() });
  }

  /** Get recent conversation context within the turn limit. */
  getContext(maxTurns = 10) {
    return this.history.slice(-(maxTurns * 2));
  }

  /** Get a summary of the conversation session. */
  getSummary() {
    return {
      sessionId: this.sessionId,
      turns: Math.floor(this.history.length / 2),
      durationSec: Math.round((Date.now() - this.createdAt.getTime()) / 1000),
      escalated: this.escalated,
    };
  }
}

/** Manages multiple conversation sessions. */
class SessionManager {
  constructor() {
    /** @type {Map<string, ConversationSession>} */
    this.sessions = new Map();
  }

  getOrCreate(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, new ConversationSession(sessionId));
    }
    return this.sessions.get(sessionId);
  }
}

const sessions = new SessionManager();`
        },
        pitfalls: ['Unbounded history growth without a turn limit', 'Not tracking session metadata for analytics'],
        tips: ['Limit context to the last 10 turns to stay within token limits', 'Store session summaries for analytics and agent training']
      },
      {
        title: 'Monitor & Improve',
        description: 'Set up analytics, feedback collection, and continuous improvement workflows.',
        code: {
          python: `from collections import defaultdict

class SupportAnalytics:
    """Tracks support agent performance metrics."""
    
    def __init__(self):
        self.intent_counts: dict[str, int] = defaultdict(int)
        self.escalation_count = 0
        self.total_conversations = 0
        self.feedback_scores: list[int] = []
        self.response_times: list[float] = []
    
    def record_interaction(self, intent: str, escalated: bool, response_time: float):
        """Record metrics from a single interaction."""
        self.intent_counts[intent] += 1
        self.total_conversations += 1
        self.response_times.append(response_time)
        if escalated:
            self.escalation_count += 1
    
    def record_feedback(self, score: int):
        """Record user feedback (1-5 scale)."""
        self.feedback_scores.append(max(1, min(5, score)))
    
    def get_dashboard(self) -> dict:
        """Generate a performance dashboard summary."""
        avg_feedback = sum(self.feedback_scores) / len(self.feedback_scores) if self.feedback_scores else 0
        avg_response = sum(self.response_times) / len(self.response_times) if self.response_times else 0
        return {
            "total_conversations": self.total_conversations,
            "escalation_rate": f"{(self.escalation_count / max(self.total_conversations, 1)) * 100:.1f}%",
            "avg_feedback": f"{avg_feedback:.1f}/5.0",
            "avg_response_time": f"{avg_response:.2f}s",
            "top_intents": dict(sorted(self.intent_counts.items(), key=lambda x: x[1], reverse=True)[:5]),
        }

analytics = SupportAnalytics()`,
          javascript: `/**
 * Tracks support agent performance metrics and generates dashboards.
 */
class SupportAnalytics {
  constructor() {
    /** @type {Record<string, number>} */
    this.intentCounts = {};
    this.escalationCount = 0;
    this.totalConversations = 0;
    /** @type {number[]} */
    this.feedbackScores = [];
    /** @type {number[]} */
    this.responseTimes = [];
  }

  /** Record metrics from a single interaction. */
  recordInteraction(intent, escalated, responseTime) {
    this.intentCounts[intent] = (this.intentCounts[intent] ?? 0) + 1;
    this.totalConversations++;
    this.responseTimes.push(responseTime);
    if (escalated) this.escalationCount++;
  }

  /** Record user feedback (1-5 scale). */
  recordFeedback(score) {
    this.feedbackScores.push(Math.max(1, Math.min(5, score)));
  }

  /** Generate a performance dashboard summary. */
  getDashboard() {
    const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    const sorted = Object.entries(this.intentCounts).sort(([, a], [, b]) => b - a).slice(0, 5);
    return {
      totalConversations: this.totalConversations,
      escalationRate: \`\${((this.escalationCount / Math.max(this.totalConversations, 1)) * 100).toFixed(1)}%\`,
      avgFeedback: \`\${avg(this.feedbackScores).toFixed(1)}/5.0\`,
      avgResponseTime: \`\${avg(this.responseTimes).toFixed(2)}s\`,
      topIntents: Object.fromEntries(sorted),
    };
  }
}

const analytics = new SupportAnalytics();`
        },
        pitfalls: ['Not collecting feedback — you can\'t improve what you don\'t measure', 'Storing raw logs without aggregation makes analysis hard'],
        tips: ['Track escalation rate as your primary quality metric', 'Review top intents weekly to identify knowledge base gaps']
      }
    ],
    errorPrevention: [
      'Always ground responses in knowledge base articles to prevent hallucination',
      'Set clear escalation thresholds and review them regularly',
      'Limit conversation context to prevent token overflow',
      'Validate intent classification confidence before generating responses'
    ],
    bestPractices: [
      'Classify intent before searching the knowledge base for better relevance',
      'Use explicit "answer only from provided context" instructions',
      'Track escalation rate, response time, and CSAT as core metrics',
      'Review unanswered questions weekly to expand the knowledge base'
    ]
  }
};

// ============================================================
// Export all data as a global object
// ============================================================
window.AIAdvisorData = { models, agents, playbooks };
