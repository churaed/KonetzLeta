"""Generate web copies without modifying source art. Requires Pillow: pip install Pillow.

Run from any directory: python3 scripts/optimize-island-illustrations.py
Widths follow IslandDiscovery.css. Keep 3x detail for small drawings and 2x for
landscape. Lossless WebP preserves the resized strokes and alpha channel.
"""
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/assets/images/houyhnhnms-illustrations'
DESTINATION = SOURCE / 'optimized'
MAX_DISPLAY_WIDTHS = {
    'tree': 130, 'herd': 210, 'huddle': 180, 'friends': 156,
    'procession': 200, 'horse': 140, 'face': 75, 'landscape': 660,
    'earth': 170, 'skeleton': 85, 'bones': 85,
}


def main():
    # SVG view boxes crop transparent margins; size for the visible artwork.
    bounds_source = (ROOT / 'src/components/islandIllustrationBounds.ts').read_text()
    bounds = json.loads(re.search(r'= (\{.*\}) as const', bounds_source, re.S)[1])
    DESTINATION.mkdir(exist_ok=True)
    original_bytes = optimized_bytes = 0
    for name, display_width in MAX_DISPLAY_WIDTHS.items():
        source = SOURCE / f'{name}.webp'
        destination = DESTINATION / source.name
        with Image.open(source) as image:
            visible_width = float(bounds[name]['viewBox'].split()[2])
            density = 2 if name == 'landscape' else 3
            scale = min(1, display_width * density / visible_width)
            size = (round(image.width * scale), round(image.height * scale))
            resized = image.resize(size, Image.Resampling.LANCZOS)
            resized.save(destination, format='WEBP', lossless=True, method=6)
        original_bytes += source.stat().st_size
        optimized_bytes += destination.stat().st_size
        print(f'{name}: {size[0]}x{size[1]}, {destination.stat().st_size:,} bytes')
    print(f'Total: {original_bytes:,} -> {optimized_bytes:,} bytes '
          f'({1 - optimized_bytes / original_bytes:.1%} smaller)')


if __name__ == '__main__':
    main()
