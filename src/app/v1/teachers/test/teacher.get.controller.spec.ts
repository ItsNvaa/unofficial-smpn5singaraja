import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";

describe("Test GET Teachers Datas API Endpoint", () => {
  describe("Test GET All Teachers API Endpoint", () => {
    test("Make sure it can accept aplication/json", async () => {
      const request = await supertest(app)
        .get("/v1/teachers")
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/teachers");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("should be return 200 status code", async () => {
      const total = await client.teacher.count();
      const request = await supertest(app).get("/v1/teachers?skip=1");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
      expect(request.body.teachers.length).toBe(total - 1);
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/teachers?limit=1");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
      expect(request.body.teachers.length).toBe(1);
    });
  });

  describe("Test Get Single Teacher API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const teacher = await client.teacher.findFirst();
      const request = await supertest(app).get(`/v1/teachers/${teacher?.id}`);

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("Make sure it can accept aplication/json", async () => {
      const teacher = await client.teacher.findFirst();
      const request = await supertest(app)
        .get(`/v1/teachers/${teacher?.id}`)
        .set("Content-Type", "application/json");

      expect(request.status).toBe(200);
      expect(request.body.status).toBe("OK");
    });
    test("should be return 400 status code if the request ID is not UUID", async () => {
      const request = await supertest(app)
        .get(`/v1/teachers/123`)
        .set("Content-Type", "application/json");

      expect(request.status).toBe(400);
      expect(request.body.status).toBe("KO");
    });
    test("should be return 404 status code if the data is not found", async () => {
      const request = await supertest(app)
        .get(`/v1/teachers/857a5e3a-6799-41c3-8e89-19c9fe050a1d`)
        .set("Content-Type", "application/json");

      expect(request.status).toBe(404);
      expect(request.body.status).toBe("KO");
    });
  });
});
