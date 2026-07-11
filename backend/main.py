# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import os

import data_store
import agent_simulator

app = FastAPI(title="AI Advisor API", version="1.0.0")

# Setup CORS to allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptOptimizationRequest(BaseModel):
    task: str
    model: str
    complexity: str
    format: str

@app.get("/api/models")
def get_models():
    return data_store.models

@app.get("/api/agents")
def get_agents():
    return data_store.agents

@app.get("/api/playbooks")
def get_playbooks():
    return data_store.playbooks

@app.post("/api/optimize-prompt")
def optimize_prompt(req: PromptOptimizationRequest):
    if not req.task.strip():
        raise HTTPException(status_code=400, detail="Task description cannot be empty.")
    
    # Simple rule-based generation to construct a highly structured prompt
    role_text = f"You are an expert AI agent configured to execute: '{req.task}'."
    
    model_opt = ""
    if "gemini" in req.model:
        model_opt = "- Optimize for Gemini by structuring reasoning in explicit steps.\n- Use structured JSON outputs where appropriate to take advantage of schema parsing."
    elif "claude" in req.model:
        model_opt = "- Optimize for Claude by using XML tags for separating reasoning and final answers (e.g., <thinking> and <answer>).\n- Leverage Claude's precise tool-use formatting."
    elif "gpt" in req.model:
        model_opt = "- Optimize for OpenAI by providing structured system instructions and explicit task boundaries.\n- Rely on JSON schema output format."
    elif "deepseek" in req.model:
        model_opt = "- Optimize for DeepSeek R1 by outputting deep reasoning thoughts inside <think>...</think> tags."

    complexity_text = ""
    if req.complexity == "simple":
        complexity_text = "- Keep operations linear and direct.\n- Fail fast and return clear error responses immediately."
    elif req.complexity == "moderate":
        complexity_text = "- Breakdown the request into 2-3 logical stages.\n- Verify outputs between stages."
    elif req.complexity == "complex":
        complexity_text = "- Maintain a robust execution state graph.\n- Implement a double-check validation loop before committing outputs.\n- Catch exceptions and run self-correction prompts automatically."

    system_prompt = f"""# SYSTEM PROMPT

## Role & Mission
{role_text}

## Execution Instructions
- Goal: Execute the task perfectly without errors.
- Output Format: Follow the rules defined in the format section.

## Model-Specific Optimizations
{model_opt}

## Complexity Constraints ({req.complexity})
{complexity_text}

## Error Prevention & Guardrails
- Validate all incoming arguments to tools before execution.
- If a tool fails, capture the stdout/stderr, analyze the error, self-correct, and retry.
- Do not loop infinitely. If a step fails 3 times, bubble up the error details with a recovery plan.

## Format Instructions
Produce a clean, concise final answer. Do not include markdown warnings or metadata notes.
"""

    config_template = f"""# CONFIGURATION TEMPLATE
model: {req.model}
temperature: 0.1
max_tokens: 4096
top_p: 0.95
safety_settings:
  block_low_confidence: true
tools:
  - name: file_editor
    description: Allows editing files locally
  - name: terminal_run
    description: Runs command line checks
retry_policy:
  max_retries: 3
  initial_delay_sec: 2
  backoff_multiplier: 2.0
"""

    if req.format == "system-prompt":
        output = system_prompt.strip()
    elif req.format == "config":
        output = config_template.strip()
    else:
        output = f"{system_prompt.strip()}\n\n---\n\n{config_template.strip()}"

    return {"output": output}

@app.get("/api/simulate/{scenario_id}")
def simulate_agent(scenario_id: str, speed: float = 1.0):
    if scenario_id not in ["coding", "research", "data-processing"]:
        raise HTTPException(status_code=404, detail="Scenario not found.")
        
    return StreamingResponse(
        agent_simulator.stream_simulation(scenario_id, speed),
        media_type="text/event-stream"
    )

# Mount frontend static files
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/dist"))
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{catchall:path}")
    def serve_react_app(catchall: str):
        # Serve public folder files directly if they exist
        file_path = os.path.join(frontend_dist, catchall)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        # Default back to React index.html for SPA routes
        return FileResponse(os.path.join(frontend_dist, "index.html"))

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
