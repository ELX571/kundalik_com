import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILE_PATH = os.path.join(BASE_DIR, "student_extra_classes.json")


def _safe_read():
    if not os.path.exists(FILE_PATH):
        return {"extra_classes": {}}

    try:
        with open(FILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "extra_classes" not in data or not isinstance(data["extra_classes"], dict):
                return {"extra_classes": {}}
            return data
    except Exception:
        return {"extra_classes": {}}


def load_students():
    return _safe_read()["extra_classes"]


def save_students(extra_classes: dict):
    if not isinstance(extra_classes, dict):
        raise ValueError("extra_classes dict bo‘lishi kerak")

    data = {"extra_classes": extra_classes}
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
