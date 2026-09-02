import { test } from "node:test";
import assert from "node:assert/strict";
import { ageOn, occupancy, policeReportLines } from "../src/domain.ts";
import type { Guest, Booking } from "../src/domain.ts";

test("la edad no baila con la zona horaria", () => {
    assert.equal(ageOn("2024-01-01", "2026-01-01"), 2);
    assert.equal(ageOn("2024-12-31", "2026-12-30"), 1);
});

test("occupancy: excluye a menores de 2 años del cómputo de plazas", () => {
    const today = "2026-09-02";

    const dummyBooking: Booking = {
        id: "2104",
        property: "Villa Tamadaba",
        capacity: 6,
        checkInDate: "2026-09-02",
        checkOutDate: "2026-09-09",
    };

    const guests: Guest[] = [
        {
            id: "g-1",
            firstName: "Adulto",
            lastName: "Uno",
            birthDate: "1990-05-10",
            gender: "F",
            nationality: "ESP",
            kinshipRelationship: "HOLDER",
            documentNumber: "12345678Z",
        },
        {
            id: "g-2",
            firstName: "Adulto",
            lastName: "Dos",
            birthDate: "1992-08-15",
            gender: "M",
            nationality: "ESP",
            kinshipRelationship: "PARTNER",
            documentNumber: "87654321X",
        },
        {
            id: "g-3",
            firstName: "Bebe",
            lastName: "Uno",
            birthDate: "2025-06-01",
            gender: "M",
            nationality: "ESP",
            kinshipRelationship: "CHILD",
            documentNumber: null,
        },
        {
            id: "g-4",
            firstName: "Recien",
            lastName: "Nacido",
            birthDate: "2026-08-01",
            gender: "F",
            nationality: "ESP",
            kinshipRelationship: "CHILD",
            documentNumber: null,
        },
    ];

    const plazas = occupancy(dummyBooking, guests, today);
    assert.equal(plazas, 2);

    const report = policeReportLines(guests, today);
    assert.equal(report.length, 4);
});

test("policeReportLines: traduce campos según catálogo SES (sexo, parentesco y tipo de doc)", () => {
    const today = "2026-09-02";

    const guests: Guest[] = [
        {
            id: "g-5",
            firstName: "Laura",
            lastName: "García",
            birthDate: "1988-03-20",
            gender: "F",
            nationality: "ESP",
            kinshipRelationship: "HOLDER",
            documentNumber: "12345678Z",
        },
        {
            id: "g-6",
            firstName: "Carlos",
            lastName: "Smith",
            birthDate: "1985-11-10",
            gender: "M",
            nationality: "GBR",
            kinshipRelationship: "PARTNER",
            documentNumber: "99887766A",
        },
        {
            id: "g-7",
            firstName: "Leo",
            lastName: "García",
            birthDate: "2025-01-01",
            gender: "M",
            nationality: "ESP",
            kinshipRelationship: "CHILD",
            documentNumber: null,
        },
    ];

    const lines = policeReportLines(guests, today);

    assert.equal(lines[0].sex, "M");
    assert.equal(lines[0].kinship, "TI");
    assert.equal(lines[0].documentType, "NIF");
    assert.equal(lines[0].documentNumber, "12345678Z");

    assert.equal(lines[1].sex, "H");
    assert.equal(lines[1].kinship, "CY");
    assert.equal(lines[1].documentType, "PAS");

    assert.equal(lines[2].sex, "H");
    assert.equal(lines[2].kinship, "HJ");
    assert.equal(lines[2].documentType, null);
    assert.equal(lines[2].documentNumber, null);
});