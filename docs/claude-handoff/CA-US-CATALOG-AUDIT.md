# CA/US catalog audit

Fresh Admin inventory of the catalog returned 124 variants total. The scope here is 123 variants on 63 active products. All 63 were published in Online Store, Shop and POS. One draft product's variant is excluded. Publication, purchase eligibility and physical stock are independent.

| Area | Finding |
|---|---|
| Shared identifiers | No duplicate regional product tree. 53 active variants have no Shopify SKU. The remaining records are joined by Shopify variant ID rather than inferred color suffix. |
| Scoped identity proposals | KFM 5D `47611799568557` → `63105`; LFM 5D `47611751301293` → `63205`. Both codes are supported by the official source editions; the fresh Audit CSV still shows empty fields. Validate Dynacom and other SKU consumers before a separately authorized write. |
| Other SKU gaps | 51 stay outside that two-SKU proposal. Dainolite 5D code `63305` is evidenced but excluded. For missing color/width mappings, preserve the variant ID and leave exact SKU in REVIEW. A family or width reference does not establish a sellable SKU. |
| Infinity | REVIEW. Distinguish the draft `ei-502-infinity` record from the active `Ei-502W` record. Require canonical handle/model/configuration before publishing, repricing, merging or deleting a record. |
| Additional identity conflicts | Review TM-3 Mini `51103` vs `51103-M`, Visiderm `64102` vs `61402`, Duo-Pil Precision `4120` vs `41202`, and EI-311 vs 31100/internal SKU before treating any as the same priced item. |
| Commercial modality | CA working classifications for fabrication, limited stock, quote/freight, temporary hold and identity review are proposals. Confirm exact SKU, capacity and sales intent with Operations. Preserve Quote-only and portable restrictions. |

The [variant audit](evidence/variant-controls-redacted.csv) gives the current CA/US price origin and Online Store publication by variant; the [redacted manifest](evidence/pricing-manifests-redacted.json) preserves the proposed scopes and executed target IDs.
