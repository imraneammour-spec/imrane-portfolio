"""Generate lightweight WebP previews without changing original project renders."""
from pathlib import Path
import re
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / 'assets' / 'thumbnails'
DESTINATION.mkdir(exist_ok=True)

with Image.open(ROOT / 'assets' / 'hero-villa.png') as image:
    image.convert('RGB').save(ROOT / 'assets' / 'hero-villa-optimized.webp', 'WEBP', quality=86, method=6)

html = (ROOT / 'index.html').read_text(encoding='utf-8')
html = html.replace('src="assets/hero-villa.png"', 'src="assets/hero-villa-optimized.webp"')
stylesheet = (ROOT / 'cafe.css').read_text(encoding='utf-8')
for name, source in re.findall(r'\.([\w-]+-thumbnail)\s*\{[^}]*url\(\x27([^\x27]+)\x27\)', stylesheet):
    with Image.open(ROOT / source) as image:
        image = image.convert('RGB')
        image.thumbnail((1000, 800))
        target = DESTINATION / (name + '.webp')
        image.save(target, 'WEBP', quality=83, method=6)
        tag = f'<img src="assets/thumbnails/{target.name}" alt="" width="{image.width}" height="{image.height}" loading="lazy" decoding="async" />'
        html = re.sub(rf'(<div class="project-image {name}">)(?!<img)', lambda match: match[1] + tag, html)
(ROOT / 'index.html').write_text(html, encoding='utf-8')
print('Optimized hero and 11 lazy-loaded project previews.')
