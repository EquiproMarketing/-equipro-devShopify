# Pricing reconciliation

| Market | Fresh Admin view | Historical execution |
|---|---|---|
| Canada | `R19G Equipro Canada CAD v1` active only in CA. List `30905598125`: 122 fixed, `20502-24W` relative. | Three relative-to-fixed corrections for `786005`, `66001`, `66007`. The 120 other CAD and 123 USD amounts were unchanged in that readback. |
| United States | `Equipro USA USD — 49 precios oficiales` active only in US. Catalog `136173617325`, list `30949703853`. 49 fixed and 74 base-price fallbacks with neutral 0% adjustment. | Validated as an unassigned draft, then activated and assigned in one Shopify catalog update. Readback confirmed 49 exact USD changes, 74 USD retained, all 123 CAD retained, and unchanged base, compare-at, SKU and publication. |
| Older USD draft | `R19G Equipro USA USD v1` is outside scope. | At preflight it was unassigned with 111 fixed prices; activating it would have changed 52 effective prices outside the approved 49. |

Fresh effective USD for all 123 compared equal to the US assignment readback. Fresh CAD comparison and relative SKU are recorded separately in [Admin evidence](evidence/admin-summary.json). The one CAD relative can move with FX and rounding even if its USD base and catalog rules remain the same. Never infer official USD by converting CAD.

## Source and independent check

Prior reconciliation inspected the full Canada PRO V1.2 edition and the exact US Professional 2026 attachment in Library. The US attachment was readable in its viewer; the locally processed full edition had a different filename and was cross-checked by page for the amounts used. No byte-identity claim was made. Pages and targets are in [the redacted manifests](evidence/pricing-manifests-redacted.json). Original commercial price matrices and tariff PDFs are held locally and intentionally omitted from this public handoff.

Rerun Shopify Admin `ProductVariant.contextualPricing` for CA and US, plus price-list origin by variant ID, baseline USD, compare-at and channel publication. Cross-check each approved fixed amount with the authorized tariff edition. Keep Infinity, unconfirmed sizes/colors, and `20502-24W` in REVIEW. Price corrections do not grant purchase eligibility.
