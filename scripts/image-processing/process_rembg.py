import os
import sys
from PIL import Image
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

# Using 'isnet-general-use' which is often better for bikes/cars
session = new_session("isnet-general-use")

print("Processing images with advanced rembg (matting enabled)...")
for i in range(1, 12): # We know we have 11 files
    src = os.path.join(input_dir, f"{i}.jpg")
    dst = os.path.join(output_dir, f"{i}.png")
    if os.path.exists(src):
        img = Image.open(src)
        
        # Crop out the Motorcycle Valley logo at the top
        width, height = img.size
        # The logo is at the top. Let's crop slightly more if needed, but 14% was okay.
        img = img.crop((0, int(height * 0.14), width, height))
        
        # Remove background with alpha matting for perfect edges and wheel gaps
        # Alpha matting helps significantly with spokes and complex structures
        out = remove(
            img, 
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        out.save(dst, "PNG", optimize=True)
        print(f"High Quality Processed: {i}.png")

print("Advanced processing complete!")
