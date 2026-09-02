import type { ParteLinea, Sexo } from "../domain/parte.ts";
import type { TravelerProvider } from "./traveler-provider.port.ts";
import { needsDocument, mustSign } from "../domain/traveler-age.ts";

interface ChekinMember {
  name: string;
  surname: string;
  birth_date: string;
  nationality: string;
  gender_chekin?: string;
  kinship_chekin?: string;
  document_number?: string;
}

const trimmed = (value: string | undefined): string => (value ?? "").trim();

const SEXO_CHEKIN: Record<string, Sexo> = { M: "H", F: "M", X: "O" };

export class ChekinAdapter implements TravelerProvider {
  readonly nombre = "chekin";

  toParteLineas(raw: unknown[], fechaEntrada: string): ParteLinea[] {
    return (raw as ChekinMember[]).map((member) => ({
      nombre: trimmed(member.name),
      primerApellido: trimmed(member.surname),
      fechaNacimiento: member.birth_date,
      nacionalidad: trimmed(member.nationality),
      sexo: SEXO_CHEKIN[trimmed(member.gender_chekin)] ?? "",
      parentesco: trimmed(member.kinship_chekin),
      documento: needsDocument(member.birth_date, fechaEntrada)
        ? trimmed(member.document_number)
        : null,
      firma: mustSign(member.birth_date, fechaEntrada),
    }));
  }
}
