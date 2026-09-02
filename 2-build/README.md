# Aforo y parte — TypeScript

```bash
API_BASE=<la dirección que te dimos> API_TOKEN=<tu token> npm start
npm test
```

Node 22 ejecuta TypeScript directamente: no hay que instalar nada ni compilar.

## Qué hay aquí

| | |
|---|---|
| `src/domain.ts` | Los tipos, y **las dos funciones que tienes que escribir** |
| `src/client.ts` | El cliente de las dos APIs. Escrito, y escrito a medias |
| `src/main.ts` | El recorrido completo, para que veas si funciona |
| `test/domain.test.ts` | Un test que ya pasa, para que no empieces de cero |

## Cómo empezar

Lee `src/client.ts` **antes** de escribir nada. Está hecho, pero no está completo,
y lo que le falta no lleva un `TODO` encima.
