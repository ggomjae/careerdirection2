import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

// 로그인할 때 쓰는 DTO
@InputType({ description: "SignIn User Data" })
export class SignInUserInput {

  // @IsEmail을 통해 리졸버에 넘기기 전에 확인
  @Field()
  @IsEmail()
  email!: string;

  // 패스워드 길이는 최소 12 최대 20
  @Field()
  @Length(12, 20)
  password!: string;
}
