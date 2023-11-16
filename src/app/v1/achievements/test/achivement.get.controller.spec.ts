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
  describe("Test GET Single Achivement API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const achivement = await client.achivement.findFirst();
      const request = await supertest(app).get(
        `/v1/achivements/${achivement?.id}`
      );
      expect(request.body.status).toBe("OK");
      expect(request.statusCode).toBe(200);
    });
    test("Make sure it was accept application/json", async () => {
      const achivement = await client.achivement.findFirst();
      const request = await supertest(app)
        .get(`/v1/achivements/${achivement?.id}`)
        .set("Content-Type", "application/json");
      expect(request.body.status).toBe("OK");
      expect(request.statusCode).toBe(200);
    });
    test("should be return 400 status code if the request id is not UUID", async () => {
      const request = await supertest(app).get(`/v1/achivements/test`);
      expect(request.body.status).toBe("KO");
      expect(request.statusCode).toBe(400);
    });
    test("should be return 400 status code if the request data is not found", async () => {
      const request = await supertest(app).get(
        `/v1/achivements/857a5e3a-6799-41c3-8e89-19c9fe050a1d`
      );
      expect(request.body.status).toBe("KO");
      expect(request.statusCode).toBe(404);
    });
  });
});
