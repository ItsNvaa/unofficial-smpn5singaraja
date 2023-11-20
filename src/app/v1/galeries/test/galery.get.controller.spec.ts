import { expect, describe, test } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test GET Galeries API Endpoint", () => {
  describe("Test GET All Galeries API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const request = await supertest(app).get("/v1/galeries");

      expect(request.body.status).toBe("OK");
      expect(request.status).toBe(200);
    });
    test("Make sure it can accept aplication/json", async () => {
      const request = await supertest(app)
        .get("/v1/galeries")
        .set("Content-Type", "application/json");

      expect(request.body.status).toBe("OK");
      expect(request.status).toBe(200);
    });
    test("should be return 200 status code", async () => {
      const total = await client.galery.count();
      const request = await supertest(app)
        .get("/v1/galeries?skip=1")
        .set("Content-Type", "application/json");

      expect(request.body.status).toBe("OK");
      expect(request.body.galeries.length).toBe(total - 1);
      expect(request.status).toBe(200);
    });
    test("should be return 200 status code", async () => {
      const request = await supertest(app)
        .get("/v1/galeries?limit=1")
        .set("Content-Type", "application/json");

      expect(request.body.status).toBe("OK");
      expect(request.body.galeries.length).toBe(1);
      expect(request.status).toBe(200);
    });
  });
  describe("Test GET Single Galery API Endpoint", () => {
    test("should be return 200 status code", async () => {
      const galery = await client.galery.findFirst();
      const request = await supertest(app).get(`/v1/galeries/${galery?.id}`);

      expect(request.body.status).toBe("OK");
      expect(request.status).toBe(200);
    });
    test("Make sure it can accept aplication/json", async () => {
      const galery = await client.galery.findFirst();
      const request = await supertest(app)
        .get(`/v1/galeries/${galery?.id}`)
        .set("Content-Type", "application/json");

      expect(request.body.status).toBe("OK");
      expect(request.status).toBe(200);
    });
    test("should be return 400 status code if the galery ID is not UUID", async () => {
      const request = await supertest(app)
        .get(`/v1/galeries/123`)
        .set("Content-Type", "application/json");

      expect(request.body.status).toBe("KO");
      expect(request.status).toBe(400);
    });
    test("should be return 404 status code if the galery data is not found", async () => {
      const request = await supertest(app)
        .get(`/v1/galeries/857a5e3a-6799-41c3-8e89-19c9fe050a1d`)
        .set("Content-Type", "application/json");

      expect(request.body.status).toBe("KO");
      expect(request.status).toBe(404);
    });
  });
});
