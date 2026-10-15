# Comparison pilots — review record

Deployed to the existing live theme **157851386029** (`-equipro-devShopify/main`). Development theme **157680631981** was not modified. No theme was published/switched, and no product assignment, price, inventory, or catalog record was changed. These changes are visible on the published storefront. Review links below use neither `view` nor `preview_theme_id`.

## What changed

- Fixed the active generic product template: it contained a fixed Ioniderm product/title plus unrelated editorial sections. The shared product section now resolves the visited product first and rejects another product’s editorial overrides.
- Eighteen of the 20 affected records used the default template. Maxi-comfort 360º and stool 31200 referenced template files absent from the active theme and therefore fell back to that same default. Their assignments remain unchanged. The corrected generic fallback now renders their own data.
- Added one reusable, accessible comparison dialog, with separate stool and trolley schemas. Three selectors support adding, replacing and removing, including the original product. Duplicate options are disabled; an ID allowlist prevents unrelated products.
- Live product objects supply title, photo and page link. Technical specifications come from the V1.2 PDF. No purchase decisions are made by the comparison component. The active purchase and quote flows are retained.
- Only the 14 pilot models use the new component. Excluded collections and Heating Boots are blocked. The two unresolved Infinity records and three manicure/make-up workstations are also withheld. Existing eligible non-pilot specific templates retain their legacy comparison behavior; generic fallback pages no longer receive the unrelated generic comparison.

## Sources and normalization

Primary: user-provided `compress-Liste de prix-Canada-PRO_V1.2.pdf`; stool pages 16–18, trolley pages 21–23, warranty terms page 3. Pages were extracted and visually inspected. The PDF itself and its professional prices were not uploaded to the storefront.

