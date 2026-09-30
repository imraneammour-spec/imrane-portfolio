"""The Café Brunch page shows only RDC and first-floor renders in order."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [
    ("rdc", [f"rdc-{i:03}.webp" for i in range(1, 8)]),
    ("etage-1", [f"etage-1-{i:03}.webp" for i in range(1, 5)]),
]


class LevelParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.levels = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section" and "brunch-level" in attrs.get("class", "").split():
            self.current = {"name": attrs.get("data-level"), "images": []}
            self.levels.append(self.current)
        if tag == "img" and self.current is not None:
            self.current["images"].append((attrs.get("src"), attrs.get("alt")))

    def handle_endtag(self, tag):
        if tag == "section" and self.current is not None:
            self.current = None


class CafeBrunchProjectTests(unittest.TestCase):
    def test_home_links_to_cafe_brunch_as_interior_project(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="cafe-brunch.html"', home)
        self.assertIn('<h3>Café Brunch</h3>', home)

    def test_only_two_requested_levels_appear_in_order(self):
        page = ROOT / "cafe-brunch.html"
        self.assertTrue(page.exists(), "Café Brunch detail page is missing")
        html = page.read_text(encoding="utf-8")
        self.assertIn("<title>Café Brunch — Imrane Ammour</title>", html)
        parser = LevelParser()
        parser.feed(html)
        self.assertEqual([level["name"] for level in parser.levels],
                         [name for name, _ in EXPECTED])
        self.assertEqual([[Path(src).name for src, _ in level["images"]]
                          for level in parser.levels],
                         [files for _, files in EXPECTED])
        self.assertNotIn("motif plafond", html.lower())
        for level in parser.levels:
            for src, alt in level["images"]:
                with self.subTest(image=src):
                    self.assertTrue(alt)
                    with Image.open(ROOT / src) as image:
                        image.load()

    def test_cafe_brunch_page_is_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/cafe-brunch.html", sitemap)


if __name__ == "__main__":
    unittest.main()
