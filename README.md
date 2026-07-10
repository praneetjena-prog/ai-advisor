# AI Advisor ⚡

AI Advisor is a premium, high-fidelity single-page web application designed to help developers, project managers, and AI builders choose the perfect AI model and agent framework for their projects. It provides dynamic recommendations, detailed specs comparisons, error-free implementation playbooks, and optimized system prompts.

## 🚀 Features

* **🎯 Interactive Advisor Wizard**: Answer a few diagnostic questions (domain, complexity, autonomy level, budget) to get a custom LLM + agent framework pairing recommendation with detailed reasoning and execution tips.
* **📊 Comparison Engine**: Compare specifications side-by-side (context window, pricing, speed, best-use cases) for 11 LLMs and 9 Agent Frameworks.
* **📖 Implementation Playbooks**: Step-by-step guides with robust, production-ready Python and Node.js code templates for:
  - Autonomous Coding Agents
  - Multi-step Research Pipelines
  - Reliable Data Pipelines
  - Content Creation Chains
  - Customer Support/RAG Agents
* **🛠️ Prompt Builder**: Input your task parameters and automatically generate error-free system prompts and configuration templates.
* **✨ Premium Theme**: Modern neon-dark aesthetic featuring glassmorphism, responsive CSS grid/flex layout, and micro-animations.

---

## 🛠️ Tech Stack & Architecture

- **Core**: Vanilla HTML5 & CSS3
- **Scripting**: Modern Vanilla JavaScript (ES6+)
- **Design Tokens**: Tailwind-inspired custom properties (CSS variables) for glow and glassmorphic styling
- **CDNs**: Google Fonts (Outfit, Plus Jakarta Sans, Fira Code)

---

## 🏃 Getting Started

### Prerequisites

To run the local server, you only need Python installed on your system.

### Running Locally

1. Clone this repository to your local system:
   ```bash
   git clone <your-repository-url>
   cd "AI Advisor"
   ```

2. Start a local server:
   * **Python 3**:
     ```bash
     python -m http.server 8080
     ```
   * **Node.js (Alternative)**:
     ```bash
     npx serve -l 8080
     ```

3. Open your browser and navigate to:
   👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📂 Project Structure

- `index.html`: Web layout and semantic components
- `style.css`: Design system, styles, and animation frames
- `data.js`: Unified database containing all models, agent specifications, and playbook steps
- `app.js`: Interactive routing, scoring logic, search/filtering, and modal behavior
- `.gitignore`: Configured to exclude system files and IDE configurations

---

## 📄 License

This project is licensed under the MIT License.
