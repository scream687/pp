"""Marketing Skills plugin - coreyhaines31/marketingskills

A suite of marketing skills for YouTube content optimization including
SEO, title generation, tag strategy, audience analysis, content calendars,
and thumbnail advice.
"""

from .seo_optimizer import optimize_seo
from .title_generator import generate_titles
from .tag_strategy import suggest_tags
from .audience_analyzer import analyze_audience
from .content_calendar import build_calendar
from .thumbnail_advisor import advise_thumbnail

SKILLS = {
    "seo_optimizer": optimize_seo,
    "title_generator": generate_titles,
    "tag_strategy": suggest_tags,
    "audience_analyzer": analyze_audience,
    "content_calendar": build_calendar,
    "thumbnail_advisor": advise_thumbnail,
}

__version__ = "1.0.0"
__marketplace__ = "coreyhaines31/marketingskills"
