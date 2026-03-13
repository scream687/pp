import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, jsonify, request
import sqlite3
import pandas as pd
from plugins import loader, registry

app = Flask(__name__)

# Load all installed plugin skills on startup
loader.load_all()


@app.route("/")
def home():
    return jsonify({"message": "YouTube Automation System is live!"})


@app.route("/trending")
def trending():
    try:
        conn = sqlite3.connect("enhanced_trending_data.db")
        df = pd.read_sql_query(
            "SELECT * FROM trends ORDER BY date DESC LIMIT 10", conn
        )
        return df.to_json(orient="records")
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/upload-log")
def logs():
    try:
        conn = sqlite3.connect("youtube_analytics.db")
        df = pd.read_sql_query(
            "SELECT * FROM uploads ORDER BY date DESC LIMIT 10", conn
        )
        return df.to_json(orient="records")
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------- Plugin / Marketplace endpoints ----------


@app.route("/plugins/marketplaces", methods=["GET"])
def list_marketplaces():
    return jsonify(registry.list_marketplaces())


@app.route("/plugins/marketplaces", methods=["POST"])
def add_marketplace():
    data = request.get_json() or {}
    name = data.get("name")
    source = data.get("source", name)
    if not name:
        return jsonify({"error": "name is required"}), 400
    result = registry.add_marketplace(name, source)
    return jsonify({"added": name, "details": result}), 201


@app.route("/plugins/installed", methods=["GET"])
def list_installed():
    return jsonify(registry.list_installed())


@app.route("/plugins/skills", methods=["GET"])
def list_skills():
    return jsonify({"skills": loader.list_skills()})


# ---------- Marketing skill endpoints ----------


@app.route("/skills/seo-optimizer", methods=["POST"])
def seo_optimizer():
    skill = loader.get_skill("marketing_skills.seo_optimizer")
    if not skill:
        return jsonify({"error": "seo_optimizer skill not installed"}), 404
    data = request.get_json() or {}
    result = skill(
        title=data.get("title", ""),
        description=data.get("description", ""),
        tags=data.get("tags"),
        target_keywords=data.get("target_keywords"),
    )
    return jsonify(result)


@app.route("/skills/title-generator", methods=["POST"])
def title_generator():
    skill = loader.get_skill("marketing_skills.title_generator")
    if not skill:
        return jsonify({"error": "title_generator skill not installed"}), 404
    data = request.get_json() or {}
    topic = data.get("topic")
    if not topic:
        return jsonify({"error": "topic is required"}), 400
    result = skill(
        topic=topic,
        action=data.get("action"),
        alt_topic=data.get("alt_topic"),
        year=data.get("year", "2026"),
        count=data.get("count", 5),
    )
    return jsonify(result)


@app.route("/skills/tag-strategy", methods=["POST"])
def tag_strategy():
    skill = loader.get_skill("marketing_skills.tag_strategy")
    if not skill:
        return jsonify({"error": "tag_strategy skill not installed"}), 404
    data = request.get_json() or {}
    primary = data.get("primary_keyword")
    if not primary:
        return jsonify({"error": "primary_keyword is required"}), 400
    result = skill(
        primary_keyword=primary,
        secondary_keywords=data.get("secondary_keywords"),
        niche=data.get("niche"),
        max_tags=data.get("max_tags", 15),
    )
    return jsonify(result)


@app.route("/skills/audience-analyzer", methods=["POST"])
def audience_analyzer():
    skill = loader.get_skill("marketing_skills.audience_analyzer")
    if not skill:
        return jsonify({"error": "audience_analyzer skill not installed"}), 404
    data = request.get_json() or {}
    videos = data.get("videos")
    if not videos:
        return jsonify({"error": "videos list is required"}), 400
    result = skill(videos=videos)
    return jsonify(result)


@app.route("/skills/content-calendar", methods=["POST"])
def content_calendar():
    skill = loader.get_skill("marketing_skills.content_calendar")
    if not skill:
        return jsonify({"error": "content_calendar skill not installed"}), 404
    data = request.get_json() or {}
    topics = data.get("topics")
    if not topics:
        return jsonify({"error": "topics list is required"}), 400
    result = skill(
        topics=topics,
        start_date=data.get("start_date"),
        weeks=data.get("weeks", 4),
        uploads_per_week=data.get("uploads_per_week", 3),
        include_shorts=data.get("include_shorts", True),
    )
    return jsonify(result)


@app.route("/skills/thumbnail-advisor", methods=["POST"])
def thumbnail_advisor():
    skill = loader.get_skill("marketing_skills.thumbnail_advisor")
    if not skill:
        return jsonify({"error": "thumbnail_advisor skill not installed"}), 404
    data = request.get_json() or {}
    result = skill(
        title=data.get("title", ""),
        content_type=data.get("content_type", "general"),
        has_face=data.get("has_face", False),
        has_text=data.get("has_text", False),
        text_word_count=data.get("text_word_count", 0),
        dominant_colors=data.get("dominant_colors"),
    )
    return jsonify(result)
