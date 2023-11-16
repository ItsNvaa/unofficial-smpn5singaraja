import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test GET Achivements API Endpoint", () => {
  describe("Test GET All Achivements API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/achivements");
      expect(request.body.status).toBe("OK");
      expect(request.statusCode).toBe(200);
    });
    test("Make sure it was accept application/json", async () => {
      const request = await supertest(app)
        .get("/v1/achivements")
        .set("Content-Type", "application/json");
      expect(request.body.status).toBe("OK");
      expect(request.statusCode).toBe(200);
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app)
        .get("/v1/achivements?limit=1")
        .set("Content-Type", "application/json");
      expect(request.body.status).toBe("OK");
      expect(request.statusCode).toBe(200);
      expect(request.body.achivements.length).toBe(1);
    });
    test("should be return 200 status code", async () => {
      const achivements = await client.achivement.count();
      const request = await supertest(app)
        .get("/v1/achivements?skip=1")
        .set("Content-Type", "application/json");
      expect(request.body.status).toBe("OK");
      expect(request.statusCode).toBe(200);
      expect(request.body.achivements.length).toBe(achivements - 1);
    });
  });
});
