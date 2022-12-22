export class TwitchAPIException extends Error {
  private readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  getStatusCode() {
    return this.status;
  }
}
