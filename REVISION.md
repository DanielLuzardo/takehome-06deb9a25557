# Revisión del servicio (bloque 1)

## Qué está mal

# Contradicción entre enunciado y README.md
En el enunciado de la web se indica como regla de negocio "En el parte a la policía, en cambio, van todos, sin excepción por edad.", 
mientras que en el README.md cuando habla del parte policial indica "Se declara a todos los huéspedes mayores de 2 años".


# No se aplica la regla de negocio acerca de los menores de dos años
Si nos ceñimos a la regla de negocio indicada en el README.md que dice que se debe declarar a todos los huéspedes mayores de 2 años.
En ningún momento se analiza la edad del huésped para añadirlo al parte,
por lo que si existiese un huésped de por ejemplo 1 año, este , sería añadido al parte policial


# Mayúsculas y espacios en provider.factory.ts

Tanto al añadir como al registrar un proveedor no consideramos las mayúusculas y espacios dando capacidad a errores como "Booking" / "booking" donde
claramente son la misma pero el codigo los identifica como si fuesen totalmente distintos.
Por lo tanto como solución se debería normalizar la clave forzando minúsculas tanto al registrar como al buscar un proveedor.


this.registro.set(registration.clave.toLowerCase(), registration);

const registration = this.registro.get(clave.toLowerCase());

También se podría valorar la normalización de espacios haciendo uso de .trim() 

# Falta de manejo de errores en el endpoint "server.ts"
En la llamada construirParte() dentro del endpoint no incluye ningún try/catch que proteja en caso de que falle por dentro.
Si fallase, sin try/catch se quedaría colgado y nunca recibiríamos una respuesta.
Por lo tanto la solución es usar un try catch cuando llamamos a construirParte()


## Qué arreglaría primero, y por qué
Considero primordial arreglar la falta de manejo de errores en el endpoint, pues puede provocar un mal funcionamiento del programa.

Seguidamente se debería tratar (si procede) el error relacionado con la regla de negocio, pues de no ser así estariamos generando partes
policiales incorrectos.
El tratamiento de mayusculas y espacios no es un problema crítico, pero representa una mejora simple pero efectiva. Se soluciona con unas pocas líneas de código y evita errores frágiles por discrepancias tipográficas en las peticiones y hace al sistema mucho más tolerante a fallos de entrada.


## Qué NO tocaría, y por qué


# Uso de la IA
Se hizo uso de la IA para buscar errores que a simple vista me costo visualizar y para comprender diversas partes del codigo. 