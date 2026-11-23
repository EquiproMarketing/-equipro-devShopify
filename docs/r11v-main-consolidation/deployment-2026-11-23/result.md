# Despliegue autorizado — STOP, 23/11/2026

**MAIN 157851386029 sin cambios. 0/18 archivos desplegados.**

El único intento ejecutó exactamente `executed-command.txt`, con `--nodelete` y los dieciocho `--only`. El sandbox permitió iniciar el CLI; no ocurrió el EPERM anterior. Shopify CLI abortó con exit 1 en su validación local: `This command must run from a theme directory when user input is unavailable.` El paquete parcial, aun con layout de soporte, no satisfizo su reconocimiento de directorio. El preflight anterior comprobaba cuerpos y dependencias, pero no cubría esta validación específica de CLI.

No se usó `--force`, otro método de despliegue, reintento ni rollback. No se modificó el paquete autorizado tras el intento.

Antes del comando: identidad MAIN y tienda confirmadas; 18 hashes candidatos válidos, 15 hashes remotos coincidentes, tres ADD ausentes. Quince copias frescas exactas recuperables en remote-before/. Excepciones verificadas en exception-verification.json: diez referencias de producto de tarjetas ya ausentes en MAIN, preservadas por el paquete; cambios de perfiles y orden del bloque Complete Your Setup explícitamente aprobados. No constituyen excepciones de seguridad de compra, precios, SKU, inventario, carrito o Quote. Contratos verificados en contracts-preflight.json.

Después del aborto:

- Readback de las 18 rutas: los quince archivos existentes conservan sus SHA256 previos y los tres nuevos continúan ausentes. No equivale a readback exitoso de candidatos desplegados.
- Inventario completo: **222/222 rutas y checksums idénticos**; ninguna adición, modificación o eliminación, dentro o fuera del manifest.
- MAIN conserva nombre, rol MAIN y updatedAt 2026-11-20T20:37:47Z.
- GitHub main sigue idéntico a 58a5445f3bec2756347d0dccacd60b64c019b5d7; cero commits, cero sincronización nueva observada.
- Francés `fr` permanece published=false.
- QA post-deploy en navegador no ejecutado: el código nuevo no llegó a MAIN. No se ejecutaron operaciones comerciales, formularios, Quote o Power Automate.

El siguiente intento requiere resolver el reconocimiento del paquete por CLI y autorización separada para reintentarlo. No se agregó automáticamente `--force` ni se construyó otro entorno.
