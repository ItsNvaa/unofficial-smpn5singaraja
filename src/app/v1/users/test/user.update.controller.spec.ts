import { describe, expect, test } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";

describe("Test Update Users API Endpoint", () => {
  test("Make sure it was accept application/json", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .set("Content-Type", "application/json")
      .field({ name: "HEHEHE" });

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 200 status code", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .field({ name: "HEHEHE" });

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 200 status code", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .field({ name: "HEHEHE" })
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 404 status code if the user does not exist", async () => {
    const request = await supertest(app)
      .patch(`/v1/users/0911712b-615b-471f-a843-1ceea1719276`)
      .field({ name: "HEHEHE" })
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(404);
  });
  test("should be return 400 status code if the image ext was not supported", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .field({ name: "HEHEHE" })
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the image file size is more than 5mb", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .field({ name: "HEHEHE" })
      .attach("picture", "./public/test/5mb.png");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(422);
  });
  test("should be return 400 status code if the fields is empty", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app).patch(`/v1/users/${user?.id}`);

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the fields was not allowed", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .field({ hehehe: "heheh" });

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the files fields was not allowed", async () => {
    const user = await client.user.findFirst();
    const request = await supertest(app)
      .patch(`/v1/users/${user?.id}`)
      .attach("pictures", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the request id is not a UUID", async () => {
    // const user = await client.user.findFirst();
    const request = await supertest(app).patch(`/v1/users/34535`);

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
});
