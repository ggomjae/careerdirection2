import { ObjectType, Field } from "type-graphql";

// 토큰의 유효성을 확인한 후 정보를 넘겨주는 DTO
@ObjectType({ description: "Verify Response Data" })
export class VerifyTokenOutput {
  @Field()
  email!: string;
}
