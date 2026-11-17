# Equipo 11 — Calificaciones por equipo, Testing y Calidad de Software 2026

**Repo:** https://github.com/Rodri240/taskflow_2026_s2

Este archivo tiene solo las tareas calificadas por equipo. Las notas individuales (cuestionario de la clase 1, cuestionarios de Moodle y participación) se llevan aparte.

_Escala de las notas: 0-100._

## Tareas por equipo

| Tarea | Clase | Peso | Puntos del curso (máx., de 100) | Nota | Aporta a la final (puntos) | Observaciones |
|---|---|---|---|---|---|---|
| Taller de refinamiento | 2 | 5,3 | 2,65 | pendiente |  | Pendiente de entrega: no figura en el repo (se buscó en `docs/`, el README y las 5 ramas). |
| Integration + cobertura + refactor (código pestilente + Ej. 1 de clase 7) | 3 y 7 | 10,6 | 5,30 | 77 | 4,08 | Cobertura de 97,5 % de líneas y 83,6 % de ramas con umbral 70/40 en Jest (verificado en `ci-test-branch`) y refactor real de `tasks.repository.ts`. Falta documentar qué smells detectaron, separar refactor de bugfix con tests previos, y llevar todo a `main`, que hoy no compila. |
| Postman + Supertest, caza de bugs | 5 | 5,3 | 2,65 | 57 | 1,51 | Suite Supertest amplia (143 de 143 pasan en `ci-test-branch`), con status, cuerpo y muchos casos negativos. No hay un reporte de los bugs que detecta la suite del servidor. Postman no se cuenta. |
| ADR | 6 | 5,3 | 2,65 | 83 | 2,20 | Framework Playwright con Component Object, pages y fixtures que corre (rama `rodri`, sin mergear). El ADR tiene alternativas pero le faltan consecuencias y costos, y describe `client/tests/` en vez de `e2e/`. |
| E2E + bugs | 7 y 8 | 10,6 | 5,30 | 62 | 3,29 | Dos suites E2E (en `ci-test-branch` y `rodri`) con 4 casos de US-15 y 2 de US-12, US-14 y US-16. Los bugs están bien descritos en `PLAYWRIGHT_GITHUB_ISSUES.md` y `BUGS.md`, pero no son GitHub issues (el repo tiene 0) y les faltan entorno y reproducibilidad. |
| Performance (k6: tabla seed chica vs grande + issue) | 9 | 5,3 | 2,65 | pendiente |  | Pendiente de entrega: no hay carpeta `performance/`, ni k6, ni seed grande en ninguna rama. |
| Seguridad + accesibilidad (ZAP, axe-core, CVSS) | 11 | 5,3 | 2,65 | 71 | 1,88 | Buenos hallazgos manuales, axe-core automatizado con fix verificado y user stories de remediación. No usaron OWASP ZAP y el CVSS tiene número sin vector. |
| Pipeline (`ci.yml` y job de E2E) | 12 | 10,6 | 5,30 | 100 | 5,30 | `ci.yml` con 6 jobs independientes, cache de npm y job de E2E (rama `ci-test-branch`, sin PR). Lint, builds, tests y cobertura verificados en local. El job de E2E queda en rojo por bugs conocidos de la spec, que no se penalizan. |
| Presentación (por definir) | 16 | 15,9 | 7,95 | pendiente |  | Pendiente: todavía no la hicieron. |
| Informe de una página | 12 | 12,8 | 6,40 | 78 | 4,99 | Informe claro con tabla de métricas y recomendación explícita de no liberar; los números coinciden con el repo. Tiene 962 palabras (más de una página) y no mide cobertura ni E2E, que se podían correr en local. |
| **Total por equipo** | | **87,0** (60,5 ya calificados) | **43,50** | 77 (promedio ponderado de lo calificado) | **23,25** | Faltan por entregar: Taller de refinamiento, Performance y Presentación. |
| Tareas individuales (Moodle 6, participación 5, cuestionario clase 1 2; pesos provisorios) | | 13 | 6,50 | | pendiente | Se llevan aparte, ver `Calificacion_final.md`. |
| **Proyecto final corregido** | | | **50,00** | pendiente | pendiente | Vale el 50 % de la nota final. Se califica después de que arreglen lo señalado en las tareas. |
| **Total del curso** | | | **100,00** | | **23,25** de 100 (hasta ahora; faltan individuales y proyecto final) | 43,50 (equipo) + 6,50 (individuales) + 50,00 (proyecto) |

_Los 13 de peso restantes de las tareas (6,5 puntos del curso: Moodle 6, participación 5, cuestionario clase 1 2) son individuales. Pesos provisorios, pendientes de confirmar._

## Proyecto corregido

| Concepto | Nota | Observaciones |
|---|---|---|
| Nota del proyecto corregido (incluye Rúbrica C de Pact) | | |

