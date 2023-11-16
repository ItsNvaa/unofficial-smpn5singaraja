import { describe, test, expect } from "bun:test";
import app from "../../../../main";
import supertest from "supertest";
import client from "../../../../libs/configs/prisma";

describe("Test Update Achivement API Endpoint", () => {
  test("Make sure it was accept application/json", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "Hehehe" });

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 200 status code", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "Hehehe" });

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 200 status code", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "Hehehe" })
      .attach("picture", "./public/test/test.avif");

    expect(request.body.status).toBe("OK");
    expect(request.statusCode).toBe(200);
  });
  test("should be return 422 status code if the request files field name is not allowed", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "Hehehe" })
      .attach("pictures", "./public/test/test.avif");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(422);
  });
  test("should be return 400 status code if the request body is empty", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 400 status code if the request body name field is not allowed", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ titles: "hjdsgfhds" });

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
  test("should be return 422 status code if the request files image size is more than 5mb", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "hjdsgfhds" })
      .attach("picture", "./public/test/5mb.png");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(422);
  });
  test("should be return 400 status code if the request files image ext is not supported", async () => {
    const achivement = await client.achivement.findFirst();

    const request = await supertest(app)
      .patch(`/v1/achivements/${achivement?.id}`)
      .set("Content-Type", "application/json")
      .field({ title: "hjdsgfhds" })
      .attach("picture", "./public/test/test.ico");

    expect(request.body.status).toBe("KO");
    expect(request.statusCode).toBe(400);
  });
});
