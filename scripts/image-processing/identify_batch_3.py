import os
from PIL import Image

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
files = [
    "media__1774344733758.jpg",
    "media__1774344733761.png",
    "media__1774344733866.jpg",
    "media__1774344733913.png",
    "media__1774344733948.png",
    "media__1774344760057.png",
    "media__1774344760111.png",
    "media__1774344760203.jpg"
]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: {img.size} {img.format} {img.mode}")
    else:
        print(f"{f}: NOT FOUND")
