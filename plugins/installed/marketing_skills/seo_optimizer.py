"""SEO Optimizer skill - analyzes and scores video metadata for search optimization."""

import re
from collections import Counter

STOP_WORDS = {
    "the", "a", "an", "is", "it", "to", "and", "or", "of", "in", "on", "for",
    "with", "at", "by", "from", "this", "that", "be", "are", "was", "were",
}

POWER_WORDS = {
    "ultimate", "best", "top", "how", "why", "secret", "proven", "easy",
    "fast", "free", "new", "amazing", "complete", "guide", "tutorial",
    "tips", "tricks", "review", "vs", "hack", "boost", "grow", "master",
}


def _keyword_density(text, keywords):
    words = re.findall(r"\w+", text.lower())
    if not words:
        return 0.0
    matches = sum(1 for w in words if w in keywords)
    return matches / len(words)


def _score_title(title):
    score = 0
    words = re.findall(r"\w+", title.lower())
    word_count = len(words)

    if 6 <= word_count <= 12:
        score += 25
    elif word_count < 6:
        score += 10
    else:
        score += 5

    if len(title) <= 60:
        score += 15
    elif len(title) <= 70:
        score += 10

    power_count = sum(1 for w in words if w in POWER_WORDS)
    score += min(power_count * 10, 20)

    if any(c.isdigit() for c in title):
        score += 10

    return score


def _score_description(description):
    score = 0
    word_count = len(description.split())

    if word_count >= 200:
        score += 20
    elif word_count >= 100:
        score += 15
    elif word_count >= 50:
        score += 10

    url_pattern = r"https?://\S+"
    if re.search(url_pattern, description):
        score += 5

    if any(marker in description.lower() for marker in ["timestamp", "00:", "chapter"]):
        score += 5

    return min(score, 30)


def _score_tags(tags):
    if not tags:
        return 0
    score = 0
    if 5 <= len(tags) <= 15:
        score += 15
    elif len(tags) > 0:
        score += 5

    multi_word = sum(1 for t in tags if " " in t)
    if multi_word >= 3:
        score += 10

    return min(score, 25)


def optimize_seo(title="", description="", tags=None, target_keywords=None):
    """Analyze video metadata and return an SEO score with recommendations.

    Args:
        title: Video title string
        description: Video description text
        tags: List of video tags
        target_keywords: Optional set of target keywords to check density for

    Returns:
        dict with overall score (0-100), component scores, and recommendations
    """
    tags = tags or []
    target_keywords = set(kw.lower() for kw in (target_keywords or []))
    recommendations = []

    title_score = _score_title(title)
    desc_score = _score_description(description)
    tags_score = _score_tags(tags)

    keyword_score = 0
    if target_keywords:
        density = _keyword_density(f"{title} {description}", target_keywords)
        if density >= 0.02:
            keyword_score = 10
        elif density >= 0.01:
            keyword_score = 5
        else:
            recommendations.append(
                "Increase target keyword usage in title and description"
            )

    overall = title_score + desc_score + tags_score + keyword_score

    words = re.findall(r"\w+", title.lower())
    if not any(w in POWER_WORDS for w in words):
        recommendations.append(
            f"Add a power word to title (e.g. {', '.join(list(POWER_WORDS)[:5])})"
        )
    if len(title) > 70:
        recommendations.append("Shorten title to under 70 characters")
    if len(description.split()) < 100:
        recommendations.append("Expand description to at least 100 words")
    if len(tags) < 5:
        recommendations.append("Add more tags (aim for 5-15)")
    if tags and all(" " not in t for t in tags):
        recommendations.append("Include multi-word/long-tail keyword tags")

    return {
        "overall_score": min(overall, 100),
        "breakdown": {
            "title": title_score,
            "description": desc_score,
            "tags": tags_score,
            "keyword_relevance": keyword_score,
        },
        "recommendations": recommendations,
    }
