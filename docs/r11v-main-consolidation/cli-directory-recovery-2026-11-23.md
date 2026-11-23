# Recuperación del reconocimiento local por Shopify CLI

Fecha: 23 de noviembre de 2026. Solo lectura remota; no se ejecutó `theme push`.

## Causa y arreglo

El paquete `candidate/` ya incluía `layout/theme.liquid`, idéntico al snapshot TR-02A.2. Le faltaba `config/settings_schema.json`, parte de la estructura estándar de tema Shopify que requiere Shopify CLI 4.9.4. El preflight previo validaba las rutas y sus contenidos, pero no ejecutaba una verificación CLI de reconocimiento del directorio.

Se copió únicamente `docs/tr02a2-main-snapshot/config/settings_schema.json` a `candidate/config/settings_schema.json`. Su SHA-256 coincide con el snapshot y su MD5 `c1b7c56210d3e8ef72e3885872450054` coincide con el checksum registrado para el archivo de MAIN. El support file no está en el manifest ni entre los 18 argumentos `--only`. `layout/theme.liquid` sigue siendo el soporte existente y tampoco se transmite.

No cambió ningún candidato. `verify-final-package.py` pasa: 18/18 hashes exactos, 3 ADD, 15 UPDATE, dependencias, 311 claves EN/FR y hashes de las 9 correcciones originales preservados.

## Validación CLI local

`shopify theme check --path docs/r11v-main-consolidation/candidate --config docs/r11v-main-consolidation/theme-check.yml --output json`

Resultado: exit 0, salida JSON `[]`. El CLI reconoce el paquete como tema y no produjo diagnósticos en esta validación de estructura. No se invocó `theme push`.

Sintaxis de Shopify CLI 4.9.4 confirmada por `shopify theme push --help`: `--path=<value>`, `--only=<value>...` (repetible) y `--nodelete` (`-n`). El comando propuesto contiene un `--path`, 18 `--only` distintos y `--nodelete`; no contiene `--force` ni `--publish`.

## Preflight remoto fresco

- Tienda `equipro-dev.myshopify.com`; MAIN gid `gid://shopify/OnlineStoreTheme/157851386029`, nombre `-equipro-devShopify/main`, rol MAIN, `updatedAt` `2026-11-20T20:37:47Z`.
- Los 15 checksums Shopify MD5 actuales coinciden con el manifest aprobado.
- Los 3 ADD (`assets/product-form.js`, `sections/complete-your-setup.liquid`, `snippets/professional-profile-panel.liquid`) están ausentes en MAIN.
- GitHub `EquiproMarketing/-equipro-devShopify`: `main` idéntico al commit `58a5445f3bec2756347d0dccacd60b64c019b5d7`, sin commits divergentes observados.
- Shopify `shopLocales`: `en` primario/publicado; `fr` no primario y sin publicar.
- La copia recuperable de los 15 UPDATE permanece en `deployment-2026-11-23/remote-before/`.

## Comando para revisión de un único reintento

No ejecutado. Requiere autorización nueva y específica después de este preflight. Las 18 rutas y el orden son los del manifest:

```sh
shopify theme push --store equipro-dev.myshopify.com --theme 157851386029 --path docs/r11v-main-consolidation/candidate --allow-live --nodelete --no-input --json \
  --only assets/custom-spa-pack-builder.css \
  --only assets/product-form.js \
  --only assets/section-category-subnav.css \
  --only assets/section-main-product.css \
  --only locales/en.default.json \
  --only locales/fr.json \
  --only sections/category-subnav.liquid \
  --only sections/complete-your-setup.liquid \
  --only sections/custom-spa-pack-builder.liquid \
  --only sections/custom-subcategory-slider.liquid \
  --only sections/main-cart-items.liquid \
  --only sections/main-product.liquid \
  --only sections/product-compare-modal.liquid \
  --only snippets/professional-profile-panel.liquid \
  --only snippets/quote-modal.liquid \
  --only templates/index.json \
  --only templates/product.51101-tm-3-standard.json \
  --only templates/product.ei-501-royal.json
```

## Decisión

**GO técnico para solicitar autorización de un único reintento**, limitado al comando anterior y sujeto al preflight inmediatamente previo. **No es autorización para desplegar**. No se realizó escritura remota, no hubo cambio en GitHub, y no se inició QA de navegador.
