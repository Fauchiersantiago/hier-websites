# Lib

Carga y validación de datos, transformaciones deterministas y utilidades compartidas.

`site-bundle.ts` es la puerta de entrada previa al renderer: carga los tres documentos
del sitio, aplica contratos y reglas cruzadas, y comprueba que los archivos declarados
en el asset manifest existan dentro del directorio permitido.
