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

/**
 * YOUR JOB (1 of 2): how many slots the booking takes up.
 *
 * It is compared against `booking.capacity`. Differing from the number of declared
 * people is not an error: they are two counts and both are correct.
 */
export function occupancy(_booking: Booking, _guests: readonly Guest[], _today: string): number {
    throw new Error("Not implemented");
}

/**
 * YOUR JOB (2 of 2): the lines that are declared to the authority.
 *
 * Mind the values: what the provider returns and what the authority accepts are not
 * the same catalogue, even when the letters sometimes match.
 */
export function policeReportLines(_guests: readonly Guest[], _today: string): PoliceReportLine[] {
    throw new Error("Not implemented");
}
