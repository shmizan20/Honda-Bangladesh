import os
from PIL import Image

def align_v4(image_paths, output_dir, target_size=(1024, 1024)):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    images = []
    bboxes = []

    for path in image_paths:
        img = Image.open(path).convert("RGBA")
        data = img.getchannel('A')
        # High threshold to find the solid bike/tires, ignoring shadow
        bbox = data.point(lambda p: p > 200 and 255).getbbox()
        images.append(img)
        bboxes.append(bbox)

    # Use a global scale to ensure fit and breathing room.
    # We want a target bike height of say 700 pixels (from mirrors to bottom tire).
    # Mirrored bike height is bbox[3]-bbox[1].
    # But wait, original height is more like 886. 
    # Let's keep it around 800 for 1024.
    target_bike_h = 700 
    
    # Let's fix ground Y at 900.
    target_ground_y = 900

    for i, (img, bbox) in enumerate(zip(images, bboxes)):
        canvas = Image.new("RGBA", target_size, (0, 0, 0, 0))
        
        # Original bike height (solid parts only)
        # Wait, for consistency we should use ONE scale factor for all frames.
        # Max height of solid part is 886.
        # Let's use scale = 0.8
        scale = 0.8
        
        new_w = int(img.width * scale)
        new_h = int(img.height * scale)
        scaled_img = img.resize((new_w, new_h), Image.LANCZOS)
        
        # New solid bbox after scaling
        new_data = scaled_img.getchannel('A')
        new_bbox_200 = new_data.point(lambda p: p > 200 and 255).getbbox()
        
        # Centering horizontally and grounding vertically BASED ON SOLID TIRE
        bike_w = new_bbox_200[2] - new_bbox_200[0]
        bike_h = new_bbox_200[3] - new_bbox_200[1]
        
        offset_x = (target_size[0] // 2) - (new_bbox_200[0] + bike_w // 2)
        offset_y = target_ground_y - new_bbox_200[3]
        
        canvas.paste(scaled_img, (offset_x, offset_y), scaled_img)
        
        # Save
        canvas.save(os.path.join(output_dir, f"{i+1}.png"), "PNG")
        print(f"Frame {i+1}: Scale 0.8, Offset {offset_x, offset_y}, Solid Size {bike_w}x{bike_h}")

if __name__ == "__main__":
    brain_dir = "/Users/mizanurrahman/.gemini/antigravity/brain/1c90cb06-8da4-4549-9f1d-e79f0c57cd32"
    paths = [
        os.path.join(brain_dir, "media__1774333100187.png"), # Front
        os.path.join(brain_dir, "media__1774333116304.png"), # Front-Right
        os.path.join(brain_dir, "media__1774333100474.png"), # Side-Right
        os.path.join(brain_dir, "media__1774333100535.png"), # Rear-Right
        os.path.join(brain_dir, "media__1774333100231.png"), # Rear
        os.path.join(brain_dir, "media__1774333116373.png"), # Rear-Left
        os.path.join(brain_dir, "media__1774333116656.png"), # Side-Left
        os.path.join(brain_dir, "media__1774333100587.png")  # Front-Left
    ]
    align_v4(paths, "public/360/hornet_nobg")
