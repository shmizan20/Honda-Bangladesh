import os
from PIL import Image

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
files = [
    "media__1774343538898.png",
    "media__1774343539044.png",
    "media__1774343539202.png",
    "media__1774343539233.jpg",
    "media__1774343539268.png",
    "media__1774343546791.png",
    "media__1774343546827.jpg",
    "media__1774343546838.jpg"
]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: {img.size} {img.format} {img.mode}")
    else:
        print(f"{f}: NOT FOUND")
