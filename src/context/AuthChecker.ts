import { AuthChecker } from "type-graphql";
import { ApolloContextInterface } from "./ApolloContext";

// Error를 핸들링하기 위한 모듈
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import * as errorDTO from "../dto/errorDTO";

export const ApolloAuthChecker: AuthChecker<ApolloContextInterface> = async (
  { context: { error, user, Authorization } },
  roles
) => {
  // 만료 된 토큰 일 경우 
  if (error instanceof TokenExpiredError) {
    throw new errorDTO.AuthCheckerError(false, "만료된 토큰입니다.");
  }

  // 토큰의 형식이 맞지 않는 경우
  if (error instanceof JsonWebTokenError) {
    throw new errorDTO.AuthCheckerError(false, "형식에 맞지 않은 토큰입니다.");
  }

  // 그 밖에 모든 오류
  if (error) {
    throw new errorDTO.AuthCheckerError(false, "오류입니다.");
  }

  // 모두 통과되면 true를 반환하고 Resolver 실행
  return true;
};

/*
  일단 파라미터 부분을 보면 {conetxt: {jwt, invalidToken, user}}는 우리가 전달한 컨텍스트에서 필요한 것들을 받은것이고
  roles는 나중에 우리가 @Authorized(args)로 사용할때 args로 던져준 파라미터일 것이다.
  해서 로직은 컨텍스트에서 토큰 검증중 발생한 에러가 담긴 invalidToken이 undefined가 아닌 정의가 되어있다면
  해당 에러를 ApolloError로 생성해서 던져주었고 그밑으로는 user 객체의 유무로 true, false를 응답하도록 해놨다.
  토큰이 전달되었고 invalidToken이 undefined이라면 user는 항상 존재할 것이다.
  user가 없는 경우는 토큰이 전달되지 않은 경우일 것이다.
  자 이제 작성한 AuthChecker를 사용해보자.
  일단 사용하기 위해서는 schema빌드시 함께 빌드 해줘야한다.
*/
