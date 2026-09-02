# Mi entrega (bloque 2)


## Cómo ejecutarlo
Abrir la terminal (CMD) en la carpeta del proyecto y seguir estos pasos:
1. Instalar dependencias:
```bash```
npm install
2. Configurar las variables en la terminal:
   set API_BASE=<URL_DE_LA_API>
   set API_TOKEN=<TU_TOKEN>
3. Ejecutar tests
    npm test
4. Ejecutar aplicación
    npm start
5. Abrir el navegador en http://localhost:3000

## Por qué elegí este lenguaje
A pesar de no ser un lenguaje en el que tenga tanta experiencia previa,consideré que era el mas optimo para trabajar este tipo de "ejercicio".Además aunque mi experiencia principal es en JavaScript, su similitud con TypeScript hizo que fuera la opción más cómoda y lógica para resolver.

## Qué decidí y por qué

Primeramente me fijé en que el formato que exige la policía es distinto al que entrega la API interna del alojamiento. Por ello, creé una capa de mapeo para traducir los datos de los huéspedes a lo que el validador policial espera recibir.

Seguidamente me di cuenta que el codigo ya creado en client.ts solo recuperaba la primera página de huéspedes. Al analizar la API vi que los resultados pueden venir paginados, así que implementé un bucle para recorrer todas las páginas y no dejar a ningún viajero fuera.

Al arrancar la aplicación, la API devolvía inicialmente el lote en estado pending, impidiendo ver el veredicto final. Añadí un bucle de espera activa hasta que el SES liquida el lote y devuelve el estado definitivo.

## Qué dejé fuera a propósito

Por falta de tiempo no llegué a implementar algo para absorber los errores 504  que la API  devolvía de vez en cuando.

## Qué me costó más
Ajustar el mapeo de datos para que la policia lo validase, así como entender algunos comportamientos concretos de la API.

## Cuánto tiempo me llevó
2 horas y 30 minutos aproximadamente.


## Comentarios extra fuera del tiempo

Para el bloque 1 no conseguí realizar un analísis tan preciso como me hubiera gustado, me tomo su tiempo comprender el codigo y encontrar algunos fallos. Pero considero que 
con algo mas de tiempo podria haber encontrado más.

Dedicar más minutos de los previstos a asentar la base del primer bloque hizo que fuera más justo de tiempo en esta parte. Por esa razón prioricé tener el programa completo y funcional , dejando conscientemente fuerael manejo de los errores 504 de la API.

La IA fue principalmente una herramienta de apoyo: más allá de generar código, me sirvió para contrastar ideas y validar decisiones técnicas.

En tareas como el mapeo de datos al formato del SES fue fundamental para resolver casos especiales que daban error, sobre todo la gestión de documentos y la detección según la nacionalidad.

Gran parte de la interfaz visual también la saqué con IA, ya que con el tiempo justo preferí resolver una pantalla simple pero visualmente presentable.

Por último, me apoyé en ella para escribir los tests  base y comprobar que todo funcionaba bien, aunque por tiempo no pude añadir tantos como me hubiese gustado. 

En todo momento mantuve el control descartando soluciones que complicaban el código sin necesidad, como propuestas de meter librerías y dependencias de más para la web cuando con el http nativo y Handlebars bastaba.

En el bloque 1 me sirvió para repasar el código más rápido, entender qué hacía cada parte y confirmar los fallos y puntos débiles que iba viendo antes de ponerme a redactar el análisis.También me señaló algunos fallos extra que, al no considerarlos prioritarios o no entenderlos del todo en ese momento, preferí no añadir para centrarme solo en lo que tenía claro.
