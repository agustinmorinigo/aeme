TO DO:
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.
- IMPLEMENTAR KEYS FACTORY PARA LAS KEYS DE REACT-QUERY.
- ELEGIR CÓMO SE HABLA AL USUARIO. "ELIGA" O "ELIGE" O "ELEGÍ". Unificar fonts, shdaows, etc.
- Cuando solo elijo "empleado", a veces aparece disabled los times y no los puedo corregir. Cuando agrego solo "empleado", se agregan "admin" y "doctor".
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
- Agregar el textarea al packages/ui.
- Agregar una variante al input file, para q tenga otra apariencia pero siga funcionando igual.
- Crear componente unificado de Modal. Tendrá header, body y footer. El footer tendrá los botones de acción. Esto es para no repetir el código de los botones en cada modal.
Y para meter dentro del body todo y no tener probleams con el overflow ni eso. Header tendrá la misma forma q el add-justification-modal.
- Quitar ENUMS y reemplazarlos por string literal union types.



TODOS EN PRÓXIMOS PRs:
- Sacar persistencia del reporter. que no se guarde NADA de eso en el LS.
- Sacar la persistencia del reporter, PERO agregar el form de employees en el step de validación de usuarios, PARA evitar q el usuario salga y entre.
- Arreglar "parseQueryParams" ya que se asume que los params van a venir, y no siempre es así.
- PONER EL MISMO SEACHER QUE TIENE EL JUSTIFICATIONS, PERO EN LA TABLA DE USERS. y keepPreviousData.
- DENTRO del reporte "/attendance/report" al crear o editar una justificación, Los campos de tipo DatePicker "Fecha de inicio" y "Fecha de fin" DEBEN abrir el año y mes que se seleccionó en el reporte y NO el año/mes actual.