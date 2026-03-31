import os
import sys
from PIL import Image

def process_image(img_path, output_path):
    img = Image.open(img_path).convert("RGBA")
    
    # We will crop the top 14% to remove the logo from the top right
    width, height = img.size
    crop_top = int(height * 0.14)
    img = img.crop((0, crop_top, width, height))
    width, height = img.size
    
    # Simple Magic Wand / Flood Fill to find background
    # We'll use a queue and keep track of visited pixels
    data = img.load()
    visited = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    # Start flood fill from corners
    for start_pt in queue:
        if start_pt not in visited:
            q = [start_pt]
            while q:
                x, y = q.pop()
                if (x, y) in visited:
                    continue
                visited.add((x, y))
                
                r, g, b, a = data[x, y]
                # If it's bright/white (tolerance for jpeg artifacts)
                if r > 240 and g > 240 and b > 240:
                    data[x, y] = (255, 255, 255, 0)
                    
                    # Add neighbors
                    if x > 0: q.append((x-1, y))
                    if x < width-1: q.append((x+1, y))
                    if y > 0: q.append((x, y-1))
                    if y < height-1: q.append((x, y+1))
    
    # Now, let's do a simple pass to feather the edges slightly
    # basically if a pixel is visible but adjacent to a fully transparent one, we reduce its alpha
    
    img.save(output_path, "PNG")

input_dir = "public/360/hornet"
output_dir = "public/360/hornet_nobg"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("Processing images...")
for i in range(1, 37):
    src = os.path.join(input_dir, f"{i}.jpg")
    dst = os.path.join(output_dir, f"{i}.png")
    if os.path.exists(src):
        process_image(src, dst)
        print(f"Processed {i}.jpg")
print("Done!")
