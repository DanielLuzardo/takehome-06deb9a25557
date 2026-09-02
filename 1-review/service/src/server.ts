import { createServer } from "node:http";
import { buscarReserva, construirParte, contarAdultos } from "./parte.service.ts";

const PORT = Number(process.env.PARTE_PORT ?? 3000);

const json = (res: any, status: number, body: unknown): void => {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body, null, 2));
};

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { ok: true });
  }

  const parte = url.pathname.match(/^\/reservas\/([^/]+)\/parte$/);
  if (req.method === "GET" && parte) {
    const reserva = buscarReserva(parte[1]);
    if (!reserva) return json(res, 404, { error: "reserva no encontrada" });
    const lineas = construirParte(reserva);
    return json(res, 200, {
      reserva: reserva.id,
      propiedad: reserva.propiedad,
      adultos: contarAdultos(reserva, lineas),
      viajeros: lineas.length,
      lineas,
    });
  }

  return json(res, 404, { error: "ruta no encontrada" });
});

server.listen(PORT, () => {
  process.stdout.write(`parte-viajeros escuchando en :${PORT}\n`);
});
