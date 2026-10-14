# Entrega: identidad de productos y colecciones

Fecha: 14 de octubre de 2026. Rama: codex/fix-catalog-identity.

## Decisiones y alcance

- El producto de la URL tiene prioridad sobre featured_product. Fuera de una ficha, featured_product sigue siendo el respaldo.
- Si el producto visitado y featured_product son distintos, no se usan los títulos, descripciones o imágenes editoriales del otro producto en main-product. Se conservan cuando coinciden.
- product.json contiene únicamente la sección principal dinámica, sin textos, tablas, instrucciones ni producto fijo de Ioniderm. Las plantillas específicas permanecen byte por byte intactas.
- collection.json muestra la colección visitada con su cabecera y una cuadrícula paginada de 24 productos. Sin colección forzada, tarjetas inventadas ni secciones editoriales de otra categoría.
- El catálogo genérico utiliza «Ver producto». No habilita compra directa por precio, stock o disponibilidad.
- El usuario confirmó que no existe todavía un campo único de modalidad comercial. Se conservan los controles de las fichas salvo la restricción expresa de Portables.
- Restricción provisional de Portables en main-product: sin formulario de compra si el producto pertenece a las colecciones publicadas con handle portable o portable-tables. No es una regla general de compra/cotización ni una autorización para el resto del catálogo. Debe migrarse al metacampo después de validar sus asignaciones.
- Los archivos del carrito de la entrega anterior siguen sin commit y no forman parte de este commit. Se verificaron sus hashes antes y después.

## Validación

- Ocho pruebas de identidad y variantes pasan. Renderizan Liquid con LiquidJS y adaptadores locales para form, paginate y filtros de Shopify. No sustituyen la validación en Shopify.
- Casos: otro featured_product y contenido extranjero; respaldo fuera de ficha; personalizaciones específicas; variante inicial agotada; selección disponible/agotada/inexistente; Portables; colección vacía; 49 productos en tres páginas.
- Las seis pruebas anteriores del carrito también pasan; se mantuvieron intactas.
- Theme Check antes/después: 22 errores y 33 advertencias, sin incidencias nuevas. Se compararon archivo, tipo y mensaje, ignorando desplazamientos de línea.
- El validador adicional del plugin no arrancó: falta @shopify/theme-check-common junto a validate.mjs. No se modificó el plugin. Se utilizó Shopify CLI Theme Check.
- Navegador, tema de desarrollo: /collections/all tiene 24/24/17 tarjetas en páginas 1/2/3; se navegan sus enlaces de paginación.
- Maxi-comfort: título e imagen propios, precio $2,200.00 y variante White agotada; botón deshabilitado. También se abrió con view=11300-infraderm para comprobar el producto visitado frente a una plantilla alternativa.
- Calypso: no hay botón AddToCartButton ni formulario /cart/add.
- Colección vacía y variantes alternativas disponibles: fixtures automáticos; no se creó colección ni se modificó inventario para las pruebas.
- No se ejecutó una compra ni se validó el ciclo completo de altas del carrito: sigue pendiente de la próxima entrega.
- Antes de subir, Shopify CLI confirmó equipro-dev.myshopify.com, tema 157680631981 con role development. El tema publicado es 157851386029.
- Se descargó una copia previa de los seis archivos remotos. Coincidían con la base; locales solo añadía una cabecera de comentario generada por Shopify, sin diferencias en sus traducciones.

## Repetir pruebas

El motor LiquidJS ya está instalado con Shopify Theme CLI en este Mac:

```sh
NODE_PATH=/usr/local/lib/node_modules/@shopify/theme/node_modules node --test tests/catalog-identity.test.cjs
node --test tests/cart-controller.test.cjs
shopify theme check
```

En otro entorno, instalar LiquidJS o añadir su ruta a NODE_PATH antes de ejecutar el primer comando.

## Modalidad comercial pendiente

No se encontró en las plantillas específicas un interruptor de compra/cotización. featured_product identifica un producto; btn_label cambia el texto, y show_compare_btn controla comparación. Ninguno define una modalidad comercial.

La lista siguiente identifica referencias de producto en las plantillas locales. No confirma qué plantilla tiene asignada cada producto en Shopify ni que esté autorizado para compra directa. Calypso y Bohemia ya tienen la restricción provisional de Portables; en el resto hay que confirmar compra directa, cotización o solo información antes de aplicar una regla centralizada.

