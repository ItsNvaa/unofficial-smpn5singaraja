import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";

describe("Test GET Teachers Datas API Endpoint", () => {
  describe("Test GET All Teachers API Endpoint", () => {
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
});
