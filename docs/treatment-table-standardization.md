# Treatment-table and chair standardization

Single progress checklist for this workstream. Updated 2026-10-16. Active theme verified: **157851386029** (`-equipro-devShopify/main`); development theme **157680631981** is not the deployment target.

## Current priority — Squarespace content parity (2026-10-16)

Assignment preparation is paused. Earlier checked implementation boxes record approved **structure**, not complete Squarespace content parity. Squarespace is now the content-completeness reference; disputed Squarespace/PDF facts must be shown before changing them. The earlier PDF-first implementation history below is retained as history, not an instruction to silently resolve new conflicts.

Ultra-Comfort is audited first against the exact user-specified page. Its non-disputed source narrative is restored in the existing layout; technical-table/model-specific disputes remain open. No other model’s parity audit or copy correction has been started after this priority change. Existing inventory source links are candidates requiring individual fresh verification, not confirmed exact model matches. No cross-model content transfer is authorized.

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
- [x] Complete 14 confirmed-model pages in four small batches after pilot approval. Three ambiguous catalog records remain held; no specifications transferred between them.

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
  - Squarespace completeness audit: Audited 2026-10-16 against the supplied Ultra-Comfort URL. Narrative restorations completed; technical/model-specific conflicts held. Detailed source/current comparison below.
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Pilot template deployed for review; desktop/mobile verification complete; visually approved; assignment remains unchanged. Intended review template: `product.20500-ultra-comfort.json` (not an approved assignment).
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Pilot source, desktop/mobile, image and keyboard checks passed below.
  - Unresolved questions: Exact 20500/24-inch identity; source control details conflict with PDF. Store USD vs Canada catalog CAD.
  - Review URL: [ultra-comfort-20500](https://equipro-dev.myshopify.com/products/ultra-comfort-20500?preview_theme_id=157851386029&view=20500-ultra-comfort).

- [ ] **Ultra-comfort Pedicure 20502** — `ultra-comfortprofessional-treatment-pedicure-chair-20500`
  - Product ID: `8744551710893`; SKU(s): `20502-24W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-comfort-pedicure-20502).
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Inventoried; implementation held for identity confirmation; visual structure is approved.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Handle says 20500; catalog title and SKU say 20502. PDF p. 9 covers 20500/20501, not 20502. Squarespace category alt text says 20501 despite URL 20502. Do not transfer the 20500 specifications.
  - Review URL: [ultra-comfortprofessional-treatment-pedicure-chair-20500](https://equipro-dev.myshopify.com/products/ultra-comfortprofessional-treatment-pedicure-chair-20500).

- [x] **Multi-Comfort 20210** — `multi-comfort-electric-height-20210`
  - Product ID: `8744551645357`; SKU(s): `20210-24W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/multi-comfort-electrique); primary technical entry: Canada PRO V1.2 p. 9.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
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
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
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
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
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
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Inventoried; identity decision required before implementation.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Title, SKU and images identify EI-502; body description is copied from Ultra-Comfort. Two live Infinity records overlap. Do not merge/delete/reassign or include in comparison.
  - Review URL: [ultra-comfort-20500-gm25t](https://equipro-dev.myshopify.com/products/ultra-comfort-20500-gm25t).

- [ ] **EI-502 Infinity** — `ei-502-infinity`
  - Product ID: `8734928863405`; SKU(s): `No SKU assigned`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matching source](https://seahorse-llama-gkdh.squarespace.com/electrics/infinity-ei-502).
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Only main product + dormant comparison modal. Missing reference introduction/subtitle structure, characteristics/spec table, feature banner, how-to/safety and FAQ sections.
  - Implementation status: Inventoried; identity decision required before implementation.
  - Verification: current product identity/SKU read from Shopify; assignment inspected in Admin and matched against active-theme file inventory. Implementation/visual verification deferred.
  - Unresolved questions: Separate record from ultra-comfort-20500-gm25t; list description identifies Infinity and 21–39 in, but SKU missing and live price USD 0.00. Do not infer purchase eligibility from price/inventory.
  - Review URL: [ei-502-infinity](https://equipro-dev.myshopify.com/products/ei-502-infinity).

- [x] **Divine EI-504** — `ei-504-divine`
  - Product ID: `8744551579821`; SKU(s): `Ei-504W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/divine-ei-504); primary technical entry: Canada PRO V1.2 p. 11.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 1 complete and deployed to active theme 157851386029; template `product.ei-504-divine.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: The catalog product body is an incorrect Ultra-Comfort copy. The dedicated Divine template corrects rendered content using EI-504 data only; the underlying product body/normal default URL is not changed by this template-only deployment. Applicability: All reference sections apply.
  - Review URL: [ei-504-divine](https://equipro-dev.myshopify.com/products/ei-504-divine?preview_theme_id=157851386029&view=ei-504-divine).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-504-divine-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ei-504-divine-standardized-mobile.png).

## Other treatment-table/chair inventory


- [x] **Spa-Comfort 20300** — `spa-comfort-20300`
  - Product ID: `8744551415981`; SKU(s): `20300-28W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/spa-comfort-20300); primary technical entry: Canada PRO V1.2 p. 9.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 2 complete and deployed to active theme 157851386029; template `product.20300-spa-comfort.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: PDF p. 9 describes manual articulation, while Squarespace specifies electric handset control of height/backrest/legrest/tilt. Control mechanism remains Not confirmed; no electric-backrest claim copied. Applicability: All reference sections apply.
  - Review URL: [spa-comfort-20300](https://equipro-dev.myshopify.com/products/spa-comfort-20300?preview_theme_id=157851386029&view=20300-spa-comfort).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/spa-comfort-20300-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/spa-comfort-20300-standardized-mobile.png).

- [x] **Elite Spa EI-508** — `elite-spa-ei-508`
  - Product ID: `8744551743661`; SKU(s): `EI-508`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/elite-spa); primary technical entry: Canada PRO V1.2 p. 11.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 2 complete and deployed to active theme 157851386029; template `product.ei-508-elite-spa.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: PDF p. 11 description says height 22–39 in; its Dimensions field is 31 × 76 × 16.5 × 40 in (four values, no inferred axis). Squarespace explicitly calls height 16.5–40 in. PDF fields retained as labeled; exact physical range remains a catalog discrepancy, not resolved by rearranging numbers. Applicability: All reference sections apply.
  - Review URL: [elite-spa-ei-508](https://equipro-dev.myshopify.com/products/elite-spa-ei-508?preview_theme_id=157851386029&view=ei-508-elite-spa).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/elite-spa-ei-508-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/elite-spa-ei-508-standardized-mobile.png).

- [x] **Natura Spa EI-509** — `natura-spa-ei-509`
  - Product ID: `8744551809197`; SKU(s): `Ei-509`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/electrics/natura-spa); primary technical entry: Canada PRO V1.2 p. 11.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 2 complete and deployed to active theme 157851386029; template `product.ei-509-natura-spa.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Squarespace gives height 23.5–33 in and dimensions 72 × 28 × 23.5/33 H, while PDF p. 11 gives 22–39 in and Dimensions 28 × 72 × 22/39 H. PDF retained. Exact motor/remote configuration is not in the PDF and is not transferred from other models. Applicability: All reference sections apply.
  - Review URL: [natura-spa-ei-509](https://equipro-dev.myshopify.com/products/natura-spa-ei-509?preview_theme_id=157851386029&view=ei-509-natura-spa).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/natura-spa-ei-509-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/natura-spa-ei-509-standardized-mobile.png).

- [x] **Bohemia EI-23403** — `bohemia-ei-23403`
  - Product ID: `8744552169645`; SKU(s): `EI-23403W`.
  - Assigned template: `product.23403-bohemia.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/portables/bohemia); primary technical entry: Canada PRO V1.2 p. 12.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The existing assigned template was updated in place, so the normal URL now renders the standardized page.
  - Implementation status: Batch 4 complete and deployed to active theme 157851386029; template `product.23403-bohemia.json`. **Visible at normal URL**; assignment unchanged.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: PDF p. 12 and Squarespace print 28 × 72 × 24/34 H under Dimensions, despite the seated-chair identity. Preserve the literal Dimensions entry; do not infer a 24–34 seat-height range or Calypso-style adjustable backrest. Squarespace adds aluminum, locks and 300 lb load capacity unsupported by this PDF entry; omitted/Not confirmed. Applicability: Portable seated massage: chair-specific folding/setup content applies; bed-style backrest, electric height, 15° tilt and full-body treatment instructions do not apply and are omitted.
  - Review URL: [bohemia-ei-23403](https://equipro-dev.myshopify.com/products/bohemia-ei-23403).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/bohemia-ei-23403-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/bohemia-ei-23403-standardized-mobile.png).

- [x] **Calypso EI-23402** — `calypso-ei-23402`
  - Product ID: `8744552235181`; SKU(s): `EI-23402`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/portables/calypso); primary technical entry: Canada PRO V1.2 p. 12.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 4 complete and deployed to active theme 157851386029; template `product.23402-calypso.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: PDF Dimensions order 28 × 72 × 24/34.5 H is retained; Squarespace reorders 72/28 and adds L/W labels. No motorized-chair instructions or comparisons are added. Applicability: Portable table: folding/locking and manual positioning content applies; motorized controls and chair-swivel sections do not apply and are omitted.
  - Review URL: [calypso-ei-23402](https://equipro-dev.myshopify.com/products/calypso-ei-23402?preview_theme_id=157851386029&view=23402-calypso).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/calypso-ei-23402-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/calypso-ei-23402-standardized-mobile.png).

- [x] **Maxi-Comfort 360º 20100** — `maxi-comfort-360`
  - Product ID: `8744552005805`; SKU(s): `20100W`.
  - Assigned template: `product.SKU00001-maxi-comfort-360.json` (missing); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/maxi-comfort-360); primary technical entry: Canada PRO V1.2 p. 8.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 2 complete and deployed to active theme 157851386029; template `product.20100-maxi-comfort-360.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Previous corrected Dimensions label/order and 27–34 in description value are preserved. Missing assigned SKU00001-maxi-comfort-360 file is not created; reviewed template still requires assignment approval. Applicability: All reference sections apply.
  - Review URL: [maxi-comfort-360](https://equipro-dev.myshopify.com/products/maxi-comfort-360?preview_theme_id=157851386029&view=20100-maxi-comfort-360).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/maxi-comfort-360-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/maxi-comfort-360-standardized-mobile.png).

- [x] **Maxi-Comfort Pedicure 360º 20101** — `maxi-confort-pedicure-360`
  - Product ID: `8744552104109`; SKU(s): `20101W`.
  - Assigned template: `product.20101-maxi-comfort-360.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/maxi-comfort-pedicure); primary technical entry: Canada PRO V1.2 p. 8.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The existing assigned template was updated in place, so the normal URL now renders the standardized page.
  - Implementation status: Batch 3 complete and deployed to active theme 157851386029; template `product.20101-maxi-comfort-360.json`. **Visible at normal URL**; assignment unchanged.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Existing assigned product.20101-maxi-comfort-360.json incorrectly featured 20100. Correct that file in place to 20101; no assignment change. Squarespace height 26.5–33.5 in differs from PDF description 27–34 in; PDF description and separately labeled Dimensions retained. Applicability: All reference sections apply.
  - Review URL: [maxi-confort-pedicure-360](https://equipro-dev.myshopify.com/products/maxi-confort-pedicure-360).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/maxi-confort-pedicure-360-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/maxi-confort-pedicure-360-standardized-mobile.png).

- [x] **Multi-Comfort Hydraulic 20200** — `20200-multi-comfort`
  - Product ID: `8744553775277`; SKU(s): `20200-24W plus other colors; 14 variants`.
  - Assigned template: `product.20200-multi-comfort.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/multi-comfort); primary technical entry: Canada PRO V1.2 p. 8.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The existing assigned template was updated in place, so the normal URL now renders the standardized page.
  - Implementation status: Batch 3 complete and deployed to active theme 157851386029; template `product.20200-multi-comfort.json`. **Visible at normal URL**; assignment unchanged.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Squarespace table gives height 22.5–34.5 in; PDF p. 8 description gives 27–34 in. Preserve PDF labels/order and all 14 Shopify variants. Seven 28-inch variants have blank SKUs and are priced USD 1895; no catalog pricing/variant mutation. Applicability: All reference sections apply.
  - Review URL: [20200-multi-comfort](https://equipro-dev.myshopify.com/products/20200-multi-comfort).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/20200-multi-comfort-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/20200-multi-comfort-standardized-mobile.png).

- [x] **Hydro-Comfort 21100** — `21100-hydro-comfort`
  - Product ID: `8744553840813`; SKU(s): `21100W`.
  - Assigned template: `product.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/hydro-comfort); primary technical entry: Canada PRO V1.2 p. 9.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The normal URL still renders its unchanged assignment; use the exact preview below.
  - Implementation status: Batch 3 complete and deployed to active theme 157851386029; template `product.21100-hydro-comfort.json`. **Assignment still required**; current assignment preserved.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Squarespace table gives 28.5–33.5 in, which matches Aero’s range, and calls the system hydraulic plus air-lift. PDF p. 9 gives 22.5–34.5 in and does not identify the control hardware; mechanism remains Not confirmed. Applicability: All reference sections apply.
  - Review URL: [21100-hydro-comfort](https://equipro-dev.myshopify.com/products/21100-hydro-comfort?preview_theme_id=157851386029&view=21100-hydro-comfort).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/21100-hydro-comfort-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/21100-hydro-comfort-standardized-mobile.png).

- [x] **Poly-Comfort 22100** — `22100-poly-comfort`
  - Product ID: `8744553906349`; SKU(s): `22100W; other colors have missing SKUs`.
  - Assigned template: `product.22100-poly-comfort.json` (present); assignment unchanged.
  - Source page: [matched Squarespace source](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/poly-comfort); primary technical entry: Canada PRO V1.2 p. 10.
  - Squarespace completeness audit: Pending individual audit under the new source-parity priority. Existing source link is a candidate; missing/differing content and corrections are not yet verified. Structural completion above does not establish content completeness.
  - Structural gaps: Resolved in the standardized template. The existing assigned template was updated in place, so the normal URL now renders the standardized page.
  - Implementation status: Batch 3 complete and deployed to active theme 157851386029; template `product.22100-poly-comfort.json`. **Visible at normal URL**; assignment unchanged.
  - Verification: JSON/block schemas; exact active-theme read-back; 1280 px desktop and 390 px mobile checks; correct model/Dimensions row; all displayed images loaded; existing price/options/image/purchase-state/Compare visibility match the pre-change page. No cart actions tested.
  - Unresolved questions / recorded differences: Dimensions kept in PDF order 24 × 70 × 29.5 H; do not transfer hydraulic/air-lift height claims from filenames or other models. Six non-White color variants have blank SKUs; no variant changes. Applicability: All reference sections apply.
  - Review URL: [22100-poly-comfort](https://equipro-dev.myshopify.com/products/22100-poly-comfort).

  - Review captures: [desktop](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/22100-poly-comfort-standardized-desktop.png) · [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/22100-poly-comfort-standardized-mobile.png).

## Original pilot verification and review materials (historical)

- JSON parsed successfully; all section/block types and block setting IDs match the existing section schemas.
- Theme Check on the fresh active-theme stage: 24 existing errors elsewhere; zero findings in `product.20500-ultra-comfort.json`. No shared theme code changed.
- Active-theme read-back matches the repository pilot JSON exactly. Only `templates/product.20500-ultra-comfort.json` was uploaded, using `--only` and `--nodelete`; no shared sections/assets/default templates were deployed.
- Rendered title is Ultra-Comfort 20500; visible SKU is 20500-24W, price is $4,350, and selectors remain White / 24 in. Product images are unchanged; both editorial images load. The visible purchase button remains disabled OUT OF STOCK, as on the pre-pilot page; no purchase eligibility was inferred from Admin price/inventory.
- All six section types appear in reference order. No Aero/21200 or other model identity appears in the visible pilot copy. Desktop and 390 px mobile page widths equal the viewport (no horizontal overflow); mobile table width is 338 px and labels remain visible.
- Keyboard Enter opens/closes the native characteristics and FAQ accordions; answer visibility verified. The existing first-open FAQ behavior remains.
- No cart actions/tests, filters or comparison expansion were performed. Shared comparison, cart, purchase/quote and prior corrected template files are untouched.
- Deployment is preview-only: the product still uses the default template. Visual structure is now approved; template assignment remains pending.

Review captures (actual browser screenshots):

- [Desktop hero](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-desktop.png)
- [Desktop specifications](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-desktop-specs.png)
- [Desktop how-to view](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-desktop-how-to.png)
- [Mobile gallery](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile-gallery.png)
- [Mobile title, buy box and description](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile.png)
- [Mobile specification table](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile-table.png)
- [Mobile keyboard-open FAQ](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-20500-mobile-faq.png)

## Unresolved decisions — exact questions and source evidence

Source hierarchy is settled: Canada PRO V1.2 governs technical values. These questions do not request approval to follow that hierarchy. Unsupported hardware remains **Not confirmed**. Source dimensions retain their printed labels and order.

1. **Which exact model/version is the Pedicure record intended to represent?** Shopify handle ends `20500`, title says `20502`, SKU is `20502-24W` (24 in). [Squarespace Pedicure](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-comfort-pedicure-20502) has a 20502 URL but technical table “Model SKU 20500 (Ultra-Comfort Pedicure)”, width 26 in, height 21–35 in and lowering to 19 in; category image alt text says 20501. PDF p. 9 covers 20500/20501, without a 20502 entry. Record held unchanged.
2. **Are the two Infinity records distinct products or duplicates, and which is canonical?** `ultra-comfort-20500-gm25t` has title Infinity EI-502, SKU `Ei-502W`, USD 3,200, but Ultra-Comfort description (20.5–36.5 in; 24/26 in). `ei-502-infinity` has no SKU, USD 0, and Infinity description (21–39 in). PDF p. 11 and [Squarespace Infinity](https://seahorse-llama-gkdh.squarespace.com/electrics/infinity-ei-502) identify EI-502 as 21–39 in, Dimensions 28 × 69 × 21/39 H; PDF price CAD 3,200. Both records remain unchanged and excluded from comparison. No purchase eligibility inferred from zero price.
3. **What controller and functions are verified for 20500 specifically?** PDF p. 9: manually adjustable backrest/legrest, height 20.5–36.5 in. [Squarespace Ultra-Comfort](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-confort) table identifies 20501/26 in and claims electric height/backrest/legrest/tilt, proximity-sensor pedal and lowering to 19 in. Exact 20500 height controller/motor count remain Not confirmed.
4. **Is EI-500 supplied with a control lever or electric remote, and which movements does it operate?** PDF p. 10 says control lever. [Squarespace EI-500](https://seahorse-llama-gkdh.squarespace.com/electrics/spa-comfort-ei-500) claims remote electric height/backrest/legrest/tilt. PDF wording retained; exact hardware Not confirmed.
5. **Which movements are motorized on Spa-Comfort 20300?** PDF p. 9 describes motorized height and manual articulation/legrest (French lists manual backrest/legrest). [Squarespace 20300](https://seahorse-llama-gkdh.squarespace.com/electrics/spa-comfort-20300) claims electric handset control of height/backrest/legrest/15° tilt. Exact controller and additional motorization remain Not confirmed.
6. **What exact height mechanism is fitted to Hydro-Comfort 21100?** PDF p. 9 gives 22.5–34.5 in without control hardware. [Squarespace Hydro](https://seahorse-llama-gkdh.squarespace.com/hydraulic-mechanical/hydro-comfort) claims hydraulic foot pump plus air-lift and 28.5–33.5 in, which matches Aero’s range. PDF height retained; mechanism Not confirmed.
7. **Can the manufacturer confirm the controllers and conflicting operating ranges for EI-508/EI-509?** PDF p. 11 EI-508 description: 22–39 in; separate Dimensions: 31 × 76 × 16.5 × 40 (four measurements, no guessed axes). [Squarespace Elite](https://seahorse-llama-gkdh.squarespace.com/electrics/elite-spa) claims electric height 16.5–40 in. EI-509 PDF: 22–39 in and Dimensions 28 × 72 × 22/39 H; [Squarespace Natura](https://seahorse-llama-gkdh.squarespace.com/electrics/natura-spa) claims remote electric height/backrest/legrest and 23.5–33 in. PDF values retained by label; exact controls Not confirmed.
8. **Are the printed 28 × 72 × 24/34 H dimensions intended for seated chair EI-23403?** PDF p. 12 and [Squarespace Bohemia](https://seahorse-llama-gkdh.squarespace.com/portables/bohemia) print those Dimensions, while identifying a seated massage chair weighing 26 lb / 12 kg. Literal PDF Dimensions retained; no seat-height interpretation. Source-only backrest/frame/300 lb claims are not transferred from Calypso-like text.
9. **Should current USD pricing remain, or should an approved CAD pricing/conversion policy replace it?** All current store prices are USD; Canada PRO prices are CAD. Examples: 20500 USD 4,350 vs PDF p. 9 CAD 4,350; 20101 USD 2,200 vs PDF p. 8 CAD 2,300; 20200 28 in USD 1,895 vs PDF p. 8 CAD 1,995 (24 in CAD 1,895). All live prices unchanged.
10. **What SKUs belong to the variants without SKUs?** Multi-Comfort 20200 has seven 28-inch color variants without SKUs (White, Black, Navy, Dove, Charcoal, Sand, Oyster), currently USD 1,895 each. Poly-Comfort 22100 has six non-White variants without SKUs; White is `22100W`. PDF pp. 8/10 names models and Color Chart A, without per-color SKU mapping. Variants unchanged.
11. **Which completed templates should be assigned, and when?** The 10 new pages below plus the approved 20500 pilot await assignment approval. Maxi-Comfort 20100 still points to missing `SKU00001-maxi-comfort-360`; the completed correct template is `20100-maxi-comfort-360`. No missing-suffix workaround or assignment mutation performed.

Outstanding catalog items outside this rollout remain unchanged: TM-3 Mini 51103 versus 51103-M unresolved; Heating Boots missing image; Infinity conflicting identities; Duo-Pil Precision exclusion pending business rule. Manicure/make-up families remain separate.

## Current delivery verification

- 14 newly standardized confirmed-model pages, plus the previously approved 20500 pilot: 15 completed entries; three identity-held records. Aero remains the unchanged reference.
- All 14 templates parse and match active section/block schemas. Final Theme Check: 24 existing errors elsewhere, zero findings in these 14 templates.
- All deployed template JSON read back from active theme 157851386029 matches repository content. Only targeted product JSON templates uploaded; no shared Liquid/CSS/assets, default template, cart or comparison code changed.
- All 14 desktop 1280 px and mobile 390 px pages verified: expected heading/model/Dimensions, six sections in approved order, displayed images loaded, no horizontal overflow. Existing main image, prices, variant options/selections, disabled purchase state and Compare visibility matched the pre-change pages.
- Native characteristics/FAQ keyboard Enter behavior verified on Bohemia; existing pilot keyboard checks retained. No cart actions/testing, filter changes or comparison expansion.
- Shopify removed Bohemia’s unused legacy `modal_title` setting, absent from its schema/Liquid. Effective comparison configuration, opening behavior and visible interface remain unchanged.
- All assignments, product records, images, variants and prices unchanged. No switch or publication of a different theme.

## Completed pages — assignment visibility

Visible at normal URLs (existing assigned templates updated in place):

- [Maxi-Comfort Pedicure 360º 20101](https://equipro-dev.myshopify.com/products/maxi-confort-pedicure-360) — `20101-maxi-comfort-360`.
- [Multi-Comfort Hydraulic 20200](https://equipro-dev.myshopify.com/products/20200-multi-comfort) — `20200-multi-comfort`.
- [Poly-Comfort 22100](https://equipro-dev.myshopify.com/products/22100-poly-comfort) — `22100-poly-comfort`.
- [Bohemia Seated Massage Chair EI-23403](https://equipro-dev.myshopify.com/products/bohemia-ei-23403) — `23403-bohemia`.

Completed templates requiring assignment approval; these links explicitly use `view` on the active theme:

- [Multi-Comfort Electric Height 20210](https://equipro-dev.myshopify.com/products/multi-comfort-electric-height-20210?preview_theme_id=157851386029&view=20210-multi-comfort-electric-height) — `20210-multi-comfort-electric-height`; current `product.json`.
- [Murano EI-500](https://equipro-dev.myshopify.com/products/ei-500-murano?preview_theme_id=157851386029&view=ei-500-murano) — `ei-500-murano`; current `product.json`.
- [Royal EI-501](https://equipro-dev.myshopify.com/products/ei-501-royal?preview_theme_id=157851386029&view=ei-501-royal) — `ei-501-royal`; current `product.json`.
- [Divine EI-504](https://equipro-dev.myshopify.com/products/ei-504-divine?preview_theme_id=157851386029&view=ei-504-divine) — `ei-504-divine`; current `product.json`.
- [Spa-Comfort 20300](https://equipro-dev.myshopify.com/products/spa-comfort-20300?preview_theme_id=157851386029&view=20300-spa-comfort) — `20300-spa-comfort`; current `product.json`.
- [Elite Spa EI-508](https://equipro-dev.myshopify.com/products/elite-spa-ei-508?preview_theme_id=157851386029&view=ei-508-elite-spa) — `ei-508-elite-spa`; current `product.json`.
- [Natura Spa EI-509](https://equipro-dev.myshopify.com/products/natura-spa-ei-509?preview_theme_id=157851386029&view=ei-509-natura-spa) — `ei-509-natura-spa`; current `product.json`.
- [Maxi-Comfort 360º 20100](https://equipro-dev.myshopify.com/products/maxi-comfort-360?preview_theme_id=157851386029&view=20100-maxi-comfort-360) — `20100-maxi-comfort-360`; current `product.SKU00001-maxi-comfort-360.json`.
- [Hydro-Comfort 21100](https://equipro-dev.myshopify.com/products/21100-hydro-comfort?preview_theme_id=157851386029&view=21100-hydro-comfort) — `21100-hydro-comfort`; current `product.json`.
- [Calypso Portable Table EI-23402](https://equipro-dev.myshopify.com/products/calypso-ei-23402?preview_theme_id=157851386029&view=23402-calypso) — `23402-calypso`; current `product.json`.
- [Approved Ultra-Comfort 20500 pilot](https://equipro-dev.myshopify.com/products/ultra-comfort-20500?preview_theme_id=157851386029&view=20500-ultra-comfort) — `20500-ultra-comfort`; current default.

## Approved batch deployment log

Fresh complete active-theme backup before these batches: `equipro-before-approved-treatment-batches-157851386029.zip` (SHA-256 `63bbb4522be75b0664873caab122b650d84b3580305d647ae387be5435f3bd61`). No theme switch, publication, assignment or catalog-record mutation was performed.

- Batch 1: Multi-Comfort Electric Height 20210, Murano EI-500, Royal EI-501, Divine EI-504. Deployed only listed product JSON templates; schema, read-back, preserved visible controls and desktop/mobile checks passed.

- Batch 2: Spa-Comfort 20300, Elite Spa EI-508, Natura Spa EI-509, Maxi-Comfort 360º 20100. Deployed only listed product JSON templates; schema, read-back, preserved visible controls and desktop/mobile checks passed.

- Batch 3: Maxi-Comfort Pedicure 360º 20101, Multi-Comfort Hydraulic 20200, Hydro-Comfort 21100, Poly-Comfort 22100. Deployed only listed product JSON templates; schema, read-back, preserved visible controls and desktop/mobile checks passed.

- Batch 4: Bohemia Seated Massage Chair EI-23403, Calypso Portable Table EI-23402. Deployed only listed product JSON templates; schema, read-back, preserved visible controls and desktop/mobile checks passed.

## Ultra-Comfort source-completeness audit — 2026-10-16

- Scope: Shopify `ultra-comfort-20500`, SKU `20500-24W`, White / 24 in, USD 4,350. Normal product remains assigned to default `product.json`. Audited dedicated preview: [20500 template](https://equipro-dev.myshopify.com/products/ultra-comfort-20500?preview_theme_id=157851386029&view=20500-ultra-comfort). Normal URL continues to show its unchanged default-template content.
- Exact source: [Ultra-Comfort Professional Treatment Chair](https://seahorse-llama-gkdh.squarespace.com/electrics/ultra-confort), supplied by the user. Verified live product heading, main and collapsed product-description text, all three professional-use accordions, all six FAQ answers, feature banner, instructions, safety, shipping, imagery and all 17 technical fields. All accordion answers read, not only visible headings.
- Match status: confirmed **Ultra-Comfort family source** by user direction; **not an exact technical match to the Shopify 20500/24-inch SKU**. Source technical table explicitly identifies 20501/26 in. No attempt to resolve this through assignment or spec copying.
- Active role freshly verified: theme 157851386029 is live; 157680631981 is development. Before edits, downloaded active 20500 JSON matched repository JSON. Target backup `equipro-before-ultra-content-parity-157851386029.zip` includes original active JSON and verified theme roles; full pre-batch backup remains available above.

### Content comparison and corrections completed

1. **Opening description:** Previous Shopify introduction/body were short summaries about facial positioning, headrest and height. They omitted the source’s clinical-workflow introduction, licensed skincare roles (esthetician, clinical spa therapist, cosmetic injector), deep-pore cleansing, microdermabrasion and post-procedure-recovery context. Restored both source opening paragraphs and the separate source product-description paragraph into existing intro/description fields. The latter is important: it is present in the source DOM in addition to the editorial description and includes optional armrests/casters and the family’s 24/26 in widths. Those family options do not add Shopify variants.
2. **Longevity/care description:** Previous Shopify secondary text discussed upholstery/accessories and current selectors. Restored source heading “Engineering for Precision and Longevity” and its paragraph covering weekly non-abrasive clinical disinfectants, tear/stain resistance, intensive salon cycles and care. No frequency invented; weekly is the source wording.
3. **Professional uses:** Previous three accordions were “Facial and depilation positioning,” “Height and model width,” and “Upholstery and optional accessories.” They did not preserve the source’s three role/use-case narratives. Replaced their copy with the source’s full “Clinical Aesthetics & Specialized Facials,” “Advanced Clinical Spa Treatments,” and “Hair Removal & Full-Body Services” questions/answers. Approved accordion component/layout retained.
4. **Feature banner:** Previous bullets “Adjustable positioning,” “15° tilt,” and “Ultra-resistant leatherette” substituted short technical summaries. Restored original three headings and full source text: “Unrivaled Durability,” “Articulated Positioning,” and “Seamless Integration.” Existing image slots, burgundy style, spacing and layout retained.
5. **Instructions:** Source has four steps: Height Calibration; Backrest Positioning; Tilt Activation; Leg Rest Adjustment. Previous steps were different summaries, including a substituted Headrest step. Restored exact source text for height calibration (before client seating), 15-degree tilt and independent leg-section adjustment in the existing four-step layout. Source Backrest Positioning specifies a **manual release handle**; its exact hardware is not confirmed for this SKU and the same source table claims full-electric backrest. Kept manual-backrest positioning wording without asserting a release-handle mechanism. This one step remains deliberately non-identical pending conflict review.
6. **Safety:** Previous copy gave central positioning, generic cleaning and “Contact Equipro” service guidance; it omitted source dry/climate-controlled environment and maximum-rated-capacity guidance. Restored source Weight Distribution and Environment Compliance text verbatim, without inventing a numerical capacity. Source Authorized Service conditions warranty preservation on Equipro-certified technicians; kept existing service guidance until the model-specific warranty/service condition is confirmed. That sentence remains a recorded omission, not silently generalized as equivalent.
7. **FAQs:** Source has six questions: height range, tilt, upholstery, replacement-parts warranty, removable armrests and unit weight. Previous Shopify had height/tilt/upholstery and generalized warranty/accessories, but replaced two source questions with model-width and included-accessories questions and omitted the source unit-weight answer. Restored all six source question topics and five full source answers; replacement-parts coverage answer is explicitly **Not confirmed** with the existing two-year term retained. Kept the two useful Shopify model-width/optional-casters clarifications as additional entries, using the same existing accordion layout/component. No claim that the warranty answer now matches the source.
8. **Included accessories/options:** Both sources describe removable ergonomic armrests and casters as optional; no included accessories added. Source offers White, Black, Navy, Dove, Sand, Oyster, Charcoal and widths 24/26 in; current Shopify offers White/24 in only. Source text records family choices; all Shopify variants/SKUs remain unchanged. Source technical table’s removable crescent headrest is held separately below.
9. **Shipping:** Standard 5–7 business days and expedited 2–3 business days already match. No correction needed.
10. **Images:** Source has five gallery items, including 20501 control-pedal imagery and split-leg imagery; Shopify has three gallery images and two existing editorial slots. Image counts differ. No source control-pedal/split-leg images transferred to 20500 while their version identity is unresolved. Existing Shopify media and slots retained.

### All source technical fields — exact values versus Shopify/PDF

Technical table remains unchanged during this correction. Source-only fields are audited omissions, not assumed false or silently treated as confirmed.

- **Manufacturer** — Squarespace: `Equipro Beauty`. Shopify Equipro; naming differs from source Equipro Beauty.
- **Model SKU** — Squarespace: `20501`. Shopify model 20500, current variant SKU 20500-24W; source identifies 20501. PDF p. 9 groups 20500/20501 and prices widths separately. Exact source table applicability unresolved.
- **Primary Materials** — Squarespace: `Ultra-resistant vinyl upholstery, reinforced steel frame, premium electric actuators`. Shopify lists leatherette only; reinforced steel frame and premium electric actuators are absent. PDF p. 9 confirms leatherette but does not identify frame material/actuator configuration. Hold source-only hardware pending exact model match.
- **Dimensions (L x W x H)** — Squarespace: `72" L x 26" W x 20.5" / 36.5" H`. Shopify/PDF p. 9 Dimensions are literally L × 72" × 20.5"/36.5" H; Shopify current width is 24 in. Source labels axes and states 26 in. No dimension-label/order change or axis inference made.
- **Weight** — Squarespace: `320 lb (145 kg)`. Shopify and PDF p. 9: 320 lb / 145 kg. Same values; formatting differs.
- **Adjustability** — Squarespace: `Full electric adjustment via pedal with proximity sensor: height, backrest, legrest, and tilt`. Shopify/PDF p. 9: manually adjustable backrest/legrest; 15° tilt; exact height control Not confirmed. Source prose/banner also say manual, contradicting its table’s electric articulation. Disputed fact held.
- **Height Range** — Squarespace: `20.5" to 36.5" (52 cm to 93 cm), lowers to 19" for accessibility`. Shopify/PDF p. 9: 20.5–36.5 in; neither gives a 19 in minimum. Source FAQ also says 20.5–36.5. Source’s extra 19 in accessibility claim is disputed and not added.
- **Seating Width** — Squarespace: `26 inches (66 cm)`. Shopify current SKU/variant is 24 in; PDF p. 9 lists family 24/26 in. Source table is 26 in/66 cm. Held, no variant mutation.
- **Cushions** — Squarespace: `4 separate high-density cushions for exceptional comfort`. Absent from Shopify/PDF p. 9. Source-only four high-density cushions belong to a table identifying 20501; applicability to 20500 Not confirmed.
- **Headrest** — Squarespace: `Removable and adjustable crescent headrest`. Shopify/PDF p. 9 say adjustable headrest. Crescent shape and removability absent. Source-only details held for model confirmation.
- **Armrests** — Squarespace: `Optional removable ergonomic armrests`. Shopify/PDF p. 9 agree: optional removable ergonomic armrests. No conflict.
- **Mobility** — Squarespace: `Optional wheels/casters for easy movement`. Shopify/PDF p. 9 agree: optional casters. No conflict.
- **Safety Features** — Squarespace: `Proximity sensor pedal, noiseless electric actuators, stable base`. Shopify does not claim sensor/noiseless actuator/stable-base package. PDF p. 9 does not specify that hardware. Source-only table claims held for model match.
- **Upholstery** — Squarespace: `Ultra-white ultra-durable vinyl, multiple colors available on special order (Chart A)`. Shopify/PDF p. 9: ultra-white, ultra-resistant leatherette, Color Chart A. Source calls it vinyl and adds special-order color availability. No SKU expansion or special-order business rule inferred.
- **Certifications** — Squarespace: `CSA & UL approved electrical components`. Absent from Shopify/PDF p. 9. CSA/UL electrical-component approvals are source-only and model-sensitive; not added as verified 20500 certification.
- **Warranty** — Squarespace: `2 years`. Shopify/PDF p. 9 both list 2 years. Source FAQ additionally asserts parts/manufacturing-defect coverage and safety text conditions preservation on certified technicians. PDF supplies no coverage/service terms; duration agrees but scope is unconfirmed, not an established PDF contradiction.
- **Country of Origin** — Squarespace: `Canada`. Absent from Shopify/PDF p. 9 technical entry. Source says Canada in a 20501 table; exact SKU applicability Not confirmed.

### Unresolved questions to show before changing disputed facts

1. Does the supplied page’s **20501 / 26-inch technical table** apply to Shopify **20500 / 20500-24W / 24-inch**, or does that source table need correction? Family-level narrative is restored; its table is not treated as exact-SKU confirmation.
2. For 20500, is backrest/legrest adjustment **manual** (PDF p. 9, source description/banner/use-case/how-to) or **fully electric via proximity-sensor pedal** (source technical table)? Is a manual release handle actually fitted? Are the proximity pedal, actuator noise, crescent/removable headrest, four cushions and CSA/UL details valid for this exact version?
3. Is the minimum height **20.5 in** (PDF p. 9, source description/FAQ) or **19 in** (extra claim inside source technical Height Range row)? No disputed height changed.
4. Does the two-year warranty cover **parts and manufacturing defects**, and is **Equipro-certified service required to preserve coverage**? PDF p. 9 confirms duration only; source FAQ/safety add these terms.
5. Source starting price **CA$4,350** versus Shopify **USD 4,350** and family choices versus one White/24 in SKU remain catalog differences; prices/variants/SKUs/assignments are explicitly unchanged.

Content-completeness status: **partial parity restored, disputed technical/model-specific omissions explicitly held**. This is not reported as full parity. Remaining 17 product entries plus the Aero reference await their own individual audit after this comparison is shown; they must not inherit this copy or be marked source-complete from structural checks.

### Verification for this correction

- Only `templates/product.20500-ultra-comfort.json` changed; all six section types/order and visual setting values retained. Same native accordion controls, feature layout, image slots, buy box and comparison configuration.
- Technical table byte-for-byte unchanged; non-copy main settings, product handle, prices/variants/SKUs/assignment unchanged. No cart actions, filters or comparison expansion.
- Source text retained in full in the restored fields; each intentional exception listed above. Desktop/mobile and active read-back results recorded after deployment below.

- Deployment verified: active 20500 JSON read-back exactly matches repository JSON. Schema validation passed; final Theme Check has zero 20500-template findings and 24 pre-existing errors elsewhere.
- Browser verified at 1280 px and 390 px: six sections, no horizontal overflow, all three restored professional-use answers and all six source FAQ questions present. Five source FAQ answers match exactly; parts-coverage answer deliberately held. Keyboard Enter opens the professional-use accordion and the restored weight FAQ; weight answer visible. Displayed price/options/image/purchase state match across desktop/mobile; commerce settings unchanged from downloaded pre-change JSON. Responsive viewport override reset.
- Actual captures: [desktop intro](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-source-parity-desktop.png), [professional uses](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-source-parity-professional-uses.png), [mobile](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-source-parity-mobile.png), [mobile weight FAQ](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/ultra-comfort-source-parity-mobile-faq.png).
