import { ApolloError } from "apollo-server-express";

// Context 단에서 Error를 상태와 설명을 같이 보내기 위한 클래스
export class AuthCheckerError extends ApolloError {
  public status: boolean;
  public description: String;

  constructor(status: boolean, description: string) {
    super(description);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthCheckerError);
    }

    this.status = status;
    this.description = description;
  }
}
