import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import crypto from "node:crypto";
import client from "../../../../libs/configs/prisma";

describe("Test Register User API Endpoint", () => {
  test("Make sure it can accept application/json", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");
    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        password,
      })
      .set("Content-Type", "application/json");

    expect(request.body.status).toBe("OK");
    expect(request.body.created).toBe(true);
    expect(request.status).toBe(201);
  });
  test("should be return 201 status code", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("OK");
    expect(request.body.created).toBe(true);
    expect(request.status).toBe(201);
  });
  test("should be return 400 status code if the name field length is more than 20", async () => {
    const name = crypto.randomBytes(32).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
  test("should be return 400 status code if field name is not allowed", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        passwords: password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
  test("should be return 422 status code if the image file size is more than 5mb", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/5mb.png");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(422);
  });
  test("should be return 400 status code if the image file ext is not supported", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
  test("should be return 422 status code if the image file fields is not allowed", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const email = `${name}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email,
        password,
      })
      .set("Content-Type", "application/json")
      .attach("pictures", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(422);
  });
  test("should be return 400 status code if the name is already taken", async () => {
    const user = await client.user.findFirst({ select: { name: true } });
    const email = `${crypto.randomBytes(10).toString("hex")}@gmail.com`;
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name: user?.name || "",
        email,
        password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
  test("should be return 400 status code if the email is already in used", async () => {
    const name = crypto.randomBytes(10).toString("hex");
    const user = await client.user.findFirst({ select: { email: true } });
    const password = crypto.randomBytes(32).toString("hex");

    const request = await supertest(app)
      .post("/v1/auth/register")
      .field({
        name,
        email: user?.email || "",
        password,
      })
      .set("Content-Type", "application/json")
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
  });
});
