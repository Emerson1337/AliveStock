import app from "@src/app";
import request from "supertest";

describe("Quote Comparison controller", () => {
  it("Should be able to get stock quote history", async () => {
    const response = await request(app).get(
      `/stocks/IBM/compare?stocksToCompare[]=IBM`
    );

    expect(typeof response.body.lastPrices).toBe("object");
    expect(response.statusCode).toBe(200);
  });

  it("Should not be able to get stock quote history", async () => {
    const response = await request(app).get(
      `/stocks/IBM2/compare?stocksToCompare[]=IBM2`
    );

    expect(response.body.errors).toBe("Quote by stock not found!");
    expect(response.statusCode).toBe(404);
  });
});
