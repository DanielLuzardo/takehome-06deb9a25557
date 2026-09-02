import type { TravelerProvider } from "./traveler-provider.port.ts";
import { ChekinAdapter } from "./chekin.adapter.ts";

export interface ProviderRegistration {
  clave: string;
  crear: () => TravelerProvider;
}

export class TravelerProviderFactory {
  private readonly registro = new Map<string, ProviderRegistration>();

  registrar(registration: ProviderRegistration): void {
    this.registro.set(registration.clave, registration);
  }

  crear(clave: string): TravelerProvider {
    const registration = this.registro.get(clave);
    if (!registration) throw new Error(`Proveedor desconocido: ${clave}`);
    return registration.crear();
  }
}

export function buildDefaultFactory(): TravelerProviderFactory {
  const factory = new TravelerProviderFactory();
  factory.registrar({ clave: "chekin", crear: () => new ChekinAdapter() });
  return factory;
}
