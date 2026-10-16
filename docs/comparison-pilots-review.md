# Stool and trolley comparison pilots — restored interface

Active Shopify theme: **157851386029** (`-equipro-devShopify/main`). Development theme: **157680631981**. The original Compare button, modal layout, CSS, opening/closing behavior, four fixed collection products, product image/title/price/link, and Close controls have been restored from the pre-pilot backup. Only the table body differs for the stool and trolley pilots. The three-slot selector, add/replace/remove controls, differences toggle, and other new interface elements are no longer rendered. This is a restoration for review, not approval to extend to other families. Product-template assignments and theme publication status are unchanged.

The active-theme backup before this restoration is `equipro-before-comparison-interface-restore-157851386029.zip` (SHA-256 `8b08da1908b219dea49f3ce8ec60d1a729c6e9cf39a7642d81d26a9b317150b8`). The deployment stage was built from that active-theme snapshot and changes only the comparison section, button trigger, two pilot data snippets, data mapping, generic product template, and the missing assigned stool template. Unrelated local product-page changes were not copied into the live theme.

## Source policy and conflicts

The user-provided **Canada PRO V1.2** PDF is authoritative for verified technical values (stools pp. 16–18; trolleys pp. 21–23). The comparison table uses inches and retains dimensions in the order printed under the PDF's `Dimensions` and shelf-dimension labels. It does not label an unlabeled number as length, width, or depth, or rearrange values by size. A field not supported by a confirmed product source displays **Not confirmed**; lack of mention never means “No” or “not applicable.” The PDF supplies professional pricing context, but storefront prices still come from each live Shopify product.

