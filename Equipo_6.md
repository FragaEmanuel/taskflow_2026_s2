# Equipo 6 — Calificaciones por equipo, Testing y Calidad de Software 2026

**Repo:** https://github.com/JavierM1203/taskflow_2026_s2

Este archivo tiene solo las tareas calificadas por equipo. Las notas individuales (cuestionario de la clase 1, cuestionarios de Moodle y participación) se llevan aparte.

_Escala de las notas: 0-100._

## Tareas por equipo

| Tarea | Clase | Peso | Puntos del curso (máx., de 100) | Nota | Aporta a la final (puntos) | Observaciones |
|---|---|---|---|---|---|---|
| Taller de refinamiento | 2 | 5,3 | 2,65 | pendiente |  | Pendiente de entrega: no figura en el repo (se buscó en `docs/`, el README y las 17 ramas). |
| Integration + cobertura + refactor (código pestilente + Ej. 1 de clase 7) | 3 y 7 | 10,6 | 5,30 | 90 | 4,77 | Cuatro refactores en PRs chicos que preservan el comportamiento (verificado con 12 casos de `updateTask` contra el commit base) y cobertura de ramas de 53,94 % (líneas 79,24 %) con umbral de 40 % en Jest. Faltan los tests de caracterización previos y el listado escrito de los smells. |
| Postman + Supertest, caza de bugs | 5 | 5,3 | 2,65 | 64 | 1,70 | Supertest con 25 tests nuevos (status, cuerpo y casos negativos; 34 de 36 pasan, los 2 rojos son bugs de la spec). Los 2 bugs de `clase5_errores.xlsx` no tienen criterio violado, entorno, reproducibilidad, evidencia ni severidad. Postman no se cuenta. |
| ADR | 6 | 5,3 | 2,65 | 50 | 1,32 | ADR con contexto, decisión y consecuencias, y framework con Page Objects, fixtures y base aislada. No implementaron Component Object (el ADR-003 lo rechaza) y el ADR no compara alternativas ni costos. |
| E2E + bugs | 7 y 8 | 10,6 | 5,30 | 47 | 2,49 | Corrí los 15 casos E2E con Chromium: 11 pasan y 4 fallan reproduciendo bugs reales de la spec (miembros que no se ven desde otro navegador, tareas que siguen asignadas al quitar un miembro, token inválido sin redirigir al login y TODO a DONE aceptado); los issues #9 y #10 se reproducen. Los 3 casos de zona horaria pasan con el servidor en UTC y fallan con `TZ=Pacific/Pago_Pago`. Cobertura de las historias pedidas: US-16 con 3 casos, US-14 con 1, US-15 y US-12 sin casos. Dos GitHub issues completos (#9 y #10); los #11 a #13 no se cuentan porque no los abrió un integrante del equipo. |
| Performance (k6: tabla seed chica vs grande + issue) | 9 | 5,3 | 2,65 | pendiente |  | Pendiente de entrega: solo está el script `api-load.k6.js` y `seed-large.ts` (rama `reporte_seguridad`); no hay tabla de resultados, hipótesis ni issue de performance. |
| Seguridad + accesibilidad (ZAP, axe-core, CVSS) | 11 | 5,3 | 2,65 | 38 | 1,01 | Reporte con headers, `npm audit` y 4 pruebas manuales, y una user story de remediación con 4 criterios de aceptación. No usaron OWASP ZAP, no hay axe-core ni puntaje CVSS. |
| Pipeline (`ci.yml` y job de E2E) | 12 | 10,6 | 5,30 | 91 | 4,82 | `ci.yml` con 5 jobs independientes y cache de npm en la rama `actions` (PR #14 sin mergear). Build de servidor y cliente verificados en local. El lint falla con 4 errores de código reales y tests y cobertura quedan rojos por los bugs de la spec (no se penalizan). Falta el job de E2E (opcional). |
| Presentación (por definir) | 16 | 15,9 | 7,95 | pendiente |  | Pendiente: todavía no la hicieron. |
| Informe de una página | 12 | 12,8 | 6,40 | pendiente |  | Pendiente de entrega: no hay informe en el repo (`docs/clase12-m2-reporte.md` es el reporte de seguridad). |
| **Total por equipo** | | **87,0** (47,7 ya calificados) | **43,50** | 68 (promedio ponderado de lo calificado: 67,56) | **16,11** | Faltan por entregar: Taller de refinamiento, Performance, Presentación e Informe de una página. |
| Tareas individuales (Moodle 6, participación 5, cuestionario clase 1 2; pesos provisorios) |  | 13 | 6,50 |  | pendiente | Se llevan aparte, ver `Calificacion_final.md`. |
| **Proyecto final corregido** |  |  | **50,00** | pendiente | pendiente | Vale el 50 % de la nota final. Se califica después de que arreglen lo señalado en estas tareas. |
| **Total del curso** |  |  | **100,00** |  | **16,11** de 100 (hasta ahora; faltan individuales y proyecto final) | 43,50 (equipo) + 6,50 (individuales) + 50,00 (proyecto) |

_Los 13 de peso restantes de las tareas (6,5 puntos del curso: Moodle 6, participación 5, cuestionario clase 1 2) son individuales. Pesos provisorios, pendientes de confirmar._

## Proyecto corregido

| Concepto | Nota | Observaciones |
|---|---|---|
| Nota del proyecto corregido (incluye Rúbrica C de Pact) | | |

## Sugerencias de arreglo para el equipo (2026-11-17)

Notas en escala 0-100. Los "GitHub issues" son los tickets de la pestaña Issues del repo. El trabajo está repartido en ramas sin mergear (`actions`, `e2e-tests`, `pact`, `reporte_seguridad`, `clase12-m2-seguridad-accesibilidad`): `main` no tiene el CI, los E2E ni los reportes. Conviene mergearlas a `main` (ojo: no mergear `refactor-update-task-small-functions`, que borra `ADR.md` y `clase5_errores.xlsx`).

### Seguridad + accesibilidad
- **Falta axe-core:** `npm i -D @axe-core/playwright` y un test E2E con `new AxeBuilder({ page }).analyze()` sobre login y proyectos; anotar las violaciones y arreglar al menos una verificando que el test pasa. Hasta 25 puntos.
- **Falta CVSS:** calcular vector y puntaje (CVSS 3.1, calculadora de first.org/cvss/calculator/3.1) del CORS abierto y de los headers faltantes, y anotarlos junto a la severidad en `docs/clase12-m2-reporte.md`. Hasta 20 puntos.
- **Falta OWASP ZAP:** correr un baseline scan contra la app local, guardar el reporte HTML en `docs/` y cruzar sus hallazgos con los manuales. Hasta 10 puntos.
- **Falta la user story de accesibilidad:** sumar una story con criterios de aceptación verificables, como la de seguridad. Hasta 7 puntos.

### ADR
- **Component Object sin implementar:** no hay carpeta de componentes. Crear `e2e/src/components/TaskCard.ts` como clase que recibe un `Locator` en el constructor y usarla desde `BoardPage` (las tarjetas del tablero ya se repiten). Hasta unos 30 puntos.
- **ADR sin alternativas ni costos:** en el ADR-003 explicar qué alternativas compararon y qué cuesta no tener componentes. Hasta 10 puntos.

### E2E + bugs
- **US-15 y US-12 sin casos:** US-15: etiquetas en minúsculas, sin duplicados y con límite de 10. US-12: editar título, descripción y prioridad, y que un no miembro reciba 403. Mínimo 3 casos por historia. Hasta 12,5 puntos cada una.
- **US-14 con 1 caso:** sumar asignar y desasignar. Hasta 8 puntos.
- **Issues:** etiquetar `bug` y la severidad, y adjuntar capturas o el reporte de Playwright como evidencia.

### Postman + Supertest
- **Reportes de bug incompletos:** abrir los 2 bugs de `clase5_errores.xlsx` como GitHub issues con criterio violado (citando la spec), entorno, reproducibilidad, evidencia y severidad, con el molde de los issues #9 y #10. Hasta 30 puntos.

### Pipeline
- **Lint en rojo:** corregir los 4 errores de `server/src/modules/comments/comments.service.ts` (`any` y variable sin usar) y `projects.controller.ts` (import `forbidden` sin usar), y mergear `actions` a `main`. 6 puntos.
- **Job de E2E (opcional):** agregar un job con checkout, setup-node con cache, `npm ci`, `npx prisma generate` (en `server`), `npx playwright install --with-deps chromium` y `npm run test:e2e`, subiendo el reporte como artefacto. 3 puntos.

### Integration + cobertura + refactor
- **Smells sin documentar:** agregar a `docs/` una tabla "smell, dónde estaba, refactor que lo resolvió, commit". 10 puntos.

### Pendientes de entrega
- Taller de refinamiento, Performance, Presentación e Informe de una página.
