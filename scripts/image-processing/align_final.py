import os
from PIL import Image

def align_and_scale(image_paths, output_dir, target_size=(1024, 1024)):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    images = []
    bboxes = []

    # 1. Load images and find bounding boxes
    for path in image_paths:
        img = Image.open(path).convert("RGBA")
        data = img.getchannel('A')
        # Use a higher threshold to ignore faint shadow edges for centering/scaling
        bbox = data.point(lambda p: p > 20 and 255).getbbox()
        images.append(img)
        bboxes.append(bbox)

    # 2. Determine scale
    # We want consistent scale. Side views (3, 7) are wide, Front/Rear (1, 5) are narrow.
    # The height from mirrors to tire should be roughly consistent across all frames.
    
    # Let's target a bike height of 850 pixels.
    target_bike_h = 850 
    
    # The Ground level Y position on the 1024 canvas
    ground_y = 920

    for i, (img, bbox) in enumerate(zip(images, bboxes)):
        curr_h = bbox[3] - bbox[1]
        
        # Scaling to match bike height
        scale = target_bike_h / curr_h
        new_w = int(img.width * scale)
        new_h = int(img.height * scale)
        
        scaled_img = img.resize((new_w, new_h), Image.LANCZOS)
        
        # Recalculate bbox after scaling
        new_data = scaled_img.getchannel('A')
        new_bbox = new_data.point(lambda p: p > 20 and 255).getbbox()
        
        canvas = Image.new("RGBA", target_size, (0, 0, 0, 0))
        
        bike_w = new_bbox[2] - new_bbox[0]
        bike_h = new_bbox[3] - new_bbox[1]
        
        # Offset to center horizontally and align ground vertically
        offset_y = ground_y - new_bbox[3]
        offset_x = (target_size[0] // 2) - (new_bbox[0] + bike_w // 2)
        
        canvas.paste(scaled_img, (offset_x, offset_y), scaled_img)
        
        # Save
        canvas.save(os.path.join(output_dir, f"{i+1}.png"), "PNG")
        print(f"Frame {i+1} ({os.path.basename(image_paths[i])}): Scale {scale:.2f}, Height {curr_h}px -> {bike_h}px")

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
    
    align_and_scale(paths, "public/360/hornet_nobg")
