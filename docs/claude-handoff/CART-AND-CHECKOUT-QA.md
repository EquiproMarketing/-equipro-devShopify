# Cart, storefront and checkout QA

## Verified executions, scoped to the tested version

- R1.1V local release suite recorded 74 PASS; general suite recorded 113 PASS and 10 inherited/out-of-scope failures. Theme Check recorded 50 baseline and 50 release diagnostics, with no unexcepted new issue. The named render-backed exception was OrphanedSnippet for the professional profile panel. MAIN's Git branch does not carry the local QA fixture checkout.
- Four-path follow-up QA on MAIN: comparator keyboard/focus loop and Escape, Find Your Setup in EN/FR, Quote opening, cart drawer opening/closing and navigation on desktop 1188 and mobile 375. This was nontransactional. No cart additions or Quote submissions were part of that check.
- The drawer change was staged and read back on MAIN at the Shopify sync `707039b`. The recorded candidate checks were 18 focused PASS, 75 release PASS, 119 general PASS and 10 inherited FAIL, and 50/50 Theme Check. The user later reported B1.3 manually tested. Treat the user report separately from the automated run and from this handoff's Admin-only reconciliation.
- Historic B1.3 visual smoke showed focus return on close, variant price update and filters. For the subsequent USD assignment, authenticated US MAIN showed 41200 at its new fixed price and 41100 at its retained base price, both visible, available and with Add to cart enabled. No orders or checkout were performed.
- French global profile fields were reread in Admin. Public FR navigation and availability remain untested because FR is unpublished. Do not count a translated preview as public bilingual QA.

## Independent reproduction

Read the fresh catalog and MAIN version first. Smoke SKU, chosen variant, currency, purchase eligibility, Quote Escape and comparator focus without submitting. Review the Ajax controller `assets/product-form.js`, drawer and cart endpoints against the commit history. Check 422, repeated click and offline Retry locally; do not replay a real POST automatically on an ambiguous response.

Real CA cart QA is pending the approved Montréal pilot. Require separate authorization, authenticated private session and empty cart. Check one add, drawer, quantity update, subtotal, count, removal and empty end state. Stop at cart. Checkout, payment, actual fulfillment routing, notifications, emails and automation remain outside this audit.
