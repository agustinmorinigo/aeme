- ADD DOCKER, GITHUB ACTIONS.
- Agregar doc de setup, requierements (node v22 +, etc), funcionamiento, cómo hacer commits, ec.
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.

- PRÓXIMO TODO 3:
- Separar las utils y eso, claramente lo que se pueda, en packages/tools o algo así.
- Lograr levantar o migrar el backend de unovision, separar local y prod.
- Quitar lucide-react como dependencie de unovision-frontend. Los íconos DEBEN venir de packages/ui o un package aparte. Es algo que se comparte y NO debe hacerse así.

- PRÓXIMO TODO 4:
- Levantar en prod backend y frontend.

- PRÓXIMO TODO 5:
- Agregar CI/CD básico en back y front para q al mergear, se suba a prod solo.

- PRÓXIMO TODO 6:
- Agregar testing y validaciones al CI/CD muy BÁSICO.

- PRÓXIMO TODO 6 BIS:
- PONER TODO EN kebab-case, los NOMBRES LOS FILES DENTRO DE LAS CARPETAS DEL FRONT, client/*, services/*
- En packages, tengo q poner el client de Supabase (nose esto), el TYPES de la db YYYY el shared-schema.

- PRÓXIMO TODO 6 BIS 2:
- Ver si se puede q, cuando estoy parado en el root del monorepo, ejecuto "pnpm run dev" y LOGRO levantar el "npx supabase start" y así logro que se levante TODO con un solo comando.... Sino tendría que ejecutar 2 comandos.

- PRÓXIMO TODO 7:
- Respetar el mismo FLUJO, pero agregar Docker, para trabajar como corresponde.

- PRÓXIMO TODO 8:
- Continuar trabajando en unovisión

- PRÓXIMO TODO 9:
- Revisar que en el pnpm run build, en packages/ui también buildea lo de storybook, las stories. Eso no debería ocurrir. Hay que configurar el TSC del build: components.
- Cuando esté prod, chequear de REMOVER los sourcemaps en prod, para q no se vea el source code. También, averiguar cosas de seguridad.

- PRÓXIMO TODO 10:
- QUITAR COMENTARIOS IRRELEVANTES O EN ESPAÑOL O NO PROLIJOS, EN TODO EL MONOREPO.


- PRÓXIMO TODO 11:
- MEJORAR DOCS DE TODOS LOS README, RENOMBRARLOS, ELIMINAR LOS Q NO CORRESPONDAN, ETC.