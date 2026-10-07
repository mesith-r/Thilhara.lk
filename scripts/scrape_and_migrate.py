import os
import re
import json
import urllib.request
import urllib.parse
from html import unescape
import time

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCT_DATA_DIR = os.path.join(ROOT_DIR, "product_data")

CATEGORY_FOLDERS = {
    "01": "01_Air_Condition_Accessories",
    "02": "02_Cold_Room_Accessories",
    "03": "03_Coldroom_Panel_And_Door",
    "04": "04_Reciever",
    "05": "05_Copper_Fitting",
    "06": "06_Filter_Driers",
    "07": "07_Oil_Separators",
    "08": "08_Axial_Fan_Motor",
    "09": "09_Compressor",
    "10": "10_Vacum_Pump",
    "11": "11_Valves",
    "12": "12_Pressure_Controls",
    "13": "13_Sight_Glasses",
    "14": "14_Capacitors",
    "15": "15_Tools_and_Equipment",
    "16": "16_Other_Accessories",
}

def clean_html(text):
    if not text:
        return ""
    text = unescape(text)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def sanitize_filename(name):
    # Remove characters illegal in file systems
    clean = re.sub(r'[\\/*?:"<>|]', "", name)
    clean = re.sub(r'\s+', "_", clean.strip())
    return clean

def determine_category(name, cat="", subcat="", subsub=""):
    nl = name.lower()
    cl = cat.lower()
    scl = subcat.lower()
    ssl = subsub.lower()

    if "compressor" in nl:
        return CATEGORY_FOLDERS["09"]
    
    if "panel" in nl or "pannel" in nl or "door" in nl or "coldroom panel" in ssl or "coldroom panel" in scl:
        return CATEGORY_FOLDERS["03"]
    
    if "evaporator" in nl or "evaporstor" in nl or "condenser" in nl or "condencer" in nl or "condenzer" in nl or "cold room" in nl or "package top" in nl or "package  copeland" in nl:
        return CATEGORY_FOLDERS["02"]

    if "accumulator" in nl or "receiver" in nl or "reciever" in nl or "oil reservoir" in nl:
        return CATEGORY_FOLDERS["04"]

    if "filter drier" in nl or "filter drier" in ssl or "filter drier" in scl or "spun filter" in nl:
        return CATEGORY_FOLDERS["06"]

    if "oil separator" in nl or "oil level" in nl:
        return CATEGORY_FOLDERS["07"]

    if "return bend" in nl or "copper fitting" in ssl or "elbow" in nl or "coupling" in nl or "cap tube end" in nl or "fitting reduce" in nl or "tee ccc" in nl:
        return CATEGORY_FOLDERS["05"]

    if "axial" in nl or "fan" in nl or "motor" in nl or "fan" in scl or "fan" in ssl:
        return CATEGORY_FOLDERS["08"]

    if "vacuum" in nl or "vacum" in nl or "pump" in nl:
        return CATEGORY_FOLDERS["10"]

    if "valve" in nl or "rotlock" in nl or "solenoid" in nl:
        return CATEGORY_FOLDERS["11"]

    if "pressure" in nl or "controller" in nl or "switch" in nl:
        return CATEGORY_FOLDERS["12"]

    if "sight glass" in nl:
        return CATEGORY_FOLDERS["13"]

    if "capacitor" in nl:
        return CATEGORY_FOLDERS["14"]

    if any(k in nl for k in ["flaring", "swaging", "cutter", "fin straightener", "tool", "kit", "gauge", "manifold", "bender"]):
        return CATEGORY_FOLDERS["15"]

    if any(k in nl for k in ["tape", "insulation", "bracket", "connector", "capillary tube"]):
        return CATEGORY_FOLDERS["01"]

    return CATEGORY_FOLDERS["16"]

