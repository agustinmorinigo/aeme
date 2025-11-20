Prerequisitos:
- Tener instalado de forma global, Supabase. 

Cómo dar de alta el backend:
- Abrir Docker Desktop
- Con el CMD, ir a apps/unovision-backend
- Ejecutar "npx supabase start"
  - Después de un tiempo, esto levantará todos los servicios en Docker.

- Para parar todos los servicios "npx supabase stop"

Conectar Supabase local con el remoto:
- Primero hay que hacer supabase login y después supabase link para linkear proyecto local con remoto.
- https://supabase.com/docs/reference/cli/supabase-login


Comandos útiles del CLI para migraciones, edge functions, deploys, seed, secrets, domains, etc:
- https://supabase.com/docs/reference/cli/global-flags


Mostrar info del local development actual (requiere que esté levantado el Supabase en Docker):
- npx supabase status

Generar types automáticamente:
- https://supabase.com/docs/reference/cli/supabase-gen