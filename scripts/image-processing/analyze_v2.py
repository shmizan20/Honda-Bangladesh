import os
from PIL import Image

def analyze_scale(image_paths):
    brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
    for path in image_paths:
        img = Image.open(os.path.join(brain_dir, path)).convert("RGBA")
        data = img.getchannel('A')
        bbox = data.point(lambda p: p > 20 and 255).getbbox()
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        print(f"{path}: w={w}, h={h}, original_w={img.width}, original_h={img.height}")

if __name__ == "__main__":
    paths = [
        "media__1774333100187.png",
        "media__1774333116304.png",
        "media__1774333100474.png",
        "media__1774333100535.png",
        "media__1774333100231.png",
        "media__1774333116373.png",
        "media__1774333116656.png",
        "media__1774333100587.png"
    ]
    analyze_scale(paths)
