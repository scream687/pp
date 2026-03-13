"""Tag Strategy skill - generates optimized tag sets for YouTube videos."""


def _expand_keyword(keyword):
    """Generate long-tail variations of a keyword."""
    words = keyword.lower().split()
    variations = [keyword.lower()]
    prefixes = ["how to", "best", "top", "what is", "why"]
    suffixes = ["tutorial", "guide", "tips", "for beginners", "explained", "2026"]

    for prefix in prefixes:
        variations.append(f"{prefix} {keyword.lower()}")
    for suffix in suffixes:
        variations.append(f"{keyword.lower()} {suffix}")

    if len(words) > 1:
        variations.append(" ".join(reversed(words)))

    return variations


def _categorize_tags(tags):
    """Split tags into broad, specific, and long-tail categories."""
    broad = [t for t in tags if len(t.split()) <= 2]
    long_tail = [t for t in tags if len(t.split()) >= 4]
    specific = [t for t in tags if t not in broad and t not in long_tail]
    return {"broad": broad, "specific": specific, "long_tail": long_tail}


def suggest_tags(primary_keyword, secondary_keywords=None, niche=None, max_tags=15):
    """Generate a strategic tag set for a YouTube video.

    Args:
        primary_keyword: Main keyword/topic of the video
        secondary_keywords: Additional related keywords (list)
        niche: Content niche (e.g. "tech", "fitness", "cooking")
        max_tags: Maximum number of tags to return (default 15)

    Returns:
        dict with categorized tags and strategy recommendations
    """
    secondary_keywords = secondary_keywords or []
    all_tags = []

    primary_variations = _expand_keyword(primary_keyword)
    all_tags.extend(primary_variations)

    for kw in secondary_keywords:
        all_tags.extend(_expand_keyword(kw)[:3])

    if niche:
        all_tags.append(niche.lower())
        all_tags.append(f"{niche.lower()} {primary_keyword.lower()}")
        all_tags.append(f"{primary_keyword.lower()} {niche.lower()}")

    seen = set()
    unique_tags = []
    for tag in all_tags:
        tag_clean = tag.strip().lower()
        if tag_clean not in seen and len(tag_clean) <= 100:
            seen.add(tag_clean)
            unique_tags.append(tag_clean)

    final_tags = unique_tags[:max_tags]
    categorized = _categorize_tags(final_tags)

    strategy_notes = []
    if len(categorized["long_tail"]) < 3:
        strategy_notes.append("Add more long-tail tags (3+ words) for niche discoverability")
    if len(categorized["broad"]) > len(final_tags) // 2:
        strategy_notes.append("Too many broad tags - focus on specific phrases")
    if not niche:
        strategy_notes.append("Specify a niche to generate more targeted tags")

    total_chars = sum(len(t) for t in final_tags)

    return {
        "tags": final_tags,
        "tag_count": len(final_tags),
        "total_characters": total_chars,
        "within_limit": total_chars <= 500,
        "categories": categorized,
        "strategy_notes": strategy_notes,
    }
