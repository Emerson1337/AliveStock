import { CompanyDTO } from "Interfaces/general";

export interface StockHistoryDTO extends CompanyDTO {
  dateFrom: Date;
  dateTo: Date;
}
