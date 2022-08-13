export class InvalidInputDataException extends Error {
  constructor() {
    super(`Invalid data found!`);
  }
}
