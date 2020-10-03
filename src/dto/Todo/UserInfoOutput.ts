import { ObjectType, Field } from "type-graphql";

import { RoleStatus } from "../../enum";

@ObjectType()
export class UserInfoOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: RoleStatus;
}