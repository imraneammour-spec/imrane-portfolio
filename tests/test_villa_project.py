"""Checks that the Villa project can be reached and its renders can open."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


class Tags(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


def tags_in(page):
    parsed = Tags()
    parsed.feed((ROOT / page).read_text(encoding="utf-8"))
    return parsed.tags


class VillaProjectTests(unittest.TestCase):
    def test_home_links_to_villa_as_an_interior_project(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="villa.html"', home)
        self.assertIn('data-category="interieur"', home)
        self.assertIn('<h3>Villa</h3>', home)

    def test_villa_page_shows_all_eleven_working_renders(self):
        page = ROOT / "villa.html"
        self.assertTrue(page.exists(), "Villa detail page is missing")
        html = page.read_text(encoding="utf-8")
        self.assertIn("<title>Villa — Imrane Ammour</title>", html)
        self.assertNotIn("Kesh", html)
        renders = [attrs["src"] for tag, attrs in tags_in("villa.html")
                   if tag == "img" and attrs.get("src", "").startswith("assets/villa/")]
        self.assertEqual(len(renders), 11)
        self.assertEqual(len(set(renders)), 11)
        for render in renders:
            with self.subTest(render=render):
                with Image.open(ROOT / render) as image:
                    image.verify()

    def test_villa_page_is_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/villa.html", sitemap)


if __name__ == "__main__":
    unittest.main()
