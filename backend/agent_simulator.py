# backend/agent_simulator.py
import asyncio
import json

scenarios = {
    "coding": [
        {"type": "thought", "content": "Received request to fix error in Flask API endpoint: /api/user. Analyzing stack trace..."},
        {"type": "error", "content": "Stack trace shows:\nTypeError: 'NoneType' object is not subscriptable at line 24 in controllers/user.py"},
        {"type": "thought", "content": "The error occurs when fetching the user dictionary. It seems the database call returned None. I should read controllers/user.py to check the DB query and return logic."},
        {"type": "tool_call", "content": "Reading controllers/user.py...", "tool": "file_reader", "args": {"path": "controllers/user.py"}},
        {"type": "observation", "content": "File read successful:\n\ndef get_user_profile(user_id):\n    user = db.query_by_id(user_id)\n    return {\n        'name': user['name'],\n        'email': user['email']\n    }"},
        {"type": "thought", "content": "The issue is clear. If a user_id does not exist, db.query_by_id returns None. Storing user['name'] fails because user is None. I need to write a fix that adds a null check and returns a 404 response if the user is not found."},
        {"type": "tool_call", "content": "Writing patch to controllers/user.py...", "tool": "file_writer", "args": {"path": "controllers/user.py", "diff": "+ if not user:\n+     return {'error': 'User not found'}, 404"}},
        {"type": "observation", "content": "File update successful. 2 lines added, 0 lines removed."},
        {"type": "thought", "content": "Now I should run unit tests to verify the fix works and does not break existing routes."},
        {"type": "tool_call", "content": "Running test suite...", "tool": "terminal_command", "args": {"command": "pytest tests/test_user.py"}},
        {"type": "observation", "content": "Test run outputs:\n==================== 2 passed in 0.43s ===================="},
        {"type": "correction", "content": "Null check verify completed. Refactored controllers/user.py and tests verified successful."},
        {"type": "success", "content": "Task completed successfully! API now handles invalid user IDs gracefully without throwing a TypeError."}
    ],
    "research": [
        {"type": "thought", "content": "Research goal: Compare top 3 agent frameworks for enterprise deployment in 2026. Setting up research steps..."},
        {"type": "tool_call", "content": "Searching Google Scholar / Web Index...", "tool": "web_search", "args": {"query": "enterprise agent frameworks 2026 CrewAI vs LangGraph"}},
        {"type": "error", "content": "HTTP Error 429: Too Many Requests. The primary search endpoint is rate-limited."},
        {"type": "thought", "content": "Rate limit detected. Implementing a 1.5-second backoff delay, rotating the search agent user-agent strings, and falling back to DuckDuckGo search API."},
        {"type": "correction", "content": "Backoff completed. Request retried via DuckDuckGo Search API."},
        {"type": "observation", "content": "Search results retrieved:\n1. LangGraph: Best for stateful, cyclic graphs and human-in-the-loop.\n2. CrewAI: Focuses on role-playing multi-agent systems. Great for structured tasks.\n3. AutoGen: Conversational multi-agent framework by Microsoft, highly customizable."},
        {"type": "thought", "content": "I need to synthesize these results, outlining the pros and cons of each based on stability, ease of learning, and enterprise features."},
        {"type": "tool_call", "content": "Generating research draft file...", "tool": "file_writer", "args": {"path": "reports/frameworks_2026.md"}},
        {"type": "observation", "content": "Report successfully written to reports/frameworks_2026.md."},
        {"type": "success", "content": "Enterprise framework analysis report completed successfully. File is ready for review."}
    ],
    "data-processing": [
        {"type": "thought", "content": "Received dataset clean request for customers.csv. Starting schema inspection..."},
        {"type": "tool_call", "content": "Reading CSV headers...", "tool": "file_reader", "args": {"path": "customers.csv", "lines": 5}},
        {"type": "observation", "content": "Headers: CustomerID, name, email_address, Joining Date, total_spend\nRow 1: 101, Alice, alice@mail.com, 2025-01-10, $150.00\nRow 2: 102, Bob, bob@mail.com, 2025-02-12, N/A"},
        {"type": "thought", "content": "Issues spotted: column names have mixed casings, dates may need standard ISO format, and total_spend contains currency symbols and 'N/A' string values that will break statistical calculations. I will write a python script to load and clean this dataset using pandas."},
        {"type": "tool_call", "content": "Running cleaning script...", "tool": "terminal_command", "args": {"command": "python clean_script.py"}},
        {"type": "error", "content": "ValueError: could not convert string to float: '$150.00'. Columns contain raw text formatting."},
        {"type": "thought", "content": "My cleaning script failed because it didn't strip the '$' symbol before converting to float. I must edit clean_script.py to clean currency formatting before type coercion."},
        {"type": "tool_call", "content": "Applying code correction to clean_script.py...", "tool": "file_writer", "args": {"path": "clean_script.py", "diff": "df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)"}},
        {"type": "observation", "content": "clean_script.py updated."},
        {"type": "tool_call", "content": "Executing cleaning script...", "tool": "terminal_command", "args": {"command": "python clean_script.py"}},
        {"type": "observation", "content": "Script completed successfully. Cleaned 500 rows. Saved to clean_customers.csv."},
        {"type": "correction", "content": "Corrected currency conversion bug. All records cleaned, formatted, and validated."},
        {"type": "success", "content": "Data cleaning pipeline run succeeded. Output dataset: clean_customers.csv"}
    ]
}

async def stream_simulation(scenario_id: str, speed_multiplier: float = 1.0):
    steps = scenarios.get(scenario_id, scenarios["coding"])
    
    # Send a starting event
    yield f"data: {json.dumps({'type': 'system', 'content': f'Starting {scenario_id} agent simulation...'})}\n\n"
    await asyncio.sleep(0.5 / speed_multiplier)

    for step in steps:
        yield f"data: {json.dumps(step)}\n\n"
        # Determine delay based on step type
        delay = 1.5
        if step["type"] in ["tool_call", "terminal_command"]:
            delay = 1.0
        elif step["type"] == "observation":
            delay = 1.8
        elif step["type"] == "error":
            delay = 2.0
            
        await asyncio.sleep(delay / speed_multiplier)
        
    yield "data: [DONE]\n\n"
