"""Appartement Said Opera publishes its four supplied final renders in order."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [f"{number:03}.webp" for number in range(1, 5)]


class GalleryParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img" and attrs.get("src", "").startswith("assets/appartement-said-opera/"):
            self.images.append((attrs["src"], attrs.get("alt")))


class AppartementSaidOperaTests(unittest.TestCase):
    def test_listed_as_an_apartment(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="appartement-said-opera.html"', home)
        self.assertIn('<h3>Appartement Said Opera</h3>', home)

    def test_four_renders_in_order(self):
        page = ROOT / "appartement-said-opera.html"
        self.assertTrue(page.exists())
        html = page.read_text(encoding="utf-8")
        parser = GalleryParser()
        parser.feed(html)
        self.assertEqual([Path(src).name for src, _ in parser.images], EXPECTED)
        self.assertEqual(html.count("data-gallery-image"), 4)
        for src, alt in parser.images:
            with self.subTest(image=src):
                self.assertTrue(alt)
                with Image.open(ROOT / src) as image:
                    image.load()

    def test_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/appartement-said-opera.html", sitemap)


if __name__ == "__main__":
    unittest.main()
