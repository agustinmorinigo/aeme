- ADD DOCKER, GITHUB ACTIONS.
- Agregar doc de setup, requierements (node v22 +, etc), funcionamiento, cómo hacer commits, ec.
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.
- Revisar que en el pnpm run build, en packages/ui también buildea lo de storybook, las stories. Eso no debería ocurrir. Hay que configurar el TSC del build: components.
- Cuando esté prod, chequear de REMOVER los sourcemaps en prod, para q no se vea el source code. También, averiguar cosas de seguridad.
- TODO: Activar SSL config (https://supabase.com/dashboard/project/mwcpgtuaxemxwwvwwiaz/database/settings) de la DB, cuando esté en prod.
- TO DO: EL CHECK QUEDA PENDING INFINITAMENTE LPM. EL CHECK SOLO DEBE ACTIVATRSE CUANDO HAY CAMBIOS. SI SOLO CAMBIO UN README, LOS CHECKS DEBEN NI SIQUIERA ACTIVARSE.
- Falta agregar el "pnpm run type-checks" al CI de backend, para q si cambian los types de la db, el front debería fallar y no correr nada. Por ej, si una prop cambia de number a string, el front fallará y ni siquera debería dejar mergear el pr, dado q va a fallar el job de test.
- PUEDEN HACER HORAS EXTRAS EN REMOTO.

PRÓXIMO TODO:
- EDITAR EMPLOYEE FUNCIONA MAL. los horarios no se vuelven válidos a pesar de mostrarse en el form.