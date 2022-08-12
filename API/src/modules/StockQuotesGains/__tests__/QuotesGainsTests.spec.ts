import app from "@src/app";
import request from "supertest";

describe("Stock gains", () => {
  it("Should be able to get stock gains positive by date", async () => {
    const response = await request(app).get(
      `/stocks/IBM/gains?purchasedAt=2021-01-20&purchasedAmount=100`
    );

    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.lastPrice).toBe("number");
    expect(typeof response.body.priceAtDate).toBe("number");
    expect(typeof response.body.purchasedAmount).toBe("number");
    expect(typeof response.body.purchasedAt).toBe("string");
    expect(typeof response.body.capitalGains).toBe("number");

    expect(typeof response.body.toBeLessThan).toBeGreaterThan(0);

    expect(response.statusCode).toBe(200);
  });

  it("Should be able to get stock gains negative by date", async () => {
    const response = await request(app).get(
      `/stocks/IBM2/history?from=2022-07-04&to=2022-07-07`
    );

    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.lastPrice).toBe("number");
    expect(typeof response.body.priceAtDate).toBe("number");
    expect(typeof response.body.purchasedAmount).toBe("number");
    expect(typeof response.body.purchasedAt).toBe("string");
    expect(typeof response.body.capitalGains).toBe("number");

    expect(typeof response.body.capitalGains).toBeLessThan(0);

    expect(response.statusCode).toBe(200);
  });

  it("Should be able to get stock no gains by date", async () => {
    const response = await request(app).get(
      `/stocks/IBM2/history?from=2022-07-04&to=2022-07-07`
    );

    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.lastPrice).toBe("number");
    expect(typeof response.body.priceAtDate).toBe("number");
    expect(typeof response.body.purchasedAmount).toBe("number");
    expect(typeof response.body.purchasedAt).toBe("string");
    expect(typeof response.body.capitalGains).toBe("number");

    expect(typeof response.body.capitalGains).toEqual(0);

    expect(response.statusCode).toBe(200);
  });
});
