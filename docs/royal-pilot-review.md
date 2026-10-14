# Royal EI-501 pilot review

October 14, 2026. Branch: codex/royal-catalog-pilot.

## Sources and decisions

Primary requested source: Canada PDF V1.2. Not available in searched project, Documents, Desktop or Downloads paths. User will correct price later; technical specification confirmation remains outstanding.

Secondary source: https://seahorse-llama-gkdh.squarespace.com/electrics/royal-ei-501, read in browser. Live Shopify product and template assignments were queried through the connected equipro-dev store.

User explicitly confirmed Royal direct purchase and White/Black/Navy colors. No commercial mode is inferred for other products. Portables remains non-purchasable.

## Purchase investigation

Catalog cards intentionally have View product links. Product pages have a product form; Royal is not missing its purchase button. The storefront renders OUT OF STOCK disabled. Admin reports White availableForSale=true, sellableOnlineQuantity=1, inventoryPolicy=DENY and 1 unit at Shop location. This discrepancy needs storefront market/channel/context investigation; do not force-enable an unavailable variant or disable inventory tracking.

Royal has only one configured variant, White / EI-501W. Black and Navy require actual variant IDs, merchant-approved SKU/price/inventory setup and fulfillment settings before they can be ordered. Pilot directs customers to contact Equipro for those colors; no fake option submits White under a different color.

## Pilot scope

New isolated product.royal-pilot.json uses main-product and reusable product-details sections. Preview with ?view=royal-pilot; no global Admin template assignment is changed, because that would also affect the published theme.

Concise introduction, purchase area near the top, live Shopify price with currency, existing product gallery, technical table, professional uses/features, instructions/safety and native keyboard-accessible FAQ details. Two configurable image slots are prepared for positioning and controls/clearance photographs. Existing media and alt text are preserved; no unrelated product images are copied.

The reused main section preserves image alt text and supports explicit price currency and an option note. These additions default off/blank on other templates.

## Discrepancies and withheld claims

- Reference price CA$2,990 versus Shopify 2,990 USD. Left unchanged; user will correct price.
- Reference color spelling Balck is normalized to Black in prose. Black/Navy variants absent in Shopify.
- Height 17–39 inches, four cushions, remote/pedal, headrests and armrests agree between Shopify description and Squarespace but remain provisional until Canada V1.2/manual verification.
- Do not publish the reference’s weight 175 lb, dimensions 72 x 28 inches, overload protection, emergency functions, CSA/UL certifications, one-year warranty, precise 120V requirement or promised shipping times without primary documentation.
- Unsupported benefit claims about practitioner pain relief, fatigue reduction, lifespan or treatment outcomes are omitted.
- Installation and safety text is an overview, not a substitute for the Royal manual. Request manual and clearance/weight/electrical limits before final approval.

## Audit

Checklist covers all 65 live products and actual Admin templateSuffix assignments. 29 use generic or locally missing layouts; 2 assigned template files are missing locally. Candidate source matches are labelled. 55 source retrievals failed, so full editorial currency is not certified. The JSON and interactive checklist preserve per-product evidence and missing items.

## Next delivery

After Royal structure approval, complete product-specific sources, primary specification checks and commercial classifications before rollout. Filtering remains a separate delivery; see catalog-filtering-proposal.md. Preserve pending configurator mapping, quote duplication/context, missing product-card-item and cart unlock availability race.

## Checks and deployment

Ten catalog/pilot behavior tests and six preserved cart tests pass. Theme Check remains at 22 existing errors and 33 existing warnings; no new offense by file/check/message. The checklist passes TypeScript checking.

Development theme 157680631981 was verified on equipro-dev.myshopify.com with role development; published theme is 157851386029. Only main-product, reusable product-details, isolated royal-pilot template and English generic catalog button label were uploaded. Existing product media and Admin template assignments were not edited. The details section is scoped to Royal so applying its preview to another product cannot copy Royal’s content there.

Live preview renders every requested section, explicit USD price and both image slots; FAQ opens with native details and no console errors were observed. Purchase remains unavailable in the storefront, so no successful add-to-cart is claimed.

Admin reports Canada and United States markets ACTIVE. This does not establish Royal’s regional catalog/fulfillment eligibility. Admin sign-in is still needed for Search & Discovery and deeper storefront configuration checks.

Preview: https://equipro-dev.myshopify.com/products/ei-501-royal?view=royal-pilot&preview_theme_id=157680631981

## Review steps

1. Open the preview and review introduction, purchase-area placement, gallery and explicit currency on desktop and mobile.
2. Review specifications, uses/features, instructions, FAQ and image slot labels. Confirm omitted claims using Canada PDF V1.2 and the operating manual.
3. Compare the three existing images and alt text with the current product; confirm which photographs should fill the two slots.
4. Complete Royal’s Black/Navy SKU, variant price, stock and fulfillment settings before those colors become selectable purchase configurations.
5. Resolve storefront/Admin availability and then test White add-to-cart, quantities and removal before approving purchase readiness.
6. Approve the pilot structure before adapting remaining pages. Inspect catalog checklist and filtering proposal as separate deliverables.
