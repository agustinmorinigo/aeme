## Agregar funcionalidad de gastos.
## Siempre mirar que las features son mobile friendly.
## IMPLEMENTAR KEYS FACTORY PARA LAS KEYS DE REACT-QUERY.
## Agregar testing a cosas básicas y utils.
## Agregar lazy loading al routing.
## Agregar bot que hace reviews a mis PRs.
## Agregar CI/CD, previews y Docker más adelante.
## Agregar Storybook.

PRÓXIMOS TODO:
- Una vez implementado perfiles con roles + rutas limitadas a los roles + redirect en base a roles o selectedRole + sección "gestión de usuarios" para admin, probar PROFUNDAMENTE que funciona bien todo el tema de routing limitado por public, private y por roles. Ver si se puede hacer con testing.



- ELEGIR CÓMO SE HABLA AL USUARIO. "ELIGA" O "ELIGE" O "ELEGÍ". Unificar fonts, shdaows, etc.



EN UN PRÓXIMO PR:
- METER VALIDACIONES CON TRIGGERS ROBUSTAS.

Validaciones:
- Agregar validaciones robustas a las Edge functions que agregan, borran o editan usuarios. SOLAMENTE deben poder acceder allí, los usuarios con role admin, o usuarios con determinado email.



TO DO FRONTEND:
2 - Validar rutas, guardar profile, manejar rutas por default, rutas x role, ver q funciona y que nada se cruza. Validar orgs y roles del user, que tenga!!!
4 - AL ADMIN, HABILITAR SECCIÓN DE USUARIOS PARA DAR DE ALTA, EDITAR O ELIMINAR USUARIOS.
5 - HABILITAR FEATURE DE 'ASISTENCIA' PARA ADMIN Y CONTADORES.

- evitar refetch de la data del user cuando se refresca la page.

2 - LUEGO DEL REGISTRO DE USUARIOS, PROBAR TODO EL FLUJO DE GUARDS, REDIRECT, ALLOWROLES, ALLOWROUTES, QUE NO SE MEZCLEN SIDEBAR ITEMS, O QUE UN PATIENTE NO PUEDA ACCEDER AL /ADMIN, /PATIENTS, ETC, ETC, ETC.



- Conectar Supabase frontend, con el Supabase local. Ver cómo se hace eso...	

FEATURE ASISTENCIA:
- Hay un caso MUY borde. Es remoto y faltó. Ver cómo manejar eso. Capaz permitir cargar ausencia manual.

FIX:
- El check TS al commitear NO está funcionando.... O el BIOME.
- BUG:
	- En el frontend estoy mezclando bun con pnpm. ESTÁ MAL!!!! USAR UNO.
- (Sacar de la búsqueda mi user, según email. BIEN por detrás).


TO DO:
- Agregar campos "created_at" y "udpated_at" a los profiles, para ordenar en base a esas fechas timestamps.
- Cuando hago edit user, nose por qué, el phone me marca siempre como error.... Si no tengo tell, NO tiene q pasa nada.


- Unificar las 3 Edge functions en UNA SOLA, para evitar enfriamiento y eso, para q esté constantemente activa la Edge.
- El delete funciona a medias. Que la Edge function ejecute una transacction de sql para asegurar la integridad de TODO.




TO DO IMPORTANTÍSIMO:
AGREGAR ALGUNA SANITIZACIÓN EN LA ENTRADA DE DATOS DEL EXCEL, YA QUE ALLÍ PUEDEN INYECTAR CUALQUIER COSA!!!!






- Hay un bug en el créate usuario cuando clickeo y desclikeo el role empleado.
- Luego de que el créate es exitoso, NO se hace el refresh de la tabla.
- Agregar skeletons como loaders donde se carguen cosas...a




TODO: AGREGAR query-keys-factory.







TODO: UNA VEZ TEMRINADO TODO LO DE ASISTENCIA, DAR DE ALTA AMBOS SETUPS DE FORMA PROLIJA, VER QUE LIGHT Y DARKMODE FUNCIONAN BIEN, METER REFACTOR EN ALERTS, METER QUERY-KEYS FACTORY, ETC, ETC, ETC.


TODO: SETUPEAR DATE-FNS DE FORMA GLOBAL.