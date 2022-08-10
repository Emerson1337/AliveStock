import { app } from "../../../app";
import request from "supertest";

describe("Quote controller", () => {
  it("Should test a quote by search name", async () => {
    const response = await request(app).get(`/quotes/IBM`);

    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.lastPrice).toBe("number");
    expect(typeof response.body.pricedAt).toBe("string");
    expect(response.statusCode).toBe(200);
  });
});
