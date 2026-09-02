import { readFileSync } from "node:fs";
import type { ParteLinea } from "./domain/parte.ts";
import { buildDefaultFactory } from "./providers/provider.factory.ts";
import { ADULT_AGE_YEARS } from "./domain/traveler-age.ts";

interface Reserva {
  id: string;
  propiedad: string;
  fechaEntrada: string;
  proveedor: string;
  huespedes: unknown[];
}

const reservas: Record<string, Reserva> = JSON.parse(
  readFileSync(new URL("../data/reservas.json", import.meta.url), "utf8"),
);

const factory = buildDefaultFactory();

export function buscarReserva(id: string): Reserva | undefined {
  return reservas[id];
}

export function construirParte(reserva: Reserva): ParteLinea[] {
  const provider = factory.crear(reserva.proveedor);
  return provider.toParteLineas(reserva.huespedes, reserva.fechaEntrada);
}

export function contarAdultos(reserva: Reserva, lineas: ParteLinea[]): number {
  const entrada = new Date(reserva.fechaEntrada);
  return lineas.filter((linea) => {
    const nacimiento = new Date(linea.fechaNacimiento);
    let edad = entrada.getFullYear() - nacimiento.getFullYear();
    const mes = entrada.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && entrada.getDate() < nacimiento.getDate())) edad--;
    return edad >= ADULT_AGE_YEARS;
  }).length;
}
