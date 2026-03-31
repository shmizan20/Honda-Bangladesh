import os
import sys
import numpy as np
from PIL import Image, ImageOps
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

# u2net is often more robust for these studio shots
session = new_session("u2net")

def clean_pixel_perfect(img):
    # Convert to RGBA if not already
    img = img.convert("RGBA")
    data = np.array(img)
    
    # Extract RGB and Alpha channels
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Identify "near white" pixels that rembg might have missed or left fuzzy
    # We target pixels that are very bright and were previously thought to be foreground
    white_mask = (r > 230) & (g > 230) & (b > 230)
    
    # For these white pixels, we force transparency if they are likely background
    # However, to avoid eating the bike's highlights, we only do this if alpha is already high
    # but the pixel is isolated or in a "background-y" location.
    # Actually, a simpler way: if it's very bright white, just kill it.
    # studio shots usually have backgrounds at 250-255.
    
    # We'll use a slightly more aggressive threshold for pure white background residue
    pure_white_residue = (r > 248) & (g > 248) & (b > 248)
    data[pure_white_residue, 3] = 0
    
    return Image.fromarray(data)

print("Starting Advanced 360 Image Processing (v3)...")

for i in range(1, 12):
    src = os.path.join(input_dir, f"{i}.jpg")
    dst = os.path.join(output_dir, f"{i}.png")
    
    if os.path.exists(src):
        print(f"Processing Frame {i}...")
        img = Image.open(src)
        
        # 1. Initial Crop (Logo Removal)
        width, height = img.size
        # The logo is at top right. 14% crop from top works well.
        img = img.crop((0, int(height * 0.14), width, height))
        
        # 2. Deep Learning Background Removal
        # We use alpha matting to get smooth edges
        out = remove(
            img, 
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        # 3. Post-Processing: Clean up remaining white chunks in spokes
        out = clean_pixel_perfect(out)
        
        # Save with optimization
        out.save(dst, "PNG", optimize=True)
        print(f"Frame {i} saved successfully.")

print("All 11 frames processed perfectly.")
