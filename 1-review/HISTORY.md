# Historial del servicio

> Los commits que trajeron este servicio hasta donde está. A veces lo que falla no se ve en
> el código final, sino en el momento en que entró.

## chore(parte): scaffold the traveller report service

- Autor: Equipo Plataforma
- Fecha: 2026-05-04
---
 .gitignore                 |  2 ++
 package.json               |  9 +++++++++
 src/domain/parte.ts        | 12 ++++++++++++
 src/domain/traveler-age.ts | 19 +++++++++++++++++++
 tsconfig.json              | 11 +++++++++++
 5 files changed, 53 insertions(+)

diff --git a/.gitignore b/.gitignore
new file mode 100644
index 0000000..713d500
--- /dev/null
+++ b/.gitignore
@@ -0,0 +1,2 @@
+node_modules/
+.env
diff --git a/package.json b/package.json
new file mode 100644
index 0000000..7705580
--- /dev/null
+++ b/package.json
@@ -0,0 +1,9 @@
+{
+  "name": "parte-viajeros",
+  "version": "1.0.0",
+  "type": "module",
+  "scripts": {
+    "dev": "node --experimental-strip-types src/server.ts",
+    "test": "node --experimental-strip-types --test"
+  }
+}
diff --git a/src/domain/parte.ts b/src/domain/parte.ts
new file mode 100644
index 0000000..8ce9a9f
--- /dev/null
+++ b/src/domain/parte.ts
@@ -0,0 +1,12 @@
+export type Sexo = "H" | "M" | "O";
+
+export interface ParteLinea {
+  nombre: string;
+  primerApellido: string;
+  fechaNacimiento: string;
+  nacionalidad: string;
+  sexo: Sexo | "";
+  parentesco: string;
+  documento: string | null;
+  firma: boolean;
+}
diff --git a/src/domain/traveler-age.ts b/src/domain/traveler-age.ts
new file mode 100644
index 0000000..0a0fe52
--- /dev/null
+++ b/src/domain/traveler-age.ts
@@ -0,0 +1,19 @@
+export const ADULT_AGE_YEARS = 18;
+export const SIGNING_AGE_YEARS = 14;
+
+export function yearsOld(birthDate: string, reference: string): number {
+  const birth = new Date(birthDate);
+  const ref = new Date(reference);
+  let years = ref.getFullYear() - birth.getFullYear();
+  const month = ref.getMonth() - birth.getMonth();
+  if (month < 0 || (month === 0 && ref.getDate() < birth.getDate())) years--;
+  return years;
+}
+
+export function needsDocument(birthDate: string, reference: string): boolean {
+  return yearsOld(birthDate, reference) >= ADULT_AGE_YEARS;
+}
+
+export function mustSign(birthDate: string, reference: string): boolean {
+  return yearsOld(birthDate, reference) >= SIGNING_AGE_YEARS;
+}
diff --git a/tsconfig.json b/tsconfig.json
new file mode 100644
index 0000000..37885cc
--- /dev/null
+++ b/tsconfig.json
@@ -0,0 +1,11 @@
+{
+  "compilerOptions": {
+    "target": "ES2022",
+    "module": "ESNext",
+    "moduleResolution": "bundler",
+    "allowImportingTsExtensions": true,
+    "noEmit": true,
+    "strict": true
+  },
+  "include": ["src", "test"]
+}

## feat(parte): add the traveller provider port and the Chekin adapter

- Autor: Equipo Plataforma
- Fecha: 2026-05-11
---
 fixtures/chekin-member.json             | 24 ++++++++++++++++++++++
 src/providers/chekin.adapter.ts         | 36 +++++++++++++++++++++++++++++++++
 src/providers/traveler-provider.port.ts |  6 ++++++
 3 files changed, 66 insertions(+)

