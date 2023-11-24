import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Update Teacher API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).patch("/v1/teachers/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if request body field is empty", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app).patch(`/v1/teachers/${teacher?.id}`);

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if request body field name is not allowed", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ name: "test" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 404 status code if teacher data was not found", async () => {
    const request = await supertest(app)
      .patch(`/v1/teachers/0911712b-615b-471f-a843-1ceea1719276`)
      .field({ fullname: "test" });

    expect(request.status).toBe(404);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request files field name is not allowed", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ fullname: "test" })
      .attach("pictures", "./public/test/test.avif");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request files image size is more than 5mb", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ fullname: "test" })
      .attach("picture", "./public/test/5mb.png");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request files image extension is not supported", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ fullname: "test" })
      .attach("picture", "./public/test/test.ico");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ fullname: "test" });

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 200 status code", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ fullname: "test" })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const teacher = await client.teacher.findFirst();
    const request = await supertest(app)
      .patch(`/v1/teachers/${teacher?.id}`)
      .field({ fullname: "test" })
      .set("Content-Type", "application/json");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
});
