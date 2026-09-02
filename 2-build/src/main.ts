/**
 * The entry point. It takes the first booking, runs the two calculations and declares
 * the police report.
 *
 * It is here so you can see the whole path working as soon as you implement the domain.
 * Change it if it gets in your way: this file is not evaluated.
 */
import { declare, guestsOf, listBookings, getBatch } from "./client.ts";
import { occupancy, policeReportLines } from "./domain.ts";

const today = new Date().toISOString().slice(0, 10);

const bookings = await listBookings();
if (bookings.length === 0) {
    console.log("The API returns no bookings: check API_BASE and API_TOKEN.");
    process.exit(1);
}

const booking = bookings[0];
const guests = await guestsOf(booking.id);

console.log("Booking " + booking.id + " at " + booking.property);
console.log("  capacity:  " + booking.capacity);
console.log("  occupancy: " + occupancy(booking, guests, today));

const lines = policeReportLines(guests, today);
console.log("  report:    " + lines.length + " lines");

//We add this part of the code for waiting for the police decision before print the text
const { batchId } = await declare(booking.id, lines);
console.log("Declared as " + batchId);

let batch = await getBatch(batchId);
while (batch.status === "pending") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    batch = await getBatch(batchId);
}

console.log(JSON.stringify(batch, null, 2));