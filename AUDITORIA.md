# CalorieTrack — primera corrección de auditoría
Base: proyecto mealrows reconstruido con los tres archivos de Diario_Comidas. No se recibió un ZIP nuevo del estado instalado.

## Aplicación
Respaldar el proyecto. Reemplazar index.html, script.js, calm-fitness.css y tests/nutrition.test.cjs. No ejecutar SQL. Ctrl+F5.

## Cambios
- El registro individual tiene dos hijos reales: contenido y acción. Se retiran las reglas de grupos anteriores y se fija una columna de acción de 44 px; se conserva la etiqueta accesible Eliminar. No se cambia la lógica de borrado.
- Se sustituye margen lateral por padding dentro del ancho de la tarjeta; nombres largos pueden envolver.
- Totales de calorías y proteínas y subtotal por comida ignoran valores negativos/no finitos; no se modifican los registros originales.
- Nueva prueba de totales inválidos y estructura de acciones. 26/26 pruebas Node aprobadas. Prueba API bloqueada por ausencia de Flask. Chromium bloqueó navegación local (ERR_BLOCKED_BY_ADMINISTRATOR); no hay validación visual.

## Pendientes por prioridad
1. Probar 320/390/768/1440 px, nombres largos, borrado y burbujas; revisar foco y scroll. CSS activo: style, coach-chat-fix, calm-fitness, auth, floating-panels. mobile-layout-fix y coach-floating no están enlazados directamente. No borrarlos sin verificar dependencias.
2. Medir latencia local, OFF y Gemini por separado, incluyendo servidor frío; timeouts de 35 s Gemini, 10 s OFF búsqueda, 7 s código, con posibles reintentos. No cambiar límites sin medir.
3. Validar cambio de día y múltiples pestañas; lectura local oculta errores de JSON. Diseñar recuperación sin sobreescribir datos dañados.
4. Separar registros por cuenta con migración explícita de datos locales; probar RLS, conflictos, reintentos, eliminación y sesiones reales en proyecto de prueba. sync.js no se carga en index. No activar en producción.
5. Consolidar catálogo JSON (132 entradas, valores orientativos, sin negativos detectados); foods-ar.js usa otro esquema y no se carga directamente. Validar unidades, alias y etiquetas antes de retirar archivos.

## Pruebas
node --test tests/*.cjs
python -m pip install -r requirements.txt
python -m unittest discover -s tests -p test_api.py
