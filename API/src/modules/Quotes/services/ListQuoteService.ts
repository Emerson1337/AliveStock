import { QuoteDataDTO } from "Interfaces/quotes";
import { ListCompanyDTO } from "../DTOs";

export class ListQuoteService {
  public async listByCompany({
    companyName,
  }: ListCompanyDTO): Promise<QuoteDataDTO> {
    return {
      name: "test",
      lastPrice: 21,
      pricedAt: "das",
    };
  }
}
