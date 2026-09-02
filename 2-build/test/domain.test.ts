import { test } from "node:test";
import assert from "node:assert/strict";
import { ageOn } from "../src/domain.ts";

// This one passes from the very first moment: it is your harness, so you do not start from zero.
test("la edad no baila con la zona horaria", () => {
    assert.equal(ageOn("2024-01-01", "2026-01-01"), 2);
    assert.equal(ageOn("2024-12-31", "2026-12-30"), 1);
});

// From here on, it is yours.
