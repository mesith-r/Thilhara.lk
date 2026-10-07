import json
import os
import re

json_path = r"c:\Users\theek\OneDrive\Desktop\Th.lk\Thilhara.lk\server\data\products.json"
with open(json_path, "r", encoding="utf-8") as f:
    products = json.load(f)

sql_lines = [
    "-- Seed products and categories from thilhara.lk",
    "DELETE FROM products;",
    "DELETE FROM categories;",
    ""
]

# Extract unique categories
categories = {}
cat_id = 1
for p in products:
    c_name = p.get("categoryName") or "Other"
    c_slug = p.get("categorySlug") or "other"
    if c_name not in categories:
        categories[c_name] = {
            "id": cat_id,
            "name": c_name,
            "slug": c_slug,
            "description": f"Genuine {c_name} and industrial refrigeration supplies",
            "icon": "snowflake"
        }
        cat_id += 1

# Insert categories
sql_lines.append("-- Categories")
for c in categories.values():
    c_name_esc = c["name"].replace("'", "''")
    c_desc_esc = c["description"].replace("'", "''")
    sql_lines.append(
        f"INSERT INTO categories (id, name, slug, description, icon) "
        f"VALUES ({c['id']}, '{c_name_esc}', '{c['slug']}', '{c_desc_esc}', '{c['icon']}') "
        f"ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;"
    )

sql_lines.append("")
sql_lines.append("-- Products")
for p in products:
    p_name = p["name"].replace("'", "''")
    p_slug = p["slug"].replace("'", "''")
    cat_info = categories.get(p.get("categoryName"), {})
    cat_id_val = cat_info.get("id", "NULL")
    brand = p.get("brand", "Thilhara Genuine").replace("'", "''")
    model = p.get("model", "").replace("'", "''")
    desc = p.get("description", "").replace("'", "''")
    specs_json = json.dumps(p.get("specs", {})).replace("'", "''")
    in_stock = "TRUE" if p.get("inStock", True) else "FALSE"
    rating = p.get("rating", 4.9)
    reviews = p.get("reviewsCount", 24)
    img_url = p.get("imageUrl", "").replace("'", "''")

    sql_lines.append(
        f"INSERT INTO products (id, name, slug, category_id, brand, model, description, specs, in_stock, rating, reviews_count, image_url) "
        f"VALUES ({p['id']}, '{p_name}', '{p_slug}', {cat_id_val}, '{brand}', '{model}', '{desc}', '{specs_json}'::jsonb, {in_stock}, {rating}, {reviews}, '{img_url}') "
        f"ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, specs = EXCLUDED.specs, image_url = EXCLUDED.image_url;"
    )

sql_file = r"c:\Users\theek\OneDrive\Desktop\Th.lk\Thilhara.lk\db\seed_products.sql"
with open(sql_file, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print(f"Generated {sql_file} with {len(categories)} categories and {len(products)} products.")
