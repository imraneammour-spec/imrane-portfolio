"""Dr Samir Opera publishes every render from the supplied final folder."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [f"{i:03}.webp" for i in range(1, 12)]


class GalleryParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img" and attrs.get("src", "").startswith("assets/dr-samir-opera/"):
            self.images.append((attrs["src"], attrs.get("alt")))


class DrSamirOperaTests(unittest.TestCase):
    def test_project_is_listed_as_cabinet(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="dr-samir-opera.html"', home)
        self.assertIn('<h3>Dr Samir Opera</h3>', home)

    def test_gallery_has_all_eleven_renders_in_order(self):
        page = ROOT / "dr-samir-opera.html"
        self.assertTrue(page.exists(), "Dr Samir Opera page is missing")
        html = page.read_text(encoding="utf-8")
        parser = GalleryParser()
        parser.feed(html)
        self.assertEqual([Path(src).name for src, _ in parser.images], EXPECTED)
        self.assertEqual(html.count("data-gallery-image"), 11)
        for src, alt in parser.images:
            with self.subTest(image=src):
                self.assertTrue(alt)
                with Image.open(ROOT / src) as image:
                    image.load()

    def test_page_is_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/dr-samir-opera.html", sitemap)


if __name__ == "__main__":
    unittest.main()
