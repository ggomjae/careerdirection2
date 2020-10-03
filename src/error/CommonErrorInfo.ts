export class CommonErrorInfo {
  code: string;
  message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  getCode(): string {
    return this.code;
  }

  getMessage(): string {
    return this.message;
  }
}