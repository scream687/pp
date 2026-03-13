"""Content Calendar skill - generates a strategic upload schedule."""

from datetime import datetime, timedelta

BEST_DAYS = ["Tuesday", "Thursday", "Saturday"]
BEST_HOURS = [9, 12, 15, 17]

CONTENT_MIX = {
    "pillar": {
        "description": "In-depth, evergreen content that drives long-term search traffic",
        "frequency": "weekly",
        "examples": ["tutorials", "ultimate guides", "deep dives"],
    },
    "trending": {
        "description": "Timely content capitalizing on current trends",
        "frequency": "1-2x per week",
        "examples": ["news reactions", "trend analysis", "hot takes"],
    },
    "community": {
        "description": "Content that builds audience connection",
        "frequency": "bi-weekly",
        "examples": ["Q&A", "behind the scenes", "collabs"],
    },
    "shorts": {
        "description": "Short-form content for discovery and reach",
        "frequency": "3-5x per week",
        "examples": ["tips", "clips", "teasers"],
    },
}


def build_calendar(
    topics,
    start_date=None,
    weeks=4,
    uploads_per_week=3,
    include_shorts=True,
):
    """Generate a content calendar with strategic scheduling.

    Args:
        topics: List of content topics/ideas
        start_date: Start date string (YYYY-MM-DD) or None for today
        weeks: Number of weeks to plan (default 4)
        uploads_per_week: Long-form uploads per week (default 3)
        include_shorts: Whether to include Shorts in the plan

    Returns:
        dict with weekly schedule, content mix, and strategy notes
    """
    if start_date:
        start = datetime.strptime(start_date, "%Y-%m-%d")
    else:
        start = datetime.now()

    # Align to next Monday
    days_until_monday = (7 - start.weekday()) % 7
    start = start + timedelta(days=days_until_monday)

    schedule = []
    topic_idx = 0
    content_types = ["pillar", "trending", "community"]

    for week_num in range(weeks):
        week_start = start + timedelta(weeks=week_num)
        week_entries = []

        for slot in range(uploads_per_week):
            day_offset = [1, 3, 5][slot % 3]  # Tue, Thu, Sat
            upload_date = week_start + timedelta(days=day_offset)
            hour = BEST_HOURS[slot % len(BEST_HOURS)]

            topic = topics[topic_idx % len(topics)] if topics else "TBD"
            content_type = content_types[slot % len(content_types)]
            topic_idx += 1

            week_entries.append({
                "date": upload_date.strftime("%Y-%m-%d"),
                "day": upload_date.strftime("%A"),
                "time": f"{hour:02d}:00",
                "topic": topic,
                "content_type": content_type,
                "format": "long-form",
            })

        if include_shorts:
            for short_day in [0, 2, 4]:  # Mon, Wed, Fri
                short_date = week_start + timedelta(days=short_day)
                week_entries.append({
                    "date": short_date.strftime("%Y-%m-%d"),
                    "day": short_date.strftime("%A"),
                    "time": "12:00",
                    "topic": f"Short: {topics[topic_idx % len(topics)]}" if topics else "Short: TBD",
                    "content_type": "shorts",
                    "format": "short-form",
                })
                topic_idx += 1

        week_entries.sort(key=lambda e: e["date"])
        schedule.append({
            "week": week_num + 1,
            "week_start": week_start.strftime("%Y-%m-%d"),
            "entries": week_entries,
        })

    return {
        "schedule": schedule,
        "total_uploads": sum(len(w["entries"]) for w in schedule),
        "content_mix": CONTENT_MIX,
        "strategy_notes": [
            "Post long-form on Tue/Thu/Sat for peak engagement",
            "Schedule Shorts on Mon/Wed/Fri to maintain daily presence",
            "Aim for consistency - same days and times each week",
            "Batch-produce content to stay 1-2 weeks ahead of schedule",
        ],
    }
