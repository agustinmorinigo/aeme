TO DO:
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.
- IMPLEMENTAR KEYS FACTORY PARA LAS KEYS DE REACT-QUERY.
- ELEGIR CÓMO SE HABLA AL USUARIO. "ELIGA" O "ELIGE" O "ELEGÍ". Unificar fonts, shdaows, etc.
- Cuando solo elijo "empleado", a veces aparece disabled los times y no los puedo corregir. Cuando agrego solo "empleado", se agregan "admin" y "doctor". PARA SOLUCIONAR ESTO, SIMPLEMENTE SACAR LOS LAZY LOADINGS DE LOS FORMS.
- Salario neto da error pero el front no muestra ningún error.
- Los errores del back deben mostrarse bien, se muestran mal en el toast.
- Si estoy en el step 4 con el botón en etsado "Deshacer cambios", voy para atrás y cambio el file y luego vuelvo, ese botón sigue en ese estado. Eso no puede pasar. Si cambia el file se invalida todo eso...
- En CADA paso hay que tener un useEFFECT Y/O LISTENER PARA Q SI ALGO SE MODIFICÓ EN LOS STEPS, VUELVA AL STEP INICIAL. SOOBRE TODO ESO ES IMPORTANTE CON UN USE EFFECT "[]".



PRÓXIMOS TODOS IMPORTANTES:
- AGREGAR token design al package, BIEN solidos. que tenga colores, tipografías, shadows, spacings, etc. y que desactive las cosas por default de TW. Esto va a requerir un FUERTE refactor de TODOS los componentes para que usen esos tokens o esas utilities built-in.
- Sacar de TODOS lados los enums. Simpleemtne usar strings literals types.
- Intentar REMOVER el "hibrid" monorepo y pasar a utilizar solo un runtime. Ver si eso es posible. En caso de que no, por lo menos QUITAR los relative paths y usar path aliases. de TODOS los packages pero principalemten el de supabase functions, supabase-client y contracts.
- En cuanto pueda, MIGRAR frontend a feature-sliced architecture BIEN sólido, y el backend tambié nalgún cambio más sólido.
- Unificar componente de tablas, están repetidos en tabla del step 5 y en la creación de usuarios. Pedirle a la IA que lo haga.



TODO:
- Unificar en un único lugar el getFileExtensions, getFileMimeTypes y getFileTypeLabels. de "apps/unovision-frontend/src/modules/justifications/constants/create-justification-file.ts"
- Arreglar "parseQueryParams" ya que se asume que los params van a venir, y no siempre es así.
- NO ESTÁ FUNCIONANDO EL FORMAT ON SAVE, SE HABRÁ DESCONFIGURADO ALGO.
- Agregar manejo de error boundaries o globales de una mejor manera pq hoy explota todo.
- Va a faltar un step más para cargar las hs extras de home office. esto implica desarrollo completo. back, front, db, etc.
- Analizar si no es mejor que los botnoes de volver y siguiente estén arriba de todo en vez de abjao. en el reporte.
- validar q employeesInfo o el excel traiga hh:mm:ss y no hh:mm
- En el paso del step final, también debería haber un botón de generar reporte en excel o algo así...