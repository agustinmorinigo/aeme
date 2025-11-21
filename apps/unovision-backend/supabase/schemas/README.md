# Database Schemas - Individual Files

Este directorio contiene la base de datos dividida en archivos individuales por schema/funcionalidad.

## Estructura de Archivos

### Archivos Principales
- `setup.sql` - Configuración inicial de la base de datos (extensiones, permisos, etc.)
- `enums.sql` - Todas las definiciones de ENUMs
- `install-all.sql` - Script para instalar todos los schemas en orden

### Schemas por Tabla
- `profiles.sql` - Perfiles de usuario
- `roles.sql` - Roles del sistema
- `profiles-roles.sql` - Relación many-to-many entre perfiles y roles
- `employees.sql` - Empleados y sus horarios
- `doctors.sql` - Doctores
- `patients.sql` - Pacientes
- `organizations.sql` - Organizaciones
- `users-organizations.sql` - Relación many-to-many entre usuarios y organizaciones
- `vat-categories.sql` - Categorías de IVA
- `payment-methods.sql` - Métodos de pago
- `expense-categories.sql` - Categorías de gastos
- `expenses.sql` - Gastos
- `functions.sql` - Funciones de la base de datos

## Orden de Instalación

Los archivos DEBEN ejecutarse en este orden debido a las dependencias:

1. `setup.sql` - Configuración inicial
2. `enums.sql` - ENUMs (requerido por múltiples tablas)
3. `roles.sql` - Roles
4. `vat-categories.sql` - Categorías de IVA
5. `organizations.sql` - Organizaciones (depende de vat-categories)
6. `profiles.sql` - Perfiles (depende de enums)
7. `profiles-roles.sql` - Relación perfiles-roles (depende de profiles y roles)
8. `users-organizations.sql` - Relación usuarios-organizaciones (depende de profiles y organizations)
9. `employees.sql` - Empleados (depende de profiles y enums)
10. `doctors.sql` - Doctores (depende de profiles)
11. `patients.sql` - Pacientes (depende de profiles)
12. `payment-methods.sql` - Métodos de pago (depende de enums)
13. `expense-categories.sql` - Categorías de gastos (depende de enums)
14. `expenses.sql` - Gastos (depende de organizations, expense-categories, payment-methods)
15. `functions.sql` - Funciones (depende de todos los schemas anteriores)

## Instalación Rápida

```bash
# Desde el directorio individual:
psql -d tu_base_de_datos -f install-all.sql
```

## Instalación Manual

```bash
# Ejecutar archivos uno por uno:
psql -d tu_base_de_datos -f setup.sql
psql -d tu_base_de_datos -f enums.sql
psql -d tu_base_de_datos -f roles.sql
# ... continuar con el resto
```

## Ventajas de esta Estructura

1. **Modularidad**: Cada schema está en su propio archivo
2. **Mantenibilidad**: Fácil de encontrar y modificar código específico
3. **Dependencias Claras**: Cada archivo documenta sus dependencias
4. **Reutilización**: Los ENUMs están separados y pueden reutilizarse
5. **Debugging**: Más fácil identificar problemas en schemas específicos
6. **Versionado**: Control de versiones más granular por funcionalidad

## Contenido de Cada Archivo

Cada archivo contiene:
- Comentarios explicativos
- Dependencias documentadas
- Creación de tablas/secuencias
- Constraints y índices
- Foreign keys
- Row Level Security (RLS) policies
- Permisos y grants

## ENUMs Compartidos

Los ENUMs están en un archivo separado (`enums.sql`) porque son utilizados por múltiples tablas:

- `contractType` - Usado por `employees`
- `documentType` - Usado por `profiles`
- `expenseCategoryType` - Usado por `expenseCategories`
- `expenseStatus` - Usado por `expenses`
- `gender` - Usado por `profiles`
- `paymentMethodType` - Usado por `paymentMethods`
- `vatCategoryType` - Usado por `vatCategories`

Esto evita duplicación y facilita el mantenimiento de los tipos de datos.