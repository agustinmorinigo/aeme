### Cómo instalar una nueva app frontend que se integre con nuestro design system.
1 - En ./apps/here instalar el nuevo repo de front.

2 - Nuestro design system usa TailwindCSS v4 por lo que para poder acceder al tema, colores, fonts, spacings, variables CSS, etc, es necesario instalar TailwindCSS v4 en el nuevo repo. Usar la documentación oficial. https://tailwindcss.com/docs/installation/using-vite. Mediante la línea de comandos, ingregar al root del nuevo proyecto (NO el root del monorepo) e instalar todo.

3 - En el package.json del nuevo repo, en dependencies del nuevo repo, agregar el package de ui.
Esto nos habilitar a hacer "import { Button } from '@aeme/ui';".
"dependencies": {
  "@aeme/ui": "workspace:*",
},

4 - En el package.json del nuevo repo, en devDependencies del nuevo repo, agregar el package de la config de tailwind.
"devDependencies": {
  "@aeme/tailwind-config": "workspace:*",
}

5 - En ./apps/nuevoRepo/src/index.css o globals.css, agregar la siguiente directiva DEBAJO de la directiva de tw:
@import "@aeme/tailwind-config";

6 - Listo, ahora en el root del monorepo "pnpm install" y luego "pnpm run dev". Esto ya nos habilitará a usar cualquier componente del package/ui y también las clases y utilidades y variables de nuestra config base de tailwind-config. Si el autocomplete de TW o algo no anda, cerrar y volver a abrir VSC.



## Biome:
El monorepo utiliza Biome como linter y formatter, reemplazando así a prettier y esLINT.
Esto es mejor porque SOLAMENTE tenemos un solo archivo de config para lint y format.
Dado que Biome se ejecuta en el root y de forma global, al ejecutar los scripts de Biome del package.json del root, lo va a ejecutar de forma global. Es por esto que no es necesario ejecutar biome en CADA package.
Además, gracias a la config en .vscode/settings.json, TODOS los packages usan la misma sintáxis, reglas, convenciones, etc y todo se formatea en el onsave.
Aún así, si el día de mañana se desea agregar utilidades particulares de Biome para un proyecto en específico, es posible y MUY sencillo. https://biomejs.dev/guides/big-projects/#monorepo
NO hay que instalar biome en ese package, solo crear un nuevo file biome.json de config.



## Husky + Lint-staged + commitlint + commitizen:
El monorepo utiliza esa 4 cosas para .....




## @commitlint/cz-commitlint + commitlint/config-conventional:
El archivo .cz-config.js sirve para Commitizen, una herramienta que te ayuda a crear commits siguiendo una convención específica de manera interactiva.

¿Para qué sirve?
Este archivo configura cz-customizable (un adaptador de Commitizen) para crear commits con formato estandarizado en tu monorepo. Específicamente:

1. Define tipos de commit (feat, fix, docs, etc.) con descripiones y emojis
2. Detecta automáticamente los scopes basándose en los archivos que tienes staged
3. Sugiere scopes inteligentes - si modificaste archivos en unovision-frontend, te sugiere ese scope primero
4. Valida el formato del mensaje antes de hacer el commit

¿Cómo se usa?
En tu package.json tienes el script:
``"commit": "pnpm pre-commit-check && pnpm exec cz"``

Entonces en lugar de hacer:
``git commit -m "fix: algo"``

Haces:
``pnpm commit``

Y te aparece un wizard interactivo que te guía paso a paso:
1. ¿Qué tipo de cambio? (feat, fix, docs, etc.)
2. ¿Cuál es el scope? (te sugiere automáticamente basado en tus archivos modificados)
3. Descripción del cambio.

Ejemplo práctico
Si modificas archivos en apps/unovision-frontend/src/App.tsx, al ejecutar pnpm commit:

- Te sugiere automáticamente ⭐ unovision-frontend (modificado) como scope
- Te asegura que el commit siga el formato: feat(unovision-frontend): add new feature
- Es compatible con tu commitlint.config.js para validación.

Es una herramienta muy útil para mantener consistencia en los commits del equipo! 🚀


## Cómo commitear en este proyecto?
El proyecto usa commitlint, por lo que hay que seguir las convenciones del file "commitlint.config.js" PARA que el proyecto DEJE commitear correctamente.
Para lograr esto tienes dos opciones:

- Opción 1:
- git add .
- git commit -m "seguir convenciones del file"

- Opción 2:
- git add .
- pnpm run commit | pnpm commit. // Esto abre el wizard de cz-commitlint para crear un commit de forma más interactiva.



## Actualizar algo de packages/tailwind-config.
Cuando actualizamos algo en este package, debemos dar de baja el dev y volver a correrlo.