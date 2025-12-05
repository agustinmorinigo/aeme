# Contracts Package

## Compatibilidad Multi-Runtime

Este paquete está diseñado para funcionar en **dos runtimes de JavaScript diferentes**:

- 🦕 **Deno** - Usado en las Supabase Edge Functions (backend)
- 🟢 **Node.js** - Usado en el frontend (Vite/React)

## Convenciones de Archivos

### Extensiones Obligatorias
Todos los archivos **deben incluir extensiones explícitas** (`.js`, `.ts`) en sus imports debido a los requerimientos estrictos de Deno.

✅ **Correcto:**
```typescript
import { UserType } from './entities.ts';
import { ApiResponse } from '../types.ts';
```

❌ **Incorrecto:**
```typescript
import { UserType } from './entities';
import { ApiResponse } from '../types';
```

### Sin Alias Paths
**No se utilizan alias paths** (como `@/types`) por limitaciones actuales de resolución en Deno runtime. Se utilizan rutas relativas para garantizar compatibilidad en ambos entornos.

## Estructura
Este package actúa como un **shared library** que contiene:
- Tipos TypeScript compartidos
- Esquemas de validación
- Contratos de API
- Entities/Models