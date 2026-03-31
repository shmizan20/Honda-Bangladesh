import os
from PIL import Image

def check_alpha(image_path):
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    # Check bottom-most 100 pixels
    data = img.getchannel('A')
    bbox_10 = data.point(lambda p: p > 10 and 255).getbbox()
    bbox_200 = data.point(lambda p: p > 200 and 255).getbbox()
    print(f"{os.path.basename(image_path)}:")
    print(f"  BBox alpha > 10: {bbox_10}")
    print(f"  BBox alpha > 200: {bbox_200}")

if __name__ == "__main__":
    brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
    paths = [
        os.path.join(brain_dir, "media__1774333100187.png"), # Front
        os.path.join(brain_dir, "media__1774333100474.png")  # Side Right
    ]
    for p in paths:
        check_alpha(p)
