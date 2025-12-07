# Prerequisitos

- Tener instalado globalmente Supabase CLI: https://supabase.com/docs/guides/local-development?queryGroups=package-manager&package-manager=pnpm

# Cómo levantar el backend local

1. Abrir Docker Desktop
2. Navegar al directorio con la terminal:
```bash
   cd apps/unovision-backend/supabase
```
3. Iniciar Supabase:
```bash
   npx supabase start
```
   Esto levantará todos los servicios en Docker (puede tomar algunos minutos).

4. Para detener los servicios:
```bash
   npx supabase stop
```

# Conectar Supabase local con el remoto

1. Autenticarse:
```bash
   supabase login
```
2. Vincular el proyecto local con el remoto:
```bash
   supabase link
```

Documentación: https://supabase.com/docs/reference/cli/supabase-login

# Comandos útiles del CLI

Referencia completa para migraciones, edge functions, deploys, seed, secrets, domains, etc: https://supabase.com/docs/reference/cli/global-flags

## Verificar estado del desarrollo local

Requiere que Supabase esté corriendo en Docker:
```bash
npx supabase status
```

## Generar types automáticamente

Documentación: https://supabase.com/docs/reference/cli/supabase-gen

# Estructura de schemas/
```
./schemas/
├── setup.sql                 # Configuración inicial
├── enums.sql                 # Todos los ENUMs
├── profiles.sql              # Schema de perfiles
├── roles.sql                 # Schema de roles
├── profiles-roles.sql        # Relación perfiles-roles
├── employees.sql             # Empleados y horarios
├── doctors.sql               # Doctores
├── patients.sql              # Pacientes
├── organizations.sql         # Organizaciones
├── users-organizations.sql   # Relación usuarios-organizaciones
├── vat-categories.sql        # Categorías de IVA
├── payment-methods.sql       # Métodos de pago
├── expense-categories.sql    # Categorías de gastos
├── expenses.sql              # Gastos
├── functions.sql             # Funciones del sistema
├── install-all.sql           # Script de instalación automática
└── README.md                 # Documentación completa
```

## Características de cada archivo

- **ENUMs Separados**: Los tipos ENUM están en un archivo aparte porque son compartidos por múltiples tablas
- **Dependencias Documentadas**: Cada archivo indica qué otros archivos necesita
- **Todo Incluido**: Cada schema contiene:
  - Creación de tablas y secuencias
  - Constraints y foreign keys
  - Políticas RLS (Row Level Security)
  - Permisos y grants
  - Comentarios explicativos

## Ventajas de esta estructura

- **Modular**: Cada funcionalidad en su archivo
- **Mantenible**: Fácil encontrar y modificar código específico
- **Reutilizable**: Los ENUMs están separados
- **Documentado**: Dependencias claras
- **Versionable**: Control granular por funcionalidad

# Orden de ejecución configurado en el TOML

1. `setup.sql` - Configuración inicial (extensiones, permisos base)
2. `enums.sql` - Todos los ENUMs (sin dependencias, usados por múltiples tablas)
3. `roles.sql` - Tabla de roles (sin dependencias)
4. `vat-categories.sql` - Categorías de IVA (usa `vatCategoryType` enum)
5. `organizations.sql` - Organizaciones (depende de `vat-categories`)
6. `profiles.sql` - Perfiles (usa `documentType` y `gender` enums)
7. `profiles-roles.sql` - Relación perfiles-roles (depende de `profiles` y `roles`)
8. `users-organizations.sql` - Relación usuarios-organizaciones (depende de `profiles` y `organizations`)
9. `employees.sql` - Empleados y horarios (depende de `profiles` y `contractType` enum)
10. `doctors.sql` - Doctores (depende de `profiles`)
11. `patients.sql` - Pacientes (depende de `profiles`)
12. `payment-methods.sql` - Métodos de pago (usa `paymentMethodType` enum)
13. `expense-categories.sql` - Categorías de gastos (usa `expenseCategoryType` enum)
14. `expenses.sql` - Gastos (depende de `organizations`, `expense-categories`, `payment-methods` y `expenseStatus` enum)
15. `functions.sql` - Funciones (depende de todas las tablas anteriores)

# Cómo crear una nueva migración

Desde el directorio raíz del backend (`apps/unovision-backend/supabase`):

1. Levantar Supabase localmente:
```bash
   npx supabase start
```
2. Crear una nueva migración:
```bash
   npx supabase migration new migration_name
```
3. Realizar los cambios en el nuevo archivo `.sql` de migración

4. Una vez validados los cambios, resetear la base de datos para aplicar la migración:
```bash
   npx supabase db reset
```
   Esto resetea la imagen de Docker, regenera la DB con los nuevos cambios y ejecuta `supabase start` nuevamente.

5. Regenerar los types de TypeScript. Desde el root del monorepo:

```bash
   pnpm run backend:db-types
```
   Esto regenerará los types en `packages/supabase-client/src/types/database.types.ts`.
   
   **Importante**: Esto es necesario para que el job de CI del backend pase en el PR, ya que valida que los types coincidan con el schema.

6. Por ahora, luego de que está todo ok, pushear y mergear con main, luego en local moverser a main, git pull origin main y luego dentro de "apps/unovision-backend/supabase" correr "npx supabase db push" para correr la migración manualmente. Luego se hará en el on merge, con una Action de Github.
