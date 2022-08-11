import app from "@src/app";
import request from "supertest";

describe("Quote History controller", () => {
  it("Should be able to get stock quote history", async () => {
    const response = await request(app).get(
      `/stocks/IBM/history?from=2022-07-04&to=2022-07-07`
    );
    expect(typeof response.body.name).toBe("string");
    expect(typeof response.body.prices).toBe("object");
    expect(response.statusCode).toBe(200);
  });

  it("Should not be able to get stock quote history", async () => {
    const response = await request(app).get(
      `/stocks/IBM2/history?from=2022-07-04&to=2022-07-07`
    );

    expect(response.body.errors).toBe("Stock history quotes not found!");
    expect(response.statusCode).toBe(404);
  });
});
