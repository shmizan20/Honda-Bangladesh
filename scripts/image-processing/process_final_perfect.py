import os
import sys
import numpy as np
from PIL import Image, ImageFilter
try:
    from rembg import remove, new_session
    print("rembg loaded successfully!")
except ImportError as e:
    print(f"Error loading rembg: {e}")
    sys.exit(1)

input_dir = "public/360/hornet"
output_dir = "public/360/hornet_nobg"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Using isnet-general-use: Better for sharp objects/logos
session = new_session("isnet-general-use")

print("Starting FINAL Premium Image Processing...")

for i in range(1, 12):
    src = os.path.join(input_dir, f"{i}.jpg")
    dst = os.path.join(output_dir, f"{i}.png")
    
    if os.path.exists(src):
        print(f"Refining Frame {i} with high precision...")
        img = Image.open(src).convert("RGBA")
        
        # 1. Precise Crop (Remove only the logo area)
        width, height = img.size
        img = img.crop((0, int(height * 0.14), width, height))
        
        # 2. Advanced Background Removal
        # We disable manual white deletion to save logos
        # Low erode size to protect fine text (Hornet/Honda)
        out = remove(
            img, 
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240, 
            alpha_matting_background_threshold=5,
            alpha_matting_erode_size=3 # Small enough to protect stickers
        )
        
        # 3. Subtle Edge Smoothing (No aggressive thresholding)
        # This makes the wheel edges look natural against any theme
        out = out.filter(ImageFilter.SMOOTH_MORE)
        
        # Save with max quality
        out.save(dst, "PNG", optimize=True, quality=100)
        print(f"Frame {i} polished and saved.")

print("All 11 frames are now perfectly polished.")
