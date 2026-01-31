# Skills Changelog

Este archivo registra todos los cambios realizados en los skills del proyecto AEME.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y los skills siguen [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Guía de Versionado

- **MAJOR (X.0.0)**: Cambios breaking en patrones documentados (ej: patrón deprecado)
- **MINOR (1.X.0)**: Nuevas adiciones sin romper lo existente (nuevas secciones, helpers)
- **PATCH (1.0.X)**: Correcciones menores (typos, clarificaciones)

## Tipos de Cambios

- `Added`: Nuevas secciones o contenido
- `Changed`: Modificaciones a contenido existente
- `Deprecated`: Contenido marcado como obsoleto pero aún presente
- `Removed`: Contenido eliminado
- `Fixed`: Correcciones de errores o typos

---

## [2024-01-31] - Sistema de Tracking Completo Implementado

### Meta Changes - Sistema Completo de 4 Fases

#### Fase 1: Infraestructura Básica ✅
- Creado `.claude/skills/CHANGELOG.md` para tracking central
- Agregada metadata básica a todos los 15 skills:
  - `version` (baseline 1.0.0)
  - `lastUpdated` (2024-01-31)
  - `lastReviewed` (2024-01-31)
  - `maintenancePriority` (HIGH/MEDIUM/LOW)
- Creado skill `skills-maintenance` con proceso completo de mantenimiento
- Establecido versionado semántico para skills

#### Fase 2: Metadata Detallada ✅
- Agregada metadata de tracking a todos los skills:
  - `monitorPaths`: Rutas que triggean revisión
  - `monitorDependencies`: Dependencias críticas monitoreadas
  - `relatedSkills`: Skills relacionados que revisar
- Clasificación completa por prioridades:
  - HIGH (2): frontend-conventions, backend-conventions
  - MEDIUM (4): ui, contracts, supabase-client, tailwind-config
  - LOW (9): typescript, test, functions, react, git, commit, icons, iso-8601, skills-maintenance

#### Fase 3: Herramientas de Detección ✅
- Creado GitHub Action: `.github/workflows/skills-maintenance-check.yml`
  - Se ejecuta automáticamente en PRs
  - Analiza archivos modificados vs monitorPaths
  - Detecta cambios en dependencias
  - Comenta en PRs con skills afectados
- Creado script de detección: `.github/scripts/check-skills.js`
  - Matching de glob patterns
  - Análisis de diffs de package.json
  - Generación de reportes markdown
  - Clasificación por impacto (critical/important/informational)
- Creado script local: `.claude/scripts/check-skills-local.js`
  - Ejecutable con `pnpm run skills:check`
  - Output colorizado para terminal
  - Detección de cambios staged/unstaged
  - Exit codes para CI/CD
- Creado `.claude/skills/README.md` con documentación completa

#### Fase 4: Maintenance Agent ✅
- Creado agent structure en `.claude/agents/maintenance/`
  - `config.yml`: Configuración del agent
  - `AGENT.md`: Prompt y comportamiento completo
  - `README.md`: Documentación de uso
- Agent capabilities:
  - Análisis automático de PRs
  - Detección inteligente de impacto
  - Generación de reportes detallados
  - Sugerencias específicas de actualización
  - Integración con GitHub Actions y Claude CLI

### Skills Affected
Todos los 15 skills ahora tienen:
- Metadata completa de tracking
- Paths monitoreados configurados
- Dependencias críticas identificadas
- Relaciones entre skills documentadas

---

## [iso-8601-conventions] - 1.0.0 - 2024-01-31

### Added
- Skill creado con convenciones de ISO 8601 para fechas y tiempos
- Formatos estándar: YYYY-MM-DD, HH:MM, HH:MM:SS
- Representaciones numéricas: meses 1-12, días de semana 1-7 (lunes-domingo)
- Ejemplos de uso en database, backend y frontend

### Trigger
- Manual: Necesidad de documentar estándar de fechas/tiempos en el proyecto

---

## [contracts-package-conventions] - 1.1.0 - 2024-01-31

### Added
- Nueva sección "Date and Time Validation" con convenciones de ISO 8601
- Referencia a skill `iso-8601-conventions`

### Changed
- Actualizada documentación de validación Zod para incluir `z.iso().date()` y `z.iso().time()`

### Trigger
- Manual: Estandarización de validaciones de fecha/tiempo

---

## [backend-conventions] - 1.1.0 - 2024-01-31

### Changed
- Reorganizado código de ejemplos a archivo `examples.md` separado
- Reducido tamaño de SKILL.md de 521 a 362 líneas
- Agregadas referencias cruzadas entre SKILL.md y examples.md

### Added
- Secciones nuevas en examples.md:
  - Response Format Examples
  - Database Access Examples
  - Pagination Examples
  - Request Validation Examples
  - Query Parameters Examples
  - Import Patterns Examples
  - Deno Configuration Example

### Trigger
- Manual: Optimización de tamaño y organización del skill

---

## Baseline - 2024-01-31

Todos los skills existentes establecidos en versión 1.0.0 como baseline:

- backend-conventions: 1.1.0 (actualizado antes del baseline)
- commit-conventions: 1.0.0
- contracts-package-conventions: 1.1.0 (actualizado antes del baseline)
- frontend-conventions: 1.0.0
- functions-conventions: 1.0.0
- git-workflow: 1.0.0
- icons-conventions: 1.0.0
- iso-8601-conventions: 1.0.0 (creado en baseline)
- react-component-conventions: 1.0.0
- supabase-client-package-conventions: 1.0.0
- tailwind-config-package-conventions: 1.0.0
- test-conventions: 1.0.0
- typescript-conventions: 1.0.0
- ui-package-conventions: 1.0.0
