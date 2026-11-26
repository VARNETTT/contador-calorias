# CalorieTrack · Corrección de reintentos y conflictos
Estado: candidato para prueba aislada. La página principal conserva el arranque local.

## Qué cambió

El cliente anterior asignaba un identificador a la entrada de la cola, pero solo enviaba el contenido de la fila. Las funciones nuevas envían ID de operación, cuenta, entidad, clave de fila, cambio y revisión de partida. La escritura local guarda en un único valor la cola, los datos y las revisiones. Una cuota agotada hace fallar el guardado sin aceptar una operación parcial. Una pestaña por cuenta adquiere un bloqueo mientras usa la copia sincronizada.

La base guarda un recibo por cuenta y operación junto con el cambio en la misma transacción. Un reintento devuelve el resultado anterior. El servidor conserva la última revisión aun después de un borrado. Para pasos y objetivos, una edición desde una revisión antigua produce un conflicto. El valor del otro dispositivo permanece en el servidor y el intento queda en el historial local de conflictos. Recargá, compará y volvé a ingresar el valor elegido si corresponde. Una nueva edición deliberada de pasos después de leer el borrado puede crear otra vez el registro del día.

La migración crea un esquema privado, dos tablas, dos funciones y un rol sin inicio de sesión ni capacidad de saltar RLS. Las políticas por propietario continúan aplicándose. Agrega políticas restrictivas de escritura para que el rol autenticado normal use el protocolo al modificar las cuatro tablas. **Esto bloquea escrituras directas de clientes antiguos desde que se aplica la migración.** El servidor serializa las operaciones de una misma cuenta y comprueba la identidad obtenida de la sesión.

## Preparar la copia

1. Usá una copia o rama de Supabase con el esquema y políticas del CSV. Usá datos ficticios y dos cuentas confirmadas con correo y contraseña. Conservá una copia verificable del esquema y datos antes de una migración. No uses el proyecto productivo en este piloto.
2. Abrí SQL Editor en la copia, pegá **sql/01_protocolo.sql** completo y ejecutalo una vez. La transacción instala el protocolo sin eliminar ni reescribir registros existentes. Si falla por permisos de roles, políticas o nombres existentes, conservá el mensaje y revisalo antes de reintentar. No ejecutes las sentencias por separado. Los dos tipos de UUID tienen funciones diferentes: el del registro identifica el alimento; el de la operación identifica un intento lógico y todos sus reenvíos.
3. En Authentication → Users, copiá los UUID de las cuentas ficticias A y B. En **sql/02_prueba_transaccional.sql**, reemplazá los dos marcadores. Ejecutá la consulta completa en el mismo proyecto. Requiere permisos administrativos para simular ambos roles de usuario. Termina con ROLLBACK después de probar un alta, la lectura con ambas identidades, borrado y reintento, y un conflicto de objetivo. Cualquier excepción indica prueba fallida. El ensayo del SQL Editor complementa el de sesiones reales.
4. En VS Code abrí una **copia** de la app que contenga index.html y nutrition_ar.json. Descomprimí encima este ZIP conservando las carpetas. Se reemplazan script.js, sync.js y las pruebas de sync. El HTML principal no carga ni inicia el módulo. Ejecutá desde la terminal: `node --test tests/nutrition.test.cjs tests/sync.test.cjs`. El resultado local se encuentra en RESULTADOS.txt.
5. Serví la copia en un origen HTTPS de pruebas accesible desde la PC y el celular. En la PC también sirve localhost. En ambos abrí **/piloto/index.html** bajo la ruta de esa copia. El piloto usa Web Locks y crypto.randomUUID. Cargá la URL y la publishable key de la copia. Usá exclusivamente cuentas ficticias. La clave secreta y service_role no se usan. La pantalla habla directamente con Auth y las funciones SQL de la copia; el token queda en memoria y al recargar hay que volver a iniciar sesión. Si expira, recargá e ingresá otra vez.

## Validación real

| Caso | Acciones | Resultado esperado |
|---|---|---|
| Aislamiento | Entrá como A en la PC y B en el celular. En A creá comida, agua, pasos y un objetivo ficticios. Recargá ambos e iniciá sesión. Repetí invirtiendo las cuentas. | Cada cuenta ve sus propios datos. La consulta de prueba verifica además una lectura directa de comidas bajo RLS. Para el cierre de seguridad revisá también permisos de escritura y lectura en las cuatro tablas con sesiones reales. |
| Respuesta perdida + borrado | Entrá como A en ambos equipos. En la PC marcá «Perder la próxima respuesta» y agregá una comida. En el celular recargá, seleccioná la comida por su UUID y eliminala. En la PC desmarcá la pausa, tocá «Reintentar pendientes», recargá e ingresá otra vez. Repetí con agua y con pasos del mismo día. | La cola termina vacía. Tras actualizar ambos equipos el registro continúa ausente. En SQL Editor podés contar los recibos por usuario y ver la revisión de borrado en las consultas de abajo. |
| Conflicto de pasos u objetivo | Cargá la misma cuenta y la misma versión en ambos equipos. Pausá los envíos en la PC y guardá 300 pasos. En el celular guardá 700 para la misma fecha. Reanudá y reintentá en la PC. Repetí con dos objetivos diferentes. | La PC conserva el intento en conflictos. Al recargar aparece el valor del celular. Una decisión posterior parte de la revisión nueva. |
| Desconexión real | Con la sesión ya abierta, cortá la red de un equipo. Guardá dos cambios consecutivos de pasos para el mismo día. Restaurá la red, reintentá y consultá desde el segundo equipo. | Las dos operaciones guardan su orden. La última cantidad aparece una vez. La página del piloto necesita red para iniciar sesión de nuevo. |
| Cuenta y registros locales | Abrí index.html en la copia habitual y probá el desayuno de tres ingredientes, guardado y recarga. | El flujo local sigue disponible. La activación de cuentas en la página principal es una etapa posterior. |

Consultas de observación en la copia: `select owner_id, count(*) from ct_sync_private.receipts group by owner_id;` y `select entity,item,version,removed from ct_sync_private.heads order by entity,item;`.

## Conservación de datos y límites de la entrega

Las colas v2 carecen de confirmación verificable del servidor. Si el piloto encuentra una, bloquea el inicio y conserva su contenido para conciliación. Hacé copia del almacenamiento de ese navegador antes de revisarla. Compará cada operación con el estado real y resolvé los casos ambiguos con la persona propietaria antes de habilitar el nuevo flujo. El historial local de invitado conserva sus claves anteriores. No purgues recibos ni revisiones de borrado mientras pueda volver un dispositivo antiguo. Las escrituras administrativas o con service_role pueden eludir este protocolo y requieren un flujo coordinado.

Para detener el ensayo cerrá el piloto. Si la migración ya se confirmó y necesitás volver a la configuración inicial, usá la copia de seguridad en otra rama y compará los cambios hechos después. No borres tablas de recibos ni retires las restricciones para arreglar un error de instalación. La app pública debe seguir con la sincronización desactivada hasta aprobar SQL, aislamiento real, reintentos y conflictos en los dos equipos.
