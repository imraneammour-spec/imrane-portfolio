"""Appartement Ayoub contains exactly the eleven supplied final renders."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [f"{number:03}.webp" for number in range(1, 12)]


class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img" and attrs.get("src", "").startswith("assets/appartement-ayoub/"):
            self.images.append((attrs["src"], attrs.get("alt")))


class AppartementAyoubTests(unittest.TestCase):
    def test_listed_under_appartements(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="appartement-ayoub.html"', home)
        self.assertIn('<h3>Appartement Ayoub</h3>', home)

    def test_gallery_has_eleven_images_in_order(self):
        page = ROOT / "appartement-ayoub.html"
        self.assertTrue(page.exists())
        html = page.read_text(encoding="utf-8")
        parser = ImageParser()
        parser.feed(html)
        self.assertEqual([Path(src).name for src, _ in parser.images], EXPECTED)
        self.assertEqual(html.count("data-gallery-image"), 11)
        for src, alt in parser.images:
            with self.subTest(image=src):
                self.assertTrue(alt)
                with Image.open(ROOT / src) as image:
                    image.load()

    def test_page_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/appartement-ayoub.html", sitemap)


if __name__ == "__main__":
    unittest.main()
