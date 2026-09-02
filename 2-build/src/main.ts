/**
 * The entry point. It takes the first booking, runs the two calculations and declares
 * the police report.
 *
 * It is here so you can see the whole path working as soon as you implement the domain.
 * Change it if it gets in your way: this file is not evaluated.
 */
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";
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

const plazas = occupancy(booking, guests, today);
const reportLines = policeReportLines(guests, today);

const { batchId } = await declare(booking.id, reportLines);
let batch = await getBatch(batchId);
while (batch.status === "pending") {
    await new Promise((r) => setTimeout(r, 400));
    batch = await getBatch(batchId);
}

const template = readFileSync("views/index.hbs", "utf-8");
const css = readFileSync("views/style.css", "utf-8");
const html = Handlebars.compile(template)({
    booking,
    plazas,
    totalViajeros: reportLines.length,
    batch,
    reportLines,
});

createServer((req, res) => {
    if (req.url === "/style.css") {
        res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
        res.end(css);
        return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
}).listen(3000, () => {
    console.log("Listo: entra en http://localhost:3000");
});