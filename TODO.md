TO DO:
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.
- IMPLEMENTAR KEYS FACTORY PARA LAS KEYS DE REACT-QUERY.
- ELEGIR CÓMO SE HABLA AL USUARIO. "ELIGA" O "ELIGE" O "ELEGÍ". Unificar fonts, shdaows, etc.
- Cuando solo elijo "empleado", a veces aparece disabled los times y no los puedo corregir. Cuando agrego solo "empleado", se agregan "admin" y "doctor". PARA SOLUCIONAR ESTO, SIMPLEMENTE SACAR LOS LAZY LOADINGS DE LOS FORMS.
- Salario neto da error pero el front no muestra ningún error.
- Los errores del back deben mostrarse bien, se muestran mal en el toast.
- Si estoy en el step 4 con el botón en etsado "Deshacer cambios", voy para atrás y cambio el file y luego vuelvo, ese botón sigue en ese estado. Eso no puede pasar. Si cambia el file se invalida todo eso...
- En CADA paso hay que tener un useEFFECT Y/O LISTENER PARA Q SI ALGO SE MODIFICÓ EN LOS STEPS, VUELVA AL STEP INICIAL. SOOBRE TODO ESO ES IMPORTANTE CON UN USE EFFECT "[]".
- Agregar testing BIEN sólido al acceso por rutas. Que un empleado no pueda acceder a rutas de admin, etc. y que eso esté testeado.



PRÓXIMOS TODOS IMPORTANTES:
- AGREGAR token design al package, BIEN solidos. que tenga colores, tipografías, shadows, spacings, etc. y que desactive las cosas por default de TW. Esto va a requerir un FUERTE refactor de TODOS los componentes para que usen esos tokens o esas utilities built-in.
- Sacar de TODOS lados los enums. Simpleemtne usar strings literals types.
- Intentar REMOVER el "hibrid" monorepo y pasar a utilizar solo un runtime. Ver si eso es posible. En caso de que no, por lo menos QUITAR los relative paths y usar path aliases. de TODOS los packages pero principalemten el de supabase functions, supabase-client y contracts.
- En cuanto pueda, MIGRAR frontend a feature-sliced architecture BIEN sólido, y el backend tambié nalgún cambio más sólido.



TODO:
- Unificar en un único lugar el getFileExtensions, getFileMimeTypes y getFileTypeLabels. de "apps/unovision-frontend/src/modules/justifications/constants/create-justification-file.ts"
- Arreglar "parseQueryParams" ya que se asume que los params van a venir, y no siempre es así.
- Agregar manejo de error boundaries o globales de una mejor manera pq hoy explota todo.
- Va a faltar un step más para cargar las hs extras de home office. esto implica desarrollo completo. back, front, db, etc.
- Analizar si no es mejor que los botnoes de volver y siguiente estén arriba de todo en vez de abjao. en el reporte.
- validar q employeesInfo o el excel traiga hh:mm:ss y no hh:mm
- En el paso del step final, también debería haber un botón de generar reporte en excel o algo así...
- Para cuando tenga q agregar un calendario full, usar https://ilamy.dev/demo/.
- Crear item o página en el sidepanel "Calendario" o "Eventos" que funcione igual q el step 6 del reporter, pero sea un calendar.
- Crear un ítem o págin en el sidepanel "Justificaiones" que permita ver todas las justificaciones creadas, aprobarlas, rechazarlas, etc.
- En un TODO a futuro, los steps de justifications y días excepcionales DEBEN ser un calendario y NO una tabla. Esto va a requerir un desarrollo importante, pero es lo ideal para la UX.
- UNIFICAR ALERTS CON SUS VARIANTES Y ESO!! QUE LO HAGA LA IA!!
- Más adelante, analizar y ver si es posible que en los schemas donde se usa type enum, ahora que no se usan enums, se puede importar los types arrays directamete de supabase-client, eso sería genial y estaría todo sync.
- En backend, hay muchos @ts-ignore y transformaciones raras porque se casteaba de type a enum. Podría quitar eso porque ya no es necesario.






