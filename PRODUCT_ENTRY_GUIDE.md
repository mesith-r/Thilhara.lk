# Thilhara Product Catalog Entry Guide
> A step-by-step guide for team members to easily add products, images, and descriptions from [thilhara.lk](https://thilhara.lk).

---

## 1. How It Works

We have created an automated system so you do **not** need to touch any code!

1. You open the matching category folder inside [`product_data/`](file:///d:/Education/INternship/thilhara/product_data).
2. You place the downloaded product image directly into that category folder.
3. You open `products.txt` in that folder and add the product details.
4. **Antigravity** (or the sync command) automatically matches the image filename with the text description, copies the image to the web app, and populates the live catalog!

---

## 2. Directory Structure

All product categories are organized inside [`product_data/`](file:///d:/Education/INternship/thilhara/product_data):

```text
product_data/
├── 01_Air_Condition_Accessories/
│   ├── products.txt
│   └── (place images here)
├── 02_Cold_Room_Accessories/
│   ├── products.txt
│   └── (place images here)
├── 03_Coldroom_Panel_And_Door/
│   ├── products.txt
│   └── (place images here)
├── 04_Reciever/
│   ├── products.txt
│   └── (place images here)
├── 05_Copper_Fitting/
│   ├── products.txt
│   └── (place images here)
├── 06_Filter_Driers/
│   ├── products.txt
│   └── (place images here)
├── 07_Oil_Separators/
│   ├── products.txt
│   └── (place images here)
├── 08_Axial_Fan_Motor/
│   ├── products.txt
│   └── (place images here)
├── 09_Compressor/
│   ├── products.txt
│   └── (place images here)
├── 10_Vacum_Pump/
│   ├── products.txt
│   └── (place images here)
├── 11_Valves/
│   ├── products.txt
│   └── (place images here)
├── 12_Pressure_Controls/
│   ├── products.txt
│   └── (place images here)
├── 13_Sight_Glasses/
│   ├── products.txt
│   └── (place images here)
├── 14_Capacitors/
│   ├── products.txt
│   └── (place images here)
├── 15_Tools_and_Equipment/
│   ├── products.txt
│   └── (place images here)
└── 16_Other_Accessories/
    ├── products.txt
    └── (place images here)
```

---

## 3. Step-by-Step Instructions

### Step 1: Download & Save the Image
1. Go to [thilhara.lk](https://thilhara.lk) (or supplier catalogs) and find the product.
2. Save the image with a clean, lowercase name using hyphens (e.g. `danfoss-dcl-163.jpg`).
3. Place that image file directly inside the category folder (for example, in `product_data/06_Filter_Driers/`).

### Step 2: Open `products.txt` and Add the Product Block
Open `products.txt` inside that same category folder, and append your product entry using the `[PRODUCT]` block:

```text
[PRODUCT]
Name: Danfoss DCL 163 Solid Core Liquid Line Filter Drier
Image: danfoss-dcl-163.jpg
Brand: Danfoss
Model: DCL 163
Description: High moisture absorption solid core liquid line filter drier for CFC, HCFC, and HFC refrigerants. Exceptional acid and moisture capture.
Specs:
  Connection: 3/8 in Flare (Male)
  Core Composition: 80% Molecular Sieve / 20% Activated Alumina
  Max Pressure: 46 bar
  Refrigerant: R134a, R404A, R407C, R410A, R507
InStock: Yes
```

---

## 4. Field Descriptions

| Field | Description | Required? | Example |
| :--- | :--- | :--- | :--- |
| `[PRODUCT]` | Indicates a new product entry | **Yes** | `[PRODUCT]` |
| `Name:` | Full official name of the product | **Yes** | `Copeland Scroll Commercial Inverter Compressor` |
| `Image:` | Exact name of the image file placed in this folder | **Yes** | `copeland-scroll.jpg` |
| `Brand:` | Manufacturer or Brand name | Optional | `Copeland`, `Danfoss`, `Castel`, `Thilhara` |
| `Model:` | Model number / SKU code | Optional | `ZP72KCE-TFD` |
| `Description:` | 1-3 sentences describing purpose and usage | **Yes** | `Engineered for commercial cold rooms and climate cooling.` |
| `Specs:` | Technical specifications (indented key: value) | Optional | `Displacement: 72,000 BTU/hr`<br>`Voltage: 380V / 3Ph` |
| `InStock:` | Stock availability (`Yes` or `No`) | Optional | `Yes` |

> [!TIP]
> **Multiple Products in One File**: You can add as many products as you want in each `products.txt`. Simply separate each one with a new `[PRODUCT]` line.

---

## 5. How to Ingest & Sync Products

Once you or your teammates have added products and images to the folders, you can apply them to the site in any of the following ways:

### Method A: Ask Antigravity
Simply tell Antigravity in the chat:
> *"I added new products in the category folders, please sync them."*

Antigravity will automatically run the ingestion script, copy the images, and update the live catalog.

### Method B: Run the One-Click Sync Command
In your terminal, navigate to the project directory and run:

```bash
# From project root:
python scripts/sync_products.py

# OR from client directory:
cd client
npm run sync-products
```

---

## 6. What the Sync Script Does Automatically
- Reads every category folder and parses all `[PRODUCT]` entries.
- Copies the images into `client/public/products/<category-slug>/`.
- Automatically populates `client/src/data/products.json` for the frontend.
- Automatically populates `server/data/products.json` for the Go backend.
- Instantly updates category counters on the Products catalog page.
