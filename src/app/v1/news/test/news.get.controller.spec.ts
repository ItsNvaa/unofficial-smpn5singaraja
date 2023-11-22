import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";

describe("Test GET News API Endpoint", () => {
  describe("Test Search News API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/news/search?q=test");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("Make sure it can accept aplication/json", async () => {
      const request = await supertest(app)
        .get("/v1/news/search?q=test")
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
  });
});
