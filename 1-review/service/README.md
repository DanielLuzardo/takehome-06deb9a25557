# parte-viajeros

Servicio que prepara el **parte de viajeros** que se declara a la policía a partir de los
huéspedes de una reserva.

Cada proveedor de check-in nos manda los huéspedes en su propio formato, así que cada uno
tiene su adaptador detrás del puerto `TravelerProvider`.

## Reglas del parte

- Se declara a **todos los huéspedes mayores de 2 años**.
- Solo los mayores de 18 aportan documento.
- Solo los mayores de 14 firman.

## Arrancar

```bash
docker compose up
curl http://localhost:8080/reservas/1041/parte
```

Sin Docker:

```bash
npm run dev
npm test
```
