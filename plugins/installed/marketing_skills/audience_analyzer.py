"""Audience Analyzer skill - analyzes video performance data to extract audience insights."""

import statistics


def _engagement_rate(views, likes, comments):
    if views == 0:
        return 0.0
    return ((likes + comments) / views) * 100


def _classify_engagement(rate):
    if rate >= 8.0:
        return "excellent"
    elif rate >= 5.0:
        return "good"
    elif rate >= 2.0:
        return "average"
    else:
        return "low"


def _detect_growth_trend(values):
    if len(values) < 2:
        return "insufficient_data"
    diffs = [values[i + 1] - values[i] for i in range(len(values) - 1)]
    avg_diff = statistics.mean(diffs)
    if avg_diff > 0:
        return "growing"
    elif avg_diff < 0:
        return "declining"
    return "stable"


def analyze_audience(videos):
    """Analyze video performance data to extract audience insights.

    Args:
        videos: List of dicts, each with keys:
            - title (str)
            - views (int)
            - likes (int)
            - comments (int)
            - watch_time_hours (float, optional)
            - content_type (str, optional)

    Returns:
        dict with audience insights, engagement metrics, and recommendations
    """
    if not videos:
        return {"error": "No video data provided"}

    total_views = sum(v.get("views", 0) for v in videos)
    total_likes = sum(v.get("likes", 0) for v in videos)
    total_comments = sum(v.get("comments", 0) for v in videos)

    engagement_rates = []
    for v in videos:
        rate = _engagement_rate(
            v.get("views", 0), v.get("likes", 0), v.get("comments", 0)
        )
        engagement_rates.append(rate)

    avg_engagement = statistics.mean(engagement_rates) if engagement_rates else 0
    view_counts = [v.get("views", 0) for v in videos]
    view_trend = _detect_growth_trend(view_counts)

    # Identify best and worst performers
    sorted_by_engagement = sorted(
        zip(videos, engagement_rates), key=lambda x: x[1], reverse=True
    )
    top_performers = [
        {"title": v["title"], "engagement_rate": round(r, 2)}
        for v, r in sorted_by_engagement[:3]
    ]

    # Content type breakdown
    type_performance = {}
    for v in videos:
        ct = v.get("content_type", "unknown")
        if ct not in type_performance:
            type_performance[ct] = {"views": 0, "count": 0}
        type_performance[ct]["views"] += v.get("views", 0)
        type_performance[ct]["count"] += 1

    for ct in type_performance:
        tp = type_performance[ct]
        tp["avg_views"] = round(tp["views"] / tp["count"])

    best_type = max(type_performance, key=lambda k: type_performance[k]["avg_views"]) if type_performance else None

    recommendations = []
    if avg_engagement < 3.0:
        recommendations.append("Engagement is below average - try asking questions and using CTAs")
    if view_trend == "declining":
        recommendations.append("Views are trending down - experiment with new content formats")
    if best_type and best_type != "unknown":
        recommendations.append(f"Double down on '{best_type}' content - it performs best")
    if total_comments / max(len(videos), 1) < 10:
        recommendations.append("Low comment count - pin a comment with a question to drive discussion")

    return {
        "summary": {
            "total_videos": len(videos),
            "total_views": total_views,
            "total_likes": total_likes,
            "total_comments": total_comments,
            "avg_engagement_rate": round(avg_engagement, 2),
            "engagement_level": _classify_engagement(avg_engagement),
            "view_trend": view_trend,
        },
        "top_performers": top_performers,
        "content_type_breakdown": type_performance,
        "best_content_type": best_type,
        "recommendations": recommendations,
    }
