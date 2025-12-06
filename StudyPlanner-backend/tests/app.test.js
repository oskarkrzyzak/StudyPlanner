const request = require("supertest");
const app = require("../server");   // <-- to jest poprawna ścieżka

describe("GET /", () => {
  it("Should return MVP message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("StudyPlanner MVP is running");
  });
});