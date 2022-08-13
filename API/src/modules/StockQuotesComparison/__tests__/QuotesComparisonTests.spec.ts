import app from "@src/app";
import request from "supertest";

describe("Quote Comparison controller", () => {
  it("Should be able to get stock compare", async () => {
    const response = await request(app).get(
      `/stocks/IBM/compare?stocksToCompare[]=ABCB&stocksToCompare[]=ABC`
    );

    expect(typeof response.body.lastPrices).toBe("object");
    expect(response.statusCode).toBe(200);
  });

  it("Should not be able to get stock compare", async () => {
    const response = await request(app).get(
      `/stocks/IBM2/compare?stocksToCompare[]=ABCB&stocksToCompare[]=ABC`
    );

    expect(response.body.errors).toBe("IBM2 quote not found!");
    expect(response.statusCode).toBe(404);
  });
});
