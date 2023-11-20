import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";
import client from "../../../../libs/configs/prisma";

describe("Test Update Galery API Endpoint", () => {
  test("should be return 400 status code if the request ID is not UUID", async () => {
    const request = await supertest(app).patch("/v1/galeries/123");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if field name is not allowed", async () => {
    const galery = await client.galery.findFirst();
    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .field({
        titles: "hehe",
        description: "shehe",
      });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if field is empty", async () => {
    const galery = await client.galery.findFirst();
    const request = await supertest(app).patch(`/v1/galeries/${galery?.id}`);

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the image field name is not allowed", async () => {
    const galery = await client.galery.findFirst();
    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .field({
        title: "updated",
      })
      .attach("pictures", "./public/test/test.avif");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code if the request image file is undefined", async () => {
    const galery = await client.galery.findFirst();
    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .field({
        title: "updated",
      });

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
    expect(request.body.updated).toBe(true);
  });
  test("should be return 200 status code", async () => {
    const galery = await client.galery.findFirst();
    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .field({
        title: "updated",
      })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
    expect(request.body.updated).toBe(true);
  });
  test("Make sure it can accept application/json", async () => {
    const galery = await client.galery.findFirst();
    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .field({
        title: "updated",
      })
      .attach("picture", "./public/test/test.avif")
      .set("Content-Type", "application/json");

    expect(request.status).toBe(200);
    expect(request.body.status).toBe("OK");
    expect(request.body.updated).toBe(true);
  });
  test("should be return 422 status code if the request files image size is more than 5mb", async () => {
    const galery = await client.galery.findFirst();

    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "hjdsgfhds" })
      .attach("picture", "./public/test/5mb.png");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(422);
  });
  test("should be return 400 status code if the request files image ext is not supported", async () => {
    const galery = await client.galery.findFirst();

    const request = await supertest(app)
      .patch(`/v1/galeries/${galery?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "hjdsgfhds" })
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
});
