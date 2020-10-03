// import { verifyToken } from "./VerificationToken";
// import { roleStatus } from "../type";

// Token을 생성하는 모듈
import * as JwtFactory from "jsonwebtoken";
import { secretKey } from "../config/jwt";

// DTO
import * as outputDTO from "../dto/outputDTO";

/* 
  client 에서 예시처럼 axios로 헤더값에 beaer를 붙여서 토큰을 보낸다.
  EX) axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;

  context 객체는 모든 레벨에서 모든 단일 리졸버로 전달되는 객체이므로 스키마코드
  어느 곳에서나 엑세스를 할 수 있다. 이 객체는 새로운 요청이 있을 때마다 컨텍스트가 다시 생성된다.
  즉, 저장하는 부분에 있어서 걱정할 필요가 없다. 여기 코드에서는 Authorization 변수
*/

export const ApolloContext = async ({
  req,
}): Promise<ApolloContextInterface> => {
  let token: string = req.headers.authorization || "";

  let user: outputDTO.VerifyTokenOutput = undefined;
  let userInfo: any = undefined;
  let error: Error = undefined;

  if (token) {
    try {
      // Bearer를 없애주기 위한 코드
      token = token.substr(7);

      // User에 대한 information 추출
      userInfo = await JwtFactory.verify(token, secretKey);
    } catch (err) {
      error = err;
    }
  }

  // 에러없이 Token에 User에 대한 information을 잘 추출했으면 email 저장
  if (userInfo) {
    user = {
      email: (<any>userInfo).email,
    };
  }

  // Context에 담을 변수를 반환
  return {
    error: error,
    user: user,
    Authorization: token,
  };
};

// Context 보관소
export interface ApolloContextInterface {
  error: Error;
  user: outputDTO.VerifyTokenOutput;
  Authorization: string | undefined;
}
