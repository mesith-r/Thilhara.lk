import os
import re
import json
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCT_DATA_DIR = os.path.join(ROOT_DIR, "product_data")
CLIENT_PUBLIC_PRODUCTS = os.path.join(ROOT_DIR, "client", "public", "products")
CLIENT_DATA_OUTPUT = os.path.join(ROOT_DIR, "client", "src", "data", "products.json")
SERVER_DATA_OUTPUT = os.path.join(ROOT_DIR, "server", "data", "products.json")

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def parse_txt_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.split(r'\[PRODUCT\]', content, flags=re.IGNORECASE)
    products = []

    for block in blocks[1:]:  # skip preamble before first [PRODUCT]
        lines = block.strip().split("\n")
        prod = {
            "name": "",
            "image": "",
            "brand": "Thilhara",
            "model": "",
            "description": "",
            "specs": {},
            "inStock": True,
            "rating": 5.0,
            "reviewsCount": 12
        }

        in_specs = False

        for raw_line in lines:
            line = raw_line.strip()
            if not line or line.startswith("#"):
                continue

            if in_specs:
                if ":" in line and not line.lower().startswith("instock:") and not line.lower().startswith("rating:") and not line.lower().startswith("reviewscount:"):
                    k, v = line.split(":", 1)
                    prod["specs"][k.strip()] = v.strip()
                    continue
                else:
                    in_specs = False

            if line.lower().startswith("specs:"):
                in_specs = True
                continue

            if ":" in line:
                k, v = line.split(":", 1)
                k_clean = k.strip().lower()
                v_clean = v.strip()

                if k_clean == "name":
                    prod["name"] = v_clean
                elif k_clean == "image":
                    prod["image"] = v_clean
                elif k_clean == "brand":
                    prod["brand"] = v_clean
                elif k_clean == "model":
                    prod["model"] = v_clean
                elif k_clean == "description":
                    prod["description"] = v_clean
                elif k_clean == "instock":
                    prod["inStock"] = v_clean.lower() in ["true", "yes", "1", "available"]
                elif k_clean == "rating":
                    try:
                        prod["rating"] = float(v_clean)
                    except:
                        pass
                elif k_clean == "reviewscount":
                    try:
                        prod["reviewsCount"] = int(v_clean)
                    except:
                        pass

        if prod["name"]:
            products.append(prod)

    return products

def sync_products():
    print(f"Scanning product directory: {PRODUCT_DATA_DIR}")
    os.makedirs(CLIENT_PUBLIC_PRODUCTS, exist_ok=True)
    os.makedirs(os.path.dirname(CLIENT_DATA_OUTPUT), exist_ok=True)
    os.makedirs(os.path.dirname(SERVER_DATA_OUTPUT), exist_ok=True)

    all_products = []
    category_counts = {}
    copied_images_count = 0
    product_id_counter = 1

    entries = sorted(os.listdir(PRODUCT_DATA_DIR))

    for entry in entries:
        cat_path = os.path.join(PRODUCT_DATA_DIR, entry)
        if not os.path.isdir(cat_path):
            continue

        # Extract readable category name
        # e.g. '01_Air_Condition_Accessories' -> 'Air Condition Accessories'
        if "_" in entry and entry[:2].isdigit():
            cat_name = entry.split("_", 1)[1].replace("_", " ")
        else:
            cat_name = entry.replace("_", " ")

        cat_slug = slugify(cat_name)
        category_counts[cat_name] = 0

        # Destination folder for category images
        cat_img_dest = os.path.join(CLIENT_PUBLIC_PRODUCTS, cat_slug)
        os.makedirs(cat_img_dest, exist_ok=True)

        txt_file = os.path.join(cat_path, "products.txt")
        if not os.path.exists(txt_file):
            continue

        parsed_items = parse_txt_file(txt_file)

        for item in parsed_items:
            img_filename = item["image"]
            image_url = ""

            if img_filename:
                src_img = os.path.join(cat_path, img_filename)
                if os.path.exists(src_img):
                    dest_img = os.path.join(cat_img_dest, img_filename)
                    shutil.copy2(src_img, dest_img)
                    copied_images_count += 1
                    image_url = f"/products/{cat_slug}/{img_filename}"
                elif img_filename.startswith("http://") or img_filename.startswith("https://"):
                    image_url = img_filename
                else:
                    # File named in txt but not placed yet, prepare the expected URL
                    image_url = f"/products/{cat_slug}/{img_filename}"
            
            if not image_url:
                image_url = "/hero-cooling-showcase.png"

            full_product = {
                "id": product_id_counter,
                "name": item["name"],
                "slug": f"{slugify(item['name'])}-{product_id_counter}",
                "categoryGroup": cat_name,
                "categoryName": cat_name,
                "categorySlug": cat_slug,
                "brand": item["brand"],
                "model": item["model"],
                "description": item["description"],
                "specs": item["specs"],
                "inStock": item["inStock"],
                "rating": item["rating"],
                "reviewsCount": item["reviewsCount"],
                "imageUrl": image_url
            }

            all_products.append(full_product)
            category_counts[cat_name] += 1
            product_id_counter += 1

    # Save to client and server JSON
    with open(CLIENT_DATA_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)

    with open(SERVER_DATA_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)

    print("\n" + "="*60)
    print("PRODUCT CATALOG SYNC COMPLETE!")
    print("="*60)
    print(f"Total Categories Scanned: {len(category_counts)}")
    print(f"Total Products Loaded:    {len(all_products)}")
    print(f"Images Copied to Client:  {copied_images_count}")
    print(f"Client Output: {CLIENT_DATA_OUTPUT}")
    print(f"Server Output: {SERVER_DATA_OUTPUT}")
    print("="*60)
    for cat, count in category_counts.items():
        print(f" - {cat}: {count} products")
    print("="*60)

if __name__ == "__main__":
    sync_products()
