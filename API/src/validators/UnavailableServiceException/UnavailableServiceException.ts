export class UnavailableServiceException extends Error {
  constructor() {
    super(
      `Unavailable API service! Probably 5 requests per minute has expired.`
    );
  }
}
