import os
import json

os.makedirs('templates', exist_ok=True)

products = [
    {"sku": "20101", "handle": "maxi-comfort-360", "title": "Maxi-Comfort 360º Hydraulic Chair"},
    {"sku": "20102", "handle": "maxi-comfort-pedicure", "title": "Maxi-Comfort Pedicure 360º Chair"},
    {"sku": "20201", "handle": "multi-comfort", "title": "Multi-Comfort Treatment Table"},
    {"sku": "20301", "handle": "hydro-comfort", "title": "Hydro-Comfort Hydraulic Table"},
    {"sku": "20401", "handle": "aero-comfort", "title": "Aero-Comfort Professional Table"},
    {"sku": "20501", "handle": "poly-comfort", "title": "Poly-Comfort Versatile Station"}
]

for p in products:
    filename = f"templates/product.{p['sku']}-{p['handle']}.json"
    template_data = {
      "sections": {
        "main": {
          "type": "main-product",
          "settings": {
            "back_text": "Back",
            "custom_title": p['title'],
            "intro_highlight": "Professional grade equipment designed for high-volume aesthetic and clinical environments.",
            "custom_description": f"<p>{p['title']} is purpose-built for licensed professionals, ensuring maximum efficiency and client comfort.</p>",
            "subtitle": "Professional Hydraulic Elevation & 360° Articulation",
            "secondary_description": "<p>Heavy-duty metallic chassis and medical-grade vinyl designed for intensive daily use.</p>",
            "show_variant_selectors": True,
            "show_color_option": True,
            "show_size_option": False,
            "featured_product": p['handle'],
            "btn_label": "ADD TO CART",
            "show_compare_btn": True,
            "compare_btn_label": "Compare with other models"
          }
        },
        "main_product_characteristics_Hp7Baq": {
          "type": "main-product-characteristics",
          "settings": {
            "accordion_heading": "Professional Applications",
            "show_shipping": True,
            "show_tech_type": True,
            "show_tech_table": True,
            "custom_table_html": f'<div class="equipro-specs-container"><table class="equipro-table"><thead><tr><th>TECHNICAL ASPECT</th><th>SPECIFICATION DETAILS</th></tr></thead><tbody><tr><td class="feature-label">Model SKU</td><td>{p["sku"]}</td></tr><tr><td class="feature-label">Warranty</td><td>2 Years Full Manufacturer Warranty</td></tr></tbody></table></div>'
          }
        },
        "banner_features": {
          "type": "product-key-features-banner",
          "settings": {
            "heading": "Key Features for the Professional Station",
            "bg_color": "#a22938",
            "text_color": "#ffffff"
          }
        },
        "how_to": {
          "type": "product-how-to",
          "settings": {
            "title_color": "#a22938"
          }
        },
        "faq": {
          "type": "category-faq",
          "settings": {
            "heading": "Your Questions, Answered"
          }
        },
        "compare_modal": {
          "type": "product-compare-modal",
          "settings": {
            "compare_collection": "hydraulic-mechanical"
          }
        }
      },
      "order": ["main", "main_product_characteristics_Hp7Baq", "banner_features", "how_to", "faq", "compare_modal"]
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(template_data, f, indent=2)
    print(f"Creado localmente: {filename}")

print("¡Los 6 archivos se han generado en tu carpeta local!")
