import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";
import supertest from "supertest";

describe("Test Delete Galery API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).delete("/v1/galeries/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the galery is not found", async () => {
    const request = await supertest(app).delete(
      "/v1/galeries/0911712b-615b-471f-a843-1ceea1719276"
    );

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test.skip("should be return 200 status code status code", async () => {
    const galery = await client.galery.findFirst();

    const request = await supertest(app).delete(`/v1/galeries/${galery?.id}`);

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
});
