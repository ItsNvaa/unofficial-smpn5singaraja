import { describe, test, expect } from "bun:test";
import client from "../../../../libs/configs/prisma";
import app from "../../../../main";
import supertest from "supertest";

describe("Test Delete User Endpoint", () => {
  test("should be return 200 status code", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app).delete(`/v1/users/${user?.id}`);

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 400 status code if the user not exits", async () => {
    const request = await supertest(app).delete(
      `/v1/users/0911712b-615b-471f-a843-1ceea1719276`
    );

    expect(request.statusCode).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the user request id is not UUID", async () => {
    const request = await supertest(app).delete(
      `/v1/users/0911712b-615b-471f-a843-1ceea171927`
    );

    expect(request.statusCode).toBe(400);
    expect(request.body.status).toBe("KO");
  });
});