## Sugerencias de arreglo para el equipo (2026-11-17)

Notas en escala 0-100. Los "GitHub issues" son los tickets de la pestaña Issues del repo.

### Integration + cobertura + refactor
- **Smells sin documentar:** agregar a `docs/` una tabla "smell, dónde estaba, refactor que lo resolvió, commit". Hasta 6 puntos.
- **Refactor mezclado con bugfix:** separar los commits de refactor de los que cambian comportamiento, con mensajes descriptivos (no "Prueba CI4"), y escribir antes tests de caracterización de `buildFilters` y la búsqueda. Hasta 6 puntos.
- **Nada llegó a `main`:** abrir un PR de `ci-test-branch` a `main`. Hoy `main` no compila (`comments.service.ts:18`, TS18047) y no tiene el umbral de cobertura. Hasta 5 puntos.

### Postman + Supertest
- **Sin reporte de bugs del servidor:** documentar los 12 tests rojos de `rodri` (por ejemplo US-12 CA5 en `tasks.test.ts`, US-01 CA3 en `auth.test.ts`) con título, criterio violado, entorno, pasos, esperado/obtenido, reproducibilidad, evidencia y severidad. Hasta 40 puntos.
- **Test que solo mira el largo:** en `tasks.test.ts`, "filtra las tareas por estado" debería verificar también el `status` de cada item devuelto. Hasta 3 puntos.

### ADR
- **ADR incompleto:** agregar una sección "Consecuencias" (costos de mantenimiento, curva de aprendizaje), corregir la ruta `client/tests/` por `e2e/` y borrar el texto de prueba al final de `ADR.md` en `ci-test-branch`. Hasta 11 puntos.
- **Config de Playwright:** en `webServer`, esperar también `http://127.0.0.1:3000/api/health` (hoy solo espera el cliente y el primer test puede dar `ECONNREFUSED`) y usar una base aislada como hace `e2e/start-api.mjs`, en vez de `dev.db`. Hasta 5 puntos.
- **Framework sin mergear:** llevar la rama `rodri` a `main` por PR.

### E2E + bugs
- **Bugs como GitHub issues:** `PLAYWRIGHT_GITHUB_ISSUES.md` y `BUGS.md` tienen los bugs bien descritos pero ninguno está en Issues. Abrir un GitHub issue por bug con el molde de `PLAYWRIGHT_GITHUB_ISSUES.md`, agregando entorno, reproducibilidad y el criterio violado citando la spec. Unificar los dos documentos, que usan numeraciones distintas. Hasta 25 puntos.
- **US-12, US-14 y US-16 con menos de 3 casos:** agregar un caso por historia. US-12: editar con título vacío devuelve 400. US-14: asignar a alguien que no es miembro devuelve 400. US-16: una fecha inválida se rechaza. Hasta 4 puntos cada una.
- **Dos suites separadas:** unificar `e2e/` de `ci-test-branch` y de `rodri` en una sola estructura.

### Performance
- **Sin entregar:** armar `performance/scenarios/api-load.k6.js`, el seed grande (`prisma/seed-large.ts`, que el `package.json` ya referencia), la tabla seed chica vs grande (p95, error rate, iterations/s), una hipótesis de qué crece con los datos y un GitHub issue que cite el criterio de rendimiento de la spec.

### Seguridad + accesibilidad
- **Falta OWASP ZAP:** correr un baseline scan contra la app local, guardar el reporte HTML en `docs/` y cruzar sus hallazgos con los manuales. Hasta 13 puntos.
- **CVSS sin vector:** agregar el vector completo y recalcular con la calculadora de first.org/cvss/calculator/3.1 (formato `CVSS:3.1/AV:N/AC:L/...`). El vector es la cadena que describe cómo se explota la falla; sin él el número no se puede verificar. Hasta 12 puntos.
- **Stories de remediación incompletas:** sumar stories con criterios de aceptación para SEC-03, ACC-02 y ACC-03. Hasta 4 puntos.
- **IDs repetidos:** las tarjetas `.docx` y el reporte reutilizan SEC-01 a SEC-03 para hallazgos distintos; usar IDs únicos.

### Informe de una página
- **Más de una página:** recortar de 962 palabras a una sola página, con la tabla de métricas y 2 o 3 líneas de recomendación. Hasta 15 puntos.
- **Métricas medidas:** reemplazar "no pudimos consultar" por números reales corriendo en local: tests 143/143, cobertura 97,5 % de líneas y 83,6 % de ramas, E2E 17 de 20 con los 3 rojos explicados. Hasta 7 puntos.

### Pipeline
- **CI fuera de `main`:** abrir el PR de `ci-test-branch` a `main` para que el pipeline corra en la rama principal. No cambia la nota.

### Pendientes de entrega
- Taller de refinamiento, Performance y Presentación.
