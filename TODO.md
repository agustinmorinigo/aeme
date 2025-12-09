- Agregar doc de setup, requierements (node v22 +, etc), funcionamiento, cómo hacer commits, ec.
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.
- Revisar que en el pnpm run build, en packages/ui también buildea lo de storybook, las stories. Eso no debería ocurrir. Hay que configurar el TSC del build: components.
- TODO: Activar SSL config (https://supabase.com/dashboard/project/mwcpgtuaxemxwwvwwiaz/database/settings) de la DB, cuando esté en prod.
- PUEDEN HACER HORAS EXTRAS EN REMOTO.
- Crear en el coso de diagramas de db, el diagrama actual de la db. y linkearlo bien bien en una carpeta junto con lo de coda.

PRÓXIMO TODO:
- Agregar o habilitar remote caching de Turborepo a las github actions. Q sea bien óptimo eso. Debe ser una config boluda.
- Revisar time de employees, ver cómo se guardan, cómo se reciben y cómo se muestran...
- Agregar tests a flujo de validations. Debe correr algo de turbo repo y package.json del root. Los packages y apps que van a tener testing básico son "packages/ui" y "apps/unovision-frontend".
- Al final de TODO, habilitar el hook "pre-push", debería correr types y tests checks, usando Turborepo y ver el lint del commit msg.