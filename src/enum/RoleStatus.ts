import { registerEnumType } from "type-graphql";

export enum RoleStatus {
  USER = "USER",
  ADMIN = "ADMIN",
}

registerEnumType(RoleStatus, {
  name: "RoleStatus",
});