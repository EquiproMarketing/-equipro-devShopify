# Product template review — October 15, 2026

Read-only audit of equipro-dev.myshopify.com. No assignments, theme files, or publishing changed during this audit. Sources: Shopify Admin API (all 64 products, complete variant lists, all three themes); Shopify CLI theme list. All 18 development template checksums match local files.

## Findings

- 18 unique intended product matches; no missing or duplicate candidates. Five templates contain stale featured_product handles and need review before assignment. No files were corrected during this audit.
- 15 assignments would change. Multi-comfort 20200, Aero-comfort 21200, and Poly-comfort 22100 already use the proposed suffix.
- Three products have at least one variant without an SKU: Multi-comfort, Aero-comfort, Poly-comfort. Listed SKUs are actual nonblank Shopify variant SKUs, not inferred model numbers.
- TS-3 Deluxe has the actual SKU TS-3 deluxe; model 51100 is in its title. TS-2 Basic has an opaque existing handle.
- Preview URLs include preview_theme_id=157680631981 and a temporary view=<proposed suffix>. They do not change product assignments. Shopify may remove the theme parameter after storing a browser preview session.

## Theme availability

- Development 157680631981 — Development (cad855-iMac-de-Marketing): all 18 files, matching local checksums.
- Published 157851386029 — -equipro-devShopify/main: only five proposed filenames exist: 20100-maxi-comfort-360, 20101-maxi-comfort-pedicure, 20200-multi-comfort, 21200-aero-comfort, 22100-poly-comfort. All five differ from development by checksum.
- Unpublished 157680533677 — Horizon: none of the 18 files.

## Published storefront impact

Product templateSuffix is a product-level assignment, not a theme-specific setting. Assigning a suffix affects rendering in the published theme too. Maxi-comfort 360 and Maxi-comfort Pedicure would switch to older published-theme templates. The other 13 assignment changes point to templates absent from the published theme, so they would fall back to its default template; the reviewed development content would not become live. The three already-matching assignments require no change.

[Shopify documentation: templates, previews, assignments, and default fallback](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates)

## Mapping and exact previews

### 1. Maxi-comfort 360º - 20100

- Actual SKU(s): 20100W
- Product ID: `gid://shopify/Product/8744552005805`
- Handle: `maxi-comfort-360`
- Current suffix: `SKU00001-maxi-comfort-360`
- Proposed suffix: `20100-maxi-comfort-360`
- Template file: `templates/product.20100-maxi-comfort-360.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Yes: assigning this suffix changes the published product to the published theme’s older template, not the reviewed development version.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/maxi-comfort-360?preview_theme_id=157680631981&view=20100-maxi-comfort-360)
- Full URL: `https://equipro-dev.myshopify.com/products/maxi-comfort-360?preview_theme_id=157680631981&view=20100-maxi-comfort-360`

### 2. Maxi-Comfort Pedicure 360º

- Actual SKU(s): 20101W
- Product ID: `gid://shopify/Product/8744552104109`
- Handle: `maxi-confort-pedicure-360`
- Current suffix: `20101-maxi-comfort-360`
- Proposed suffix: `20101-maxi-comfort-pedicure`
- Template file: `templates/product.20101-maxi-comfort-pedicure.json`
- Match: Unique model/SKU candidate; review required
- Review flags: Template featured_product handle is stale: maxi-comfort-pedicure
- Published effect: Yes: assigning this suffix changes the published product to the published theme’s older template, not the reviewed development version.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/maxi-confort-pedicure-360?preview_theme_id=157680631981&view=20101-maxi-comfort-pedicure)
- Full URL: `https://equipro-dev.myshopify.com/products/maxi-confort-pedicure-360?preview_theme_id=157680631981&view=20101-maxi-comfort-pedicure`

### 3. 20200 Multi-comfort

- Actual SKU(s): 20200-24W, 20200-24B, 20200-24N, 20200-24D, 20200-24C, 20200-24S, 20200-24O
- Product ID: `gid://shopify/Product/8744553775277`
- Handle: `20200-multi-comfort`
- Current suffix: `20200-multi-comfort`
- Proposed suffix: `20200-multi-comfort`
- Template file: `templates/product.20200-multi-comfort.json`
- Match: Unique model/SKU candidate; review required
- Review flags: Template featured_product handle is stale: multi-comfort; One or more variants have no SKU
- Published effect: No assignment change proposed; published theme already uses this suffix and contains an older version.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/20200-multi-comfort?preview_theme_id=157680631981&view=20200-multi-comfort)
- Full URL: `https://equipro-dev.myshopify.com/products/20200-multi-comfort?preview_theme_id=157680631981&view=20200-multi-comfort`

