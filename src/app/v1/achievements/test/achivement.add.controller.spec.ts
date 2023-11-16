import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";

describe("Test Add Achivement API Endpoint", () => {
  test("should be return 201 status code", async () => {
    const request = await supertest(app)
      .post("/v1/achivements")
      .set("Content-Type", "application/json")
      .field({
        title: "test",
        description: "test",
      })
      .attach("picture", "./public/test/test.avif");
    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(201);
  });
  test("should be return 201 status code", async () => {
    const request = await supertest(app)
      .post("/v1/achivements")
      .set("Content-Type", "application/json")
      .field({
        title: "test",
        description: "test",
        picture: "test",
      });
    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(201);
  });
  test("Make sure it was accept application/json", async () => {
    const request = await supertest(app)
      .post("/v1/achivements")
      .set("Content-Type", "application/json")
      .field({
        title: "test",
        description: "test",
        picture: "test",
      });
    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(201);
  });
  test("should be return 422 status code if the request files name fields not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/achivements")
      .set("Content-Type", "application/json")
      .field({
        title: "test",
        description: "test",
      })
      .attach("pictures", "./public/test/test.avif");
    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(422);
  });
  test("should be return 400 status code if the request body is empty", async () => {
    const request = await supertest(app).post("/v1/achivements");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the request body is not allowed", async () => {
    const request = await supertest(app).post("/v1/achivements").field({
      names: "heheh",
    });

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the file image extension was not allowed", async () => {
    const request = await supertest(app)
      .post("/v1/achivements")
      .set("Content-Type", "application/json")
      .field({
        title: "test",
        description: "test",
      })
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the image file size is more than 5mb", async () => {
    const request = await supertest(app)
      .post("/v1/achivements")
      .set("Content-Type", "application/json")
      .field({
        title: "test",
        description: "test",
      })
      .attach("picture", "./public/test/5mb.png");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(422);
  });
});
