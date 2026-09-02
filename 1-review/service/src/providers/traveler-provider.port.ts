import type { ParteLinea } from "../domain/parte.ts";

export interface TravelerProvider {
  readonly nombre: string;
  toParteLineas(raw: unknown[], fechaEntrada: string): ParteLinea[];
}
