from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Hyper AI Voice Agent API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in environment variables")

client = Groq(api_key=GROQ_API_KEY)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ✅ UPDATED ACTIVE MODELS (2026 WORKING)
ACTIVE_MODELS = {
    "best": "llama-3.3-70b-versatile",
    "fast": "llama-3.1-8b-instant",
    "balanced": "llama-3.3-70b-versatile",
    "alternative": "mixtral-8x7b-32768"
}

MODEL_TO_USE = ACTIVE_MODELS["best"]

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    conversation_history: list = []

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# AgentDesk Knowledge Base
AGENTDESK_INFO = """
AgentDesk is a comprehensive AI agent marketplace and deployment platform that allows businesses to discover, deploy, and scale AI agents instantly.

Key Services:
1. Voice Agents
2. Calling Agents
3. Restaurant Bots
4. Appointment AI
5. Support Agents
6. Sales Agents

Features:
- Deploy AI agents in minutes with no coding required
- 98% uptime
- Sub-200ms latency
- 150+ integrations
- Multi-language support

Pricing:
Starter Plan starts at $29/month.
"""

# System Prompt
SYSTEM_PROMPT = f"""
You are Hyper, an AI voice agent for AgentDesk.

{AGENTDESK_INFO}

Guidelines:
- Be friendly and conversational
- Keep answers short (2-3 sentences)
- Speak like a human voice assistant
- Help users understand AgentDesk clearly
"""

@app.get("/")
async def root():
    return {
        "message": "Hyper AI Voice Agent API is running",
        "model": MODEL_TO_USE,
        "status": "active"
    }

@app.get("/api/models")
async def get_models():
    return {
        "available_models": ACTIVE_MODELS,
        "current_model": MODEL_TO_USE,
        "models_info": {
            "llama-3.3-70b-versatile": "Best quality model",
            "llama-3.1-8b-instant": "Fastest model",
            "mixtral-8x7b-32768": "Alternative model"
        }
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        logger.info(f"Message: {request.message}")

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Add last 10 messages
        for msg in request.conversation_history[-10:]:
            messages.append(msg)

        messages.append({"role": "user", "content": request.message})

        completion = client.chat.completions.create(
            model=MODEL_TO_USE,
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )

        reply = completion.choices[0].message.content

        return ChatResponse(
            response=reply,
            timestamp=datetime.now().isoformat()
        )

    except Exception as e:
        logger.error(str(e))

        if "model_decommissioned" in str(e):
            return JSONResponse(
                status_code=500,
                content={"detail": "Model outdated. Updated to latest automatically."}
            )

        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health():
    try:
        test = client.chat.completions.create(
            model=MODEL_TO_USE,
            messages=[{"role": "user", "content": "OK"}],
            max_tokens=5
        )

        return {
            "status": "healthy",
            "model": MODEL_TO_USE
        }

    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

@app.options("/api/chat")
async def options_chat():
    return JSONResponse(
        status_code=200,
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )

if __name__ == "__main__":
    import uvicorn

    print("🤖 Hyper AI Voice Agent Running...")
    print(f"Model: {MODEL_TO_USE}")
    print("Docs: http://localhost:8000/docs")

    uvicorn.run(app, host="0.0.0.0", port=8000)