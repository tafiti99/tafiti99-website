#!/usr/bin/env python3
"""Dependency-free integrity checks for the Tafiti99 static website."""
from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [
    "index.html", "about.html", "services.html", "portfolio.html",
    "blog.html", "article.html", "contact.html", "thank-you.html",
]
EXPECTED_EMAIL = "sadicktunda99@gmail.com"
EXPECTED_SOCIAL = {
    "https://www.linkedin.com/in/tafiti99",
    "https://instagram.com/tafiti99_research?exln=NGs1Y2ZhNXgwMmJi",
    "https://tiktok.com/@tafiti99_research",
    "https://github.com/tafiti99",
}
EXPECTED_COLORS = {
    "--primary-blue": "#002244",
    "--accent-teal": "#008080",
    "--teal-dark": "#006666",
}

class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str]] = []
        self.ids: set[str] = set()
        self.form_actions: list[str] = []
        self.text_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for key in ("href", "src", "action"):
            value = attrs.get(key)
            if value:
                self.refs.append((key, value))
        if tag == "form" and attrs.get("action"):
            self.form_actions.append(attrs["action"])

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.text_parts.append(data.strip())

errors: list[str] = []
checks: list[str] = []
parsers: dict[str, PageParser] = {}

# Required pages exist and parse with Python's HTML parser.
for name in HTML_FILES:
    path = ROOT / name
    if not path.is_file():
        errors.append(f"Missing required page: {name}")
        continue
    parser = PageParser()
    try:
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
        parsers[name] = parser
    except Exception as exc:  # pragma: no cover - defensively report parser errors
        errors.append(f"Could not parse {name}: {exc}")
checks.append(f"Parsed {len(parsers)}/{len(HTML_FILES)} required HTML pages")

# Validate local references in HTML. External URLs and URL schemes are intentionally skipped.
for name, parser in parsers.items():
    for kind, ref in parser.refs:
        ref = ref.strip()
        if not ref or ref.startswith("#"):
            continue
        parts = urlsplit(ref)
        if parts.scheme or parts.netloc:
            continue
        path_part = unquote(parts.path)
        if not path_part:
            continue
        target = (ROOT / path_part).resolve()
        try:
            target.relative_to(ROOT.resolve())
        except ValueError:
            errors.append(f"Path escapes project root in {name}: {ref}")
            continue
        if not target.exists():
            errors.append(f"Broken local {kind} in {name}: {ref}")
checks.append("Checked local HTML links, scripts, stylesheets, image sources and form actions")

# Check JSON syntax and all referenced project/article assets.
for json_name in ("data/projects.json", "data/articles.json"):
    path = ROOT / json_name
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"Invalid JSON in {json_name}: {exc}")
        continue
    ids = [item.get("id") for item in data]
    if len(ids) != len(set(ids)):
        errors.append(f"Duplicate IDs in {json_name}")
    if json_name.endswith("projects.json"):
        for item in data:
            for image_path in [item.get("thumbnail"), *(item.get("projectImages") or [])]:
                if image_path and not urlsplit(image_path).scheme and not (ROOT / image_path).is_file():
                    errors.append(f"Missing project image for {item.get('title')}: {image_path}")
    else:
        for item in data:
            article_path = item.get("file")
            if not article_path or not (ROOT / article_path).is_file():
                errors.append(f"Missing Markdown article for {item.get('id')}: {article_path}")
checks.append("Validated portfolio/article JSON, unique IDs, project images and Markdown article files")

# Validate CSS variables and ensure the user-requested brand colors were preserved.
css_text = (ROOT / "css/style.css").read_text(encoding="utf-8")
for variable, color in EXPECTED_COLORS.items():
    pattern = rf"{re.escape(variable)}\s*:\s*{re.escape(color)}\b"
    if not re.search(pattern, css_text, re.IGNORECASE):
        errors.append(f"Brand variable changed or missing: {variable}: {color}")
checks.append("Verified existing primary-blue, accent-teal and teal-dark brand variables are unchanged")

# Validate email, social links, book image, and key story claims.
all_html = "\n".join((ROOT / name).read_text(encoding="utf-8") for name in HTML_FILES if (ROOT / name).exists())
if EXPECTED_EMAIL not in all_html:
    errors.append(f"Expected contact email not present: {EXPECTED_EMAIL}")
if "itsadicktunda99" in all_html:
    errors.append("Old email address still present in HTML")
if "https://github.com/tafiti99" not in all_html:
    errors.append("GitHub profile link missing from HTML")
for url in EXPECTED_SOCIAL:
    if url not in all_html:
        errors.append(f"Required social/profile link missing: {url}")
if not (ROOT / "images/spss-r-health-research-promo.webp").is_file():
    errors.append("Supplied book promotional artwork is missing")
if 'src="images/spss-r-health-research-promo.webp"' not in (ROOT / "index.html").read_text(encoding="utf-8"):
    errors.append("Homepage is not using the supplied book promotional artwork")
about_text = (ROOT / "about.html").read_text(encoding="utf-8").lower()
if "november 7th, 2025" not in about_text or "bila kuchoka" not in about_text:
    errors.append("Founder/story correction is missing date or Bila Kuchoka")
if re.search(r"co[- ]founder|cofounder", all_html, flags=re.IGNORECASE):
    errors.append("Co-founder designation still appears in HTML")
checks.append("Checked email address, GitHub/social profile links, supplied book artwork, story corrections and removal of co-founder designation")

# Check that same-page fragments target an ID; cross-page fragments are checked when the target page is in this project.
for name, parser in parsers.items():
    for kind, ref in parser.refs:
        if kind != "href" or ref.startswith("mailto:") or ref.startswith("tel:") or ref.startswith("javascript:"):
            continue
        parts = urlsplit(ref)
        if not parts.fragment:
            continue
        if parts.scheme or parts.netloc:
            continue
        target_page = unquote(parts.path) if parts.path else name
        target_page = target_page or name
        target_parser = parsers.get(target_page)
        if target_parser and unquote(parts.fragment) not in target_parser.ids:
            errors.append(f"Broken fragment in {name}: {ref}")
checks.append("Checked internal page-fragment targets")

for check in checks:
    print(f"PASS: {check}")

if errors:
    print(f"\nFAILED: {len(errors)} issue(s) found:")
    for item in errors:
        print(f"  - {item}")
    sys.exit(1)

print("\nALL CHECKS PASSED")