Differences from the [legacy trolley site](https://equipro-bty.com/product-category/trolleys/) are recorded without overriding V1.2:

- TM-3 (51101): PDF shelf spacing is 14 in first–second and 9 in second–third; the legacy site gives 11.75 in / 11.75 in.
- The TM-3 detail table previously showed 11.75 in / 11.75 in; it is now corrected to the PDF sequence, 14 in then 9 in.
- TM-3A (51104): PDF overall dimensions are **14 × 25 × 33.5 in**, in that order, with spacing 9.75 in / 10 in. The legacy site differs in dimensions and spacing.
- TM-3 Mini: the store identifies **51103**, while the PDF identifies **51103-M**. Those may be different versions. The PDF lists 14 × 18 × 33.5 in and shelves 13 × 16 in for 51103-M; the legacy site lists shelves 14 × 15.75 in. None of those measurements or accessories is attributed to the store's 51103 until identity is confirmed. Its comparison cells display Not confirmed.
- TS-3 Deluxe (51100): PDF top shelf is 13.5 × 20 in and spacing is 10.25 in / 10.5 in; the legacy site differs.
- TS-2 Basic (51200): PDF overall dimensions are **25 × 14 × 34 in**, while the legacy site gives 14 × 18 × 33.5 in.
- TS-4 (51000): PDF overall dimensions are **15 × 25.5 × 54.5 in**, in that order; the legacy site gives 15 × 25 × 64 in.

The full 14-record product, SKU, handle, image, template, and specification mapping is in [`comparison-pilot-mapping-2026-10-15.json`](comparison-pilot-mapping-2026-10-15.json). The table values are maintained in [`equipro-comparison-data.json`](../assets/equipro-comparison-data.json), with a matching Liquid value snippet used by the original modal.

## Pilot products

Stools (six): [31100](https://equipro-dev.myshopify.com/products/31100-air-lift-round-stool), [31200](https://equipro-dev.myshopify.com/products/round-air-lift-stool-with-backrest-31200), [31300](https://equipro-dev.myshopify.com/products/skincare-equipment-stools-ergonomic-stool-with-backrest-31300), [31301](https://equipro-dev.myshopify.com/products/ergonomic-stool-with-adjustable-backrest-31301), [EI-311](https://equipro-dev.myshopify.com/products/round-air-lift-stool-ei-311), and [EI-312](https://equipro-dev.myshopify.com/products/ei-312-round-air-lift-stool). The PDF gives 31100/31200 height 20.5–27.5 in, five-star base, Color Chart A, and two-year warranty. EI-311/EI-312 are separate named PDF entries with height 20.5–28 in, circular footrest, Color Chart B, and one-year warranty. They are distinct comparison identities rather than duplicates of the numbered listings. No caster or base material is inferred for EI models.

Trolleys (eight): [TM-3 Standard](https://equipro-dev.myshopify.com/products/home-skincare-equipment-accessories-tm-3-professional-service-table), [TM-3A](https://equipro-dev.myshopify.com/products/51104-tm-3a), [TM-3 Mini](https://equipro-dev.myshopify.com/products/51103-tm-3-mini), [TS-3 Deluxe](https://equipro-dev.myshopify.com/products/ts-3-deluxe), [TS-2 With Drawer](https://equipro-dev.myshopify.com/products/51201-ts-2-with-drawer), [TA-2 Standard](https://equipro-dev.myshopify.com/products/51300-ta-2-standard), [TS-2 Basic](https://equipro-dev.myshopify.com/products/uphusvw9gfbqf087wzw6s53rzz7zn5), and [TS-4](https://equipro-dev.myshopify.com/products/51000-ts-4). Manicure and make-up workstations remain outside this storage-trolley pilot.

The restored interface keeps its original `limit: 4` collection selection. That is a visual and behavior requirement for this restoration: a page may therefore show four of the six or eight family records, depending on collection order. It does not expose an add/replace selector. Rows are category-specific and each visible product receives its own verified values or Not confirmed.

## Assigned templates and outstanding catalog checklist

- **Maxi-comfort 360º** (`maxi-comfort-360`): assigned suffix `SKU00001-maxi-comfort-360` has no file. An existing correct product-specific template is `product.20100-maxi-comfort-360.json`; using it would require a future assignment change. No assignment or template was changed for this product in this pilot.
- **Round air-lift stool with backrest 31200** (`round-air-lift-stool-with-backrest-31200`): assigned suffix `31200-round-air-lift-stool-with-backrest` had no file. That missing file was completed under the existing suffix to retain the assignment and restore the Compare modal.
- **TM-3 Mini 51103 versus PDF 51103-M:** identity unresolved; PDF technical values withheld from the store record.
- **Heating Boots:** missing Shopify product image; comparison exclusion retained.
- **Infinity:** `ei-502-infinity` and `ultra-comfort-20500-gm25t` conflict in their EI-502 identity; both stay excluded until the canonical products are confirmed.
- **Duo-Pil Precision:** its existing product template sets `show_compare_btn: false`; business reason still unconfirmed. The exclusion remains unchanged.
- **Other unconfirmed data:** stool seat dimensions and exact 31300/31301 height-adjustment mechanism; EI stool caster/base material; trolley accessories or storage not stated for a given model. All display Not confirmed.

The 20 Ioniderm corrections remain in the shared product section: visited product title, image, price, selected variant, and comparison identity resolve from the visited product. No catalog title, price, inventory, or variant record was edited for this restoration. The purchase/quote rules and other product families remain as on the active theme.

## Detail-page consistency follow-up (2026-10-16)

The Canada PRO V1.2 PDF was checked against the pilot product descriptions, technical detail tables, and comparison rows. The restored comparison UI and four-product selection were not changed. Clearly matching detail-table corrections now use the PDF's printed dimension labels/order and values: TM-3 (14/9 in shelf gaps), TM-3A (14 × 25 × 33.5 in and 9.75/10 in gaps), TS-3 Deluxe (13.5 × 20 in top shelf and 10.25/10.5 in gaps), TS-4 (15 × 25.5 × 54.5 in and 11.75/13/9 in gaps), TS-2 Basic (25 × 14 × 34 in), TS-2 With Drawer and TA-2 (Dimensions label, 25 × 14 × 34 in). Their comparison values already matched the authoritative source and were left alone.

Stool detail tables now state PDF height ranges for the numbered stools and EI-311/EI-312. The EI-311/EI-312 tables show their confirmed circular footrests and one-year warranty; unsupported base, caster, material, and control details are marked Not confirmed. The comparison rows already reflected the supported values. Adjustment-control details not specified in the PDF remain Not confirmed.

Unresolved catalog identity/data: Shopify TM-3 Mini is SKU 51103 while the PDF Mini is 51103-M; these stay separate and the 51103 table/comparison values were not changed. Maxi-comfort 360º is product 8744552005805 / SKU 20100W. Its existing `product.20100-maxi-comfort-360.json` template is clearly for model 20100, and its exact-template preview was verified at [Shopify preview](https://cbfec0vb6gp7o49z-78519926957.shopifypreview.com/products_preview?preview_key=44c6d1bc014eaf60b89f4d1791bd5d1d&view=20100-maxi-comfort-360). The product remains assigned to `SKU00001-maxi-comfort-360`; no assignment changed. The preview's description/table dimensions and stated height differ (description height 27–34 in vs table 26.5/33.5 in), so these remain flagged for source review.

A fresh full backup of active theme 157851386029 was captured before this follow-up as `equipro-before-pilot-content-corrections-157851386029.zip` (SHA-256 `521eb1050d53dd0e5db2c283523c2040221f2ce31e44470c5e7694517f3b162a`).

## Verification

All 23 repository tests pass, covering product identity, original modal controls/opening, four-product selection, category rows, PDF order, unconfirmed values, exclusions, cart behavior, and variant behavior. Theme Check on the staged active-theme copy reports the same 24 existing errors as the fresh active backup; three warnings relate to the two new rendered snippets (two false-positive orphan warnings from dynamic rendering, one complexity warning). No new Theme Check error was introduced. The seven targeted theme files were read back from theme 157851386029 and matched the stage. Live browser checks confirmed both pilot modals open, retain their prior layout, show their family rows, and label unresolved values Not confirmed. Product-page screenshots are saved in the task visualization folder. The active theme remains live; it was not switched or republished.
