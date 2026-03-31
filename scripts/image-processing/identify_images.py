import os
from PIL import Image

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
files = [
    "media__1774336246533.png",
    "media__1774336246724.png",
    "media__1774336246793.png",
    "media__1774336246959.png",
    "media__1774336246963.jpg",
    "media__1774336260335.png",
    "media__1774336260543.jpg",
    "media__1774336260576.jpg"
]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: {img.size}")
    else:
        print(f"{f}: NOT FOUND")
