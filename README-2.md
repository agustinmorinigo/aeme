### Cómo instalar una nueva app frontend que se integre con nuestro design system.
1 - En ./apps/here instalar el nuevo repo de front.

2 - Nuestro design system usa TailwindCSS v4 por lo que para poder acceder al tema, colores, fonts, spacings, variables CSS, etc, es necesario instalar TailwindCSS v4 en el nuevo repo. Usar la documentación oficial. https://tailwindcss.com/docs/installation/using-vite. Mediante la línea de comandos, ingregar al root del nuevo proyecto (NO el root del monorepo) e instalar todo.

3 - En el package.json del nuevo repo, en dependencies del nuevo repo, agregar el package de ui.
"dependencies": {
  "@repo/ui": "workspace:*",
},

4 - En el package.json del nuevo repo, en devDependencies del nuevo repo, agregar el package de la config de tailwind.
"devDependencies": {
  "@repo/tailwind-config": "workspace:*",
}

5 - En ./apps/nuevoRepo/src/index.css o globals.css, agregar la siguiente directiva DEBAJO de la directiva de tw:
@import "tailwindcss";
@import "@repo/tailwind-config";

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