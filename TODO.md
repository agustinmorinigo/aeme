- ADD DOCKER, GITHUB ACTIONS.
- Agregar doc de setup, requierements (node v22 +, etc), funcionamiento, cómo hacer commits, ec.
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.

- PRÓXIMO TODO 9:
- Revisar que en el pnpm run build, en packages/ui también buildea lo de storybook, las stories. Eso no debería ocurrir. Hay que configurar el TSC del build: components.
- Cuando esté prod, chequear de REMOVER los sourcemaps en prod, para q no se vea el source code. También, averiguar cosas de seguridad.

- PRÓXIMO TODO 11:
- QUITAR COMENTARIOS IRRELEVANTES O EN ESPAÑOL O NO PROLIJOS, EN TODO EL MONOREPO.
- MEJORAR DOCS DE TODOS LOS README, RENOMBRARLOS, ELIMINAR LOS Q NO CORRESPONDAN, ETC.

- PRÓXIMO TODO 12:
- SIGUIENDO LA STRUCTURE PROPUESTA EN https://claude.ai/chat/a720cef3-379e-4295-a587-dffdf8a3e1e2, ENCONTRRAR UNA FORMA DE ESTANDARIZAR LAS RESPONSES DE LAS EDGE FUNCTIONS.
- TODO: Activar SSL config (https://supabase.com/dashboard/project/mwcpgtuaxemxwwvwwiaz/database/settings) de la DB, cuando esté en prod.

PRÓXIMO TODO:
- EN OTRO PR: Crear un package tipo "shared-schemas/" que sirva para compartir los schemas compartidos entre front y back de Zod.
- SEGUIR: https://claude.ai/chat/a720cef3-379e-4295-a587-dffdf8a3e1e2

TO DO CI BACKEND:
- TO DO: EL CHECK QUEDA PENDING INFINITAMENTE LPM. EL CHECK SOLO DEBE ACTIVATRSE CUANDO HAY CAMBIOS. SI SOLO CAMBIO UN README, LOS CHECKS DEBEN NI SIQUIERA ACTIVARSE.
- Falta agregar el "pnpm run type-checks" al CI de backend, para q si cambian los types de la db, el front debería fallar y no correr nada. Por ej, si una prop cambia de number a string, el front fallará y ni siquera debería dejar mergear el pr, dado q va a fallar el job de test.





PRÓXIMO TODO:
1. Crear un package/tools para meter allí el "toSnakeCase" y el "toCamelCase" y eso...
2. Reemplazar supabase en front x edge functions.





- AGREGAR EN LA DOCUMENTACIÓN DE CÓMO HACER UNA MIGRACIÓN, QUE ES NECESARIO ACTUALIZAR EL packages/supabase-client/entities también. Y VER Q NO AFECTE EN NADA.



-EDITAR EMPLOYEE FUNCIONA MAL. los horarios no se vuelven válidos a pesar de mostrarse en el form.
- Cuando se CREA UN USUARIO, HAY QUE INVALIDAR EL GET EMPLOYEES BY ORG, YA QUE LA INFO CAMBIÓ. PERO PARECE QUE YA LO ESTÁ HACIENDO...
-PUEDEN HACER HORAS EXTRAS EN REMOTO. 



- UNIFICAR RESPONSES ERORR Y SUCCESS EN EL FRONTEND.