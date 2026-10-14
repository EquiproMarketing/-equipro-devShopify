# Catalog filtering — separate delivery

The Royal pilot must be reviewed before catalog-wide rollout. Filtering is a separate implementation and is not deployed with this pilot.

## Data observed

Live product types:
- /produits/mag-lamps: 3 products.
- /produits/skincare-equipment/columns: 1 products.
- /produits/skincare-equipment/facial-units: 6 products.
- /produits/skincare-equipment/skin-analyzers: 2 products.
- /produits/skincare-equipment/steamers: 2 products.
- /produits/skincare-equipment/towel-warmer: 2 products.
- /produits/skincare-equipment/wax-heaters: 4 products.
- /produits/stools: 5 products.
- /produits/treatment-tables/electrics: 10 products.
- /produits/treatment-tables/hydraulic-mechanical: 3 products.
- /produits/treatment-tables/portables: 2 products.
- /produits/trolleys: 11 products.
- /produits/wellness-therapy: 3 products.
- Unspecified: 11 products.

Live option names:
- Color: 1 products.
- Couleur: 19 products.
- Led: 3 products.
- Taille: 6 products.
- Title: 41 products.

## Proposed filters

- Product type: supported by live data, but normalize display labels and review path-like values first. Do not treat tags such as Hydraulic Chairs on Royal as reliable category data.
- Price: supported by Shopify prices; store currency is USD. Resolve Canada pricing discrepancies before presenting Canadian price expectations.
- Availability: use native storefront filter values; Admin and storefront availability differ for Royal and need investigation.
- Color: configure only after intended colors are represented by real variants. Royal currently has only White; Black and Navy are confirmed product colors but not configured variants.
- Standard product category: inspect and complete taxonomy assignments before enabling. Not audited by this read scope.
- Other options: expose only meaningful, populated options. Do not invent dimensions, motor counts, voltage or weight capacity from description text.

## Required admin checks

Search & Discovery configuration has not been inspected: Shopify Admin browser access stops at sign-in. Confirm the app is installed and the intended filter definitions are enabled. Connector product reads work, but they do not establish filter configuration. Shopify CLI Admin authentication also requires interactive sign-in.

## Implementation acceptance criteria

Use Shopify collection.filters and server-rendered collection.products pagination so filtering covers the entire collection, not just loaded cards. Desktop sidebar; mobile drawer with labelled controls, Escape, focus containment/restore, and background interaction blocked. Use existing Poppins font, burgundy colors, spacing and card system.

Include sorting, filtered result count, active chips, individual removal, clear all and distinct empty-filter results. Preserve active parameters when sorting and paginating; reset page when filter selection changes. Use Shopify-provided filter removal URLs and server-side filter forms. Test mixed filters, zero results, multiple pages, browser history, keyboard use and mobile interaction before deployment.

Admin API confirms Canada and United States markets are active; filter definitions and taxonomy assignments still require the admin configuration check.
