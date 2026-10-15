# Active theme transfer — October 15, 2026

Store: equipro-dev.myshopify.com. Active theme verified before and after upload: 157851386029 (-equipro-devShopify/main). Comparison theme: 157680631981 (development). Future work should target the current active theme after re-verifying its ID.

## Backup and preservation

- Complete pre-change ZIP: [equipro-active-157851386029-before-2026-10-15.zip](/Users/marketingequipro/.codex/visualizations/2026/10/14/01a13ad6-f5db-7700-b5aa-f68a18960514/equipro-active-157851386029-before-2026-10-15.zip)
- SHA-256: `d33bf4c9a3cc58f7192ee2eea8b0e176cd52178df7d863fe3a87b473a00c2b4d`
- Backup contains 188 files and passed ZIP integrity validation.
- The active theme was downloaded again immediately before upload; all backup hashes still matched.
- Uploaded only the 18 completed product templates using --allow-live --nodelete, without --publish.
- Five existing templates updated; thirteen templates added.
- All 183 existing files outside this transfer match the pre-change backup byte for byte, including shared sections, layout, cart, collections, settings, locales, and assets.
- All five pre-existing target templates matched the Git version before our product-template work; no intervening template customizations were overwritten. Existing image/layout settings were retained where present.
- Five stale featured_product handles were corrected inside template settings to match catalog handles. This does not change product.templateSuffix assignments.
- Shared code differences in development were not copied wholesale over active customizations.

## Verification

- All 18 uploaded templates match local prepared files byte for byte.
- Validated all templates against the active theme section/block schemas.
- Full Theme Check: 59 pre-existing issues before and after, including 24 errors; no new issues. No unrelated fixes attempted.
- Browser smoke checks for all 18 active-theme view URLs: specifications, How to Use, and FAQs present; no Liquid errors detected. This is a content/rendering check, not exhaustive visual QA.
- All 64 product templateSuffix assignments compared before/after and unchanged.
- No theme publishing or switching.
- Already assigned products Multi-comfort 20200, Aero-comfort 21200, and Poly-comfort 22100 display their updated template content automatically. The other 15 still require mapping review and explicit approval before assignment.
- Images remain for later user review as requested.

## Active-theme page review links

Each link explicitly selects active theme 157851386029 and temporarily applies view=<template suffix>. No assignment changes are made by opening it. The earlier mapping files are retained as a pre-transfer audit snapshot; their theme-availability and stale-handle findings have been superseded by this transfer.

- [Maxi-comfort 360º - 20100](https://equipro-dev.myshopify.com/products/maxi-comfort-360?preview_theme_id=157851386029&view=20100-maxi-comfort-360) — `SKU00001-maxi-comfort-360` → proposed `20100-maxi-comfort-360`; assignment unchanged.
- [Maxi-Comfort Pedicure 360º](https://equipro-dev.myshopify.com/products/maxi-confort-pedicure-360?preview_theme_id=157851386029&view=20101-maxi-comfort-pedicure) — `20101-maxi-comfort-360` → proposed `20101-maxi-comfort-pedicure`; assignment unchanged.
- [20200 Multi-comfort](https://equipro-dev.myshopify.com/products/20200-multi-comfort?preview_theme_id=157851386029&view=20200-multi-comfort) — `20200-multi-comfort` → proposed `20200-multi-comfort`; assignment unchanged.
- [21100 Hydro-comfort](https://equipro-dev.myshopify.com/products/21100-hydro-comfort?preview_theme_id=157851386029&view=21100-hydro-comfort) — `default (null)` → proposed `21100-hydro-comfort`; assignment unchanged.
- [21200 Aero-comfort](https://equipro-dev.myshopify.com/products/21200-aero-comfort?preview_theme_id=157851386029&view=21200-aero-comfort) — `21200-aero-comfort` → proposed `21200-aero-comfort`; assignment unchanged.
- [22100 Poly-comfort](https://equipro-dev.myshopify.com/products/22100-poly-comfort?preview_theme_id=157851386029&view=22100-poly-comfort) — `22100-poly-comfort` → proposed `22100-poly-comfort`; assignment unchanged.
- [51000 TS-4](https://equipro-dev.myshopify.com/products/51000-ts-4?preview_theme_id=157851386029&view=51000-ts-4) — `default (null)` → proposed `51000-ts-4`; assignment unchanged.
- [51100 TS-3 deluxe](https://equipro-dev.myshopify.com/products/ts-3-deluxe?preview_theme_id=157851386029&view=51100-ts-3-deluxe) — `default (null)` → proposed `51100-ts-3-deluxe`; assignment unchanged.
- [51101 - TM-3 Standard – TM-3 Standard Service Table](https://equipro-dev.myshopify.com/products/home-skincare-equipment-accessories-tm-3-professional-service-table?preview_theme_id=157851386029&view=51101-tm-3-standard) — `default (null)` → proposed `51101-tm-3-standard`; assignment unchanged.
- [51103 TM-3 mini](https://equipro-dev.myshopify.com/products/51103-tm-3-mini?preview_theme_id=157851386029&view=51103-tm-3-mini) — `default (null)` → proposed `51103-tm-3-mini`; assignment unchanged.
- [51104 TM-3A](https://equipro-dev.myshopify.com/products/51104-tm-3a?preview_theme_id=157851386029&view=51104-tm-3a) — `default (null)` → proposed `51104-tm-3a`; assignment unchanged.
- [51200 TS-2 basic](https://equipro-dev.myshopify.com/products/uphusvw9gfbqf087wzw6s53rzz7zn5?preview_theme_id=157851386029&view=51200-ts-2-basic) — `default (null)` → proposed `51200-ts-2-basic`; assignment unchanged.
- [51201 TS-2 with drawer](https://equipro-dev.myshopify.com/products/51201-ts-2-with-drawer?preview_theme_id=157851386029&view=51201-ts-2-with-drawer) — `default (null)` → proposed `51201-ts-2-with-drawer`; assignment unchanged.
- [51300 TA-2 standard](https://equipro-dev.myshopify.com/products/51300-ta-2-standard?preview_theme_id=157851386029&view=51300-ta-2-standard) — `default (null)` → proposed `51300-ta-2-standard`; assignment unchanged.
- [51400 Manicure table](https://equipro-dev.myshopify.com/products/51400-manicure-table?preview_theme_id=157851386029&view=51400-manicure-table) — `default (null)` → proposed `51400-manicure-table`; assignment unchanged.
- [51401 Manicure table deluxe](https://equipro-dev.myshopify.com/products/51401-manicure-table-deluxe?preview_theme_id=157851386029&view=51401-manicure-table-deluxe) — `default (null)` → proposed `51401-manicure-table-deluxe`; assignment unchanged.
- [51500 Make-up table](https://equipro-dev.myshopify.com/products/51500-make-up-table?preview_theme_id=157851386029&view=51500-make-up-table) — `default (null)` → proposed `51500-make-up-table`; assignment unchanged.
- [ei-501-royal](https://equipro-dev.myshopify.com/products/ei-501-royal?preview_theme_id=157851386029&view=ei-501-royal) — `default (null)` → proposed `ei-501-royal`; assignment unchanged.
