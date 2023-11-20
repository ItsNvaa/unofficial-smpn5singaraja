import { test, expect, describe } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import crypto from "crypto";

describe("Test Add Galery API Endpoint", () => {
  test("should be return 201 status code", async () => {
    const title = crypto.randomBytes(10).toString("hex");
    const description = crypto.randomBytes(32).toString("hex");
    const request = await supertest(app)
      .post("/v1/galeries")
      .field({
        title,
        description,
      })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
    expect(request.body.created).toBe(true);
  });
  test("Make sure it can accept application/json", async () => {
    const title = crypto.randomBytes(10).toString("hex");
    const description = crypto.randomBytes(32).toString("hex");
    const request = await supertest(app)
      .post("/v1/galeries")
      .field({
        title,
        description,
      })
      .attach("picture", "./public/test/test.avif")
      .set("Content-Type", "application/json");

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
    expect(request.body.created).toBe(true);
  });
  test("should be return 400 status code if field name is not allowed", async () => {
    const title = crypto.randomBytes(10).toString("hex");
    const description = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/galeries")
      .field({
        title,
        descriptions: description,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
  test("should be return 422 status code if the image file size is more than 5mb", async () => {
    const title = crypto.randomBytes(10).toString("hex");
    const description = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/galeries")
      .field({
        title,
        description,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/5mb.png");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(422);
  });
  test("should be return 400 status code if the image file ext is not supported", async () => {
    const title = crypto.randomBytes(10).toString("hex");
    const description = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/galeries")
      .field({
        title,
        description,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
  test("should be return 422 status code if the image file fields is not allowed", async () => {
    const title = crypto.randomBytes(10).toString("hex");
    const description = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/galeries")
      .field({
        title,
        description,
      })
      .set("Content-Type", "application/json")
      .attach("pictures", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(422);
  });
});
