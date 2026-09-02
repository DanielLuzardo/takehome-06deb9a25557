/**
 * What the exercise asks you to compute. The types are here; the two calculations are not.
 *
 * They are kept apart from the HTTP client on purpose: this knows nothing about where
 * the data comes from, which is why it can be tested without starting anything up.
 */

export type Sex = "F" | "M" | "X";
export type Kinship = "HOLDER" | "PARTNER" | "CHILD";

/** A guest, exactly as the provider API returns it. */
export interface Guest {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly birthDate: string;
    readonly nationality: string;
    readonly gender: Sex;
    readonly kinshipRelationship: Kinship;
    readonly documentNumber: string | null;
}

export interface Booking {
    readonly id: string;
    readonly property: string;
    readonly capacity: number;
    readonly checkInDate: string;
    readonly checkOutDate: string;
}

/** A police report line, in the format the authority expects. */
export interface PoliceReportLine {
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    sex: string;
    kinship: string;
    documentType: string | null;
    documentNumber: string | null;
}

/**
 * Age in completed years. It comes solved, and solved this way on purpose: with
 * `new Date(...)` and its local methods, someone born right on the boundary changes
 * age depending on the machine time zone.
 */
export function ageOn(birthDate: string, reference: string): number {
    const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(Number);
    const [year, month, day] = reference.split("-").map(Number);
    const hasHadBirthday = month > birthMonth || (month === birthMonth && day >= birthDay);
    return year - birthYear - (hasHadBirthday ? 0 : 1);
}

//We are going to create auxiliar functions to translate the format that actually we have to the format that the police wants

function mapSex(gender: Sex): string{
    switch (gender) {
        case "F": return "M";
        case "M": return "H";
        case "X": return "O";
    }
}
function mapKinship(kinship: Kinship): string {
    switch (kinship) {
        case "HOLDER":  return "TI";
        case "PARTNER": return "CY";
        case "CHILD":   return "HJ";
    }
}
function inferDocumentType(documentNumber: string | null, nationality: string): string | null {
    if (!documentNumber) return null;
    const doc = documentNumber.trim().toUpperCase();

    if (nationality === "ESP") {
        if (/^[0-9]{8}[A-Z]$/.test(doc)) return "NIF";
        if (/^[XYZ][0-9]{7}[A-Z]$/.test(doc)) return "NIE";
        return "OTRO";
    }

    // Extranjeros
    return "PAS";
}

/**
 * YOUR JOB (1 of 2): how many slots the booking takes up.
 *
 * It is compared against `booking.capacity`. Differing from the number of declared
 * people is not an error: they are two counts and both are correct.
 */
export function occupancy(_booking: Booking, guests: readonly Guest[], today: string): number {
    return guests.filter(guest => ageOn(guest.birthDate, today) >= 2).length;
}

/**
 * YOUR JOB (2 of 2): the lines that are declared to the authority.
 *
 * Mind the values: what the provider returns and what the authority accepts are not
 * the same catalogue, even when the letters sometimes match.
 */
export function policeReportLines(guests: readonly Guest[], today: string): PoliceReportLine[] {
    return guests.map(guest => ({
        firstName: guest.firstName,
        lastName: guest.lastName,
        birthDate: guest.birthDate,
        nationality: guest.nationality,
        sex: mapSex(guest.gender),
        kinship: mapKinship(guest.kinshipRelationship),
        documentType: inferDocumentType(guest.documentNumber, guest.nationality),
        documentNumber: guest.documentNumber,
    }));
}
