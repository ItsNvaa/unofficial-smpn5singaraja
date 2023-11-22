import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test GET News API Endpoint", () => {
  describe("Test Get All News API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/news");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("Make sure it can accept aplication/json", async () => {
      const request = await supertest(app)
        .get("/v1/news")
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("should be return 200 status code", async () => {
      const total = await client.news.count();
      const request = await supertest(app)
        .get("/v1/news?skip=1")
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
      expect(request.body.news.length).toBe(total - 1);
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app)
        .get("/v1/news?limit=1")
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
      expect(request.body.news.length).toBe(1);
    });
  });
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
