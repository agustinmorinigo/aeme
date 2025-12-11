En el step 0, estaría bueno hacer una especie de tutorial y/o instructivo sobre cómo funciona y se genera el reporte.
Los mins de breaks, a partir de cuánto empiezan a contar los mins de llegadas tardes (4), cuándo empieza a corre la hs extra (40 min), bla bla bla. Va a ser MUY útil.

¿Cómo funciona?
El reporte de asistencia se utiliza para calcular correctamente la liquidación final de los empleados a los que su asistencia repercute en su sueldo.

Para hacer esto, es necesario cargar y validar unos datos, para que el sistema pueda calcular correctamente las métricas de asistencia.

A continuación, se detallan los requisitos y reglas para que todo funcione correctamente.

Requisitos y reglas
- Todos los empleados que requieran control de asistencia, deben ser dado de alta en el sistema (Gestión de usuarios) USANDO el role "empleado".
Allí deberá completar la configuración de laboral del empleado. Días y horarios que trabaja y/o hace home office.

- Los empleados que aparezcan en el Excel del fichaje, DEBEN estar dado de alta en el sistema.

- El excel debe:
	- NO tener celdas vacías.
	- Contener el fichaje de TODO un mes individual. Desde el 1 hasta el último día del mes.
	- Debe ser de UN solo mes. NO se puede subir un fichaje de 2 meses juntos.

- Aunque no es obligatorio, es ideal que para un mejor cálculo del reporte, cada empleado tenga 4 registros bien ordenados en CADA DÍA que asistió. Estos 4 registros deben seguir estas reglas:
	- Deben ser: "In", "Break", "Break", "Out".
	- En ese orden, cada horario debe ser superior al siguiente. Ej:
		- In: 09:00, Break: 14:00, Break: 14:30, Out: 18:00

Cómo se calculan las cosas
A continuación se detalla cómo se calculan las inasistencia justificada, inasistencias justificadas, llegadas tardes, hs extras, tiempo de break, etc.

Cálculo de inasistencia justificada:
Se considera que un empleado tiene una inasistencia justificada cuando NO tiene registros de fichaje en X día PERO se cargó una justificación para ese día, para ese empleado. En este caso, ese día NO se cuenta en "cantidad de días a DESCONTAR".

Cálculo de inasistencia injustificada:
El empleado no fichó y no hay justificación cargada para ese día. Se le descontará el día.

Cantidad de llegadas tardes:
Es la cantidad de días que llegó tarde.
El empleado fichó el INGRESO más tarde que su horario configurado, INCLUYENDO el tiempo de tolerancia (a priori, 0 min). Ej: Lunes tiene configurado que ingresa a las 09:00hs. El lunes X ingresó a las 09:01hs o 09:05hs.
Es un contador SOLAMENTE.

A partir de 4 días que llegó tarde, se contabilizan la TOTALIDAD de minutos que llegó tarde, y todos esos minutos SE LE DESCUENTA DE LAS HORAS EXTRAS. SI NO HIZO HORAS EXTRAS, SE AGREGA EN LA COLUMNA "CANTIDAD DE TIEMPO QUE DEBE".

Cantidad de hs extras:
Si le sobran 10 min del break, no SE HACE NADA.
Si se tomó 10 min de más del break, se le descuenta de las hs extras. Funciona igual que las llegadas tarde esta parte.

La cantidad de hs extras de un día se calcula comparando hsEntradaReal vs hsEntradaConfigurada yyyy hsSalidaReal vs hsSalidaConfigurada. Si alguno da 40min o más, se contabiliza como 1hs extra. El "corte" se da cada 40min. Si hizo 39min, no, 40min si, 41min si, 79min = 1hs extra. 80min = 2hs extra....

Tiempo de break:
El tiempo de break se calcula en base a la cantidad de horas DIARIAS que trabaja el empleado.
Si trabaja 6hs o menos, 20min de break.
Si trabaja 7hs o 8hs, 30 min de break.
Si trabaja 9hs, 40min de break.
Si trabaja 10hs o más, 1hs de break.

Cargar justificaciones y/o exepciones de empleados
Esta sección se utiliza para cargar las inasistencias justificadas de los empleados, de esta forma, no se le descuenta el día. Si faltó y no se cargó la justificación acá, si se le descuenta..
"Faltó porque su hijo se enfermó", "Entró tarde justificado porque se le quedó el auto", "Salió temprano justificado pq tenía X cosa", "Tiene vacaciones", "Tiene día de estudio", "Tiene X motivo"

Cargar eventos de la org
Esta sección se utiliza para cargar los eventos que hicieron que la org permanezca cerrada o sin control de fichaje. Por ejemplo, "se trabajó hasta el mediodía", "se trabajó hasta las 3pm", "se cortó la luz", "feriado", "día no laboral", "semana de NO trabajo, semana de navidad y año nuevo..", "dejó de funcionar el fichador".

Casos bordes y cómo resolverlos
Hay casos que son muy extremos y raros, pero pueden ocurrir y es importante saber cómo solventarlos.
- Hizo home office y faltó injustificadamente: En este caso hay que descontarle el día. El problema es que al no fichar y tener HO, el sistema lo dará como que asistió. Lo que hay que hacer es "cargar excepción falta injustificada HO" y listo, el sistema entenderá...
PD: EN MI CELU TENGO MÁS DE ESTOS CASOS, VERLOS Y CARGARLOS ACÁ...







En mi app, necesito crear un módulo de "Gestión de asistencia" con las siguientes características.
La vista será un "stepper" de 6 pasos.
Paso 1: Instructivo. Se detalla cómo funciona el módulo, cómo se hacen los cálculos, etc. Más abajo te compartiré el texto, mejoralo para hacerlo mucho más sencillo.
Paso 2: Cargar datos básicos. En este punto el usuario completa datos necesarios para avanzar al siguiente step. Es un form con 3 campos:
- Mes y año: Un selector de mes y año (Utilizar el que propone Shadcn) que hace referencia al mes y año del cual se va a generar el reporte.
- Organización: Un select con opciones de organiziones.
- Archivo de fichaje: Un input file, que permite subir UN solo file de excel (de cualquier tipo y/o año).
Paso 3: Validar y corregir datos. En este paso, el usuario verá qué cosas están mal en el Excel y qué hacer con cada uno de ellos. Arma algo simple, este step luego lo pulimos. Mockea data, no hagas calculos acá.
Paso 4: Cargar justificaciones y excepciones. En este paso el usuario CARGA inasistencias justificadas, llegas tardes, vacaiones, etc. Acá también arma algo sencillo y luego lo pulimos.
Paso 5: Marcar días excepcionales. Acá, el usuario carga eventos que hayan ocurrido en la organización, como "feriado", "se trabajó hasta el mediodía", "se trabajó hasta las 14:00hs", "se cortó la luz", "dejó de andar el fichero", "ocurrió X problema", "No se trabajó la semana X", etc. También, acá luego lo pulimos.
Paso 6: Reporte final. Se muestra para cada empleado, separado en semanas, cuántos días faltó, cuántos no, cuántas llegadas tardes, sus justificaciones, sus hs extras, su tiempo a favor, su tiempo que debe, etc. Esto también luego lo pulimos. Mockeá la data, no hagas cálculos.

- Se debe permitir la navegación entre steps. Volver, continuar, etc.
- Cuando se llega al step 6, TODOS los inputs de los steps se deshabilitan. El stepper entra en modo "detalles".

- Te paso el texto del step 1. Es el .txt