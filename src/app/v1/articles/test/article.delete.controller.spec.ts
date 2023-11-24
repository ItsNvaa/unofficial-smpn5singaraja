import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Delete Article API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).delete("/v1/articles/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the article data was not found", async () => {
    const request = await supertest(app).delete(
      "/v1/articles/0911712b-615b-471f-a843-1ceea1719276"
    );

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app).delete(`/v1/articles/${article?.id}`);

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
  test("Make sure it can accept aplication/json", async () => {
    const article = await client.article.findFirst();
    const request = await supertest(app)
      .delete(`/v1/articles/${article?.id}`)
      .set("Content-Type", "application/json");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
  });
});