diff --git a/fixtures/chekin-member.json b/fixtures/chekin-member.json
new file mode 100644
index 0000000..32b81e4
--- /dev/null
+++ b/fixtures/chekin-member.json
@@ -0,0 +1,24 @@
+[
+  {
+    "id": "9d1f0c7a",
+    "name": "Ainhoa",
+    "surname": "Mendive",
+    "birth_date": "1989-03-11",
+    "nationality": "ESP",
+    "gender": "F",
+    "kinship_relationship": "TITULAR",
+    "document_number": "51204877R",
+    "document_type": "NIF"
+  },
+  {
+    "id": "3b7ec204",
+    "name": "Gorka",
+    "surname": "Mendive",
+    "birth_date": "2013-07-29",
+    "nationality": "ESP",
+    "gender": "M",
+    "kinship_relationship": "HIJO",
+    "document_number": null,
+    "document_type": null
+  }
+]
diff --git a/src/providers/chekin.adapter.ts b/src/providers/chekin.adapter.ts
new file mode 100644
index 0000000..2064cd4
--- /dev/null
+++ b/src/providers/chekin.adapter.ts
@@ -0,0 +1,36 @@
+import type { ParteLinea, Sexo } from "../domain/parte.ts";
+import type { TravelerProvider } from "./traveler-provider.port.ts";
+import { needsDocument, mustSign } from "../domain/traveler-age.ts";
+
+interface ChekinMember {
+  name: string;
+  surname: string;
+  birth_date: string;
+  nationality: string;
+  gender_chekin?: string;
+  kinship_chekin?: string;
+  document_number?: string;
+}
+
+const trimmed = (value: string | undefined): string => (value ?? "").trim();
+
+const SEXO_CHEKIN: Record<string, Sexo> = { M: "H", F: "M", X: "O" };
+
+export class ChekinAdapter implements TravelerProvider {
+  readonly nombre = "chekin";
+
+  toParteLineas(raw: unknown[], fechaEntrada: string): ParteLinea[] {
+    return (raw as ChekinMember[]).map((member) => ({
+      nombre: trimmed(member.name),
+      primerApellido: trimmed(member.surname),
+      fechaNacimiento: member.birth_date,
+      nacionalidad: trimmed(member.nationality),
+      sexo: SEXO_CHEKIN[trimmed(member.gender_chekin)] ?? "",
+      parentesco: trimmed(member.kinship_chekin),
+      documento: needsDocument(member.birth_date, fechaEntrada)
+        ? trimmed(member.document_number)
+        : null,
+      firma: mustSign(member.birth_date, fechaEntrada),
+    }));
+  }
+}
diff --git a/src/providers/traveler-provider.port.ts b/src/providers/traveler-provider.port.ts
new file mode 100644
index 0000000..1fffc85
--- /dev/null
+++ b/src/providers/traveler-provider.port.ts
@@ -0,0 +1,6 @@
+import type { ParteLinea } from "../domain/parte.ts";
+
+export interface TravelerProvider {
+  readonly nombre: string;
+  toParteLineas(raw: unknown[], fechaEntrada: string): ParteLinea[];
+}

## refactor(parte): resolve providers through a registry factory

- Autor: Equipo Plataforma
- Fecha: 2026-05-19
---
 src/providers/provider.factory.ts | 27 +++++++++++++++++++++++++++
 1 file changed, 27 insertions(+)

diff --git a/src/providers/provider.factory.ts b/src/providers/provider.factory.ts
new file mode 100644
index 0000000..0a72893
--- /dev/null
+++ b/src/providers/provider.factory.ts
@@ -0,0 +1,27 @@
+import type { TravelerProvider } from "./traveler-provider.port.ts";
+import { ChekinAdapter } from "./chekin.adapter.ts";
+
+export interface ProviderRegistration {
+  clave: string;
+  crear: () => TravelerProvider;
+}
+
+export class TravelerProviderFactory {
+  private readonly registro = new Map<string, ProviderRegistration>();
+
+  registrar(registration: ProviderRegistration): void {
+    this.registro.set(registration.clave, registration);
+  }
+
+  crear(clave: string): TravelerProvider {
+    const registration = this.registro.get(clave);
+    if (!registration) throw new Error(`Proveedor desconocido: ${clave}`);
+    return registration.crear();
+  }
+}
+
+export function buildDefaultFactory(): TravelerProviderFactory {
+  const factory = new TravelerProviderFactory();
+  factory.registrar({ clave: "chekin", crear: () => new ChekinAdapter() });
+  return factory;
+}

## feat(parte): expose the report endpoint for a booking

- Autor: Equipo Plataforma
- Fecha: 2026-06-02
---
 .env.example                 |  2 ++
 Dockerfile                   |  4 ++++
 README.md                    | 27 +++++++++++++++++++++++++++
 data/reservas.json           | 23 +++++++++++++++++++++++
 docker-compose.yml           |  7 +++++++
 fixtures/bookipro-guest.json | 18 ++++++++++++++++++
 src/parte.service.ts         | 38 ++++++++++++++++++++++++++++++++++++++
 src/server.ts                | 37 +++++++++++++++++++++++++++++++++++++
 8 files changed, 156 insertions(+)

