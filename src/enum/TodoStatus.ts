import { registerEnumType } from "type-graphql";

export enum TodoStatus {
  TODO = "TODO",
  DONE = "DONE",
}

registerEnumType(TodoStatus, {
  name: "TodoStatus",
});