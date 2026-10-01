"""Dr Hafidi Opera contains only the three requested spaces, in order."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [
    ("attente-1", [f"attente-1-{i:03}.webp" for i in range(1, 5)]),
    ("vip", [f"vip-{i:03}.webp" for i in range(1, 5)]),
    ("maquette", [f"maquette-{i:03}.webp" for i in range(1, 5)]),
]


class SpaceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.spaces = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section" and "hafidi-space" in attrs.get("class", "").split():
            self.current = {"name": attrs.get("data-space"), "images": []}
            self.spaces.append(self.current)
        if tag == "img" and self.current is not None:
            self.current["images"].append((attrs.get("src"), attrs.get("alt")))

    def handle_endtag(self, tag):
        if tag == "section" and self.current is not None:
            self.current = None


class DrHafidiOperaTests(unittest.TestCase):
    def test_home_links_to_cabinet(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="dr-hafidi-opera.html"', html)
        self.assertIn('data-project-type="cabinets"', html)

    def test_only_requested_spaces_appear_in_order(self):
        page = ROOT / "dr-hafidi-opera.html"
        self.assertTrue(page.exists(), "Dr Hafidi Opera page is missing")
        html = page.read_text(encoding="utf-8")
        parser = SpaceParser()
        parser.feed(html)
        self.assertEqual([space["name"] for space in parser.spaces],
                         [name for name, _ in EXPECTED])
        self.assertEqual([[Path(src).name for src, _ in space["images"]]
                          for space in parser.spaces],
                         [names for _, names in EXPECTED])
        self.assertNotIn("SALLE DE CONSULTATION", html)
        self.assertNotIn("SALLE D'EXPLORATION", html)
        for space in parser.spaces:
            for src, alt in space["images"]:
                with self.subTest(image=src):
                    self.assertTrue(alt)
                    with Image.open(ROOT / src) as image:
                        image.load()

    def test_page_is_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/dr-hafidi-opera.html", sitemap)


if __name__ == "__main__":
    unittest.main()
