export type Sexo = "H" | "M" | "O";

export interface ParteLinea {
  nombre: string;
  primerApellido: string;
  fechaNacimiento: string;
  nacionalidad: string;
  sexo: Sexo | "";
  parentesco: string;
  documento: string | null;
  firma: boolean;
}