// AGREGAR UNA DESCRIPCIÓN SIMILAR A ESTA DE ABAJO, EN EL AGENT O ALGÚN SKILL DE BACKEND.
Utilizando el agente de backend con sus respectivas skills y Opus, necesito que desarrolles esto nuevo. A grandes rasgos, los pasos son (respetar la secuencia):
1. Realizar una nueva migración para agregar una nueva tabla a la db. Guiate de "apps/unovision-backend/supabase/migrations/20251217023012_add_schemas_for_attendance_justifications.sql" para cosas como el ON DELETE CASCADE, triggers, políticas y RLS, etc.
2. Declarar la nueva entidad en packages/supabase-client. Para los types NO crees enums, solo literal unión types en el mismo archivo donde declaras la/s interface/s de la nueva entidad.
3. Regenerar los tipos de la base de datos (ósea el archivo de packages/supabase-client/src/types/database.types.ts). No lo hagas manualmente sino con el comando adecuado del package.json del root.
4. Crear los contractos correspondientes en packages/contracts.
Vas a tener que crear los contratos de functions/ con sus respectivos archivos. Guiate MUCHO de functions/justifications, ya que son similares a lo que hay que desarrollar. Recordá NO repetir interfaces en común o bases.
Vas a tener que crear los contratos de schemas/ . Guiate MUCHO de schemas/justifications, solo NO crees carpetas, archivos simples.
5. Crear la edge function en apps/unovision-backend/functions/ (agregar el verify_jwt false al igual que el resto). Crealo en el nivel que te dije, no dentro de otra edge function. Para esto, también tomá de guía las funciones dentro de apps\unovision-backend\supabase\functions\attendance\handlers\justifications y su invocador, ya que serán MUY similares.
Solo eso, luego continuamos con otras cosas.

Te paso el schema:
Nombre de la tabla: "organizationEvents"
Campos:
id: 		uuid NOT NULL.
organizationId: uuid NOT NULL (FK a id de organizations).
type            public"."organizationEventType" NOT NULL,
startDate 	date NOT NULL.
endDate 	date.
description   	character varying(200),
createdAt     	timestamp with time zone DEFAULT "now"() NOT NULL.
updatedAt     	timestamp with time zone DEFAULT "now"() NOT NULL.

Los valores de organizationEventType son: "holiday", "workday noon", "early closing", "power outage", "time recorder failure", "non working week", "special event", "climate issues", "other".

Otros:
- Agregar contraint para validar esto:
-- Add check constraint to ensure endDate is after to startDate
ALTER TABLE "public"."justifications"
  ADD CONSTRAINT "check_date_range"
    CHECK ("endDate" IS NULL OR "endDate" > "startDate");
















// AGREGAR UNA DESCRIPCIÓN SIMILAR A ESTA DE ABAJO, EN EL AGENT O ALGÚN SKILL DE FRONTEND.
Excelente trabajo en el backend. Ahora pasemos al frontend. Para esto, usa Opus, el agente de frontend y sus skills.
Lo que desarrollaste recién de backend, lo vamos a utilizar en el frontend en apps/unovision-frontend/src/modules/attendance/components/stepper/step-6/index.tsx.
A grandes rasgos, los pasos son (seguí el mismo orden):
1. En src/services/api/organization-events DEBES declarar TODOS los servicios. Guiate de src\services\api\attendance\justifications ya que te va a quedar MUY parecido.
2. En src/modules/organization-events/queries crea las queries. Guiate de apps\unovision-frontend\src\modules\justifications\queries
3. En src/modules/organization-events/schemas crea los schemas. Guiate de apps\unovision-frontend\src\modules\justifications\schemas
4. Crea las constants/, stores/ y utils/ de la forma muy similar a apps\unovision-frontend\src\modules\justifications. Obviamente constants tendrá el file de options solamente.
5. Crea los components/ también guíate de apps\unovision-frontend\src\modules\justifications. TODO será MUY similar, SOLO que obviamente los forms será con los campos necesarios para esta feature, pero el resto será igual.
6. Una vez que tenés todo eso, rellena el frontend/src/modules/attendance/components/stepper/step-6/index.tsx de forma MUY similar a frontend/src/modules/attendance/components/stepper/step-5/index.tsx
Con eso deberíamos estar.