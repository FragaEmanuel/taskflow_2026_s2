# Feedback de corrección — Equipo 10 (2026-11-17)

Testing y Calidad de Software 2026. Integrantes según los commits: nierjero, StephUCU/StephSP, Diego.s y Daniel.

## Cómo leer estas notas

- Cada nota es de una tarea, sobre 100, y se desglosa por ítem en la columna "Desglose".
- Las tareas por equipo valen en total 43,50 puntos del curso. Con lo calificado hasta ahora aportan **19,83 de 100**, y el promedio ponderado de esas tareas es 60.
- **Esto es una etapa parcial.** El **proyecto final corregido vale 50 puntos (el 50 % de la nota final)** y se califica después de que arreglen lo señalado más abajo. Las tareas individuales (6,50 puntos) se llevan aparte.
- Faltan por calificar: Taller de refinamiento (no figura en el repo) y Presentación (pendiente de entrega). La nota de Performance es provisoria: no se pudo correr k6, las métricas son las declaradas.
- El pipeline y el informe de una página están en la rama `agregar-ci` (PR #6, sin mergear).

## Notas por tarea

| Tarea | Nota (sobre 100) | Desglose |
|---|---|---|
| Taller de refinamiento | pendiente | Pendiente de entrega: no figura en el repo; se buscó en las 6 ramas (`.md` y `.txt`) y en el README. Si lo entregaron por otro lado, hay que avisar. |
| Integration + cobertura + refactor (código pestilente + Ej. 1 de clase 7) | 45 | **Smells y refactor 10/50:** no hay listado de smells ni refactors; solo comentarios de una línea en el código (clave JWT hardcodeada, SQL sin parametrizar, errores crudos, hash en el seed, DELETE sin verificar membresía). **Cobertura 35/50:** ramas 40,57 % y líneas 66,29 % en `main` (corrido), pero el umbral no está configurado en `server/jest.config.js` (-15). |
| Postman + Supertest, caza de bugs | 70 | **Supertest 45/50:** `auth.test.ts` (2 hallazgos nuevos) e `ids.test.ts` con AAA, status, cuerpo y casos negativos; 18 de 18 pasan en `main` (corrido). Son pocos. **Reportes de bug 25/50:** 2 reportes en descripciones de PR (#1 y #2), no son GitHub issues; al #2 le faltan entorno y reproducibilidad, y al #1 título, severidad, entorno y reproducibilidad. Postman no se cuenta. |
| ADR | 42 | **Component Object 0/33,3:** no existe `components/` y el ADR no lo menciona. **Framework Playwright 22/33,3:** hay config, fixtures y datos por API en `server/tests/e2e/`, pero ningún Page Object. **ADR 20/33,3:** contexto, decisión y consecuencias, con casi nada de alternativas descartadas ni costos. |
| E2E + bugs | 13 | **Tests 12,5/50:** 13 tests corridos con Chromium (10 pasan y 3 fallan; los 5 de axe pasan). Casos por historia, contando los compartidos: US-12: 1, US-15: 1 (el mismo caso), US-14: 1 (asigna al crear la tarea; a confirmar si cuenta), US-16: 0. **Bugs 0/50:** no hay GitHub issues ni reportes de bugs de E2E; el test de proyecto con nombre vacío encontró un bug real (responde 201 en vez de 400) que no se reportó. |
| Performance (k6: tabla seed chica vs grande + issue) | 73 | **Tabla 33,3/33,3:** `informe_k6/reporte_performance.md` (p95 22,86 ms vs 20,5 s y 19,44 s). **Hipótesis 20/33,3:** genérica, no identifica qué crece con los datos. **Issue 20/33,3:** está dentro del `.md`, no es un GitHub issue; faltan severidad y reproducibilidad y cita el umbral p(95)<1000 en vez de 500. Métricas declaradas, no verificadas: no se corrió k6. |
| Seguridad + accesibilidad (ZAP, axe-core, CVSS) | 60 | **ZAP 12/25:** pruebas manuales y `npm audit`, sin ZAP (parcial). **axe-core 25/25:** test en Playwright y fix en `TaskDetailPage.tsx`; corrí los 5 tests de axe y pasan. **CVSS 8/25:** solo etiquetas critical/high, sin vector ni número. **User stories de remediación 15/25:** solo la de accesibilidad; falta la de seguridad. |
| Pipeline (`ci.yml` y job de E2E) | 97 | **`ci.yml` 50/50:** 5 jobs independientes con cache de npm y ESLint instalado, en `agregar-ci` (PR #6 sin mergear). Builds verdes en local y en GitHub; lint (3 errores de código reales), tests (defectos de US-16) y cobertura (67,08 % de líneas, umbral 70) en rojo. Los runs de Actions sí se ejecutan. **Job de E2E 47/50:** falta (opcional, -3). |
| Presentación | pendiente | Pendiente: todavía no la hicieron. |
| Informe de una página | 80 | **Recomendación explícita (no liberar) 25/25 y una sola página 25/25** (419 palabras, estimado), en `docs/testing/etapa3-metricas/informe-metricas.md` de `agregar-ci`. **Tabla de métricas 15/25:** las métricas están en viñetas, no en tabla. **Números 15/25:** US-16 (8 tests, 2 pasan y 6 fallan en UTC-3) coincide; la cobertura citada (53,16 % y 22,54 %) es de correr un solo archivo y la suite completa da 67,08 % y 42,21 %. |
| **Total (tareas por equipo calificadas)** | **60** (promedio ponderado) | Aportan **19,83 puntos** de los 43,50 posibles de las tareas por equipo (peso calificado 65,8 de 87,0). Faltan el Taller de refinamiento y la Presentación. |

## Sugerencias de arreglo

Notas en escala 0-100. Los "GitHub issues" son los tickets de la pestaña Issues del repo.

### E2E + bugs (hasta unos 85 puntos de la tarea)
- **Faltan casos de las historias pedidas:** hoy hay 1 caso de US-12, 1 de US-15 (el mismo), 1 de US-14 y ninguno de US-16. Escribir al menos 3 por historia (feliz, error y borde), por ejemplo: US-16 guardar una fecha, rechazar `15/09/2026` y quitar el vencimiento con `null`. Hasta 37,5 puntos.
- **Bugs como GitHub issues:** abrir un GitHub issue por cada bug con título, criterio violado (citando la spec), entorno, pasos, esperado/obtenido, reproducibilidad, evidencia y severidad. Empezar por el proyecto con nombre vacío (`POST /api/projects` con `name: ''` devuelve 201 y la spec pide 400). Hasta 50 puntos.
- **Test "login exitoso":** afirma que `project-list` es visible, pero un usuario nuevo no tiene proyectos y el `<ul>` vacío cuenta como oculto. Usar `toBeAttached()` o afirmar un encabezado de la pantalla.

### ADR (hasta unos 40 puntos de la tarea)
- **Component Object y Page Objects sin implementar:** crear `e2e/components/TaskCard.ts` y Page Objects (`BoardPage`, `TaskDetailPage`) con los `data-testid` existentes, y refactorizar un spec para usarlos. Hasta 44 puntos entre los dos ítems.
- **ADR:** agregar las alternativas descartadas con sus costos (por ejemplo, probar todo por UI) y decidir de forma explícita sobre POM y COM. Hasta 13 puntos.

### Integration + cobertura + refactor (hasta unos 55 puntos de la tarea)
- **Smells sin listado ni refactor:** crear `CODE_SMELLS.md` con smell, dónde estaba, refactor aplicado y commit. Hacer al menos un refactor que preserve el comportamiento, con un test de caracterización previo (por ejemplo, mover la clave JWT de `server/src/middleware/auth.ts` a `process.env`). Hasta 40 puntos.
- **Umbral de cobertura:** agregar `coverageThreshold: { global: { lines: 70, branches: 40 } }` a `server/jest.config.js`. Hoy las líneas están en 66,29 %: sumar tests de `tasks.service.ts` y `tasks.controller.ts`. Hasta 15 puntos.

### Postman + Supertest (hasta unos 30 puntos de la tarea)
- **Reportes de bug incompletos:** abrir los hallazgos de los PR #1 y #2 como GitHub issues y completar título, entorno, reproducibilidad ("x de y veces") y severidad. Hasta 25 puntos.
- Sumar más hallazgos con su test; hoy hay solo dos. Hasta 5 puntos.

### Seguridad + accesibilidad (hasta unos 40 puntos de la tarea)
- **Falta OWASP ZAP:** baseline scan contra el frontend local, exportar el HTML a `docs/` y cruzar sus hallazgos con los manuales. Hasta 13 puntos.
- **Falta CVSS:** calcular vector y puntaje (CVSS 3.1, first.org/cvss/calculator/3.1) de SEC-01 a SEC-03. CVSS es el estándar que da a cada vulnerabilidad un puntaje de 0 a 10 según un vector de métricas. Hasta 17 puntos.
- **Falta la user story de seguridad:** escribir una de remediación para SEC-03 (un usuario ajeno puede modificar y borrar tareas) con criterios de aceptación. Hasta 10 puntos.

### Performance (hasta unos 27 puntos de la tarea)
- **Hipótesis genérica:** leer `listByProject` en `server/src/modules/tasks/tasks.controller.ts`. `limit` y `offset` se calculan pero no llegan a la consulta, y dentro del bucle se hace una consulta por tarea para el asignado y otra para contar comentarios (N+1: una consulta extra por cada fila). Anotarlo en el reporte. Hasta 13 puntos.
- **Issue:** abrirlo en GitHub (no dejarlo en el `.md`), con severidad, reproducibilidad y el umbral correcto (`p(95)<500`). Hasta 14 puntos.

### Informe de una página (hasta 20 puntos)
- Pasar las métricas a una tabla (métrica, valor, qué decisión cambia), incluyendo las etapas del pipeline en verde.
- Usar la cobertura de la suite completa (67,08 % de líneas y 42,21 % de ramas) en lugar de la de un solo archivo.

### Pipeline
- **Job de E2E (opcional):** checkout, setup-node con cache, `npm ci`, `npx prisma generate` (en `server`), `npx playwright install --with-deps chromium` y `npm run test:e2e`, subiendo el reporte como artefacto. 3 puntos.
- **Lint rojo:** tipar `c` y `body` en `comments.service.ts` y quitar el `catch (e)` sin usar.
- **Mergear el PR #6** a `main`.

### Pendientes de entrega
- Taller de refinamiento: no figura en el repo.
- Presentación: pendiente de entrega.
