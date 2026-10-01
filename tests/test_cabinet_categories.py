"""Cabinet gallery and interior project categories."""

from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPECTED_TYPES = {
    "cafe-khemisset.html": "cafes-restaurants",
    "cafe-brunch.html": "cafes-restaurants",
    "appartement.html": "appartements",
    "villa.html": "villas",
    "cabinet-dr-hamane.html": "cabinets",
    "dr-hafidi-opera.html": "cabinets",
    "dr-samir-opera.html": "cabinets",
    "parapharmacie-sale.html": "commerces",
}


class PortfolioParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.cards = {}
        self.current_type = None
        self.filters = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "article" and "project-card" in attrs.get("class", "").split():
            self.current_type = attrs.get("data-project-type")
        elif tag == "a" and self.current_type and attrs.get("href"):
            self.cards[attrs["href"]] = self.current_type
        elif tag == "button" and "project-subfilter" in attrs.get("class", "").split():
            self.filters.append(attrs.get("data-project-filter"))

    def handle_endtag(self, tag):
        if tag == "article":
            self.current_type = None


class CabinetAndCategoriesTests(unittest.TestCase):
    def test_each_interior_project_has_its_type_and_filter(self):
        parser = PortfolioParser()
        parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))
        self.assertEqual({key: parser.cards.get(key) for key in EXPECTED_TYPES}, EXPECTED_TYPES)
        self.assertEqual(parser.filters, ["all", "cafes-restaurants", "appartements", "villas", "cabinets", "commerces"])

    def test_cabinet_page_has_ten_renders_in_order(self):
        page = ROOT / "cabinet-dr-hamane.html"
        self.assertTrue(page.exists(), "Cabinet detail page is missing")
        html = page.read_text(encoding="utf-8")
        self.assertIn("Cabinet Dr Hamane", html)
        self.assertIn("Cabinet de psychiatrie", html)
        self.assertIn("data-gallery-image", html)
        for number in range(1, 11):
            src = f"assets/cabinet-dr-hamane/{number:03}.webp"
            with self.subTest(image=src):
                self.assertIn(f'src="{src}"', html)
                with Image.open(ROOT / src) as image:
                    image.load()
        self.assertEqual(html.count('src="assets/cabinet-dr-hamane/'), 10)

    def test_cabinet_page_is_in_sitemap(self):
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://imrane-portfolio.netlify.app/cabinet-dr-hamane.html", sitemap)


if __name__ == "__main__":
    unittest.main()
