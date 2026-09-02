# Bloque 2 — Aforo y parte: dos totales que no se pueden mezclar

Aquí sí se escribe código. Es un ejercicio **full stack**, pero pequeño: casi todo está
en el back y el front es una sola pantalla.

## El encargo

Un alojamiento turístico tiene que saber dos cosas de cada reserva: **cuántas plazas
ocupa** y **cuántos viajeros hay que declarar a la policía**. No son el mismo número.

Construye un servicio que:

1. Coja una reserva y sus huéspedes de nuestra API.
2. Calcule los dos totales.
3. **Declare el parte** a la API del SES y se entere de cómo ha ido.
4. Lo enseñe todo en una pantalla.

## Las dos reglas del negocio

Esto no lo puedes adivinar, así que va explicado:

- Una villa tiene una **capacidad** en plazas. Los menores de **2 años no ocupan plaza**.
- En el **parte a la policía**, en cambio, **van todos**: sin excepción por edad.

Una villa de 6 plazas con 6 adultos y 2 bebés son **6 plazas y 8 viajeros a la vez**.
Los dos números son correctos al mismo tiempo. Quien los mezcla en uno solo declara de
menos a la policía, y eso es un problema serio de verdad.

## Qué te damos

En `starters/` tienes cuatro puntos de partida: **TypeScript, Python, Go y Java**. Elige
el lenguaje en el que mejor te muevas; nosotros trabajamos en TypeScript, pero no es un
requisito y no puntúa.

Cada uno trae un cliente de la API, el dominio a medio hacer, un `main` que recorre el
camino entero y una prueba que ya pasa. Lo que falta lo verás en cuanto lo ejecutes.

## La API

Empieza por la raíz: **se documenta sola**. Manda `Authorization: Bearer <tu token>` en
cada petición; el token está en tu correo y en tu página.

Es una API como las de verdad, con lo que eso trae. Léela con la misma desconfianza con
la que leerías la de un proveedor externo del que dependes en producción: mira lo que te
devuelve de verdad, no lo que esperas que devuelva.

## La pantalla

Que enseñe, para una reserva: la capacidad, el aforo, cuántos viajeros van al parte y
cómo ha ido la declaración.

No valoramos el diseño. Valoramos que **al mirarla se entienda que son dos números
distintos y de dónde sale cada uno**. Usa el framework que quieras o ninguno: HTML
servido desde tu propio back es una respuesta perfectamente válida.

## Qué NO te pedimos

Para que no gastes tiempo donde no puntúa: nada de login, ni base de datos, ni
despliegue, ni CI, ni Docker, ni diseño responsive, ni tests de la pantalla. Con una
reserva basta; no hace falta un listado navegable.

## Qué contar en `README.md`

- Cómo ejecutarlo, back y pantalla.
- Por qué elegiste ese lenguaje.
- **Qué te encontraste por el camino y cómo lo resolviste.** Esta es la importante.
- Qué decidiste y por qué.
- **Qué dejaste fuera a propósito.**
- Qué te costó más.
- Cuánto tiempo te llevó. No puntúa: nos dice si la prueba está bien calibrada.

## Qué miramos

Que los dos totales salgan bien y no se mezclen nunca. Que lo que le mandas a la
autoridad sea lo que la autoridad espera. Que el código se entienda y que pruebes lo que
entregas. Y que las decisiones estén contadas: preferimos algo pequeño y explicado a
algo grande y opaco.

Una pista sobre cómo se corrige esto: no buscamos que hayas hecho todo. Buscamos ver qué
haces cuando algo no sale como esperabas.
