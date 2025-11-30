Dentro de esta carpeta se encuentran las entidades de la DB. Es un espejo de eso.
CADA tabla debe tener sus propios types independientes. Nada puede importarse, excepto los enums.

Esto capaz que después tiene sentido que se separe por módulos o nose. Cosa de que no se importe todo, sino solo lo q se necesita. Aunque esto no influye en el bundle. Y si hay lazy loading, solo se va usar lo q se requiere en la UI.