# Treatment-table and chair standardization

Single progress checklist for this workstream. Updated 2026-10-16. Active theme verified: **157851386029** (`-equipro-devShopify/main`); development theme **157680631981** is not the deployment target.

## Scope and gates

- [x] Verify active theme and capture a fresh complete backup before deployment. Backup: `equipro-before-treatment-standardization-157851386029.zip`, SHA-256 `29484bfad17566106dbd474378fa620fb22f358b061406153bd1e5f1c1186fa5`, in the task visualization folder.
- [x] Inspect the rendered Aero-comfort reference and its active-theme JSON/settings.
- [x] Verify all eight requested products’ current assignments in Shopify Admin (all are `product.json`).
- [x] Inventory ten additional treatment-table/chair pages below, including two portable pages kept separate.
- [x] Prepare Ultra-Comfort 20500 using the existing shared sections; no shared Liquid, CSS, cart or comparison changes.
- [x] Deploy only the pilot JSON template to active theme 157851386029 and verify read-back; parsed JSON content matches exactly.
- [x] Complete desktop (1280 px) and mobile (390 px) review captures and content/identity checks; no horizontal overflow.
- [x] Pilot structure and visual layout approved by the user; identity, control and currency questions remain open.
- [ ] Obtain explicit approval before any product-template assignment change.
- [ ] After pilot approval: batch 20210, Murano, Royal and Divine; then other clearly mapped chairs. Keep Pedicure and Infinity blocked on the identity questions below. Routine edits inside approved batches do not require individual approval.

Comparison expansion, filters and cart testing are deferred. The restored comparison interface/four-product selection, all existing purchase/quote rules, prior specification corrections and unrelated work are preserved. No records will be merged/deleted.

## Actual reference structure

