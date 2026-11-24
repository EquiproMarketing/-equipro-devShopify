# Equipro independent audit handoff

Snapshot date: 2026-11-24 America/Toronto. The exact Admin observation timestamp is in [the evidence summary](evidence/admin-summary.json). Use [the evidence index](EVIDENCE-INDEX.md) for source priority and replay instructions.

| Area | Status |
|---|---|
| GitHub and theme | GitHub main was observed at `707039b8b20f92f9766f0375eca91c6aa4084bc1`; Shopify MAIN `157851386029` is the sole approved launch target. Eight sampled runtime files matched byte for byte after UTF-8 encoding. |
| Runtime | R1.1V was deployed in the 17-path Shopify sync `4e96095`. Comparator accessibility and Find Your Setup followed in `4ab68fa`; automatic cart drawer opening followed in `707039b`. |
| Catalog | 63 active products, 123 active-product variants, one draft variant excluded from those totals. One Shopify product/variant identity across markets. |
| Pricing | CAD is active with 122 fixed and one relative price. The new USD catalog is **active and assigned only to US**, with 49 fixed and 74 base fallbacks. The older “unassigned” status described staging before assignment. |
| Launch | CA direct purchase remains blocked for the audited pilot. US has a verified storefront price/availability sample. Public commercial launch is not signed off. Admin reports Grow and `partnerDevelopment=true`. |
| French | Admin confirms FR unpublished. Fresh theme comparison found 313 matching leaf keys in each locale; historical 311 was from before the four-path follow-up. Five profiles have all 15 global FR fields registered and current. |

**Audit scope.** Treat historical QA as evidence for its tested version. Recheck Admin independently for mutable data. Confirm storefront behavior in authenticated MAIN with the market explicitly selected. No orders, payments, Quote submissions, workflow runs, theme writes, catalog writes or inventory changes are needed to reproduce this baseline.

See [launch blockers](RELEASE-RISKS-AND-BLOCKERS.md) for the decisions that remain open.
