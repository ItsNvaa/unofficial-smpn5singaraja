import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Get Articles API Endpoint", () => {
  describe("Test Get All Articles API Endpoint", () => {
    test("Make sure it can accept aplication/json", async () => {
      const request = await supertest(app)
        .get("/v1/articles")
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/articles");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/articles?limit=1");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
      expect(request.body.articles.length).toBe(1);
    });
    test("should be return 200 status code", async () => {
      const total = await client.article.count();
      const request = await supertest(app).get("/v1/articles?skip=1");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
      expect(request.body.articles.length).toBe(total - 1);
    });
  });
});
