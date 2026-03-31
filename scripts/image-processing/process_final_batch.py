import os
import sys
from rembg import remove
from PIL import Image

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
output_dir = "/Users/mizanurrahman/Documents/Honda Bangladesh/public/360/hornet_nobg"

files = [
    "media__1774344760057.png", # 1: Front
    "media__1774344760111.png", # 2: Front-Right
    "media__1774344733948.png", # 3: Side-Right
    "media__1774344760203.jpg", # 4: Rear-Right
    "media__1774344733761.png", # 5: Rear
    "media__1774345566079.jpg", # 6: Rear-Left
    "media__1774345566024.png", # 7: Side-Left
    "media__1774345566076.jpg"  # 8: Front-Left
]

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("Starting high-quality background removal...")

for i, f in enumerate(files):
    input_path = os.path.join(brain_dir, f)
    output_path = os.path.join(output_dir, f"{i+1}.png")
    
    print(f"Processing {i+1}/8: {f}...")
    
    with open(input_path, 'rb') as i_file:
        input_data = i_file.read()
        # High quality removal without matting to keep edges crisp
        output_data = remove(input_data)
        
        with open(output_path, 'wb') as o_file:
            o_file.write(output_data)

print("Done! All 8 frames processed and saved to hornet_nobg/1-8.png")