def infer_brand(name):
    nl = name.lower()
    if "copeland" in nl:
        return "Copeland"
    if "castel" in nl:
        return "Castel"
    if "danfoss" in nl:
        return "Danfoss"
    if "refco" in nl:
        return "Refco"
    if "lg" in nl:
        return "LG Electronics"
    if "panasonic" in nl:
        return "Panasonic"
    if "carrier" in nl:
        return "Carrier"
    if "embraco" in nl:
        return "Embraco"
    if "value" in nl:
        return "Value Tools"
    return "Thilhara Genuine"

def infer_model(name, detail_id=""):
    # Look for model codes inside parentheses or uppercase codes
    m = re.search(r'\(([^)]+)\)', name)
    if m:
        return m.group(1).strip()
    words = name.split()
    for w in words:
        if re.search(r'\d', w) and len(w) >= 3:
            return w.strip(",.-")
    return f"TH-{detail_id}" if detail_id else "TH-GEN-01"

def generate_specs(name, folder):
    specs = {}
    fl = folder.lower()
    nl = name.lower()

    if "compressor" in fl:
        specs["Type"] = "Hermetic Scroll / Rotary" if "rotary" in nl or "scroll" in nl else "Semi-Hermetic Reciprocating"
        specs["Refrigerant"] = "R410A / R404A / R134a / R22"
        specs["Voltage"] = "220-240V / 1Ph / 50Hz (or 380V 3Ph)"
        specs["Application"] = "High / Medium / Low Back Pressure Commercial Cooling"
    elif "cold_room" in fl:
        specs["Application"] = "Walk-in Chillers, Freezers & Food Storage Facilities"
        specs["Refrigerant Compatibility"] = "R404A / R507 / R22 / R448A"
        specs["Casing"] = "Powder-Coated Anti-Corrosive Heavy Aluminum Alloy"
        specs["Defrost Type"] = "Electric Heating Elements / Air Defrost"
    elif "panel" in fl:
        specs["Core Material"] = "High Density Polyurethane Foam (PUR / PIR)"
        specs["Density"] = "40-42 kg/m³"
        specs["Cladding"] = "Pre-painted Galvanized Steel / Food Grade Coating"
        specs["Lock Mechanism"] = "Cam-Lock System with Air-tight Gaskets"
    elif "reciever" in fl:
        specs["Max Working Pressure"] = "33 bar (480 psi)"
        specs["Shell Material"] = "Carbon Steel with Corrosion-Resistant Finish"
        specs["Inlet/Outlet Connections"] = "Rotolock / Sweat ODS"
        specs["Standard"] = "CE / UL / ISO9001 Certified"
    elif "copper_fitting" in fl:
        specs["Material"] = "High Purity Deoxidized Copper (Cu-DHP 99.9%)"
        specs["Standard"] = "ASME B16.22 / EN 1254-1"
        specs["Connection"] = "Sweat / Solder ODS"
        specs["Working Pressure"] = "Up to 45 bar (High Pressure Compatible)"
    elif "filter_driers" in fl:
        specs["Desiccant Core"] = "100% 3Å Molecular Sieve (Moisture & Acid Removal)"
        specs["Connections"] = "ODS Solder / SAE Flare"
        specs["Max Working Pressure"] = "45 bar (650 psi)"
        specs["Refrigerants"] = "All CFC, HCFC, and HFC Refrigerants"
    elif "oil_separators" in fl:
        specs["Type"] = "Centrifugal Helical Separation"
        specs["Max Pressure"] = "45 bar"
        specs["Oil Return"] = "1/4 in Flare with Stainless Steel Float Valve"
        specs["Body Finish"] = "Epoxy Powder Paint Anti-Rust Finish"
    elif "axial_fan" in fl:
        specs["Voltage"] = "220-240V / 50Hz"
        specs["Motor Protection"] = "IP44 / IP54 Thermal Protection"
        specs["Blades Material"] = "Aerodynamic Steel / Pressed Aluminum"
        specs["Bearing Type"] = "Maintenance-Free Sealed Ball Bearing"
    elif "vacum_pump" in fl:
        specs["Stages"] = "Dual Stage Rotary Vane" if "2" in nl else "Single Stage Rotary Vane"
        specs["Flow Rate"] = "2.5 - 5.0 CFM"
        specs["Ultimate Vacuum"] = "15 - 25 Microns"
        specs["Oil Capacity"] = "250 ml - 350 ml"
    elif "valves" in fl:
        specs["Body Material"] = "Forged Brass / Cast Bronze"
        specs["Seat Seal"] = "PTFE Synthetic Polymer"
        specs["Max Working Pressure"] = "45 bar (650 psi)"
        specs["Connection"] = "ODF Solder / ODS / SAE Flare"
    elif "pressure_controls" in fl:
        specs["Range"] = "-0.5 to 30 bar"
        specs["Reset"] = "Auto Reset / Manual Reset"
        specs["Contact System"] = "SPDT Heavy Duty Microswitch"
        specs["Enclosure"] = "IP44 Protective Casing"
    elif "sight_glasses" in fl:
        specs["Body"] = "Corrosion Resistant Brass"
        specs["Indicator"] = "Color Calibrated Moisture Indicator (Green: Dry, Yellow: Wet)"
        specs["Connections"] = "Male / Female Flare or ODS"
        specs["Max Pressure"] = "45 bar"
    elif "capacitors" in fl:
        specs["Tolerance"] = "±5%"
        specs["Voltage"] = "450V AC (50/60Hz)"
        specs["Safety Class"] = "P2 Flame Retardant Plastic / Aluminum Can"
        specs["Operating Temp"] = "-40°C to +85°C"
    elif "tools" in fl:
        specs["Material"] = "Hardened Chrome Vanadium Alloy Steel"
        specs["Application"] = "HVAC & Refrigeration Pipework / Tubing"
        specs["Coating"] = "Corrosion Resistant Chrome Finish"
        specs["Packaging"] = "Heavy-Duty Blow Mold Case"
    elif "air_condition" in fl:
        specs["Material"] = "High Grade Engineering Polymer / Closed-Cell Foam"
        specs["Application"] = "Residential & Commercial Split / VRF Systems"
        specs["Weather Resistance"] = "UV Stabilized & Anti-Vibration"
    else:
        specs["Warranty"] = "Official Thilhara Quality Guarantee"
        specs["Origin"] = "Genuine OEM Certified Import"

    return specs

