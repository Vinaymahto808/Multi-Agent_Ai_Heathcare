# Multi-Agent AI Healthcare

![AI Agents from Scratch](logo.png)

## Overview

The **Multi-Agent AI Healthcare** system uses **Groq's LLM API** (llama-3.3-70b-versatile) to perform specialized medical text tasks through a collaborative multi-agent architecture. It features a **React + Tailwind CSS** frontend and a **Flask** REST API backend.

## Architecture

```
+-------------------+
|  React Frontend   |  (Vite + Tailwind CSS)
+---------+---------+
          | HTTP /api
          v
+---------+---------+
|  Flask Backend    |  (REST API on :5000)
+---------+---------+
          |
          v
+---------+---------+
|  Agent Manager    |
+---------+---------+
          |
          +---------------------+---------------------+
          |                     |                     |
          v                     v                     v
+-------------------+  +-------------------+  +-------------------+
|  Summarize Agent  |  |  Write Article    |  |  Sanitize Data    |
|  + Validator      |  |  + Refiner + Val  |  |  + Validator      |
+-------------------+  +-------------------+  +-------------------+
          |                     |                     |
          +---------------------+---------------------+
                              |
                              v
                     +-------------------+
                     |  Groq API         |
                     |  (llama-3.3-70b)  |
                     +-------------------+
```

## Features

- **Summarize Medical Texts** — Concise AI summaries of medical documents
- **Write & Refine Research Articles** — Generate and enhance academic articles
- **Sanitize PHI Data** — Remove Protected Health Information from datasets
- **Quality Validation** — Every task has a paired validator agent
- **Modern UI** — React frontend with Tailwind CSS, responsive design

## Prerequisites

- Python 3.8+
- Node.js 18+
- [Groq API key](https://console.groq.com)

## Installation

### Backend

```bash
git clone https://github.com/Vinaymahto808/Multi-Agent_Ai_Heathcare.git
cd Multi-Agent_Ai_Heathcare

python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

Create `.env` in the project root:

```dotenv
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### Frontend

```bash
cd frontend
npm install
```

## Usage

### 1. Start the backend

```bash
cd backend
python app.py
# Runs on http://localhost:5000
```

### 2. Start the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
# Opens at http://localhost:5173
```

## Agents

| Agent | Role |
|---|---|
| SummarizeTool | Generates medical text summaries |
| SummarizeValidatorAgent | Validates summary quality |
| WriteArticleTool | Writes research article drafts |
| RefinerAgent | Enhances article clarity/coherence |
| ValidatorAgent | Validates final articles |
| SanitizeDataTool | Removes PHI from data |
| SanitizeDataValidatorAgent | Verifies PHI removal |

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4
- **Backend:** Flask, Flask-CORS
- **AI:** Groq API (llama-3.3-70b-versatile)
- **Logging:** Loguru

## Acknowledgements

- [Groq](https://groq.com) for fast LLM inference
- [Streamlit](https://streamlit.io/) for the original prototype
- [Loguru](https://github.com/Delgan/loguru) for logging
