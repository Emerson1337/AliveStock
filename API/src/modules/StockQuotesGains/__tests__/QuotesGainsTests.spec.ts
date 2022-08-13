import app from "@src/app";
import request from "supertest";

describe("Stock gains", () => {
  it("Should be able to get stock gains by date", async () => {
    const response = await request(app).get(
      `/stocks/IBM/gains?purchasedAt=2021-01-20&purchasedAmount=100`
    );

    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.lastPrice).toBe("number");
    expect(typeof response.body.priceAtDate).toBe("string");
    expect(typeof response.body.purchasedAmount).toBe("number");
    expect(typeof response.body.purchasedAt).toBe("string");
    expect(typeof response.body.capitalGains).toBe("number");

    expect(response.statusCode).toBe(200);
  });

  it("Should not be able to get stock gains by date", async () => {
    const response = await request(app).get(
      `/stocks/IBM2/gains?purchasedAt=2021-01-20&purchasedAmount=100`
    );

    expect(response.body.errors).toBe("IBM2 quote not found!");

    expect(response.statusCode).toBe(404);
  });
});
