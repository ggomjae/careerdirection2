import { InputType, Field } from "type-graphql";
import { roleStatus } from "../../type";
import { Length, IsEmail } from "class-validator";

// 회원가입할 때 쓰는 DTO
@InputType({ description: "SignUp User Data" })
export class SignUpUserInput {
  @Field()
  name!: string;

  // @IsEmail을 통해 리졸버에 넘기기 전에 확인
  @Field()
  @IsEmail()
  email!: string;

  // 패스워드 길이는 최소 12 최대 20
  @Field()
  @Length(12, 20)
  password!: string;

  @Field()
  roles: roleStatus = roleStatus.user; // 최초의 개발자 권한자는 직접 admin으로 등록.
}
