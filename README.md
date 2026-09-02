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

## Uso de la IA 

Se hizo uso de la IA como apoyo para montar el frontend rápidamente por optimización de tiempo. Así como para entender con mayor agilidad ciertos puntos del código base y de la API a la hora de tomar decisiones.
## Comentarios extra 

Para el bloque 1 no conseguí realizar un analísis tan preciso como me hubiera gustado, me tomo su tiempo comprender el codigo y encontrar algunos fallos. Pero considero que 
con algo mas de tiempo podria haber encontrado más.

Dedicar más minutos de los previstos a asentar la base del primer bloque hizo que fuera más justo de tiempo en esta parte. Por esa razón prioricé tener el programa completo y funcional , dejando conscientemente fuerael manejo de los errores 504 de la API.