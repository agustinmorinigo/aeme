TO DO:
- Agregar review de IA (Github Copilot o CodeRabbit o uno free) con validaciones BIEN robustas en base a reglas mías.
- IMPLEMENTAR KEYS FACTORY PARA LAS KEYS DE REACT-QUERY.
- ELEGIR CÓMO SE HABLA AL USUARIO. "ELIGA" O "ELIGE" O "ELEGÍ". Unificar fonts, shdaows, etc.
- Cuando solo elijo "empleado", a veces aparece disabled los times y no los puedo corregir. Cuando agrego solo "empleado", se agregan "admin" y "doctor".
- Salario neto da error pero el front no muestra ningún error.
- Los errores del back deben mostrarse bien, se muestran mal en el toast.
- Si estoy en el step 4 con el botón en etsado "Deshacer cambios", voy para atrás y cambio el file y luego vuelvo, ese botón sigue en ese estado. Eso no puede pasar. Si cambia el file se invalida todo eso...
- En CADA paso hay que tener un useEFFECT Y/O LISTENER PARA Q SI ALGO SE MODIFICÓ EN LOS STEPS, VUELVA AL STEP INICIAL. SOOBRE TODO ESO ES IMPORTANTE CON UN USE EFFECT "[]".