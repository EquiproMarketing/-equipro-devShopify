# Royal structure correction — approval draft

October 14, 2026. Royal remains unapproved. No catalog-wide rollout is authorized until the structure is validated.

## Reference and corrected hierarchy

Source read directly in browser: https://seahorse-llama-gkdh.squarespace.com/electrics/royal-ei-501

1. Product header: Royal title, concise introduction, product information and live price; existing gallery in the right-hand desktop column; existing purchase control remains unavailable when Shopify says unavailable.
2. Technical specifications in the right-hand column with professional-use accordions to the left. Mobile stacks specifications and uses as full-width sections.
3. Separate burgundy feature section with a configurable Royal positioning image slot.
4. Numbered Royal instructions with a configurable controls/positioning image slot.
5. Separate safety section.
6. Seven Royal FAQ topics reflecting the reference’s question coverage, using native keyboard-accessible details/summary.

The earlier pilot incorrectly combined uses/features and instructions/safety. Those groups are now separated. Desktop retains Equipro’s left-information/right-gallery arrangement. Mobile title, gallery, purchase area and short description have explicit ordering, with gallery height constrained and full-width lower sections. Gallery thumbnails can be selected with Enter or Space in the pilot. The reference layout is opt-in; other product templates retain their layout.

## Content and primary-source verification

Canada PDF V1.2 is still unavailable. Prices remain the live Shopify values; no price, currency setting, inventory, fulfillment setting or variant was changed in this revision.

The height range and accessory descriptions are secondary-source provisional data, not PDF-verified specifications. Dimensions, weight, electrical requirements and warranty are reserved pending primary confirmation. The pilot avoids unsupported load/overload/emergency-system claims, certification claims, shipping guarantees and practitioner-health benefits. Obtain the Royal operating manual for electrical, weight-capacity and detailed safety procedures.

The reference's CAD price and Shopify’s USD price were previously flagged; this remains open for the user's correction. Black and navy are intended colors, but variant creation remains outside this layout revision. Existing images and image alt text remain intact; only two new detail-image slots are prepared.

## Current scope correction

The user states that no products currently have stock in the test store. Earlier API inventory observations are historical and are not used to judge current purchase readiness. Purchase and cart testing are deferred. Do not enable unavailable variants or modify inventory to facilitate testing.

Royal is a preview-only template: product.royal-pilot.json is not assigned globally in Shopify Admin. All Royal-specific lower sections are guarded by product identity. Portables remains non-purchasable.

## Category rollout tracking

product-page-progress.json lists every audited product with category, assigned template, source match, stage and unresolved details. Zero pages are marked completed. Royal is awaiting structure approval; all other pages remain not reviewed under the approved structure. Begin category-by-category rollout only after Royal approval, using each product's own source, confirmed prices/specifications and images.

Filtering implementation is deferred until the product-page work is complete. Existing cart changes remain unchanged and outside this commit.

## Review checklist

- Desktop: title/intro, gallery, professional-use/specification columns, feature band and separate instruction/safety/FAQ sections.
- Mobile: title/gallery order, compact purchase area, readable full-width specifications and accordion controls; no horizontal page overflow.
- Product specificity: Royal content does not appear when the pilot is used to view another product.
- Content: approve the structure separately from pending technical values and image-slot assets.

Preview: https://equipro-dev.myshopify.com/products/ei-501-royal?view=royal-pilot&preview_theme_id=157680631981
