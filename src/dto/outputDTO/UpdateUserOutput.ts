import { ObjectType, Field } from "type-graphql";

// 회원수정하고 수정한 name값과 email을 넘겨주는 DTO
@ObjectType({ description: "Update Response Data" })
export class UpdateUserOutput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  status!: boolean;
}
