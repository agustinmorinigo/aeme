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