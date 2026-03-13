"""Plugin marketplace registry - manages marketplace sources and installed plugins."""

import json
import os

REGISTRY_PATH = os.path.join(os.path.dirname(__file__), "registry.json")


def _load_registry():
    if os.path.exists(REGISTRY_PATH):
        with open(REGISTRY_PATH, "r") as f:
            return json.load(f)
    return {"marketplaces": {}, "installed": {}}


def _save_registry(data):
    with open(REGISTRY_PATH, "w") as f:
        json.dump(data, f, indent=2)


def add_marketplace(name, source):
    """Register a new marketplace source (e.g. 'coreyhaines31/marketingskills')."""
    registry = _load_registry()
    registry["marketplaces"][name] = {
        "source": source,
        "added_at": __import__("datetime").datetime.utcnow().isoformat(),
    }
    _save_registry(registry)
    return registry["marketplaces"][name]


def remove_marketplace(name):
    """Remove a marketplace source."""
    registry = _load_registry()
    removed = registry["marketplaces"].pop(name, None)
    _save_registry(registry)
    return removed


def list_marketplaces():
    """List all registered marketplaces."""
    return _load_registry()["marketplaces"]


def install_plugin(marketplace_name, plugin_name, version="latest", skills=None):
    """Record a plugin as installed from a marketplace."""
    registry = _load_registry()
    key = f"{marketplace_name}/{plugin_name}"
    registry["installed"][key] = {
        "marketplace": marketplace_name,
        "plugin": plugin_name,
        "version": version,
        "skills": skills or [],
        "installed_at": __import__("datetime").datetime.utcnow().isoformat(),
    }
    _save_registry(registry)
    return registry["installed"][key]


def uninstall_plugin(marketplace_name, plugin_name):
    """Remove a plugin installation record."""
    registry = _load_registry()
    key = f"{marketplace_name}/{plugin_name}"
    removed = registry["installed"].pop(key, None)
    _save_registry(registry)
    return removed


def list_installed():
    """List all installed plugins."""
    return _load_registry()["installed"]


def get_plugin(marketplace_name, plugin_name):
    """Get details of an installed plugin."""
    key = f"{marketplace_name}/{plugin_name}"
    return _load_registry()["installed"].get(key)
