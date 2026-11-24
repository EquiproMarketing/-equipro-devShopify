# Evidence index

## Priority of facts

1. Current read-only Shopify Admin snapshot for catalog, prices, Markets, inventory, publication and translation status; repeat it when auditing. GitHub main was independently verified through its connector and a clean clone.
2. Historical deployment and readback artifacts for actions completed on Nov 23–24. They establish what was observed then, including the USD staging-to-assignment transition. They do not override later Admin facts.
3. User commercial decisions (single product, CA Montréal, US Vermont, made-to-order model), pending SKU-level approvals and proposals. These are not Shopify settings.
4. Older local release docs, baselines and candidate reports. “Candidate not deployed” or “USD draft unassigned” describes its original point in time. Never read it as current state without checking.

| Artifact | Origin and scope |
|---|---|
| [Admin summary](evidence/admin-summary.json) | Fresh Shopify Admin metadata and aggregate checks; selected theme SHA-256 comparison against a fresh GitHub clone. Shopify/Git checks are sampled for theme files. |
| [Variant audit](evidence/variant-controls-redacted.csv) | 123 active variants from the same Admin snapshot. Variant ID, handle, label, SKU, price origins, inventory policy and publication. No unit quantities, private order data or pricing amounts. |
| [Redacted manifests](evidence/pricing-manifests-redacted.json) | Local CAD and USD manifests, both price-lot readbacks and SKU proposal: minimal IDs, decisions, official tariff pages and SHA-256 of originals. |
| [Release readbacks](evidence/release-readbacks.json) | Historical release Git paths and summaries extracted from local QA and temporary deployment receipts. Original artifact hashes permit local verification. |
| [Evidence hashes](evidence/CHECKSUMS.sha256) | SHA-256 for the four public evidence copies; generated from their exact staged bytes. |

Original release QA, official tariff PDFs, matrices with amounts, migration/rollback bodies, old backup archives and full API receipts stay in the private local evidence set. Use original file names and hashes to request narrowly scoped access from the owner when necessary. No credentials or customer/order data are included.

## Audit independently

Compare the repo main SHA against [GitHub](https://github.com/EquiproMarketing/-equipro-devShopify/tree/main) and theme ID/role in Admin. Page through Admin ProductVariant and market price lists; reproduce SKU, price origin, inventory and publication aggregates for active records. Read both locale files and the five translated profile records. Check file hashes using `shasum -a 256 -c CHECKSUMS.sha256` from the evidence folder. Treat authenticated storefront observations and Admin facts as separate evidence. Read-only commands and immutable Git history are sufficient for most checks.
