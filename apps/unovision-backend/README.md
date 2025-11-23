# Prerequisitos:
- Tener instalado de forma global, Supabase. 

# Cómo dar de alta el backend:
- Abrir Docker Desktop
- Con el CMD, ir a apps/unovision-backend
- Ejecutar "npx supabase start"
  - Después de un tiempo, esto levantará todos los servicios en Docker.

- Para parar todos los servicios "npx supabase stop"

# Conectar Supabase local con el remoto:
- Primero hay que hacer supabase login y después supabase link para linkear proyecto local con remoto.
- https://supabase.com/docs/reference/cli/supabase-login


# Comandos útiles del CLI para migraciones, edge functions, deploys, seed, secrets, domains, etc:
- https://supabase.com/docs/reference/cli/global-flags


# Mostrar info del local development actual (requiere que esté levantado el Supabase en Docker):
- npx supabase status

# Generar types automáticamente:
- https://supabase.com/docs/reference/cli/supabase-gen



# Estructura de schemas/
He analizado tu archivo SQL completo y creado una estructura modular con archivos individuales para cada schema. Aquí está lo que he generado:

./schemas/individual/
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

🔧 Características de cada archivo:
ENUMs Separados: Creé enums.sql con todos los tipos ENUM porque son compartidos por múltiples tablas
Dependencias Documentadas: Cada archivo indica qué otros archivos necesita
Todo Incluido: Cada schema contiene:
Creación de tablas y secuencias
Constraints y foreign keys
Políticas RLS (Row Level Security)
Permisos y grants
Comentarios explicativos

✨ Ventajas de esta estructura:
Modular: Cada funcionalidad en su archivo
Mantenible: Fácil encontrar y modificar código específico
Reutilizable: Los ENUMs están separados
Documentado: Dependencias claras
Versionable: Control granular por funcionalidad




# Configuración de orden del toml:
Perfecto! He configurado el config.toml con el orden correcto de ejecución basado en las dependencias analizadas del archivo original.

📋 Orden de Ejecución Configurado:
setup.sql - Configuración inicial (extensiones, permisos base)
enums.sql - Todos los ENUMs (sin dependencias, usados por múltiples tablas)
roles.sql - Tabla de roles (sin dependencias)
vat-categories.sql - Categorías de IVA (usa vatCategoryType enum)
organizations.sql - Organizaciones (depende de vat-categories)
profiles.sql - Perfiles (usa documentType y gender enums)
profiles-roles.sql - Relación perfiles-roles (depende de profiles y roles)
users-organizations.sql - Relación usuarios-organizaciones (depende de profiles y organizations)
employees.sql - Empleados y horarios (depende de profiles y contractType enum)
doctors.sql - Doctores (depende de profiles)
patients.sql - Pacientes (depende de profiles)
payment-methods.sql - Métodos de pago (usa paymentMethodType enum)
expense-categories.sql - Categorías de gastos (usa expenseCategoryType enum)
expenses.sql - Gastos (depende de organizations, expense-categories, payment-methods y expenseStatus enum)
functions.sql - Funciones (depende de todas las tablas anteriores)
🔍 Análisis de Dependencias del Archivo Original:
Basé este orden en el análisis del SQL original donde identifiqué:

Foreign Keys que determinan el orden:
profiles.id → auth.users.id
organizations.vatCategoryId → vatCategories.id
profilesRoles.profileId → profiles.id
profilesRoles.roleId → roles.id
usersOrganizations.profileId → profiles.id
usersOrganizations.organizationId → organizations.id
employees.profileId → profiles.id
employeeSchedules.employeeId → employees.id
doctors.profileId → profiles.id
patients.profileId → profiles.id
expenses.organizationId → organizations.id
expenses.categoryId → expenseCategories.id
expenses.paymentMethodId → paymentMethods.id
ENUMs utilizados por:
contractType → employees
documentType → profiles
expenseCategoryType → expenseCategories
expenseStatus → expenses
gender → profiles
paymentMethodType → paymentMethods
vatCategoryType → vatCategories

PD: NO SE ESTÁ USANDO EL installAll.sql asiqe ver si se puede eliminar eso.











## Cómo hacer una nueva migración:
En el root del repo de backend (apps/unovision-backend/):
- Ejecutar "npx supabase start" para levantar todo el local.
- Ejecutar "npx supabase migration new migration_name"
- hacer cambios en el nuevo .sql de migración.
- una vez que todo está ok, testear y eso....
- "npx supabase db reset" para q resetee la img de docker, regenere la db con lo nuevo, etc, etc, etc y ejecute el supabase start nuevamente.
- En el root del monorepo, ejecutar "pnpm run backend:db-types". Esto re-generará los types de Typescript con los nuevos cambios de la DB, en apps/unovision-backend/supabase/types/database.types.ts, esto hace q luego al abrir el PR, el job de CI de backend pase, pq los types coinciden con los cambios del schema. SI NO HACEMOS ESTO, ESE JOB FALLA...
- También podemos ejecutar "node generate-types.mjs" EN apps/unovision-backend, hacen lo mismo. ESTE NODE CAMBIÓ. ACTUALIZARLO!!! SALE DE PACKAGES AHORA.