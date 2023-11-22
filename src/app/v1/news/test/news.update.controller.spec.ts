import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";

describe("Test Update News API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).patch("/v1/news/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if request body field is empty", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app).patch(`/v1/news/${news?.id}`);

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if request body name field is not allowed", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app).patch(`/v1/news/${news?.id}`).field({
      name: "test",
    });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 404 status code if the news was not found", async () => {
    const request = await supertest(app)
      .patch(`/v1/news/0911712b-615b-471f-a843-1ceea1719276`)
      .field({
        title: "test",
        description: "hehe",
        author: "test",
        body: "test",
      })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(404);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request file name field is not allowed", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app)
      .patch(`/v1/news/${news?.id}`)
      .field({
        title: "test",
        description: "hehe",
        author: "test",
        body: "test",
      })
      .attach("pictures", "./public/test/test.avif");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app)
      .patch(`/v1/news/${news?.id}`)
      .field({
        title: "test",
        description: "hehe",
        author: "test",
        body: "test",
      })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 200 status code", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app).patch(`/v1/news/${news?.id}`).field({
      title: "test",
      description: "hehe",
      author: "test",
      body: "test",
    });

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app)
      .patch(`/v1/news/${news?.id}`)
      .field({
        title: "test",
        description: "hehe",
        author: "test",
        body: "test",
      })
      .set("Content-Type", "application/json");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 422 status code if the image file size is more than 5mb", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app)
      .patch(`/v1/news/${news?.id}`)
      .field({
        title: "test",
        description: "hehe",
        author: "test",
        body: "test",
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/5mb.png");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the image file extension is not supported", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app)
      .patch(`/v1/news/${news?.id}`)
      .field({
        title: "test",
        description: "hehe",
        author: "test",
        body: "test",
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.ico");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
});
