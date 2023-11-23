import { expect, test, describe } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Delete Achivement API Endpoint", () => {
  test("should be return 400 status code if the request id is not UUID", async () => {
    const request = await supertest(app).delete("/v1/achivements/1243");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test.skip("should be return 200 status code status code", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app).delete(
      `/v1/achivements/${achivement?.id}`
    );

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 400 status code if the achivement not exits", async () => {
    const request = await supertest(app).delete(
      `/v1/achivements/0911712b-615b-471f-a843-1ceea1719276`
    );

    expect(request.statusCode).toBe(400);
    expect(request.body.status).toBe("KO");
  });
});
