import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";

describe("Test Add Teacher API Endpoint", () => {
  test("should be return 400 status code if the name fieldis not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({ hehe: "hsuhd" });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the fullname field is missing", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({ NIP: 902 });

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request body is empty", async () => {
    const request = await supertest(app).post("/v1/teachers");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("Make sure it can accept aplication/json", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({
        fullname: "test",
        gender: "test",
        NIP: 16,
        picture: "test",
      })
      .set("Content-Type", "application/json");

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 201 status code", async () => {
    const request = await supertest(app).post("/v1/teachers").field({
      fullname: "test",
      gender: "test",
      NIP: 16,
      picture: "test",
    });

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 201 status code", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({
        fullname: "test",
        gender: "test",
        NIP: 16,
      })
      .attach("picture", "./public/test/test.avif");

    expect(request.status).toBe(201);
    expect(request.body.status).toBe("OK");
  });
  test("should be return 422 status code if the request files field is not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({
        fullname: "test",
        gender: "test",
        NIP: 16,
      })
      .attach("pictures", "./public/test/test.avif");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 400 status code if the request image file extension is not supported", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({
        fullname: "test",
        gender: "test",
        NIP: 16,
      })
      .attach("picture", "./public/test/test.ico");

    expect(request.status).toBe(400);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 422 status code if the request image file size is more than 5mb", async () => {
    const request = await supertest(app)
      .post("/v1/teachers")
      .field({
        fullname: "test",
        gender: "test",
        NIP: 16,
      })
      .attach("picture", "./public/test/5mb.png");

    expect(request.status).toBe(422);
    expect(request.body.status).toBe("KO");
  });
});
