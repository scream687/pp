"""Title Generator skill - produces optimized video title variations."""

import random

TEMPLATES = [
    "{number} {topic} {power_word} You Need to Know in {year}",
    "How to {action} {topic} ({power_word} Guide)",
    "The {power_word} {topic} {action} Strategy",
    "{topic}: {number} {power_word} Tips to {action}",
    "Why {topic} Is {power_word} (And How to {action})",
    "{power_word} {topic} Tutorial for Beginners",
    "I Tried {topic} for {timeframe} - Here's What Happened",
    "{topic} vs {alt_topic}: Which Is {power_word}?",
    "Stop Making These {number} {topic} Mistakes",
    "{power_word}: The Only {topic} Guide You'll Ever Need",
]

POWER_WORDS = [
    "Ultimate", "Complete", "Proven", "Essential", "Secret",
    "Game-Changing", "Incredible", "Powerful", "Amazing", "Expert",
]

NUMBERS = ["3", "5", "7", "10", "12", "15", "20"]
TIMEFRAMES = ["30 Days", "7 Days", "1 Week", "1 Month", "90 Days"]


def generate_titles(topic, action=None, alt_topic=None, year="2026", count=5):
    """Generate optimized YouTube title variations for a given topic.

    Args:
        topic: Main subject/keyword
        action: Verb describing what the viewer will learn (e.g. "Master", "Grow")
        alt_topic: Alternative topic for comparison titles
        year: Year to include in time-sensitive titles
        count: Number of titles to generate (default 5)

    Returns:
        dict with generated titles and metadata
    """
    action = action or "Master"
    alt_topic = alt_topic or f"Traditional {topic}"

    titles = []
    used_templates = random.sample(TEMPLATES, min(count, len(TEMPLATES)))

    for template in used_templates:
        title = template.format(
            topic=topic,
            action=action,
            alt_topic=alt_topic,
            power_word=random.choice(POWER_WORDS),
            number=random.choice(NUMBERS),
            year=year,
            timeframe=random.choice(TIMEFRAMES),
        )
        char_count = len(title)
        titles.append({
            "title": title,
            "character_count": char_count,
            "within_limit": char_count <= 70,
        })

    return {
        "topic": topic,
        "titles": titles,
        "best_pick": min(titles, key=lambda t: abs(55 - t["character_count"])),
    }
