import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";

describe("Test Delete News API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).delete("/v1/news/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the news data was not found", async () => {
    const request = await supertest(app).delete(
      `/v1/news/0911712b-615b-471f-a843-1ceea1719276`
    );

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app).delete(`/v1/news/${news?.id}`);

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const news = await client.news.findFirst();
    const request = await supertest(app)
      .delete(`/v1/news/${news?.id}`)
      .set("Content-Type", "application/json");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
});
