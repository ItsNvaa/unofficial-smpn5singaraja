import "dotenv/config";
import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import app from "../../../../main";

describe("Test User Login API Endpoint", () => {
  test("Make sure it can accept aplication/json", async () => {
    const request = await supertest(app)
      .post("/v1/auth/login")
      .field({
        name: "nova",
        email: "nova@gmail.com",
        password: "random123",
      })
      .set("Content-Type", "application/json");

    expect(request.body.access).toBe(true);
    expect(request.status).toBe(200);
  });
  test("should be return 200 status code", async () => {
    const request = await supertest(app).post("/v1/auth/login").field({
      name: "nova",
      email: "nova@gmail.com",
      password: "random123",
    });

    expect(request.body.access).toBe(true);
    expect(request.status).toBe(200);
  });
  test("access token should be not null or undefined", async () => {
    const request = await supertest(app)
      .post("/v1/auth/login")
      .field({
        name: "nova",
        email: "nova@gmail.com",
        password: "random123",
      })
      .set("Content-Type", "application/json");

    expect(request.body.access).toBe(true);
    expect(request.status).toBe(200);
    expect(request.body.token).toBeDefined();
    expect(request.body.token).not.toBeNull();
  });
  test("should be return 400 status code if the name fields is not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/auth/login")
      .field({
        name: "nova",
        email: "nova@gmail.com",
        passwords: "random123",
      })
      .set("Content-Type", "application/json");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(400);
    expect(request.body.token).not.toBeDefined();
  });
  test("should be return 422 status code if the password is not match", async () => {
    const request = await supertest(app)
      .post("/v1/auth/login")
      .field({
        name: "nova",
        email: "nova@gmail.com",
        password: "random12",
      })
      .set("Content-Type", "application/json");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(422);
    expect(request.body.token).not.toBeDefined();
  });
  test("should be return 404 status code if the name or email is not found", async () => {
    const request = await supertest(app)
      .post("/v1/auth/login")
      .field({
        name: "nov",
        email: "nova@gmail.com",
        password: "random123",
      })
      .set("Content-Type", "application/json");

    expect(request.body.status).toBe("KO");
    expect(request.status).toBe(404);
    expect(request.body.token).not.toBeDefined();
  });
  test("it should be return false if the NODE_ENV is not production", () => {
    const isSecured = process.env.NODE_ENV == "production" ? true : false;

    expect(isSecured).toBe(false);
  });
});
