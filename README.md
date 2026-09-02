# Mi entrega (bloque 2)


## Cómo ejecutarlo
Para ejecutarlo abriremos CMD en la ca
1. Instalar dependencias:
```bash
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
Apesar de no ser un lenguaje que haya estudiado/ conozco mucho era el mas optimo en mi opinión para trabajar 
este ejercicio.

## Qué decidí y por qué
Primeramente me fijé que el formato que usaba la policia no era el mismo que el que brindaba la plataforma, por lo tanto primeramente traduje
al formato de la policia los datos que nos daban.
Seguidamente me di cuenta que el codigo ya creado en client.ts devolvia solo una pagina de "guest" pero observando la API me di cuenta que puede devolver mas de una pagina , por
lo tanto añadimos un bucle para devolver todas.
Otro de los problemas percatados es que al hacer npm start siempre devolvia el status en "pending" no permitiendo así que el usuario sepa si la policia acepto o no su informe, por lo que añadí un intervalo de espera que se repite hasta que la policia devuelva su veredicto.

## Qué dejé fuera a propósito
Por falta de tiempo me fije que de vez en cuando la API devolvia un error 504 , me gustaría haber podido manejarlo para solucionarlo.

## Qué me costó más
Ajustar el mapeo de datos para que la Policia lo validase y entender en parte algunas partes de la API.

## Cuánto tiempo me llevó
2 horas y 30 minutos aproximadamente.

##Uso de la IA 

Se hizo uso de la IA para la creacion del frontend por falta de tiempo. Ademas de usarla para comprender algunas partes tanto del codigo como de la API.
Su uso ayudo a comprender y tomar algunas decisiones.