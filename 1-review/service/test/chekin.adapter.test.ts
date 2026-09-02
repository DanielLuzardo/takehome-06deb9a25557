import { test } from "node:test";
import assert from "node:assert/strict";
import { ChekinAdapter } from "../src/providers/chekin.adapter.ts";

const adulto = (gender: string, kinship: string) => ({
  name: "Ainhoa",
  surname: "Mendive",
  birth_date: "1989-03-11",
  nationality: "ESP",
  gender_chekin: gender,
  kinship_chekin: kinship,
  document_number: "51204877R",
});

test("traduce el sexo al catalogo del parte", () => {
  const [linea] = new ChekinAdapter().toParteLineas([adulto("F", "TITULAR")], "2026-08-14");
  assert.equal(linea.sexo, "M");
});

test("un mayor de edad aporta documento", () => {
  const [linea] = new ChekinAdapter().toParteLineas([adulto("M", "TITULAR")], "2026-08-14");
  assert.equal(linea.documento, "51204877R");
});

test("un menor de 14 no firma", () => {
  const menor = { ...adulto("M", "HIJO"), birth_date: "2013-07-29" };
  const [linea] = new ChekinAdapter().toParteLineas([menor], "2026-08-14");
  assert.equal(linea.firma, false);
});
