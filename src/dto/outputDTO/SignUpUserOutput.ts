import { ObjectType, Field } from "type-graphql";

// 회원가입 후 정보를 넘겨주는 DTO
@ObjectType({ description: "SignUp Response Data" })
export class SignUpUserOutput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  status!: boolean;
}
