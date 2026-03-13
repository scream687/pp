"""Plugin loader - discovers and loads installed skill modules."""

import importlib
import os

INSTALLED_DIR = os.path.join(os.path.dirname(__file__), "installed")

_loaded_skills = {}


def discover_skills():
    """Scan installed plugins directory and return available skill modules."""
    skills = {}
    if not os.path.isdir(INSTALLED_DIR):
        return skills

    for plugin_dir in os.listdir(INSTALLED_DIR):
        plugin_path = os.path.join(INSTALLED_DIR, plugin_dir)
        if not os.path.isdir(plugin_path):
            continue
        init_file = os.path.join(plugin_path, "__init__.py")
        if not os.path.exists(init_file):
            continue

        module_name = f"plugins.installed.{plugin_dir}"
        try:
            mod = importlib.import_module(module_name)
            if hasattr(mod, "SKILLS"):
                for skill_name, skill_fn in mod.SKILLS.items():
                    skills[f"{plugin_dir}.{skill_name}"] = skill_fn
        except Exception as e:
            print(f"Warning: failed to load plugin {plugin_dir}: {e}")

    return skills


def load_all():
    """Load all installed skills and cache them."""
    global _loaded_skills
    _loaded_skills = discover_skills()
    return _loaded_skills


def get_skill(name):
    """Get a loaded skill by fully-qualified name."""
    if not _loaded_skills:
        load_all()
    return _loaded_skills.get(name)


def list_skills():
    """List all loaded skill names."""
    if not _loaded_skills:
        load_all()
    return list(_loaded_skills.keys())
