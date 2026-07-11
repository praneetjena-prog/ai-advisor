import React, { useState, useEffect, useRef, useMemo } from 'react';

const SCENARIO_MOCKS = {
  coding: [
    // Step 0 (Initial system msg)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Idle. Ready to simulate Coding Agent."
      }
    },
    // Step 1: thought (Received request...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Analyzing request: Fix error in Flask API endpoint: /api/user..."
      }
    },
    // Step 2: error (Stack trace...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Traceback (most recent call last):\n  File \"controllers/user.py\", line 24, in get_user_profile\nTypeError: 'NoneType' object is not subscriptable"
      }
    },
    // Step 3: thought (The error occurs...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "The database call returned None. Inspecting controllers/user.py..."
      }
    },
    // Step 4: tool_call (Reading controllers/user.py)
    {
      activeTab: "controllers/user.py",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `# Loading controllers/user.py...`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Running tool: file_reader('controllers/user.py')"
      }
    },
    // Step 5: observation (File read successful...)
    {
      activeTab: "controllers/user.py",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "File read successful: controllers/user.py loaded."
      }
    },
    // Step 6: thought (The issue is clear...)
    {
      activeTab: "controllers/user.py",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Null check is needed. If user is None, throw 404. Preparing code patch."
      }
    },
    // Step 7: tool_call (Writing patch...)
    {
      activeTab: "controllers/user.py",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `<<<< CODE DIFF >>>>
  def get_user_profile(user_id):
      user = db.query_by_id(user_id)
+     if not user:
+         return {'error': 'User not found'}, 404
      return {
          'name': user['name'],
          'email': user['email']
      }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Running tool: file_writer('controllers/user.py', patch_diff)"
      }
    },
    // Step 8: observation (File update successful)
    {
      activeTab: "controllers/user.py",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "File updated successfully. Added 2 lines."
      }
    },
    // Step 9: thought (Now I should...)
    {
      activeTab: "controllers/user.py",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Executing tests to verify API fixes..."
      }
    },
    // Step 10: tool_call (Running test suite...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "$ pytest tests/test_user.py"
      }
    },
    // Step 11: observation (Test run outputs...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "$ pytest tests/test_user.py\n==================== 2 passed in 0.43s ===================="
      }
    },
    // Step 12: correction (Null check verify...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Self-Correction validation complete. Bug fixed. Verified via unit testing."
      }
    },
    // Step 13: success (Task completed...)
    {
      activeTab: "Terminal",
      tabs: ["controllers/user.py", "tests/test_user.py", "Terminal"],
      files: {
        "controllers/user.py": `def get_user_profile(user_id):
    user = db.query_by_id(user_id)
    if not user:
        return {'error': 'User not found'}, 404
    return {
        'name': user['name'],
        'email': user['email']
    }`,
        "tests/test_user.py": `def test_get_user_profile_success():
    # Test query success
    pass

def test_get_user_profile_not_found():
    # Test non-existent user
    pass`,
        "Terminal": "Simulation finished. Coding Agent successfully updated database validation layers."
      }
    }
  ],
  research: [
    // Step 0
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "Idle. Ready to simulate Research Agent."
      }
    },
    // Step 1
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "Research Goal: Compare CrewAI, LangGraph, AutoGen for 2026 Enterprise Deployment."
      }
    },
    // Step 2
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "Searching database logs & scholarly papers via Google Scholar API..."
      }
    },
    // Step 3
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "ERROR: Google Scholar API rate limited (HTTP 429 - Too Many Requests)."
      }
    },
    // Step 4
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "Self-Correction: Detecting rate limits. Switching queries to DuckDuckGo Scraping API & rotating User-Agents."
      }
    },
    // Step 5
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "Backoff complete. Re-routing search queries..."
      }
    },
    // Step 6
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWaiting for data synthesis...",
        "Terminal": "Search results retrieved successfully:\n- LangGraph: Best for cyclic architectures.\n- CrewAI: Role-playing cooperative workflows.\n- AutoGen: Conversational agent grids."
      }
    },
    // Step 7
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Research Report Draft\n\nWriting synthesis...",
        "Terminal": "Synthesizing research data into reports/frameworks_2026.md..."
      }
    },
    // Step 8
    {
      activeTab: "reports/frameworks_2026.md",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Enterprise Agentic Frameworks (2026 Comparison)\n\n## 1. LangGraph\n* Strengths: Cyclic graphs, human-in-the-loop validation, rich state.\n* Best For: Complex workflows requiring state tracking.\n\n## 2. CrewAI\n* Strengths: Role-playing, structured agent tasks, built-in delegation.\n* Best For: Content creation or marketing pipelines.",
        "Terminal": "Running tool: file_writer('reports/frameworks_2026.md', document_content)"
      }
    },
    // Step 9
    {
      activeTab: "reports/frameworks_2026.md",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Enterprise Agentic Frameworks (2026 Comparison)\n\n## 1. LangGraph\n* Strengths: Cyclic graphs, human-in-the-loop validation, rich state.\n* Best For: Complex workflows requiring state tracking.\n\n## 2. CrewAI\n* Strengths: Role-playing, structured agent tasks, built-in delegation.\n* Best For: Content creation or marketing pipelines.\n\n## 3. AutoGen\n* Strengths: Event-driven agent communication, rich conversational structure.\n* Best For: Multi-agent conversations and open-ended tasks.",
        "Terminal": "File reports/frameworks_2026.md updated and saved."
      }
    },
    // Step 10
    {
      activeTab: "Terminal",
      tabs: ["reports/frameworks_2026.md", "Terminal"],
      files: {
        "reports/frameworks_2026.md": "# Enterprise Agentic Frameworks (2026 Comparison)\n\n## 1. LangGraph\n* Strengths: Cyclic graphs, human-in-the-loop validation, rich state.\n* Best For: Complex workflows requiring state tracking.\n\n## 2. CrewAI\n* Strengths: Role-playing, structured agent tasks, built-in delegation.\n* Best For: Content creation or marketing pipelines.\n\n## 3. AutoGen\n* Strengths: Event-driven agent communication, rich conversational structure.\n* Best For: Multi-agent conversations and open-ended tasks.",
        "Terminal": "Analysis complete. Framework comparison report written."
      }
    }
  ],
  "data-processing": [
    // Step 0
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": "# Code coming soon",
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Idle. Ready to simulate Data Pipeline."
      }
    },
    // Step 1
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": "# Code coming soon",
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Analyzing dataset schema and issues for customers.csv..."
      }
    },
    // Step 2
    {
      activeTab: "customers.csv",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": "# Code coming soon",
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Running tool: file_reader('customers.csv', lines=5)"
      }
    },
    // Step 3
    {
      activeTab: "customers.csv",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": "# Code coming soon",
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "File loaded. Found columns: CustomerID, name, email_address, Joining Date, total_spend.\nIssues: Formatting in total_spend ('$' and 'N/A')."
      }
    },
    // Step 4
    {
      activeTab: "clean_script.py",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Naive casting
df['total_spend'] = df['total_spend'].astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Writing script clean_script.py to automate pandas transforms."
      }
    },
    // Step 5
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Naive casting
df['total_spend'] = df['total_spend'].astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "$ python clean_script.py"
      }
    },
    // Step 6
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Naive casting
df['total_spend'] = df['total_spend'].astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "ERROR: ValueError: could not convert string to float: '$150.00'. Currency characters detected."
      }
    },
    // Step 7
    {
      activeTab: "clean_script.py",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Naive casting
df['total_spend'] = df['total_spend'].astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Self-Correction: Script failed on string manipulation. Need to clean currency prefixes and replace N/A with zero."
      }
    },
    // Step 8
    {
      activeTab: "clean_script.py",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Clean currency symbols & handle N/A strings
df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Running tool: file_writer('clean_script.py', corrected_code)"
      }
    },
    // Step 9
    {
      activeTab: "clean_script.py",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Clean currency symbols & handle N/A strings
df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "Script clean_script.py updated successfully."
      }
    },
    // Step 10
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Clean currency symbols & handle N/A strings
df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "$ python clean_script.py"
      }
    },
    // Step 11
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Clean currency symbols & handle N/A strings
df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "No clean data generated yet.",
        "Terminal": "$ python clean_script.py\nScript executed successfully. Output written to clean_customers.csv."
      }
    },
    // Step 12
    {
      activeTab: "clean_customers.csv",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Clean currency symbols & handle N/A strings
df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,150.0\n102,Bob,bob@mail.com,2025-02-12,0.0",
        "Terminal": "Verified data clean: Floats converted correctly, currency tags stripped, missing records filled with 0.0."
      }
    },
    // Step 13
    {
      activeTab: "Terminal",
      tabs: ["customers.csv", "clean_script.py", "clean_customers.csv", "Terminal"],
      files: {
        "customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,$150.00\n102,Bob,bob@mail.com,2025-02-12,N/A",
        "clean_script.py": `import pandas as pd
df = pd.read_csv('customers.csv')
# Clean currency symbols & handle N/A strings
df['total_spend'] = df['total_spend'].str.replace('$', '').str.replace('N/A', '0').astype(float)
df.to_csv('clean_customers.csv', index=False)`,
        "clean_customers.csv": "CustomerID,name,email_address,joining_date,total_spend\n101,Alice,alice@mail.com,2025-01-10,150.0\n102,Bob,bob@mail.com,2025-02-12,0.0",
        "Terminal": "Simulation complete. Data Pipeline ran successfully. Clean output generated in clean_customers.csv."
      }
    }
  ]
};

const TOTAL_STEPS = {
  coding: 13,
  research: 10,
  "data-processing": 13
};

const AgentSimulator = () => {
  const [activeScenario, setActiveScenario] = useState('coding');
  const [speed, setSpeed] = useState(1.0);
  const [logs, setLogs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Custom manual tab selected override (if any)
  const [overrideActiveTab, setOverrideActiveTab] = useState(null);

  const eventSourceRef = useRef(null);
  const stepCounterRef = useRef(0);
  const skipCountRef = useRef(0);
  const terminalBottomRef = useRef(null);

  // Derive mock workspace state based on current step index (or 0 if empty)
  const workspaceState = useMemo(() => {
    const steps = SCENARIO_MOCKS[activeScenario] || SCENARIO_MOCKS.coding;
    const index = Math.min(currentStepIndex, steps.length - 1);
    return steps[index] || steps[0];
  }, [activeScenario, currentStepIndex]);

  // Handle active tab in editor
  const activeEditorTab = overrideActiveTab || workspaceState.activeTab;

  useEffect(() => {
    // Reset override active tab when scenario changes
    setOverrideActiveTab(null);
  }, [activeScenario]);

  // Scroll terminal logs to bottom on update
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const startSimulation = (resumeIndex = 0) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setIsPlaying(true);
    setIsPaused(false);

    if (resumeIndex === 0) {
      setLogs([]);
      setCurrentStepIndex(0);
      skipCountRef.current = 0;
      stepCounterRef.current = 0;
    } else {
      skipCountRef.current = resumeIndex;
      stepCounterRef.current = 0;
    }

    const url = `http://localhost:8000/api/simulate/${activeScenario}?speed=${speed}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      if (e.data === '[DONE]') {
        es.close();
        setIsPlaying(false);
        setIsPaused(false);
        return;
      }

      try {
        const event = JSON.parse(e.data);
        
        if (event.type === 'system') {
          // System message is only appended if we are starting fresh
          if (skipCountRef.current === 0) {
            setLogs(prev => [...prev, event]);
          }
        } else {
          stepCounterRef.current += 1;
          
          if (stepCounterRef.current > skipCountRef.current) {
            setLogs(prev => [...prev, event]);
            setCurrentStepIndex(stepCounterRef.current);
          }
        }
      } catch (err) {
        console.error("Error parsing simulation log message:", err);
      }
    };

    es.onerror = (err) => {
      console.error("EventSource error:", err);
      es.close();
      setIsPlaying(false);
      setIsPaused(false);
    };
  };

  const handleRun = () => {
    if (isPaused) {
      // Resume
      startSimulation(currentStepIndex);
    } else {
      // Clean Start
      startSimulation(0);
    }
  };

  const handlePause = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    eventSourceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setLogs([]);
    setCurrentStepIndex(0);
    setOverrideActiveTab(null);
    stepCounterRef.current = 0;
    skipCountRef.current = 0;
  };

  // Adjust speed during live run
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (isPlaying) {
      // Seamlessly reconnect with new speed and skip to current step
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      // Re-trigger simulation with new speed from current step
      setIsPlaying(true);
      skipCountRef.current = currentStepIndex;
      stepCounterRef.current = 0;

      const url = `http://localhost:8000/api/simulate/${activeScenario}?speed=${newSpeed}`;
      const es = new EventSource(url);
      eventSourceRef.current = es;

      es.onmessage = (e) => {
        if (e.data === '[DONE]') {
          es.close();
          setIsPlaying(false);
          setIsPaused(false);
          return;
        }
        try {
          const event = JSON.parse(e.data);
          if (event.type !== 'system') {
            stepCounterRef.current += 1;
            if (stepCounterRef.current > skipCountRef.current) {
              setLogs(prev => [...prev, event]);
              setCurrentStepIndex(stepCounterRef.current);
            }
          }
        } catch (err) {
          console.error(err);
        }
      };

      es.onerror = () => {
        es.close();
        setIsPlaying(false);
        setIsPaused(false);
      };
    }
  };

  // Compute progress percent
  const maxSteps = TOTAL_STEPS[activeScenario] || 10;
  const progressPercent = Math.min((currentStepIndex / maxSteps) * 100, 100);

  return (
    <>
      <style>{`
        /* Scoped Simulator styling */
        .simulator-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .scenario-card {
          cursor: pointer;
          background: rgba(26, 31, 53, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 1.25rem;
          text-align: left;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .scenario-card:hover {
          transform: translateY(-2px);
          background: rgba(26, 31, 53, 0.7);
          box-shadow: 0 4px 20px var(--color-primary-glow);
          border-color: var(--color-primary);
        }
        .scenario-card.active {
          background: rgba(139, 92, 246, 0.15);
          border-color: var(--color-primary);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }
        .scenario-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.1rem;
          font-family: 'Outfit', sans-serif;
          color: var(--text-primary);
        }
        .scenario-icon {
          font-size: 1.4rem;
        }
        .scenario-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        
        .control-panel {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          background: rgba(17, 24, 39, 0.6);
          border: 1px solid var(--glass-border);
          padding: 1.25rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          backdrop-filter: blur(12px);
        }
        .control-buttons {
          display: flex;
          gap: 0.75rem;
        }
        .btn-control {
          min-width: 90px;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .slider-label {
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
        }
        .custom-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 120px;
          height: 6px;
          border-radius: 3px;
          background: var(--bg-surface);
          outline: none;
          transition: background 0.3s;
        }
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: pointer;
          box-shadow: 0 0 8px var(--color-accent);
          transition: transform 0.2s;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .speed-badge {
          background: rgba(6, 182, 212, 0.15);
          color: var(--color-accent-light);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          font-weight: bold;
        }

        .progress-container {
          width: 100%;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-family: 'Outfit', sans-serif;
        }
        .progress-bar-bg {
          width: 100%;
          height: 8px;
          background: var(--bg-surface);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
          border-radius: 4px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .panels-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          min-height: 520px;
        }
        
        .terminal-window, .workspace-window {
          background: #0B0F19;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
        }
        .terminal-header, .workspace-header {
          background: #111625;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mac-dots {
          display: flex;
          gap: 6px;
        }
        .mac-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .mac-dot--close { background: #EF4444; }
        .mac-dot--min { background: #F59E0B; }
        .mac-dot--max { background: #10B981; }
        .window-title {
          font-size: 0.8rem;
          color: var(--text-dim);
          font-family: 'Fira Code', monospace;
        }
        
        .terminal-body {
          flex-grow: 1;
          padding: 1.25rem;
          overflow-y: auto;
          max-height: 480px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          scrollbar-width: thin;
        }
        
        /* Log bubbles types */
        .log-item {
          animation: slideUp 0.3s ease forwards;
        }
        .log-item--system {
          font-family: 'Fira Code', monospace;
          color: var(--text-dim);
          font-size: 0.85rem;
          border-left: 2px solid var(--text-dim);
          padding-left: 0.75rem;
          margin: 0.25rem 0;
        }
        
        /* Thought Bubble */
        .thought-bubble {
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 16px 16px 16px 4px;
          padding: 1rem;
          align-self: flex-start;
          max-width: 90%;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.05);
        }
        .thought-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: var(--color-primary-light);
          font-size: 0.85rem;
          margin-bottom: 0.4rem;
        }
        .thought-body {
          font-size: 0.9rem;
          color: var(--text-primary);
          line-height: 1.5;
        }
        
        /* Tool Card */
        .tool-card {
          background: rgba(6, 182, 212, 0.06);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 8px;
          padding: 0.85rem;
          align-self: flex-start;
          width: 95%;
        }
        .tool-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          color: var(--color-accent-light);
          font-size: 0.85rem;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 0.5rem;
        }
        .tool-badge {
          background: rgba(6, 182, 212, 0.15);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.75rem;
        }
        .tool-pre {
          background: #07090F;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          padding: 0.6rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: #E2E8F0;
          overflow-x: auto;
        }
        
        /* Observation */
        .observation-card {
          background: rgba(16, 185, 129, 0.04);
          border-left: 3px solid var(--color-success);
          border-radius: 0 8px 8px 0;
          padding: 0.85rem;
          width: 95%;
          align-self: flex-start;
        }
        .observation-header {
          font-weight: 700;
          color: var(--color-success);
          font-size: 0.85rem;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .observation-body {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: #CBD5E1;
          white-space: pre-wrap;
          line-height: 1.5;
        }

        /* Error Alert */
        .error-alert {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 8px;
          padding: 0.9rem;
          align-self: flex-start;
          width: 95%;
        }
        .error-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--color-danger);
          font-size: 0.85rem;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 0.4rem;
        }
        .error-body {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: #FCA5A5;
          white-space: pre-wrap;
          line-height: 1.5;
        }

        /* Self Correction */
        .correction-card {
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 8px;
          padding: 0.9rem;
          align-self: flex-start;
          width: 95%;
        }
        .correction-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--color-warning);
          font-size: 0.85rem;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 0.4rem;
        }
        .correction-body {
          font-size: 0.85rem;
          color: #FDE68A;
          line-height: 1.5;
        }

        /* Success Card */
        .success-card {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 12px;
          padding: 1.25rem;
          width: 100%;
          align-self: center;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
          border-left: 4px solid var(--color-success);
        }
        .success-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 800;
          color: var(--color-success);
          font-size: 1rem;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 0.5rem;
        }
        .success-body {
          font-size: 0.95rem;
          color: #E2E8F0;
          line-height: 1.5;
        }

        /* Editor Tabs */
        .editor-tabs {
          display: flex;
          background: #111625;
          overflow-x: auto;
        }
        .editor-tab {
          cursor: pointer;
          background: transparent;
          border: none;
          border-right: 1px solid rgba(255, 255, 255, 0.03);
          color: var(--text-dim);
          padding: 0.6rem 1.2rem;
          font-size: 0.8rem;
          font-family: 'Fira Code', monospace;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .editor-tab:hover {
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
        }
        .editor-tab.active {
          background: #0B0F19;
          color: var(--color-accent-light);
          border-bottom: 2px solid var(--color-accent);
          font-weight: 500;
        }
        
        .editor-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .code-container {
          flex-grow: 1;
          overflow: auto;
          max-height: 400px;
          background: #0B0F19;
          padding: 1.25rem;
          margin: 0;
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.85rem;
          line-height: 1.6;
          color: #E2E8F0;
          white-space: pre-wrap;
          word-break: break-all;
        }
        
        .workspace-metrics {
          background: #0F1322;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1.25rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-dim);
          font-family: 'Outfit', sans-serif;
        }
        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .metric-value {
          color: var(--text-secondary);
          font-weight: 600;
        }
        .metric-badge {
          background: rgba(139, 92, 246, 0.15);
          color: var(--color-primary-light);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        /* Animations */
        @keyframes slideUp {
          from {
            transform: translateY(12px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 868px) {
          .simulator-grid {
            grid-template-columns: 1fr;
          }
          .panels-container {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .terminal-body {
            max-height: 380px;
          }
          .code-container {
            max-height: 300px;
          }
        }
      `}</style>

      <section id="section-simulator" className="section section-simulator fade-in">
        <h2 className="section-title"><span className="gradient-text">Agentic</span> Execution Simulator</h2>
        <p className="section-subtitle">Select a scenario to witness how AI agents run loops, write code, query schemas, detect compilation issues, and correct themselves in real time.</p>

        {/* Dashboard Cards Selection */}
        <div className="simulator-grid">
          <button 
            className={`scenario-card ${activeScenario === 'coding' ? 'active' : ''}`}
            onClick={() => { handleReset(); setActiveScenario('coding'); }}
            disabled={isPlaying}
          >
            <div className="scenario-card-header">
              <span className="scenario-icon">💻</span>
              <span>Coding Agent</span>
            </div>
            <span className="scenario-desc">Resolves a TypeError in a Flask controller by inspecting logic, drafting patches, and verifying via Pytest logs.</span>
          </button>

          <button 
            className={`scenario-card ${activeScenario === 'research' ? 'active' : ''}`}
            onClick={() => { handleReset(); setActiveScenario('research'); }}
            disabled={isPlaying}
          >
            <div className="scenario-card-header">
              <span className="scenario-icon">🔍</span>
              <span>Research Agent</span>
            </div>
            <span className="scenario-desc">Gathers info on 2026 frameworks, recovers from server HTTP rate-limiting, and writes reports dynamically.</span>
          </button>

          <button 
            className={`scenario-card ${activeScenario === 'data-processing' ? 'active' : ''}`}
            onClick={() => { handleReset(); setActiveScenario('data-processing'); }}
            disabled={isPlaying}
          >
            <div className="scenario-card-header">
              <span className="scenario-icon">📊</span>
              <span>Data Pipeline</span>
            </div>
            <span className="scenario-desc">Ingests csv data, resolves missing float records, runs cleaning scripts, and outputs clean schemas.</span>
          </button>
        </div>

        {/* Action Controls & Speed */}
        <div className="control-panel">
          <div className="control-buttons">
            <button 
              className="btn btn-primary btn-control" 
              onClick={handleRun}
              disabled={isPlaying}
            >
              {isPaused ? '▶ Resume' : '⚡ Run'}
            </button>
            <button 
              className="btn btn-secondary btn-control" 
              onClick={handlePause}
              disabled={!isPlaying}
            >
              ⏸ Pause
            </button>
            <button 
              className="btn btn-ghost btn-control" 
              onClick={handleReset}
            >
              ↺ Reset
            </button>
          </div>

          <div className="slider-group">
            <span className="slider-label">Simulation Speed:</span>
            <input 
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.1" 
              value={speed} 
              onChange={handleSpeedChange}
              className="custom-slider"
            />
            <span className="speed-badge">{speed.toFixed(1)}x</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-header">
            <span>Execution Sequence Progress</span>
            <span>Step {currentStepIndex} of {maxSteps} ({Math.round(progressPercent)}%)</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Main Side by Side Panels */}
        <div className="panels-container">
          
          {/* Left Panel: Monospace Terminal log */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="mac-dots">
                <span className="mac-dot mac-dot--close"></span>
                <span className="mac-dot mac-dot--min"></span>
                <span className="mac-dot mac-dot--max"></span>
              </div>
              <span className="window-title">agent_terminal.sh</span>
            </div>
            
            <div className="terminal-body">
              {logs.length === 0 && (
                <div className="log-item--system">Terminal ready. Click 'Run' to begin the stream.</div>
              )}
              
              {logs.map((log, index) => {
                if (log.type === 'system') {
                  return (
                    <div key={index} className="log-item log-item--system">
                      {log.content}
                    </div>
                  );
                }

                if (log.type === 'thought') {
                  return (
                    <div key={index} className="log-item thought-bubble">
                      <div className="thought-header">
                        <span>🧠</span> THOUGHT PROCESS
                      </div>
                      <div className="thought-body">{log.content}</div>
                    </div>
                  );
                }

                if (log.type === 'tool_call') {
                  return (
                    <div key={index} className="log-item tool-card">
                      <div className="tool-header">
                        <span>🛠️ TOOL EXECUTION</span>
                        <span className="tool-badge">{log.tool}</span>
                      </div>
                      <div className="tool-body">
                        <div className="tool-desc" style={{ fontSize: '0.85rem', marginBottom: '0.4rem', color: '#94A3B8' }}>
                          {log.content}
                        </div>
                        {log.args && (
                          <pre className="tool-pre">
                            <code>{JSON.stringify(log.args, null, 2)}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  );
                }

                if (log.type === 'observation') {
                  return (
                    <div key={index} className="log-item observation-card">
                      <div className="observation-header">
                        <span>🔍</span> TOOL OBSERVATION
                      </div>
                      <pre className="observation-body">
                        <code>{log.content}</code>
                      </pre>
                    </div>
                  );
                }

                if (log.type === 'error') {
                  return (
                    <div key={index} className="log-item error-alert">
                      <div className="error-header">
                        <span>🚨</span> EXCEPTION DETECTED
                      </div>
                      <pre className="error-body">
                        <code>{log.content}</code>
                      </pre>
                    </div>
                  );
                }

                if (log.type === 'correction') {
                  return (
                    <div key={index} className="log-item correction-card">
                      <div className="correction-header">
                        <span>🔄</span> SELF-CORRECTION / AUTO-RETRY
                      </div>
                      <div className="correction-body">{log.content}</div>
                    </div>
                  );
                }

                if (log.type === 'success') {
                  return (
                    <div key={index} className="log-item success-card">
                      <div className="success-header">
                        <span>✅</span> FINAL EXECUTION SUCCESS
                      </div>
                      <div className="success-body">{log.content}</div>
                    </div>
                  );
                }

                return null;
              })}
              <div ref={terminalBottomRef} />
            </div>
          </div>

          {/* Right Panel: Workspace File/Output Mock */}
          <div className="workspace-window">
            <div className="workspace-header">
              <div className="window-title">💼 WORKSPACE VIEW</div>
              <span className="tag tag--cyan" style={{ fontSize: '0.65rem' }}>Active Workspace</span>
            </div>

            {/* Tab selection matching scenario */}
            <div className="editor-tabs">
              {workspaceState.tabs.map((tab) => (
                <button
                  key={tab}
                  className={`editor-tab ${activeEditorTab === tab ? 'active' : ''}`}
                  onClick={() => setOverrideActiveTab(tab)}
                >
                  {tab.endsWith('.py') && '🐍 '}
                  {tab.endsWith('.csv') && '📊 '}
                  {tab.endsWith('.md') && '📝 '}
                  {tab === 'Terminal' && '💻 '}
                  {tab === 'Web Search' && '🌐 '}
                  {tab}
                </button>
              ))}
            </div>

            {/* Editor display */}
            <div className="editor-body">
              <pre className="code-container">
                <code>
                  {workspaceState.files[activeEditorTab] || 
                   workspaceState.files['Terminal'] || 
                   'No content loaded.'}
                </code>
              </pre>
            </div>

            {/* Live active workspace metrics */}
            <div className="workspace-metrics">
              <div className="metric-item">
                <span>Status:</span>
                <span className={`metric-badge ${isPlaying ? 'pulse' : ''}`} style={{
                  background: isPlaying ? 'rgba(6, 182, 212, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: isPlaying ? 'var(--color-accent-light)' : 'var(--color-success)'
                }}>
                  {isPlaying ? 'EXECUTING LOOP' : isPaused ? 'PAUSED' : currentStepIndex >= maxSteps ? 'COMPLETED' : 'IDLE'}
                </span>
              </div>
              
              <div className="metric-item">
                <span>Scenario:</span>
                <span className="metric-value" style={{ textTransform: 'capitalize' }}>
                  {activeScenario.replace('-', ' ')}
                </span>
              </div>

              <div className="metric-item">
                <span>Step:</span>
                <span className="metric-value">{currentStepIndex} / {maxSteps}</span>
              </div>

              <div className="metric-item">
                <span>Estimated Tokens:</span>
                <span className="metric-value" style={{ fontFamily: 'Fira Code' }}>
                  {logs.length > 0 ? (logs.length * 480 + 1200).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default AgentSimulator;
