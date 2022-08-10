import app from "@src/app";
import request from "supertest";

describe("Quote controller", () => {
  it("Should be able to get stock quote", async () => {
    const response = await request(app).get(`/quotes/IBM`);

    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.lastPrice).toBe("number");
    expect(typeof response.body.pricedAt).toBe("string");
    expect(response.statusCode).toBe(200);
  });

  it("Should not be able to get stock quote", async () => {
    const response = await request(app).get(`/quotes/IBM2`);

    expect(response.body.errors).toBe("quote by stock not found!");
    expect(response.statusCode).toBe(404);
  });
});