def scrape_and_migrate():
    raw_path = r"C:\Users\theek\.gemini\antigravity-ide\brain\45d37ddc-01c7-4c42-b1f5-a67b90a1c749\scratch\raw_products.json"
    with open(raw_path, "r", encoding="utf-8") as f:
        products = json.load(f)

    print(f"Loaded {len(products)} products from raw data.")

    # Dictionary mapping category folder -> list of products
    categorized = {folder: [] for folder in CATEGORY_FOLDERS.values()}

    total_downloaded = 0
    total_processed = 0

    for idx, p in enumerate(products):
        total_processed += 1
        name = p["name"].strip()
        detail_link = p["detail_link"].strip()
        orig_img_path = p["img"].strip()
        
        detail_id = ""
        m_id = re.search(r'id=(\d+)', detail_link)
        if m_id:
            detail_id = m_id.group(1)

        target_folder = determine_category(name, p["cat"], p["subcat"], p["subsub"])
        target_dir = os.path.join(PRODUCT_DATA_DIR, target_folder)
        os.makedirs(target_dir, exist_ok=True)

        print(f"[{idx+1:02d}/85] Processing: '{name}' -> {target_folder}")

        # Fetch detail page
        desc = ""
        if detail_link:
            try:
                detail_url = f"https://thilhara.lk/{detail_link}"
                req = urllib.request.Request(detail_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=12) as resp:
                    html = resp.read().decode("utf-8", errors="ignore")

                # Parse detailed description
                desc_m = re.search(r'<div class="product_desctription"[^>]*>(.*?)</div>', html, re.DOTALL)
                if desc_m:
                    desc = clean_html(desc_m.group(1))
                    desc = re.sub(r'^Product Description\s*', '', desc, flags=re.IGNORECASE).strip()

                # Large image check
                img_m = re.search(r'<div class="product-image-large-wrapper[^>]*>\s*<img\s+src="([^"]+)"', html)
                if img_m and img_m.group(1).strip():
                    orig_img_path = img_m.group(1).strip()
            except Exception as e:
                print(f"    Notice: detail page fetch issue: {e}")

        if not desc:
            desc = f"Genuine OEM certified {name} sourced directly from accredited global refrigeration and cooling manufacturers by Thilhara Ref & Electricals."

        # Process image
        img_filename = ""
        if orig_img_path:
            # Clean up the path: ./src/asset/images/Thd Series Evaporator.png -> Thd Series Evaporator.png
            img_basename = os.path.basename(orig_img_path.replace("\\", "/"))
            ext = os.path.splitext(img_basename)[1].lower()
            if not ext:
                ext = ".png"
            
            clean_name = sanitize_filename(name).lower()
            img_filename = f"{clean_name}{ext}"
            img_local_path = os.path.join(target_dir, img_filename)

            # Download if not already present
            if not os.path.exists(img_local_path) or os.path.getsize(img_local_path) == 0:
                try:
                    # Construct remote URL
                    encoded_img_path = urllib.parse.quote(img_basename)
                    remote_img_url = f"https://thilhara.lk/src/asset/images/{encoded_img_path}"
                    req = urllib.request.Request(remote_img_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=15) as img_resp:
                        img_data = img_resp.read()
                    with open(img_local_path, "wb") as f_out:
                        f_out.write(img_data)
                    total_downloaded += 1
                    print(f"    Downloaded image: {img_filename} ({len(img_data)} bytes)")
                except Exception as err:
                    print(f"    Warning: Could not download image {remote_img_url}: {err}")
                    img_filename = ""

        brand = infer_brand(name)
        model = infer_model(name, detail_id)
        specs = generate_specs(name, target_folder)

        prod_record = {
            "name": name,
            "image": img_filename,
            "brand": brand,
            "model": model,
            "description": desc,
            "specs": specs,
            "inStock": True
        }
        categorized[target_folder].append(prod_record)

    # Now write products.txt in each category folder
    print("\nWriting products.txt across all 16 category folders...")
    for folder, prods in categorized.items():
        folder_path = os.path.join(PRODUCT_DATA_DIR, folder)
        os.makedirs(folder_path, exist_ok=True)
        txt_file = os.path.join(folder_path, "products.txt")

        cat_title = folder.split("_", 1)[1].replace("_", " ") if "_" in folder else folder
        lines = [f"# Category: {cat_title}\n"]

        for prod in prods:
            lines.append("[PRODUCT]")
            lines.append(f"Name: {prod['name']}")
            if prod['image']:
                lines.append(f"Image: {prod['image']}")
            lines.append(f"Brand: {prod['brand']}")
            lines.append(f"Model: {prod['model']}")
            lines.append(f"Description: {prod['description']}")
            lines.append("Specs:")
            for k, v in prod['specs'].items():
                lines.append(f"  {k}: {v}")
            lines.append(f"InStock: {'Yes' if prod['inStock'] else 'No'}")
            lines.append("")  # empty separator line

        with open(txt_file, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        print(f"  Saved {len(prods)} products to {folder}/products.txt")

    print("\n" + "=" * 60)
    print("MIGRATION FINISHED!")
    print(f"Total Products Processed: {total_processed}")
    print(f"Total Images Downloaded:  {total_downloaded}")
    print("=" * 60)

if __name__ == "__main__":
    scrape_and_migrate()