diff --git a/.env.example b/.env.example
new file mode 100644
index 0000000..6ae5608
--- /dev/null
+++ b/.env.example
@@ -0,0 +1,2 @@
+# Copia este fichero a .env antes de levantar el servicio.
+PARTE_PORT=3000
diff --git a/Dockerfile b/Dockerfile
new file mode 100644
index 0000000..197fc3f
--- /dev/null
+++ b/Dockerfile
@@ -0,0 +1,4 @@
+FROM node:22-alpine
+WORKDIR /app
+COPY . .
+CMD ["npm", "run", "dev"]
diff --git a/README.md b/README.md
new file mode 100644
index 0000000..3e431fc
--- /dev/null
+++ b/README.md
@@ -0,0 +1,27 @@
+# parte-viajeros
+
+Servicio que prepara el **parte de viajeros** que se declara a la policía a partir de los
+huéspedes de una reserva.
+
+Cada proveedor de check-in nos manda los huéspedes en su propio formato, así que cada uno
+tiene su adaptador detrás del puerto `TravelerProvider`.
+
+## Reglas del parte
+
+- Se declara a **todos los huéspedes mayores de 2 años**.
+- Solo los mayores de 18 aportan documento.
+- Solo los mayores de 14 firman.
+
+## Arrancar
+
+```bash
+docker compose up
+curl http://localhost:8080/reservas/1041/parte
+```
+
+Sin Docker:
+
+```bash
+npm run dev
+npm test
+```
diff --git a/data/reservas.json b/data/reservas.json
new file mode 100644
index 0000000..ce229c5
--- /dev/null
+++ b/data/reservas.json
@@ -0,0 +1,23 @@
+{
+  "1041": {
+    "id": "1041",
+    "propiedad": "Villa Tamadaba",
+    "fechaEntrada": "2026-08-14",
+    "proveedor": "chekin",
+    "huespedes": [
+      { "name": "Ainhoa", "surname": "Mendive", "birth_date": "1989-03-11", "nationality": "ESP", "gender": "F", "kinship_relationship": "TITULAR", "document_number": "51204877R" },
+      { "name": "Gorka", "surname": "Mendive", "birth_date": "2013-07-29", "nationality": "ESP", "gender": "M", "kinship_relationship": "HIJO", "document_number": null },
+      { "name": "Uxue", "surname": "Mendive", "birth_date": "2025-01-22", "nationality": "ESP", "gender": "F", "kinship_relationship": "HIJA", "document_number": null }
+    ]
+  },
+  "1042": {
+    "id": "1042",
+    "propiedad": "Villa Guayadeque",
+    "fechaEntrada": "2026-08-20",
+    "proveedor": "bookipro",
+    "huespedes": [
+      { "nombreCompleto": "Sofia Alcaraz Ferrer", "nacimiento": "1994-11-02", "pais": "ES", "sexo": "MUJER", "rol": "titular", "documento": { "tipo": "NIF", "numero": "44980213K" } },
+      { "nombreCompleto": "Marc Bonet Sala", "nacimiento": "1992-06-17", "pais": "ES", "sexo": "HOMBRE", "rol": "acompanante", "documento": { "tipo": "NIF", "numero": "39220154T" } }
+    ]
+  }
+}
diff --git a/docker-compose.yml b/docker-compose.yml
new file mode 100644
index 0000000..76a99c7
--- /dev/null
+++ b/docker-compose.yml
@@ -0,0 +1,7 @@
+services:
+  parte:
+    build: .
+    ports:
+      - "8080:${PARTE_PORT}"
+    environment:
+      PARTE_PORT: ${PARTE_PORT}
diff --git a/fixtures/bookipro-guest.json b/fixtures/bookipro-guest.json
new file mode 100644
index 0000000..b857926
--- /dev/null
+++ b/fixtures/bookipro-guest.json
@@ -0,0 +1,18 @@
+[
+  {
+    "nombreCompleto": "Sofia Alcaraz Ferrer",
+    "nacimiento": "1994-11-02",
+    "pais": "ES",
+    "sexo": "MUJER",
+    "rol": "titular",
+    "documento": { "tipo": "NIF", "numero": "44980213K" }
+  },
+  {
+    "nombreCompleto": "Marc Bonet Sala",
+    "nacimiento": "1992-06-17",
+    "pais": "ES",
+    "sexo": "HOMBRE",
+    "rol": "acompanante",
+    "documento": { "tipo": "NIF", "numero": "39220154T" }
+  }
+]
diff --git a/src/parte.service.ts b/src/parte.service.ts
new file mode 100644
index 0000000..f7f5443
--- /dev/null
+++ b/src/parte.service.ts
@@ -0,0 +1,38 @@
+import { readFileSync } from "node:fs";
+import type { ParteLinea } from "./domain/parte.ts";
+import { buildDefaultFactory } from "./providers/provider.factory.ts";
+import { ADULT_AGE_YEARS } from "./domain/traveler-age.ts";
+
+interface Reserva {
+  id: string;
+  propiedad: string;
+  fechaEntrada: string;
+  proveedor: string;
+  huespedes: unknown[];
+}
+
+const reservas: Record<string, Reserva> = JSON.parse(
+  readFileSync(new URL("../data/reservas.json", import.meta.url), "utf8"),
+);
+
+const factory = buildDefaultFactory();
+
+export function buscarReserva(id: string): Reserva | undefined {
+  return reservas[id];
+}
+
+export function construirParte(reserva: Reserva): ParteLinea[] {
+  const provider = factory.crear(reserva.proveedor);
+  return provider.toParteLineas(reserva.huespedes, reserva.fechaEntrada);
+}
+
+export function contarAdultos(reserva: Reserva, lineas: ParteLinea[]): number {
+  const entrada = new Date(reserva.fechaEntrada);
+  return lineas.filter((linea) => {
+    const nacimiento = new Date(linea.fechaNacimiento);
+    let edad = entrada.getFullYear() - nacimiento.getFullYear();
+    const mes = entrada.getMonth() - nacimiento.getMonth();
+    if (mes < 0 || (mes === 0 && entrada.getDate() < nacimiento.getDate())) edad--;
+    return edad >= ADULT_AGE_YEARS;
+  }).length;
+}
diff --git a/src/server.ts b/src/server.ts
new file mode 100644
index 0000000..5a46403
--- /dev/null
+++ b/src/server.ts
@@ -0,0 +1,37 @@
+import { createServer } from "node:http";
+import { buscarReserva, construirParte, contarAdultos } from "./parte.service.ts";
+
+const PORT = Number(process.env.PARTE_PORT ?? 3000);
+
+const json = (res: any, status: number, body: unknown): void => {
+  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
+  res.end(JSON.stringify(body, null, 2));
+};
+
+const server = createServer((req, res) => {
+  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
+
+  if (req.method === "GET" && url.pathname === "/health") {
+    return json(res, 200, { ok: true });
+  }
+
+  const parte = url.pathname.match(/^\/reservas\/([^/]+)\/parte$/);
+  if (req.method === "GET" && parte) {
+    const reserva = buscarReserva(parte[1]);
+    if (!reserva) return json(res, 404, { error: "reserva no encontrada" });
+    const lineas = construirParte(reserva);
+    return json(res, 200, {
+      reserva: reserva.id,
+      propiedad: reserva.propiedad,
+      adultos: contarAdultos(reserva, lineas),
+      viajeros: lineas.length,
+      lineas,
+    });
+  }
+
+  return json(res, 404, { error: "ruta no encontrada" });
+});
+
+server.listen(PORT, () => {
+  process.stdout.write(`parte-viajeros escuchando en :${PORT}\n`);
+});

