/**
 * The client for the two APIs. It is written, and it is written halfway.
 *
 * Read it before touching it: what is missing is not marked with a TODO.
 */
import type { Guest, PoliceReportLine, Booking } from "./domain.ts";

const BASE = process.env.API_BASE ?? "http://localhost:4000";
const TOKEN = process.env.API_TOKEN ?? "";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(BASE + path, {
        ...options,
        headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json",
            ...(options.headers ?? {}),
        },
    });

    if (!response.ok) {
        throw new Error("HTTP " + response.status + " at " + path);
    }
    return (await response.json()) as T;
}

export async function listBookings(): Promise<Booking[]> {
    const body = await request<{ items: Booking[] }>("/bookings");
    return body.items;
}

export async function getBooking(id: string): Promise<Booking> {
    return request<Booking>("/bookings/" + id);
}

/** Returns one page of guests. */
export async function guestsOf(bookingId: string, page = 1): Promise<Guest[]> {
    const body = await request<{ items: Guest[]; _links: Record<string, { href: string }> }>(
        "/bookings/" + bookingId + "/guests?page=" + page,
    );
    return body.items;
}

export async function declare(bookingId: string, lines: PoliceReportLine[]): Promise<{ batchId: string }> {
    return request<{ batchId: string }>("/ses/declarations", {
        method: "POST",
        body: JSON.stringify({ bookingId, lines }),
    });
}

export interface BatchStatus {
    readonly batchId: string;
    readonly status: "pending" | "processed";
    readonly accepted?: number;
    readonly rejected?: number;
    readonly settled?: boolean;
    readonly rejections?: Array<{ line: number; code: string; detail: string }>;
}

export async function getBatch(batchId: string): Promise<BatchStatus> {
    return request<BatchStatus>("/ses/declarations/" + batchId);
}
