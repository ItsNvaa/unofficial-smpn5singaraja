import { test, expect, describe } from "bun:test";
import client from "../../../../libs/configs/prisma";
import supertest from "supertest";
import app from "../../../../main";

describe("Users GET API Test", () => {
  describe("GET Single User Test", () => {
    test("Should be return 200 status code", async () => {
      const user = await client.user.findFirst();
      const request = await supertest(app).get(`/v1/users/${user?.id}`);
      expect(request.body.status).toBe("OK");
      expect(request.status).toBe(200);
    });
    test("Should be return 400 status code", async () => {
      const request = await supertest(app).get(
        `/v1/users/ec01dd21-96bb-40f9-ba8f-8cc83dfa85`
      );
      expect(request.body.status).toBe("KO");
      expect(request.statusCode).toBe(400);
    });
    test("Should be return 404 status code", async () => {
      const request = await supertest(app).get(
        `/v1/users/ec01dd21-96bb-40f9-ba8f-8cc83dfa8574`
      );
      expect(request.body.status).toBe("KO");
      expect(request.status).toBe(404);
    });
  });
});
