import { InputType, Field, Int } from "type-graphql";
import { Min, MaxLength, MinLength } from "class-validator";

import { TodoStatus } from "../../enum";

@InputType()
export class MakeTodoInput {
  @Min(1, { message: "현재 작업하는 유저 ID 값이 유효하지 않습니다" })
  @Field(() => Int)
  userId: number;

  @MinLength(5, { message: "할 일 내용은 5글자 이상이어야 합니다" })
  @MaxLength(100, { message: "할 일 내용은 100자 이내여야 합니다" })
  @Field()
  description: string;

  @Field((type) => TodoStatus)
  status: TodoStatus;

  @Field()
  deadline: string;
}