Reference: [Aero-comfort 21200](https://equipro-dev.myshopify.com/products/21200-aero-comfort), assigned `product.21200-aero-comfort.json`. Its section order is:

1. `main-product`: Back link; desktop two-column hero with burgundy title, left-border introduction, description, subtitle/secondary description and live buy box on the left; product image, vertical thumbnails and existing Compare trigger on the right. Variants, price and images are Shopify product data. The reference itself hides its size selector; the 20500 pilot retains its current color **and** size selectors.
2. `main-product-characteristics`: three native `<details>` accordions and shipping information on the left; two-column specification table on the right.
3. `product-key-features-banner`: burgundy `#a22938` background, white heading/three bullets, image on the right, 60 px vertical padding and 40 px margins.
4. `product-how-to`: image left, How to Use and Safety & Disclaimers right; 40 px padding/margins.
5. `category-faq`: heading/subheading left, accordion grid right, first answer open. Existing burgundy headings, black borders, and 40 px spacing.
6. `product-compare-modal`: existing modal markup; its button visibility follows the product’s existing rule. The 20500 default page has no Compare button, so the pilot does not enable one.

The existing styles stack the hero, characteristics, banner, how-to and FAQ grids on mobile. The pilot’s mobile hero order is Back → product gallery/horizontal thumbnails → title → price/variant selectors/buy button → descriptions. Characteristics then stack accordions/shipping above the specification table; no horizontal page overflow at 390 px. No alternative layout, selector, typography, colors, spacing, or buttons are introduced. Aero’s technical specifications and product images are never used as pilot content.

## Pilot source mapping and discrepancies

Primary: [Canada PRO V1.2](</Volumes/Equipro/0-Equipro/Listes de prix/Listes de prix 2026/CANADA/Professionnel/PriceList-PRO/compress-Liste de prix-Canada-PRO_V1.2.pdf>), **PDF page 9 of 36**, entry `20500 / 20501 Ultra-Confort / Ultra-Comfort`. Verified values: height 20.5–36.5 in; widths 24/26 in across the two catalog models; adjustable headrest; manually adjustable backrest/legrest; 15° tilt; ultra-resistant leatherette, Color Chart A; optional removable ergonomic armrests and casters; Weight 320 lb/145 kg; warranty 2 years.

The PDF’s `Dimensions` value is retained literally in its printed order: **L × 72 in × 20.5/36.5 in H**. The literal `L` is not relabeled or interpreted as a guessed axis. A separate width row identifies the current 24-inch model/variant. Catalog prices are **CA$4,350 (24 in)** and **CA$4,550 (26 in)**. Shopify’s current product is USD 4,350 for `20500-24W`; the live price remains product-driven. No currency conversion, variant expansion or price mutation was made.

Additional source: [Squarespace Ultra-Comfort](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-confort), reached from the Electric listing. It supplies the product-specific introductory/positioning/care subject matter. Conflicts are withheld: its technical table identifies **20501**, says **26 in** wide, claims fully electric backrest/legrest/tilt, a proximity-sensor pedal, and lowering to **19 in**. Those claims are not transferred to 20500. The PDF’s manual articulation and 20.5–36.5 range govern; exact height-control/motor configuration remains **Not confirmed**. No model-specific load capacity, motor count, certification, service interval or parts/labor warranty terms are invented.

Applicable sections: positioning, upholstery, optional accessories, specifications, how-to/care and FAQs. Treatment uses not supported for this model (e.g. a specific pedicure assembly or split legrests) are not filled with generic claims. Existing product images are reused in the banner/how-to slots; missing future media will use the existing section’s image slot/placeholder.

## Requested products

- [x] **Ultra-Comfort 20500** — `ultra-comfort-20500`
  - Product ID: `8744551284909`; SKU(s): `20500-24W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-confort).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Pilot template deployed for review; desktop/mobile verification complete; visually approved; assignment remains unchanged. Intended review template: `product.20500-ultra-comfort.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Pilot source, desktop/mobile, image and keyboard checks passed below.
  - Unresolved questions: Exact 20500/24-inch identity; source control details conflict with PDF. Store USD vs Canada catalog CAD.
  - Review URL: [ultra-comfort-20500](https://equipro-dev.myshopify.com/products/ultra-comfort-20500?preview_theme_id=157851386029&view=20500-ultra-comfort).

- [ ] **Ultra-comfort Pedicure 20502** — `ultra-comfortprofessional-treatment-pedicure-chair-20500`
  - Product ID: `8744551710893`; SKU(s): `20502-24W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-comfort-pedicure-20502).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Inventoried; implementation deferred until pilot approval and identity confirmation.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Handle says 20500; catalog title and SKU say 20502. PDF p. 9 covers 20500/20501, not 20502. Squarespace category alt text says 20501 despite URL 20502. Do not transfer the 20500 specifications.
  - Review URL: [ultra-comfortprofessional-treatment-pedicure-chair-20500](https://equipro-dev.myshopify.com/products/ultra-comfortprofessional-treatment-pedicure-chair-20500).

- [x] **Multi-Comfort 20210** — `multi-comfort-electric-height-20210`
  - Product ID: `8744551645357`; SKU(s): `20210-24W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/multi-comfort-electrique); primary technical entry: Canada PRO V1.2 p. 9.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 1 complete and deployed to active theme 157851386029; template `product.20210-multi-comfort-electric-height.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Squarespace table says height 22.5–34.5 in and weight 130 lb/60 kg; PDF p. 9 says height 27–34 in and weight 120 lb/55 kg. Dimensions is retained separately, in PDF order; no inferred axis or control hardware. Applicability: All reference sections apply.
  - Review URL: [multi-comfort-electric-height-20210](https://equipro-dev.myshopify.com/products/multi-comfort-electric-height-20210?preview_theme_id=157851386029&view=20210-multi-comfort-electric-height).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/multi-comfort-electric-height-20210-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/multi-comfort-electric-height-20210-standardized-mobile.png).

- [x] **Murano EI-500** — `ei-500-murano`
  - Product ID: `8744551448749`; SKU(s): `Ei-500`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/spa-comfort-ei-500); primary technical entry: Canada PRO V1.2 p. 10.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 1 complete and deployed to active theme 157851386029; template `product.ei-500-murano.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: PDF p. 10 calls the adjustment unit a control lever; Squarespace calls it an electric remote and lists full electric functions. Exact control hardware remains Not confirmed; no motor count or extra neck bolster is assumed. Applicability: All reference sections apply.
  - Review URL: [ei-500-murano](https://equipro-dev.myshopify.com/products/ei-500-murano?preview_theme_id=157851386029&view=ei-500-murano).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-500-murano-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-500-murano-standardized-mobile.png).

- [x] **Royal EI-501** — `ei-501-royal`
  - Product ID: `8744551514285`; SKU(s): `EI-501W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/royal-ei-501); primary technical entry: Canada PRO V1.2 p. 10.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 1 complete and deployed to active theme 157851386029; template `product.ei-501-royal.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: PDF dimensions order is 28 × 72 × 17/39 H; the legacy table reverses the first two values and adds inferred L/W labels. PDF order retained. Existing direct-purchase configuration is preserved; no variants added. Applicability: All reference sections apply.
  - Review URL: [ei-501-royal](https://equipro-dev.myshopify.com/products/ei-501-royal?preview_theme_id=157851386029&view=ei-501-royal).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-501-royal-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-501-royal-standardized-mobile.png).

- [ ] **Infinity EI-502 (misleading Ultra-comfort handle)** — `ultra-comfort-20500-gm25t`
  - Product ID: `8744551350445`; SKU(s): `Ei-502W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/infinity-ei-502).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Inventoried; identity decision required before implementation.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Title, SKU and images identify EI-502; body description is copied from Ultra-Comfort. Two live Infinity records overlap. Do not merge/delete/reassign or include in comparison.
  - Review URL: [ultra-comfort-20500-gm25t](https://equipro-dev.myshopify.com/products/ultra-comfort-20500-gm25t).

- [ ] **EI-502 Infinity** — `ei-502-infinity`
  - Product ID: `8734928863405`; SKU(s): `No SKU assigned`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/infinity-ei-502).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Inventoried; identity decision required before implementation.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Separate record from ultra-comfort-20500-gm25t; list description identifies Infinity and 21–39 in, but SKU missing and live price USD 0.00. Do not infer purchase eligibility from price/inventory.
  - Review URL: [ei-502-infinity](https://equipro-dev.myshopify.com/products/ei-502-infinity).

- [x] **Divine EI-504** — `ei-504-divine`
  - Product ID: `8744551579821`; SKU(s): `Ei-504W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/divine-ei-504); primary technical entry: Canada PRO V1.2 p. 11.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 1 complete and deployed to active theme 157851386029; template `product.ei-504-divine.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: The catalog product body is an incorrect Ultra-Comfort copy. The dedicated Divine template corrects rendered content using EI-504 data only; the underlying product body/normal default URL is not changed by this template-only deployment. Applicability: All reference sections apply.
  - Review URL: [ei-504-divine](https://equipro-dev.myshopify.com/products/ei-504-divine?preview_theme_id=157851386029&view=ei-504-divine).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-504-divine-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-504-divine-standardized-mobile.png).

## Other treatment-table/chair inventory


- [ ] **Spa-Comfort 20300** — `spa-comfort-20300`
  - Product ID: `8744551415981`; SKU(s): `20300-28W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/spa-comfort-20300).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Additional inconsistent page inventoried; not implemented. Intended review template: `product.20300-spa-comfort.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: PDF p. 9 covers 20300/20301 with widths 28/30 in; preserve exact model/variant.
  - Review URL: [spa-comfort-20300](https://equipro-dev.myshopify.com/products/spa-comfort-20300).

- [ ] **Elite Spa EI-508** — `elite-spa-ei-508`
  - Product ID: `8744551743661`; SKU(s): `EI-508`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/elite-spa).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Additional inconsistent page inventoried; not implemented. Intended review template: `product.ei-508-elite-spa.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: PDF p. 11 description says height 22–39 in; Dimensions prints 31 × 76 × 16.5 × 40 in. Do not resolve by guessing.
  - Review URL: [elite-spa-ei-508](https://equipro-dev.myshopify.com/products/elite-spa-ei-508).

- [ ] **Natura Spa EI-509** — `natura-spa-ei-509`
  - Product ID: `8744551809197`; SKU(s): `Ei-509`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/natura-spa).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Additional inconsistent page inventoried; not implemented. Intended review template: `product.ei-509-natura-spa.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Confirm exact model-specific content using PDF p. 11 and matching source.
  - Review URL: [natura-spa-ei-509](https://equipro-dev.myshopify.com/products/natura-spa-ei-509).

- [ ] **Bohemia EI-23403** — `bohemia-ei-23403`
  - Product ID: `8744552169645`; SKU(s): `EI-23403W`.
  - Assigned template: `product.23403-bohemia.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/boutique/p/bohemia-ei-23403).
  - Structural gaps: Reference section order already exists. Product-specific applicability, data and media need a later audit; no structural replacement now.
  - Implementation status: Existing six-section structure inventoried; portable family kept separate.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Portable seated-massage chair: applicable content must be audited separately; legacy source URL from prior catalog inventory not revalidated in this pass.
  - Review URL: [bohemia-ei-23403](https://equipro-dev.myshopify.com/products/bohemia-ei-23403).

- [ ] **Calypso EI-23402** — `calypso-ei-23402`
  - Product ID: `8744552235181`; SKU(s): `EI-23402`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/boutique/p/calypso-ei-23402).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Additional inconsistent page inventoried; portable family kept separate. Intended review template: `product.23402-calypso.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Portable table: do not assume treatment-chair instructions or specifications; legacy source URL from prior catalog inventory not revalidated in this pass.
  - Review URL: [calypso-ei-23402](https://equipro-dev.myshopify.com/products/calypso-ei-23402).

- [ ] **Maxi-Comfort 360º 20100** — `maxi-comfort-360`
  - Product ID: `8744552005805`; SKU(s): `20100W`.
  - Assigned template: `product.SKU00001-maxi-comfort-360.json` (missing); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/maxi-comfort-360).
  - Structural gaps: Assigned file is absent; storefront falls back to default. The dedicated correct-model template is available separately.
  - Implementation status: Missing assigned template inventoried; correct 20100 preview already prepared in previous work. Intended review template: `product.20100-maxi-comfort-360.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Assigned SKU00001 suffix absent; product.20100-maxi-comfort-360.json exists and its previous PDF-supported corrections must remain. Assignment approval still required.
  - Review URL: [maxi-comfort-360](https://equipro-dev.myshopify.com/products/maxi-comfort-360).

- [ ] **Maxi-Comfort Pedicure 360º 20101** — `maxi-confort-pedicure-360`
  - Product ID: `8744552104109`; SKU(s): `20101W`.
  - Assigned template: `product.20101-maxi-comfort-360.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/maxi-comfort-pedicure).
  - Structural gaps: Six-section order exists, but template refers to the wrong 20100 product; source/model content must be corrected before use.
  - Implementation status: Existing structure inventoried; wrong-model template content flagged. Intended review template: `product.20101-maxi-comfort-pedicure.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Assigned product.20101-maxi-comfort-360.json exists but features maxi-comfort-360 and has 20100-oriented title/content. Exact product.20101-maxi-comfort-pedicure.json also exists; review before any assignment change.
  - Review URL: [maxi-confort-pedicure-360](https://equipro-dev.myshopify.com/products/maxi-confort-pedicure-360).

- [ ] **Multi-Comfort Hydraulic 20200** — `20200-multi-comfort`
  - Product ID: `8744553775277`; SKU(s): `20200-24W plus other colors; 14 variants`.
  - Assigned template: `product.20200-multi-comfort.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/multi-comfort).
  - Structural gaps: Reference section order already exists. Product-specific applicability, data and media need a later audit; no structural replacement now.
  - Implementation status: Existing six-section reference structure inventoried; no edit.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Content/source and all variants require later audit; do not copy electric 20210 control claims.
  - Review URL: [20200-multi-comfort](https://equipro-dev.myshopify.com/products/20200-multi-comfort).

- [ ] **Hydro-Comfort 21100** — `21100-hydro-comfort`
  - Product ID: `8744553840813`; SKU(s): `21100W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/hydro-comfort).
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Additional inconsistent default page inventoried; no edit. Intended review template: `product.21100-hydro-comfort.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: A dedicated product.21100-hydro-comfort.json exists, but is not assigned.
  - Review URL: [21100-hydro-comfort](https://equipro-dev.myshopify.com/products/21100-hydro-comfort).

- [ ] **Poly-Comfort 22100** — `22100-poly-comfort`
  - Product ID: `8744553906349`; SKU(s): `22100W; other colors have missing SKUs`.
  - Assigned template: `product.22100-poly-comfort.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/poly-comfort).
  - Structural gaps: Reference section order already exists. Product-specific applicability, data and media need a later audit; no structural replacement now.
  - Implementation status: Existing six-section reference structure inventoried; no edit.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Fixed height 29.5 in in PDF p. 10; do not copy adjustable-height claims. Missing variant SKUs remain an inventory question.
  - Review URL: [22100-poly-comfort](https://equipro-dev.myshopify.com/products/22100-poly-comfort).

## Delivery verification and review materials

- JSON parsed successfully; all section/block types and block setting IDs match the existing section schemas.
- Theme Check on the fresh active-theme stage: 24 existing errors elsewhere; zero findings in `product.20500-ultra-comfort.json`. No shared theme code changed.
- Active-theme read-back matches the repository pilot JSON exactly. Only `templates/product.20500-ultra-comfort.json` was uploaded, using `--only` and `--nodelete`; no shared sections/assets/default templates were deployed.
- Rendered title is Ultra-Comfort 20500; visible SKU is 20500-24W, price is $4,350, and selectors remain White / 24 in. Product images are unchanged; both editorial images load. The visible purchase button remains disabled OUT OF STOCK, as on the pre-pilot page; no purchase eligibility was inferred from Admin price/inventory.
- All six section types appear in reference order. No Aero/21200 or other model identity appears in the visible pilot copy. Desktop and 390 px mobile page widths equal the viewport (no horizontal overflow); mobile table width is 338 px and labels remain visible.
- Keyboard Enter opens/closes the native characteristics and FAQ accordions; answer visibility verified. The existing first-open FAQ behavior remains.
- No cart actions/tests, filters or comparison expansion were performed. Shared comparison, cart, purchase/quote and prior corrected template files are untouched.
- Deployment is preview-only: the product still uses the default template. Visual approval and any assignment change remain separate pending decisions.

Review captures (actual browser screenshots):

- [Desktop hero](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-desktop.png)
- [Desktop specifications](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-desktop-specs.png)
- [Desktop how-to view](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-desktop-how-to.png)
- [Mobile gallery](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile-gallery.png)
- [Mobile title, buy box and description](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile.png)
- [Mobile specification table](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile-table.png)
- [Mobile keyboard-open FAQ](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile-faq.png)

## Decisions awaiting review

1. Approve the 20500 pilot’s desktop/mobile design before any batch implementation.
2. Decide whether/when to assign its new template; this changes the live page and requires explicit approval.
3. Confirm canonical Infinity identities and intended catalog treatment of both records; neither is included in comparison or merged/deleted.
4. Confirm 20502 Pedicure’s exact model/version against the Squarespace 20501/20502 conflicts; the PDF’s 20500/20501 specifications are not automatically applicable.
5. Confirm exact 20500 height-control/motor configuration and whether catalog CAD versus current store USD pricing is intentional. These do not block structural pilot review.


## Approved batch deployment log

Fresh complete active-theme backup before these batches: `equipro-before-approved-treatment-batches-157851386029.zip` (SHA-256 `63bbb4522be75b0664873caab122b650d84b3580305d647ae387be5435f3bd61`). No theme switch, publication, assignment or catalog-record mutation was performed.

- Batch 1: Multi-Comfort Electric Height 20210, Murano EI-500, Royal EI-501, Divine EI-504. Deployed only listed product JSON templates; schema, read-back, preserved visible controls and desktop/mobile checks passed.
