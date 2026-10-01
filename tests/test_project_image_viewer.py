"""Every project render participates in its own page's image viewer."""

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
PROJECT_IMAGES = {
    "cafe-khemisset.html": 10,
    "villa-contemporaine.html": 3,
    "parapharmacie-sale.html": 7,
    "villa.html": 11,
    "appartement.html": 13,
    "cafe-brunch.html": 11,
    "cabinet-dr-hamane.html": 10,
    "dr-hafidi-opera.html": 12,
    "dr-samir-opera.html": 9,
    "appartement-ayoub.html": 11,
    "appartement-said-opera.html": 4,
}


class ProjectImageViewerTests(unittest.TestCase):
    def test_all_project_images_can_open_in_the_viewer(self):
        for page, expected_count in PROJECT_IMAGES.items():
            with self.subTest(page=page):
                html = (ROOT / page).read_text(encoding="utf-8")
                figures = re.findall(r"<figure\b([^>]*)>\s*<img\b", html)
                self.assertEqual(len(figures), expected_count)
                self.assertTrue(all("data-gallery-image" in attrs for attrs in figures),
                                f"{page} contains a render outside the image viewer")


if __name__ == "__main__":
    unittest.main()
