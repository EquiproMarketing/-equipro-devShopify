> Actualización del 23/11/2026: el estado vigente, las excepciones de pruebas y el paquete final de 18 rutas están en [qa-ready-2026-11-23.md](qa-ready-2026-11-23.md). El contenido siguiente conserva la evidencia histórica del 20/11.

# Consolidación selectiva R1.1V → MAIN — 20 noviembre 2026

Destino único: MAIN 157851386029, equipro-dev.myshopify.com. Fuente de componentes: EQR-R1.1V 189456777389. Preparación local; ninguna escritura remota.

## Lectura verificada

Admin GraphQL devuelve cuerpos completos y checksumMd5 para 22 rutas MAIN existentes y 25 R1.1V. main/ y r11v/ conservan cuerpos exactos e inventory.json con SHA256 del contenido, separado del checksum Shopify. La consulta final confirma los 47 checksums sin cambios. Un readback adicional de los cuerpos críticos MAIN también coincide.

Con los mismos IDs, theme_bash omite nueve rutas de MAIN, cinco de las cuales existen en Admin API (find-your-setup CSS/sección, catálogo, cart-drawer sección y fr; detalle en read-methods.json). Se confirma discrepancia del filesystem expuesto por ese método; no puede atribuirse su causa interna ni interpretarse como ausencia remota. Se utiliza exclusivamente el cuerpo Admin API verificable para construir candidatos. theme_bash muestra pending=[] en ambas lecturas. La comparación anterior basada en sus omisiones queda corregida.

## Resultado local

| Función | Resultado |
|---|---|
| Compra | ADD product-form.js, wrapper y feedback accesible añadidos mediante hunks en main-product. Mantiene control compartido CartDrawer; bloquea cantidades inválidas, variantes no comprables y reintento de resultados ambiguos. No se copió main-product completo. |
| Guardas | MAIN ya protegía precio cero, quote/RFQ, portable y selling plans del producto. Se añade comprobación de selling plan por variante. variant.available sigue serializado literalmente; no se fuerza disponibilidad ni se toca 21200, inventario o precios. |
| Quote | Se conserva JS MAIN R1.10-V, singleton, foco y handoff móvil. Solo se añaden aria-modal y tabindex al snippet correctivo; campos y formulario nativo idénticos. No se incorpora el flujo de envío distinto de R1.1V. |
| Find Your Setup | YA INTEGRADO en MAIN: sección con filtros nativos, catálogo y template de colección idéntico en ambos temas. Se conserva su mapeo localizado de categorías. find-your-setup.js de R1.1V no está referenciado por esta implementación y no se incluye. |
| Perfiles | Se integra el resolvedor de metaobjects con fallback a bloques existentes, snippet y CSS acotado. Index cambia solo professional_profiles de la sección existente sobre el lote correctivo; orden y bloques comerciales preservados. Los tres handles seleccionados existen en Admin. |
| Complete Your Setup | ADD de sección; cada piloto 51101/EI-501 recibe solo complete_setup y su posición tras main. Comparación semántica confirma que todos los demás settings, bloques, contenidos y orden relativo permanecen idénticos a MAIN. |
| EN/FR | 25 claves nuevas de interfaz (9 de formulario, 16 de consolidación), 310 hojas equivalentes. Interpolaciones y plurales comprobados. Se conserva contenido comercial y overrides personalizados; defaults de interfaz ahora se resuelven por locale. |

## Pruebas y limitaciones

- 60/60 focalizadas PASS, más una prueba adicional de envío simulado: **61 pruebas únicas PASS, 0 FAIL**. new-function-tests.tap contiene 7 casos, seis ya incluidos en focused-tests.tap; no sumar 60+7.
- Cobertura: complementos, perfiles, filtros, carrito B1.3, campos Quote R1.10, EN/FR, estados restringidos, cantidades inválidas, 422, respuesta ambigua y fallo de readback del carrito. Solo mocks locales; ningún POST real ni envío.
- Theme Check: 49 diagnósticos heredados, mismos mensajes y severidades que docs/post-qa-corrections/theme-check.json. Cero nuevos. theme-check-clean.json y theme-check-comparison.json son los resultados válidos. Config de evidencia excluye docs/release/tests para evitar que las copias históricas sean tratadas como temas y mezclen locales; no deshabilita checks. El primer barrido sin exclusiones no es comparable.
- Fixtures de render actualizados para resolver las nuevas claves de traducción; expectativas funcionales conservadas. Conteo locale actualizado de 285 a 310 por las 25 claves nuevas.
- El lote correctivo de nueve UPDATE, sus candidatos y sus hashes siguen intactos. No se repitió su suite 115/115.
- El checkout conserva cambios anteriores: index y template 51101 no son equivalentes byte a byte al paquete; complete-your-setup difiere solo en salto final. Las pruebas semánticas nuevas verifican directamente las plantillas candidatas. Nunca desplegar todo el checkout.

## Dependencias que quedan abiertas

Admin confirma templateSuffix de 51101, pero custom.complete_your_setup=null: sección preparada, no mostrará complementos sin contenido aprobado. EI-501 usa su template y tiene dos referencias list.product_reference; su render real y las traducciones de productos/metaobjects requieren QA Shopify. No se modificaron esos datos.

La causa de disponibilidad contextual de 21200 continúa abierta y no se intervino. Esta integración no declara resuelto ese bloqueo de QA transaccional.

## Paquete y decisión

manifest.json: **13 rutas, 3 ADD + 10 UPDATE**, con hash remoto, hash predecesor y hash candidato. integration.diff compara contra MAIN más el lote correctivo. Es un paquete de revisión, no otro entorno. Los cinco archivos que se superponen con el lote correctivo (producto, Quote, dos locales e index) declaran dependencia explícita. Unión de ambos alcances: 17 rutas; no ejecutar dos cargas ciegas ni sumar manifests sin revalidación.

GO para revisión de la integración local y su manifest. NO desplegar todavía. Antes de solicitar escritura, revisar diff, completar/aceptar la dependencia de contenido 51101 y revalidar hashes contra MAIN. QA visual y comercial sigue pendiente; no se publicó francés ni se ejecutaron cotizaciones o Power Automate.
