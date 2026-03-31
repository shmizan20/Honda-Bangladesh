import os
import shutil
from PIL import Image
try:
    from rembg import remove, new_session
except ImportError:
    print("rembg not installed, please install it.")
    exit(1)

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
output_dir = "public/360/hornet_nobg"

mapping = {
    "1": "media__1774336246724.png", # Front
    "2": "media__1774336246959.png", # Front-Right
    "3": "media__1774336246793.png", # Side-Right
    "4": "media__1774336246963.jpg", # Rear-Right
    "5": "media__1774336246533.png", # Rear
    "6": "media__1774336260576.jpg", # Rear-Left
    "7": "media__1774336260335.png", # Side-Left
    "8": "media__1774336260543.jpg"  # Front-Left
}

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

session = new_session("isnet-general-use")

for target_id, source_name in mapping.items():
    src_path = os.path.join(brain_dir, source_name)
    dst_path = os.path.join(output_dir, f"{target_id}.png")
    
    if os.path.exists(src_path):
        print(f"Processing {source_name} -> {target_id}.png...")
        img = Image.open(src_path).convert("RGBA")
        
        # Remove background while keeping the manual scaling/positioning
        out = remove(
            img,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10
        )
        
        # Ensure we maintain the 1024x923 user-specified canvas if needed
        # rembg can slightly change the output size if not careful, 
        # but usually it doesn't unless it crops.
        # Let's ensure the output is pasted back onto the original transparent canvas size.
        canvas = Image.new("RGBA", img.size, (0, 0, 0, 0))
        canvas.paste(out, (0, 0), out)
        canvas.save(dst_path, "PNG", optimize=True)
        print(f"Done: {target_id}.png")
    else:
        print(f"Error: {source_name} NOT FOUND")