- `digipro-steamer` — `product.11100-vapoderm-digipro.json`; botón configurado: ADD TO CART.
- `infraderm` — `product.11300-infraderm.json`; botón configurado: ADD TO CART.
- `ioniderm` — `product.11400-ioniderm-galvanic.json`; botón configurado: ADD TO CART.
- `rotoderm` — `product.11500-rotoderm.json`; botón configurado: ADD TO CART.
- `aeroderm` — `product.11600-aeroderm.json`; botón configurado: ADD TO CART.
- `diamonderm` — `product.11650-diamonderm.json`; botón configurado: ADD TO CART.
- `modular-column-11902` — `product.11902-modular-column.json`; botón configurado: ADD TO CART.
- `deluxe-column-11906` — `product.11906-deluxe-column.json`; botón configurado: ADD TO CART.
- `maxi-comfort-360` — `product.20100-maxi-comfort-360.json`; botón configurado: ADD TO CART.
- `maxi-comfort-360` — `product.20101-maxi-comfort-360.json`; botón configurado: ADD TO CART.
- `maxi-comfort-pedicure` — `product.20101-maxi-comfort-pedicure.json`; botón configurado: ADD TO CART.
- `maxi-comfort-pedicure` — `product.20102-maxi-comfort-pedicure.json`; botón configurado: ADD TO CART.
- `multi-comfort` — `product.20200-multi-comfort.json`; botón configurado: ADD TO CART.
- `multi-comfort` — `product.20201-multi-comfort.json`; botón configurado: ADD TO CART.
- `hydro-comfort` — `product.20301-hydro-comfort.json`; botón configurado: ADD TO CART.
- `aero-comfort` — `product.20401-aero-comfort.json`; botón configurado: ADD TO CART.
- `poly-comfort` — `product.20501-poly-comfort.json`; botón configurado: ADD TO CART.
- `aero-comfort` — `product.21200-aero-comfort.json`; botón configurado: ADD TO CART.
- `poly-comfort` — `product.22100-poly-comfort.json`; botón configurado: ADD TO CART.
- `calypso-ei-23402` — `product.23402-calypso.json`; botón configurado: ADD TO CART.
- `bohemia-ei-23403` — `product.23403-bohemia.json`; botón configurado: ADD TO CART.
- `air-lift-round-stool-31100` — `product.31100-air-lift-round-stool.json`; botón configurado: ADD TO CART.
- `ergonomic-air-lift-stool-31300` — `product.31300-ergonomic-air-lift-stool.json`; botón configurado: ADD TO CART.
- `ergonomic-stool-with-adjustable-backrest-31301` — `product.31301-ergonomic-stool-with-adjustable-backrest.json`; botón configurado: ADD TO CART.
- `solo-pil-standard` — `product.41100-solo-pil-standard.json`; botón configurado: ADD TO CART.
- `solo-pil-maxi` — `product.41101-solo-pil-maxi.json`; botón configurado: ADD TO CART.
- `duo-pil-maxi` — `product.41200-duo-pil-maxi.json`; botón configurado: ADD TO CART.
- `duo-pil-standard` — `product.41201-duo-pil-standard.json`; botón configurado: ADD TO CART.
- `duo-pil-precision` — `product.41202-duo-pil-precision.json`; botón configurado: ADD TO CART.
- `mini-cabi-ei-61100m` — `product.61100-mini-cabi.json`; botón configurado: ADD TO CART.
- `hot-cabi-61101` — `product.61101-hot-cabi.json`; botón configurado: ADD TO CART.
- `spa-cabi-towel-warmer-61102s` — `product.61102-spa-cabi.json`; botón configurado: ADD TO CART.
- `visiderm` — `product.61402-visiderm.json`; botón configurado: ADD TO CART.
- `kfm-led-magnifier-3d-or-5d` — `product.63104-kfm-magnifier-led.json`; botón configurado: ADD TO CART.
- `led-lfm-magnifier-3d-or-5d` — `product.63203-lfm-magnifier-led.json`; botón configurado: ADD TO CART.
- `dainolite-magnifier-led-3d-or-5d` — `product.63303-dainolite-magnifier-led.json`; botón configurado: ADD TO CART.
- `circus-magnifier-led-3d-or-5d` — `product.63603-circus-magnifier-led.json`; botón configurado: ADD TO CART.
- `wood-lamp` — `product.64401-wood-lamp.json`; botón configurado: ADD TO CART.
- `therabath-tub-ii` — `product.65100-therabath-tub-ii.json`; botón configurado: ADD TO CART.
- `heat-pad-66001` — `product.66001-heat-pad.json`; botón configurado: ADD TO CART.
- `spaslim-heating-blanket` — `product.66007-spaslim-heating-blanket.json`; botón configurado: ADD TO CART.
- `classic-steamer` — `product.ei-111-classic-steamer.json`; botón configurado: ADD TO CART.
- `ei-311-round-air-lift-stool` — `product.ei-311-round-air-lift-stool.json`; botón configurado: ADD TO CART.
- `ei-312-round-air-lift-stool` — `product.ei-312-round-air-lift-stool.json`; botón configurado: ADD TO CART.
- `multiderm-5-en-1` — `product.multiderm-5-in-1.json`; botón configurado: ADD TO CART.

- product.treatment-custom.json utiliza treatment-product-customizer: formulario de compra presente, configuración aún sin conexión real a variantes. Modalidad pendiente de confirmar.
- Cualquier producto que utilice la plantilla genérica también requiere clasificación; no se deduce de precio ni disponibilidad.

## Próxima entrega

1. Conectar configurador a variantes o propiedades válidas del pedido.
2. Eliminar cotización duplicada y corregir el contexto de producto, variante y SKU.
3. Completar el componente product-card-item faltante.
4. Corregir el desbloqueo del carrito que puede volver a habilitar una variante agotada tras cambiar opciones durante una solicitud. Los ocho tests de identidad no cubren esa carrera; se conserva como pendiente.
5. Definir un metacampo con compra directa, cotización y solo información; revisar y aprobar las asignaciones antes de activar la regla.

## Prueba manual

1. Abrir /collections/all?preview_theme_id=157680631981 y comprobar las tres páginas y sus enlaces «Ver producto».
2. Abrir Maxi-comfort; comprobar nombre, imagen y precio del producto real, sin Ioniderm ni especificaciones de mantas térmicas.
3. Abrir Calypso y Bohemia; comprobar ausencia de compra directa.
4. Revisar una plantilla específica como Infraderm o Duo-Pil: conserva sus contenidos editoriales.
5. En una ficha con variantes, seleccionar una agotada y comprobar botón deshabilitado; una combinación inexistente no debe conservar el ID anterior.

La integración a main y la publicación del tema siguen requiriendo autorización.
