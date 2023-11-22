import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";

describe("Test Add News API Endpoint", () => {
  test("should be return 400 status code if the request body field is empty", async () => {
    const request = await supertest(app).post("/v1/news");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request body name field is not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ name: "nova" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request body description field is missing", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "nova" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request file name field is not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "test", description: "test", author: "test" })
      .attach("pictures", "./public/test/test.avif");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request file image size is more than 5mb", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "test", description: "test", author: "test" })
      .attach("picture", "./public/test/5mb.png");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request file image extension is not supported", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "test", description: "test", author: "test" })
      .attach("picture", "./public/test/test.ico");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request file is empty", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "test", description: "test", author: "test" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 201 status code", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "test", description: "test", author: "test" })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const request = await supertest(app)
      .post("/v1/news")
      .field({ title: "test", description: "test", author: "test" })
      .attach("picture", "./public/test/test.avif")
      .set("Content-Type", "application/json");

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
});
