"""Thumbnail Advisor skill - provides optimization advice for video thumbnails."""

BEST_PRACTICES = {
    "resolution": {"width": 1280, "height": 720, "aspect_ratio": "16:9"},
    "max_file_size_mb": 2,
    "formats": ["JPG", "PNG"],
    "text_rules": {
        "max_words": 5,
        "min_font_size": 48,
        "recommended_font_styles": ["bold", "sans-serif"],
    },
    "color_contrast": {
        "high_ctr_palettes": [
            {"primary": "#FF0000", "secondary": "#FFFFFF", "accent": "#FFD700"},
            {"primary": "#0066FF", "secondary": "#FFFFFF", "accent": "#FF6600"},
            {"primary": "#00CC00", "secondary": "#000000", "accent": "#FFFF00"},
        ]
    },
}

ELEMENT_CHECKLIST = [
    {"element": "face_closeup", "description": "Close-up face showing emotion", "impact": "high"},
    {"element": "text_overlay", "description": "Short bold text (3-5 words max)", "impact": "high"},
    {"element": "contrast_colors", "description": "High-contrast color scheme", "impact": "high"},
    {"element": "brand_consistency", "description": "Consistent style across thumbnails", "impact": "medium"},
    {"element": "curiosity_gap", "description": "Visual that creates curiosity without clickbait", "impact": "high"},
    {"element": "clean_composition", "description": "Uncluttered layout with clear focal point", "impact": "medium"},
    {"element": "before_after", "description": "Before/after or transformation visual", "impact": "medium"},
    {"element": "arrows_circles", "description": "Visual cues pointing to key element", "impact": "low"},
]


def advise_thumbnail(
    title="",
    content_type="general",
    has_face=False,
    has_text=False,
    text_word_count=0,
    dominant_colors=None,
):
    """Provide thumbnail optimization advice based on video context.

    Args:
        title: Video title (used to suggest complementary thumbnail text)
        content_type: Type of content (tutorial, vlog, review, etc.)
        has_face: Whether the thumbnail includes a face
        has_text: Whether the thumbnail has text overlay
        text_word_count: Number of words in text overlay
        dominant_colors: List of hex color strings in the thumbnail

    Returns:
        dict with score, checklist results, and specific recommendations
    """
    dominant_colors = dominant_colors or []
    score = 0
    checklist_results = []
    recommendations = []

    # Evaluate each element
    if has_face:
        score += 25
        checklist_results.append({"element": "face_closeup", "present": True})
    else:
        checklist_results.append({"element": "face_closeup", "present": False})
        recommendations.append("Add an expressive face close-up - faces increase CTR by up to 38%")

    if has_text:
        score += 15
        checklist_results.append({"element": "text_overlay", "present": True})
        if text_word_count > 5:
            recommendations.append(f"Reduce text to 3-5 words (currently {text_word_count})")
            score -= 5
    else:
        checklist_results.append({"element": "text_overlay", "present": False})
        recommendations.append("Add 3-5 words of bold text that complements (not repeats) the title")

    if dominant_colors:
        score += 10
        unique_hues = len(set(dominant_colors))
        if unique_hues >= 2:
            score += 10
            checklist_results.append({"element": "contrast_colors", "present": True})
        else:
            checklist_results.append({"element": "contrast_colors", "present": False})
            recommendations.append("Use higher-contrast colors to stand out in search results")
    else:
        recommendations.append("Ensure thumbnail uses bold, contrasting colors")

    # Content-type specific advice
    type_tips = {
        "tutorial": "Show the end result or transformation in the thumbnail",
        "review": "Include the product prominently with a clear reaction",
        "vlog": "Use an action shot or surprising moment from the video",
        "comparison": "Show both items side-by-side with a 'VS' element",
        "listicle": "Highlight the most surprising item from your list",
    }
    if content_type in type_tips:
        recommendations.append(type_tips[content_type])

    # Title-based text suggestion
    if title and not has_text:
        words = title.split()
        if len(words) >= 3:
            suggested_text = " ".join(words[:3]).upper()
            recommendations.append(f"Suggested overlay text: \"{suggested_text}\"")

    # General best practices
    score += 15  # Base score for creating a custom thumbnail at all

    if score >= 60:
        grade = "A"
    elif score >= 40:
        grade = "B"
    elif score >= 25:
        grade = "C"
    else:
        grade = "D"

    return {
        "score": min(score, 100),
        "grade": grade,
        "checklist": checklist_results,
        "recommendations": recommendations,
        "best_practices": BEST_PRACTICES,
        "suggested_palettes": BEST_PRACTICES["color_contrast"]["high_ctr_palettes"],
    }
