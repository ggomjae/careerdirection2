import { ObjectType, Field } from "type-graphql";

// 로그인 후 정보를 넘겨주는 DTO
@ObjectType({ description: "SignIn Response Data" })
export class SignInUserOutput {
  @Field()
  token!: string;

  @Field()
  email!: string;

  @Field()
  status!: boolean;
}