### 4. 21100 Hydro-comfort

- Actual SKU(s): 21100W
- Product ID: `gid://shopify/Product/8744553840813`
- Handle: `21100-hydro-comfort`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `21100-hydro-comfort`
- Template file: `templates/product.21100-hydro-comfort.json`
- Match: Unique model/SKU candidate; review required
- Review flags: Template featured_product handle is stale: hydro-comfort
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/21100-hydro-comfort?preview_theme_id=157680631981&view=21100-hydro-comfort)
- Full URL: `https://equipro-dev.myshopify.com/products/21100-hydro-comfort?preview_theme_id=157680631981&view=21100-hydro-comfort`

### 5. 21200 Aero-comfort

- Actual SKU(s): 21200W
- Product ID: `gid://shopify/Product/8744553873581`
- Handle: `21200-aero-comfort`
- Current suffix: `21200-aero-comfort`
- Proposed suffix: `21200-aero-comfort`
- Template file: `templates/product.21200-aero-comfort.json`
- Match: Unique model/SKU candidate; review required
- Review flags: Template featured_product handle is stale: aero-comfort; One or more variants have no SKU
- Published effect: No assignment change proposed; published theme already uses this suffix and contains an older version.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/21200-aero-comfort?preview_theme_id=157680631981&view=21200-aero-comfort)
- Full URL: `https://equipro-dev.myshopify.com/products/21200-aero-comfort?preview_theme_id=157680631981&view=21200-aero-comfort`

### 6. 22100 Poly-comfort

- Actual SKU(s): 22100W
- Product ID: `gid://shopify/Product/8744553906349`
- Handle: `22100-poly-comfort`
- Current suffix: `22100-poly-comfort`
- Proposed suffix: `22100-poly-comfort`
- Template file: `templates/product.22100-poly-comfort.json`
- Match: Unique model/SKU candidate; review required
- Review flags: Template featured_product handle is stale: poly-comfort; One or more variants have no SKU
- Published effect: No assignment change proposed; published theme already uses this suffix and contains an older version.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/22100-poly-comfort?preview_theme_id=157680631981&view=22100-poly-comfort)
- Full URL: `https://equipro-dev.myshopify.com/products/22100-poly-comfort?preview_theme_id=157680631981&view=22100-poly-comfort`

### 7. 51000 TS-4

- Actual SKU(s): 51000
- Product ID: `gid://shopify/Product/8744553119917`
- Handle: `51000-ts-4`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51000-ts-4`
- Template file: `templates/product.51000-ts-4.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51000-ts-4?preview_theme_id=157680631981&view=51000-ts-4)
- Full URL: `https://equipro-dev.myshopify.com/products/51000-ts-4?preview_theme_id=157680631981&view=51000-ts-4`

### 8. 51100 TS-3 deluxe

- Actual SKU(s): TS-3 deluxe
- Product ID: `gid://shopify/Product/8744552726701`
- Handle: `ts-3-deluxe`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51100-ts-3-deluxe`
- Template file: `templates/product.51100-ts-3-deluxe.json`
- Match: Exact configured handle
- Review flags: Actual SKU is textual (TS-3 deluxe); model 51100 matched from title
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/ts-3-deluxe?preview_theme_id=157680631981&view=51100-ts-3-deluxe)
- Full URL: `https://equipro-dev.myshopify.com/products/ts-3-deluxe?preview_theme_id=157680631981&view=51100-ts-3-deluxe`

### 9. 51101 - TM-3 Standard – TM-3 Standard Service Table

- Actual SKU(s): 51101
- Product ID: `gid://shopify/Product/8744550465709`
- Handle: `home-skincare-equipment-accessories-tm-3-professional-service-table`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51101-tm-3-standard`
- Template file: `templates/product.51101-tm-3-standard.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/home-skincare-equipment-accessories-tm-3-professional-service-table?preview_theme_id=157680631981&view=51101-tm-3-standard)
- Full URL: `https://equipro-dev.myshopify.com/products/home-skincare-equipment-accessories-tm-3-professional-service-table?preview_theme_id=157680631981&view=51101-tm-3-standard`

### 10. 51103 TM-3 mini

- Actual SKU(s): 51103
- Product ID: `gid://shopify/Product/8744552661165`
- Handle: `51103-tm-3-mini`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51103-tm-3-mini`
- Template file: `templates/product.51103-tm-3-mini.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51103-tm-3-mini?preview_theme_id=157680631981&view=51103-tm-3-mini)
- Full URL: `https://equipro-dev.myshopify.com/products/51103-tm-3-mini?preview_theme_id=157680631981&view=51103-tm-3-mini`

### 11. 51104 TM-3A