Secondary: [official trolley collection](https://equipro-bty.com/product-category/trolleys/) and its model pages: [TM-3](https://equipro-bty.com/products/tm-3-standard/), [TM-3A](https://equipro-bty.com/products/tm-3a/), [TM-3 Mini](https://equipro-bty.com/products/tm-3-mini/), [TS-3](https://equipro-bty.com/products/ts-3-deluxe/), [TS-2 drawer](https://equipro-bty.com/products/ts-2-with-drawer/), [TS-2](https://equipro-bty.com/products/ts-2-basic/), [TA-2](https://equipro-bty.com/products/ta-2-standard/), [TS-4](https://equipro-bty.com/products/ts-4/).

All dimensions use inches. Overall footprint dimensions are normalized to **long side × short side × height**, without claiming manufacturer width/depth orientation. Fractions become decimals (11¾ → 11.75). Null means **Not confirmed**, never No. An explicit `not_applicable` value has a separate display label; no unsupported N/A claims were introduced. Rows with no confirmed values for the selected products are omitted. Differences-only keeps rows where a known value is compared with an unknown value.

V1.2 takes priority over conflicting website details:

- TM-3 shelf spacing: 14 / 9 in (website: 11.75 / 11.75).
- TM-3A: drawer confirmed; spacing 9.75 / 10 in; overall footprint 25 × 14 in (website differs).
- TM-3 Mini shelves: 13 × 16 in (website: 14 × 15.75). PDF model 51103-M maps to the existing 51103 Mini listing; no duplicate product was created.
- TS-3: top shelf 13.5 × 20 in; spacing 10.25 / 10.5 in (website differs).
- TS-2 overall size: 25 × 14 × 34 in; the website’s 14 × 18 × 33.5 in conflicts with the PDF and even its own shelf size.
- TS-4 overall size: 25.5 × 15 × 54.5 in after normalization; website gives 15 × 25 × 64 in.

## Review URLs and mappings

### Stools

- [Air-Lift Round Stool - 31100](https://equipro-dev.myshopify.com/products/31100-air-lift-round-stool) — model **31100**, PDF p. 16; current suffix `31100-air-lift-round-stool` unchanged.
- [Round air-lift stool with backrest - 31200](https://equipro-dev.myshopify.com/products/round-air-lift-stool-with-backrest-31200) — model **31200**, PDF p. 16; current suffix `31200-round-air-lift-stool-with-backrest` unchanged.
- [Ergonomic Stool with Backrest - 31300](https://equipro-dev.myshopify.com/products/skincare-equipment-stools-ergonomic-stool-with-backrest-31300) — model **31300**, PDF p. 17; current suffix `31300-ergonomic-air-lift-stool` unchanged.
- [Ergonomic Stool with Adjustable Backrest-31301](https://equipro-dev.myshopify.com/products/ergonomic-stool-with-adjustable-backrest-31301) — model **31301**, PDF p. 17; current suffix `31301-ergonomic-stool-with-adjustable-backrest` unchanged.
- [Round air-lift stool-EI-311](https://equipro-dev.myshopify.com/products/round-air-lift-stool-ei-311) — model **EI-311**, PDF p. 17; current suffix `ei-311-round-air-lift-stool` unchanged.
- [EI-312 Round Air Lift Stool](https://equipro-dev.myshopify.com/products/ei-312-round-air-lift-stool) — model **EI-312**, PDF p. 18; current suffix `ei-312-round-air-lift-stool` unchanged.

### Trolleys

- [51101 - TM-3 Standard](https://equipro-dev.myshopify.com/products/home-skincare-equipment-accessories-tm-3-professional-service-table) — model **51101**, PDF p. 22; current suffix `51101-tm-3-standard` unchanged.
- [51104 TM-3A](https://equipro-dev.myshopify.com/products/51104-tm-3a) — model **51104**, PDF p. 22; current suffix `51104-tm-3a` unchanged.
- [51103 TM-3 mini](https://equipro-dev.myshopify.com/products/51103-tm-3-mini) — model **51103-M**, PDF p. 22; current suffix `51103-tm-3-mini` unchanged.
- [51100 TS-3 deluxe](https://equipro-dev.myshopify.com/products/ts-3-deluxe) — model **51100**, PDF p. 22; current suffix `51100-ts-3-deluxe` unchanged.
- [51201 TS-2 with drawer](https://equipro-dev.myshopify.com/products/51201-ts-2-with-drawer) — model **51201**, PDF p. 23; current suffix `(default)` unchanged.
- [51300 TA-2 standard](https://equipro-dev.myshopify.com/products/51300-ta-2-standard) — model **51300**, PDF p. 23; current suffix `(default)` unchanged.
- [51200 TS-2 basic](https://equipro-dev.myshopify.com/products/uphusvw9gfbqf087wzw6s53rzz7zn5) — model **51200**, PDF p. 23; current suffix `51200-ts-2-basic` unchanged.
- [51000 TS-4](https://equipro-dev.myshopify.com/products/51000-ts-4) — model **51000**, PDF p. 21; current suffix `51000-ts-4` unchanged.

Full product IDs, SKUs, headings, template suffixes, images, field values, source pages and unknown fields are in `comparison-pilot-mapping-2026-10-15.json`. The deployed schema and values are in `assets/equipro-comparison-data.json`.

## Unresolved questions and exclusions

- **Infinity:** `ei-502-infinity` and `ultra-comfort-20500-gm25t` both claim EI-502. The latter description describes Ultra-Comfort, while the first has a zero price and no SKU. Both are excluded pending identification of the canonical record. No purchase eligibility was inferred from either price.
- **Other similar models:** 31300 and 31301 remain separate: V1.2 distinguishes adjustable ergonomic versus tilting/reclining backrest. 31100 and EI-311 differ in height, footrest/color chart and warranty; 31200 and EI-312 likewise remain separate. No duplicate pilot model IDs were found. Model 31201 appears in the PDF but is not one of the current six store stool records; it was not invented as a product.
- **Manicure/make-up:** 51400, 51401 and 51500 are workstations with worktop, bottle storage, armrest/mirror/lighting requirements. They need a separate workstation schema; the pilots do not mix them with storage trolleys.
- **Future table family:** electric, hydraulic and mechanical tables/chairs can share a family after identity review; portable models remain separate. This rollout is not enabled.
- **Duo-Pil Precision:** active template `product.41202-duo-pil-precision.json` explicitly sets `show_compare_btn: false`. Thus the exclusion is deliberate in configuration, but no business rationale was found. It is a wax-heater product, not part of the agreed excluded collections. Setting left unchanged pending review.
- **Excluded:** columns, skin-analyzer, wellness-therapy, facial-units and Heating Boots. Heating Boots has no Shopify image and remains excluded.
- **Missing specifications:** stool seat measurements; exact adjustment mechanism for 31300/31301; EI stool caster specification and base material; unlisted drawer/cabinet/outlet/holder details on particular trolleys. See per-product unknowns in the mapping. Absence of mention is never treated as No.
- **Images:** all 14 pilot page photos match their current Shopify featured image; comparison uses that same product’s live photo. Photos may show optional accessories, so exact configuration photography should be reviewed alongside upholstery/footrest choices. No image replacements were made.
- **Catalog language:** existing product titles and descriptions remain as stored. Some titles are lowercase or use older descriptive names. The comparison model ID is independent of these editorial labels.

## Verification

- 24 automated tests pass: selection limits, replacement/removal, duplicate/foreign-ID rejection, unknown/N/A semantics, source-backed fixture values, Liquid family rendering, exclusions, product identity, variant selection and cart regression tests.
- Live checks: all 20 Ioniderm headings corrected; product-specific variant maps correct. All 31 affected/pilot pages have rendered variants and visible prices matching the catalog/current visible configuration. Hidden form input values were redacted by browser tooling; those bindings are covered by Liquid tests rather than claimed as directly inspected.
- All 14 pilot pages expose exactly six stool or eight trolley candidates and use the proper family. All 14 main photos match Shopify featured images.
- Browser interaction checks: current product preselected; add three; replace; remove one/all; disabled duplicate options; differences-only; unknown cells; page links; keyboard opening; forward/reverse Tab wrapping; Escape closes and restores focus.
- Mobile at 390 × 844: dialog fits viewport; horizontally scrolled tables retain sticky row labels. Desktop and mobile screenshots saved as review artifacts.
- Shopify Theme Check: 24 pre-existing errors in the active theme; no new errors. Three orphan-snippet warnings are false positives for snippets reached through captures. The bundled skill validator could not run because its package `@shopify/theme-check-common` is missing; CLI Theme Check and actual Shopify upload validation were used.

## Deployment and backup

Full active-theme backup: `equipro-before-comparison-pilots-157851386029.zip` in the task visualization folder. SHA-256: `788b8be1461d6cbe9e4cb9326d9fcb41475acaba5da55dbbe0da4de5fd270f6c`. Target files were pulled again and compared with this backup before deployment.

Read-back verification confirmed all ten deployed files match the staged files (JSON compared structurally). Ten targeted theme files were uploaded with `--allow-live --nodelete`; no theme publication/switch command was used. `scripts/stage-comparison-pilots.py` merges the identity/comparison changes into a full active-theme backup, preserving active purchase behavior instead of pushing unrelated local Royal/portable changes. Do not push the whole local checkout over the live theme.

Roll back only the pre-existing targeted files from the backup and remove the six newly introduced comparison snippets/assets if a full rollback is requested. Keep unrelated remote edits.

Further families and catalog/template assignments await pilot approval.
