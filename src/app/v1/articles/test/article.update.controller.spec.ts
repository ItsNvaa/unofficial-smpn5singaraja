import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Update Article API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).patch("/v1/articles/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if request body field is empty", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app).patch(`/v1/articles/${article?.id}`);

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if request body name field is not allowed", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ name: "hehe" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 404 status code if article data was not found", async () => {
    const request = await supertest(app)
      .patch(`/v1/articles/0911712b-615b-471f-a843-1ceea1719276`)
      .field({ title: "hehe" });

    expect(request.status).toBe(404);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ title: "hehe" });

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ title: "hehe" })
      .set("Content-Type", "application/json");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 422 status code if the request file name field is not allowed", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ title: "hehe" })
      .set("Content-Type", "application/json")
      .attach("pictures", "./public/test/test.avif");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ title: "hehe" })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 400 status code if the request file image extension is not supported", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ title: "hehe" })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.ico");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request file image size is more than 5mb", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .patch(`/v1/articles/${article?.id}`)
      .field({ title: "hehe" })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/5mb.png");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
});
