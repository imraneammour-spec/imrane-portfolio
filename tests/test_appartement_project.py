"""The Appartement page contains only the requested rooms, in order."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [
    ("hall", [f"hall-{i:03}.webp" for i in range(1, 6)]),
    ("parents", [f"parents-{i:03}.webp" for i in range(1, 4)]),
    ("fille", [f"fille-{i:03}.webp" for i in range(1, 4)]),
    ("terrasse", [f"terrasse-{i:03}.webp" for i in range(1, 3)]),
]


class RoomParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rooms = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section" and "apartment-room" in attrs.get("class", "").split():
            self.current = {"name": attrs.get("data-room"), "images": []}
            self.rooms.append(self.current)
        if tag == "img" and self.current is not None:
            self.current["images"].append((attrs.get("src"), attrs.get("alt")))

    def handle_endtag(self, tag):
        if tag == "section" and self.current is not None:
            self.current = None


class AppartementProjectTests(unittest.TestCase):
    def test_home_links_to_the_apartment_project(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="appartement.html"', home)
        self.assertIn('<h3>Appartement</h3>', home)

    def test_only_requested_rooms_appear_in_order_with_working_images(self):
        page = ROOT / "appartement.html"
        self.assertTrue(page.exists(), "Appartement detail page is missing")
        html = page.read_text(encoding="utf-8")
        self.assertIn("<title>Appartement — Imrane Ammour</title>", html)
        parser = RoomParser()
        parser.feed(html)
        self.assertEqual([room["name"] for room in parser.rooms],
                         [name for name, _ in EXPECTED])
        self.assertEqual([[Path(src).name for src, _ in room["images"]]
                          for room in parser.rooms],
                         [files for _, files in EXPECTED])
        for room in parser.rooms:
            for src, alt in room["images"]:
                with self.subTest(image=src):
                    self.assertTrue(alt)
                    with Image.open(ROOT / src) as image:
                        image.load()

    def test_apartment_page_is_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/appartement.html", sitemap)


if __name__ == "__main__":
    unittest.main()
