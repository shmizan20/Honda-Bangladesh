import os
from PIL import Image

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
files = [
    "media__1774342201493.png",
    "media__1774342201602.png",
    "media__1774342201629.jpg",
    "media__1774342201696.png",
    "media__1774342201732.png",
    "media__1774342220513.png",
    "media__1774342220648.jpg",
    "media__1774342220658.jpg"
]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: {img.size} {img.format} {img.mode}")
    else:
        print(f"{f}: NOT FOUND")
