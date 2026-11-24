# Inventory and availability

Fresh Admin sample covers all 123 active-product variants. All have `DENY`. There are 24 tracked variants (22 with positive registered availability in Vermont, 2 without positive balance) and 99 untracked. Montréal has no inventory levels for these variants. Registered inventory is not a signed physical count; no per-variant quantity or valuation is published here. Montréal is active for online fulfillment but its address is not marked verified.

**Approved architecture.** Canada ships solely from Equipro Montréal; US ships solely from Vermont. Inventory stays independent. Operations confirmed made-to-order as a commercial model; capacity, lead time and sellable identity still require SKU-level approval. Tracking and Continue selling are variant settings with cross-market consequences.

**CA observed blocker.** Canada has no shipping option and the 41200 variant has no Montréal level. The previous authenticated MAIN comparison showed `available=false`, `purchasable=true`, and a disabled Add to cart in CA while the same variant was available in US. That browser observation is historical; fresh Admin confirms the configuration but is not a new storefront run.

**Proposed CA pilot.** Duo-Pil Maxi `41200` / variant `47394185740461` already has tracking off. Consider a one-product manual collection and a Canada Standard option from Montréal only, after Operations approves capacity, manufacturing and transit ranges, packaging, currency, rate and geographic coverage. Determine whether a Montréal product-location assignment is required while preserving quantities and tracking. Stop if the only apparent workaround would invent stock or change US eligibility. Leave freight/ClickShip out of this pilot.

**Other purchase blockers.** MAIN gates on contextual variant availability, positive price, purchase restrictions and mandatory selling plans. Online Store publication is not equivalent to an enabled purchase button. Respect Quote-only products and review zero-price, untracked, or unidentified variants with Operations.