## test(parte): cover the Chekin adapter mapping

- Autor: Equipo Plataforma
- Fecha: 2026-06-09
---
 test/chekin.adapter.test.ts | 29 +++++++++++++++++++++++++++++
 1 file changed, 29 insertions(+)

diff --git a/test/chekin.adapter.test.ts b/test/chekin.adapter.test.ts
new file mode 100644
index 0000000..d8c3dc3
--- /dev/null
+++ b/test/chekin.adapter.test.ts
@@ -0,0 +1,29 @@
+import { test } from "node:test";
+import assert from "node:assert/strict";
+import { ChekinAdapter } from "../src/providers/chekin.adapter.ts";
+
+const adulto = (gender: string, kinship: string) => ({
+  name: "Ainhoa",
+  surname: "Mendive",
+  birth_date: "1989-03-11",
+  nationality: "ESP",
+  gender_chekin: gender,
+  kinship_chekin: kinship,
+  document_number: "51204877R",
+});
+
+test("traduce el sexo al catalogo del parte", () => {
+  const [linea] = new ChekinAdapter().toParteLineas([adulto("F", "TITULAR")], "2026-08-14");
+  assert.equal(linea.sexo, "M");
+});
+
+test("un mayor de edad aporta documento", () => {
+  const [linea] = new ChekinAdapter().toParteLineas([adulto("M", "TITULAR")], "2026-08-14");
+  assert.equal(linea.documento, "51204877R");
+});
+
+test("un menor de 14 no firma", () => {
+  const menor = { ...adulto("M", "HIJO"), birth_date: "2013-07-29" };
+  const [linea] = new ChekinAdapter().toParteLineas([menor], "2026-08-14");
+  assert.equal(linea.firma, false);
+});
