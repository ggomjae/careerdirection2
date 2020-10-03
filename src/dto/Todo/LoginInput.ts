import { InputType, Field } from "type-graphql";
import { MaxLength, MinLength, IsEmail } from "class-validator";

@InputType()
export class LoginInput {
  @IsEmail({}, { message: "이메일 형식을 지켜 주십시오!" })
  @Field()
  email: string;

  @MinLength(8, { message: "패스워드가 너무 짧습니다. 8자 이상 입력해 주십시오." })
  @MaxLength(20, { message: "패스워드가 너무 깁니다. 20자 이내로 작성해 주십시오." })
  @Field()
  password: string;
}