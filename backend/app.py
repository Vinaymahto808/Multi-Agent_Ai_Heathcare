import sys
import os
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from loguru import logger
from agents import AgentManager

load_dotenv()

app = Flask(__name__, static_folder=None)
CORS(app)

logger.remove()
logger.add(sys.stderr, format="{time} | {level} | {message}", level="INFO")

agent_manager = AgentManager(max_retries=2, verbose=True)

FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    try:
        result = agent_manager.get_agent("summarize").execute(text)
        agent_manager.get_agent("summarize_validator").execute(
            original_text=text, summary=result
        )
        return jsonify({"summary": result})
    except Exception as e:
        logger.error(f"Summarize error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/write-article", methods=["POST"])
def write_article():
    data = request.get_json()
    topic = data.get("topic", "")
    outline = data.get("outline", "")
    if not topic:
        return jsonify({"error": "No topic provided"}), 400
    try:
        draft = agent_manager.get_agent("write_article").execute(topic, outline or None)
        refined = agent_manager.get_agent("refiner").execute(draft)
        agent_manager.get_agent("validator").execute(topic=topic, article=refined)
        return jsonify({"draft": draft, "refined": refined})
    except Exception as e:
        logger.error(f"Write article error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/sanitize", methods=["POST"])
def sanitize():
    data = request.get_json()
    medical_data = data.get("data", "")
    if not medical_data:
        return jsonify({"error": "No data provided"}), 400
    try:
        result = agent_manager.get_agent("sanitize_data").execute(medical_data)
        agent_manager.get_agent("sanitize_data_validator").execute(
            original_data=medical_data, sanitized_data=result
        )
        return jsonify({"sanitized": result})
    except Exception as e:
        logger.error(f"Sanitize error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/")
@app.route("/<path:path>")
def serve_frontend(path=""):
    if FRONTEND_DIST.exists():
        file_path = FRONTEND_DIST / path
        if path and file_path.is_file():
            return send_from_directory(str(FRONTEND_DIST), path)
        return send_from_directory(str(FRONTEND_DIST), "index.html")
    return jsonify({"error": "Frontend not built. Run: cd frontend && npm install && npm run build"}), 200


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV") != "production"
    app.run(host="0.0.0.0", port=port, debug=debug)
