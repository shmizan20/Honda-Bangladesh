import os
import shutil

brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
output_dir = "public/360/hornet_nobg"

# Explicit mapping based on user's manual scaling
mapping = {
    "1.png": "media__1774337254641.png", # Front
    "2.png": "media__1774337254751.png", # Front-Right
    "3.png": "media__1774337254701.png", # Side-Right
    "4.png": "media__1774337254885.png", # Rear-Right
    "5.png": "media__1774337254593.png", # Rear
    "6.png": "media__1774337269324.png", # Rear-Left
    "7.png": "media__1774337269223.png", # Side-Left
    "8.png": "media__1774337269273.png"  # Front-Left
}

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for target, source in mapping.items():
    src_path = os.path.join(brain_dir, source)
    dst_path = os.path.join(output_dir, target)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {source} to {target}")
    else:
        print(f"Error: Source {source} not found!")
