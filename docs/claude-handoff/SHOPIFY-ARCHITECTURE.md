# Shopify architecture

- Store `equipro-dev.myshopify.com`; approved theme MAIN `157851386029`, role MAIN. GitHub `EquiproMarketing/-equipro-devShopify` is public. Shopify's GitHub integration follows `main` for this theme; the latest verified sync was a Shopify-authored runtime change.
- Product and variant IDs are shared across CA/US. Markets apply pricing, currency, channel visibility and shipping separately. Theme code renders product availability and purchase restrictions; locale publication and profile translations are Admin data.
- CA market `47383347373`: CAD catalog `129084620973`, list `30905598125`. US market `47186968749`: USD catalog `136173617325`, list `30949703853`. Each is scoped to its own market. They use existing sales-channel publication rather than a catalog publication.
- Fulfillment policy is CA from Equipro Montréal `96252035245` and US from Shop location Vermont `88085201069`. Market-driven shipping is enabled. Canada has no configured shipping option; US Standard and Express have Vermont as sole origin. Freightcom/ClickShip integration is deferred.
- R1.1V includes AJAX product form, variant guards, quote accessibility, professional profiles, category navigation and Complete Your Setup. B1.3 reconciles the cart and opens its drawer only after add and reconciliation succeed. See the version-specific evidence before drawing runtime conclusions.
- FR interface JSON and global profile translations are separate layers. FR is unpublished; translated editor previews are not evidence of a publicly selectable locale.

## What does not travel in theme Git

Market and catalog assignments, fixed prices, inventory/location, product publication, metafields, menus, app connections and translation records need Admin verification. Shopify editor saves may sync to Git; verify the exact sync commit and changed paths. Matching sampled runtime hashes do not prove that every file or Admin setting is identical.

## Git protection

Use a documentation branch off the verified main checkout. Do not push, merge or open an automatic deployment path to main without separate approval. Shopify theme pushes or publishes are outside this handoff. A docs branch still lives in a public repository, so limit its content to the redacted evidence.