- Actual SKU(s): 51104
- Product ID: `gid://shopify/Product/8744552595629`
- Handle: `51104-tm-3a`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51104-tm-3a`
- Template file: `templates/product.51104-tm-3a.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51104-tm-3a?preview_theme_id=157680631981&view=51104-tm-3a)
- Full URL: `https://equipro-dev.myshopify.com/products/51104-tm-3a?preview_theme_id=157680631981&view=51104-tm-3a`

### 12. 51200 TS-2 basic

- Actual SKU(s): 51200
- Product ID: `gid://shopify/Product/8744552956077`
- Handle: `uphusvw9gfbqf087wzw6s53rzz7zn5`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51200-ts-2-basic`
- Template file: `templates/product.51200-ts-2-basic.json`
- Match: Exact configured handle
- Review flags: Opaque existing handle retained; matched by SKU 51200
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/uphusvw9gfbqf087wzw6s53rzz7zn5?preview_theme_id=157680631981&view=51200-ts-2-basic)
- Full URL: `https://equipro-dev.myshopify.com/products/uphusvw9gfbqf087wzw6s53rzz7zn5?preview_theme_id=157680631981&view=51200-ts-2-basic`

### 13. 51201 TS-2 with drawer

- Actual SKU(s): 51201
- Product ID: `gid://shopify/Product/8744552792237`
- Handle: `51201-ts-2-with-drawer`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51201-ts-2-with-drawer`
- Template file: `templates/product.51201-ts-2-with-drawer.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51201-ts-2-with-drawer?preview_theme_id=157680631981&view=51201-ts-2-with-drawer)
- Full URL: `https://equipro-dev.myshopify.com/products/51201-ts-2-with-drawer?preview_theme_id=157680631981&view=51201-ts-2-with-drawer`

### 14. 51300 TA-2 standard

- Actual SKU(s): 51300
- Product ID: `gid://shopify/Product/8744552890541`
- Handle: `51300-ta-2-standard`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51300-ta-2-standard`
- Template file: `templates/product.51300-ta-2-standard.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51300-ta-2-standard?preview_theme_id=157680631981&view=51300-ta-2-standard)
- Full URL: `https://equipro-dev.myshopify.com/products/51300-ta-2-standard?preview_theme_id=157680631981&view=51300-ta-2-standard`

### 15. 51400 Manicure table

- Actual SKU(s): 51400
- Product ID: `gid://shopify/Product/8744553021613`
- Handle: `51400-manicure-table`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51400-manicure-table`
- Template file: `templates/product.51400-manicure-table.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51400-manicure-table?preview_theme_id=157680631981&view=51400-manicure-table)
- Full URL: `https://equipro-dev.myshopify.com/products/51400-manicure-table?preview_theme_id=157680631981&view=51400-manicure-table`

### 16. 51401 Manicure table deluxe

- Actual SKU(s): 51401
- Product ID: `gid://shopify/Product/8744553218221`
- Handle: `51401-manicure-table-deluxe`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51401-manicure-table-deluxe`
- Template file: `templates/product.51401-manicure-table-deluxe.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51401-manicure-table-deluxe?preview_theme_id=157680631981&view=51401-manicure-table-deluxe)
- Full URL: `https://equipro-dev.myshopify.com/products/51401-manicure-table-deluxe?preview_theme_id=157680631981&view=51401-manicure-table-deluxe`

### 17. 51500 Make-up table

- Actual SKU(s): 51500
- Product ID: `gid://shopify/Product/8744553283757`
- Handle: `51500-make-up-table`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `51500-make-up-table`
- Template file: `templates/product.51500-make-up-table.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/51500-make-up-table?preview_theme_id=157680631981&view=51500-make-up-table)
- Full URL: `https://equipro-dev.myshopify.com/products/51500-make-up-table?preview_theme_id=157680631981&view=51500-make-up-table`

### 18. ei-501-royal

- Actual SKU(s): EI-501W
- Product ID: `gid://shopify/Product/8744551514285`
- Handle: `ei-501-royal`
- Current suffix: default (`templateSuffix: null`)
- Proposed suffix: `ei-501-royal`
- Template file: `templates/product.ei-501-royal.json`
- Match: Exact configured handle
- Review flags: None
- Published effect: Store-wide assignment: proposed template is absent from published theme; published storefront falls back to default. The reviewed layout will not appear live.
- Exact preview: [Open product preview](https://equipro-dev.myshopify.com/products/ei-501-royal?preview_theme_id=157680631981&view=ei-501-royal)
- Full URL: `https://equipro-dev.myshopify.com/products/ei-501-royal?preview_theme_id=157680631981&view=ei-501-royal`

