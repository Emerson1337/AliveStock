export class InvalidResponseDataException extends Error {
  constructor(stockname: string) {
    super(`Stock ${stockname} history quotes not found!`);
  }
}
