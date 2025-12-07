# Supabase Client Package

## Propósito
Este package centraliza y comparte recursos críticos de Supabase entre frontend y backend:

- 🗄️ **Tipos de base de datos** - TypeScript types que reflejan la base de datos
- 🔌 **Inicialización del cliente** - Configuración unificada de Supabase

## Compatibilidad Multi-Runtime

Este package está diseñado para funcionar en **dos runtimes de JavaScript diferentes**:

- 🦕 **Deno** - Usado en las Supabase Edge Functions (backend)
- 🟢 **Node.js** - Usado en el frontend (Vite/React)

## Convenciones Técnicas

### Extensiones Obligatorias
Todos los archivos **deben incluir extensiones explícitas** debido a los requerimientos estrictos de Deno:

✅ **Correcto:**
```typescript
import { createClient } from './client.ts';
import { Database } from './types/database.types.ts';
```

❌ **Incorrecto:**
```typescript
import { createClient } from './client';
import { Database } from './types/database.types';
```

### Sin Alias Paths
**No se utilizan alias paths** (como `@/types`) debido a limitaciones actuales de resolución de módulos en Deno runtime. Se emplean rutas relativas para garantizar compatibilidad en ambos entornos.

## Generación de Tipos
Los tipos de base de datos se generan automáticamente usando el script:
```bash
node src/generate-types.mjs
```

Este script requiere que Supabase esté ejecutándose localmente (`npx supabase start`).