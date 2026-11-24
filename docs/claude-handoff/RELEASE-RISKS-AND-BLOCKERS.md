# Release risks and blockers

| Priority | Risk and exit criterion |
|---|---|
| P0 | CA has no market shipping option and no Montréal inventory levels. Approve one fabricable SKU, verified pickup address, operating capacity and a tariff, then prove CA product/cart eligibility and US isolation. |
| P0 | Admin returns `partnerDevelopment=true`. Confirm store subtype and eligibility for real transactions with Shopify before a commercial launch. Grow is the reported plan label. A cart test alone does not certify checkout. |
| P0 | Infinity identity conflict. Decide the canonical product/variant and reconcile price/template/specs before making a sale decision. |
| P1 | 53 blank SKUs. Two confirmed proposals need Dynacom/export/order-consumer validation and a separate approved edit. The other 51 stay excluded. |
| P1 | FR unpublished. Review remaining editorial product and SEO copy, market/locale behavior, and public language selector before publication. Profile translations and key parity are already documented. |
| P1 | Inherited missing `snippets/product-card-item.liquid` and `assets/product-reference-layout.css`: fresh file lookup still did not find them. Establish reachability in the release before fixing separately. |
| P1 | 51101 is assigned to its template but `custom.complete_your_setup` is unset. Keep no empty block and await product references. EI-501 currently references EI-312 and 31301 in Admin. |
| P2 | `templates/collection.electric.json` is an accepted technical baseline with editorial anomaly. Do not treat it as approved content. |
| P2 | Freightcom/ClickShip deferred. Carrier-calculated rates, Markets compatibility and the existing account were not approved or configured. |

Release is not cleared for public CA transactions or FR publication. Price lot closeout covers pricing only. Preserve independent evidence for Quote R1.10, checkout, taxes, legal policy, order processing, notifications and Dynacom. Do not exercise external systems from this public handoff.
