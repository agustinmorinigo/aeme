# Integración de Nueva App Frontend con Design System

## Pasos para instalar una nueva aplicación frontend

### 1. Crear la nueva aplicación
Instalar el nuevo repositorio frontend en `./apps/nueva-app`.

### 2. Configurar TailwindCSS v4
Nuestro design system utiliza **TailwindCSS v4** para acceder a temas, colores, fuentes, espaciados y variables CSS.

**Instalación:**
1. Navegar al directorio raíz del nuevo proyecto (**NO** el root del monorepo)
2. Seguir la [documentación oficial de TailwindCSS](https://tailwindcss.com/docs/installation/using-vite)

### 3. Agregar dependencia del UI package
En el `package.json` de la nueva aplicación, agregar en `dependencies`:

```json
{
  "dependencies": {
    "@aeme/ui": "workspace:*"
  }
}
```

Esto habilitará los imports: `import { Button } from '@aeme/ui';`

### 4. Agregar configuración de TailwindCSS
En el `package.json` de la nueva aplicación, agregar en `devDependencies`:

```json
{
  "devDependencies": {
    "@aeme/tailwind-config": "workspace:*"
  }
}
```

### 5. Configurar estilos CSS
En `./apps/nueva-app/src/index.css` o `globals.css`, agregar la directiva **después** de las directivas de TailwindCSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@aeme/tailwind-config";
```

### 6. Instalación final
Ejecutar en el root del monorepo:

```bash
pnpm install
pnpm run dev
```

**Resultado:** Ya se pueden usar todos los componentes de `packages/ui` y las utilidades de `tailwind-config`.

> **Nota:** Si el autocompletado de TailwindCSS no funciona correctamente, reiniciar VS Code.



# Biome - Linter y Formatter

El monorepo utiliza **Biome** como linter y formatter, reemplazando a Prettier y ESLint.

## Ventajas de Biome

- **Configuración única:** Un solo archivo de configuración para linting y formateo
- **Ejecución global:** Se ejecuta desde el root y aplica a todos los packages
- **Automatización:** Gracias a `.vscode/settings.json`, todos los packages usan las mismas reglas y se formatean al guardar

## Uso

Los scripts de Biome en el `package.json` del root se ejecutan de forma global, por lo que **no es necesario ejecutar Biome en cada package individual**.

## Configuración específica por proyecto

Si se necesitan utilidades particulares de Biome para un proyecto específico:

1. **No instalar** Biome en ese package
2. Crear un nuevo archivo `biome.json` de configuración específica
3. Seguir la [guía de monorepos de Biome](https://biomejs.dev/guides/big-projects/#monorepo)



# Git Hooks y Validaciones

El monorepo utiliza **Husky + Lint-staged + Commitlint + Commitizen** para automatizar validaciones y mantener la calidad del código.




# Commitizen - Commits Interactivos

## ¿Qué es Commitizen?

El archivo `.cz-config.js` configura **Commitizen**, una herramienta que ayuda a crear commits siguiendo convenciones específicas de manera interactiva.

## Funcionalidades

Este archivo configura `cz-customizable` para crear commits con formato estandarizado:

1. **Define tipos de commit** (`feat`, `fix`, `docs`, etc.) con descripciones y emojis
2. **Detecta automáticamente los scopes** basándose en los archivos staged
3. **Sugiere scopes inteligentes** - si modificaste archivos en `unovision-frontend`, lo sugiere primero
4. **Valida el formato** del mensaje antes de hacer el commit

## Uso

**Script disponible:**
```json
{
  "commit": "pnpm pre-commit-check && pnpm exec cz"
}
```

**En lugar de:**
```bash
git commit -m "fix: algo"
```

**Ejecutar:**
```bash
pnpm commit
```

## Wizard Interactivo

Al ejecutar `pnpm commit`, aparece un asistente que guía paso a paso:

1. **¿Qué tipo de cambio?** (`feat`, `fix`, `docs`, etc.)
2. **¿Cuál es el scope?** (sugerido automáticamente según archivos modificados)
3. **Descripción del cambio**

## Ejemplo Práctico

Si modificas `apps/unovision-frontend/src/App.tsx` y ejecutas `pnpm commit`:

- ⭐ Sugiere automáticamente `unovision-frontend (modificado)` como scope
- ✅ Asegura el formato: `feat(unovision-frontend): add new feature`
- 🔗 Compatible con `commitlint.config.js` para validación

**Resultado:** Consistencia en los commits del equipo 🚀


# Cómo hacer commits en este proyecto

El proyecto usa **commitlint**, por lo que es necesario seguir las convenciones del archivo `commitlint.config.js` para que los commits sean aceptados.

## Opciones disponibles

### Opción 1: Commit manual
```bash
git add .
git commit -m "feat(scope): descripción siguiendo convenciones"
```

### Opción 2: Commit interactivo (recomendado)
```bash
git add .
pnpm commit  # Abre el wizard interactivo de Commitizen
```



# Actualizaciones de TailwindCSS Config

Al actualizar el package `packages/tailwind-config`, es necesario:

1. **Detener** el servidor de desarrollo
2. **Reiniciar** con `pnpm run dev`

Esto es necesario para que los cambios en la configuración de TailwindCSS sean aplicados correctamente.

# Convenciones del Repositorio

## Nomenclatura de archivos y carpetas

**Regla principal:** Utilizar **kebab-case** para todos los nombres de archivos y carpetas.

**Ejemplos:**
```
✅ my-file-name.tsx
✅ user-profile-component.ts
✅ api-endpoints.js

❌ myFileName.tsx
❌ UserProfileComponent.ts
❌ api_endpoints.js
```




# Cómo levantar Frontend y Backend

El proyecto requiere **múltiples terminales** ejecutándose simultáneamente:

## Terminal 1: Monorepo
```bash
# En el root del monorepo
pnpm run dev
```

## Terminal 2: Supabase Local
```bash
# En apps/unovision-backend
npx supabase start
```

## Terminal 3: Supabase Functions
```bash
# En apps/unovision-backend
npx supabase functions serve
```

## Terminal 4: Seed de Base de Datos
```bash
# En apps/unovision-backend/supabase
node seed-user.js
```

> **Nota:** El seeding se puede mejorar siguiendo la [documentación oficial de Supabase](https://supabase.com/docs/guides/local-development/seeding-your-database)

## Utilidades adicionales

- **Emails OTP locales:** [http://127.0.0.1:54324/](http://127.0.0.1:54324/)
- **Opcional:** Si no se usan las Supabase Functions, se puede omitir el Terminal 3



# 🤔 ¿Por qué package.json Y deno.json en el mismo repo?
## 📊 **Casos de uso comunes:**

### 1. **Monorepo Híbrido** (TU CASO) ✅
```
├── package.json          # Node.js (frontend, build tools, etc.)
├── deno.json             # Deno (edge functions, scripts)
├── apps/
│   ├── frontend/         # React/Vite (Node.js)
│   └── backend/          # Supabase Functions (Deno)
└── packages/
    └── contracts/        # Shared (Node.js + Deno)
```

### 2. **Ejemplos de proyectos reales:**
- **Supabase mismo**: Usa Node.js para el dashboard y Deno para Edge Functions
- **Fresh Framework**: Deno en server, pero herramientas de build en Node
- **Remix**: Puede tener edge functions en Deno y build tools en Node

## 🔧 **Razones técnicas:**

### Node.js ecosystem:
- **Frontend**: React, Vue, Angular
- **Build tools**: Vite, Webpack, Turbo
- **Package management**: npm, pnpm, yarn
- **Tooling**: ESLint, Prettier, Biome

### Deno ecosystem:
- **Edge Functions**: Supabase, Vercel Edge, Deno Deploy
- **Modern runtime**: Built-in TypeScript, web APIs
- **Security**: Permissions, sandboxing

## 🎯 **Tu arquitectura es PERFECTA:**

```typescript
// Frontend (Node.js/Vite)
import { handleUserFormSchema } from '@aeme/contracts'; // from node_modules

// Backend Edge Function (Deno)  
import { handleUserFormSchema } from '@aeme/contracts'; // from workspace
```

**Mismo código, diferentes runtimes!** 🚀