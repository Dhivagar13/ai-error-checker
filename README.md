# AI Error Explainer for Developers

A complete, production-ready web application that helps beginner developers understand programming errors powered by AI. Paste your error messages and receive clear explanations, reasons, and example code fixes.

## Prerequisites

- Node.js (v16+)
- Python 3.8+
- OpenAI API Key

## Setup and Running Instructions

### 1. Backend Setup

The backend is built with Python and Flask.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the backend server with your OpenAI API Key:

   **On Windows (PowerShell):**

   ```ps1
   $env:OPENAI_API_KEY="your-api-key-here"
   python app.py
   ```

   **On Mac/Linux:**

   ```bash
   OPENAI_API_KEY=your-api-key-here python app.py
   ```

   The backend will start running on `http://localhost:5000`.

### 2. Frontend Setup

The frontend is a modern React application built using Vite and Tailwind CSS.

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Your application will be live at `http://localhost:5173`. Open this URL in your browser.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide React (Icons), Vite
- **Backend**: Python, Flask, Flask-CORS, OpenAI API
- **Design Elements**: Glassmorphism, CSS Animations, Component-based Architecture
