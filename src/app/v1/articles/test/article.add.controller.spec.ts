import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Add Article API Endpoint", () => {
  test("should be return 400 status code if the request body field is empty", async () => {
    const request = await supertest(app).post("/v1/articles");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request body name field is not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/articles")
      .field({ name: "test" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request file is empty", async () => {
    const request = await supertest(app).post("/v1/articles").field({
      title: "test",
      description: "test",
      author: "test",
      body: "test",
    });

    console.log(request.body.messege);
    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request body description is missing", async () => {
    const request = await supertest(app).post("/v1/articles").field({
      title: "test",
      author: "test",
      body: "test",
    });

    console.log(request.body.messege);
    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request file name field is not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/articles")
      .field({
        title: "test",
        author: "test",
        description: "test",
        body: "test",
      })
      .attach("pictures", "./public/test/test.ico");

    console.log(request.body.messege);
    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request file extension is not supported", async () => {
    const request = await supertest(app)
      .post("/v1/articles")
      .field({
        title: "test",
        author: "test",
        description: "test",
        body: "test",
      })
      .attach("picture", "./public/test/test.ico");

    console.log(request.body.messege);
    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request file image size is more than 5mb", async () => {
    const request = await supertest(app)
      .post("/v1/articles")
      .field({
        title: "test",
        author: "test",
        description: "test",
        body: "test",
      })
      .attach("picture", "./public/test/5mb.png");

    console.log(request.body.messege);
    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 201 status code", async () => {
    const request = await supertest(app)
      .post("/v1/articles")
      .field({
        title: "test",
        author: "test",
        description: "test",
        body: "test",
      })
      .attach("picture", "./public/test/test.avif");

    console.log(request.body.messege);
    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const request = await supertest(app)
      .post("/v1/articles")
      .field({
        title: "test",
        author: "test",
        description: "test",
        body: "test",
      })
      .attach("picture", "./public/test/test.avif")
      .set("Content-Type", "application/json");

    console.log(request.body.messege);
    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
});
