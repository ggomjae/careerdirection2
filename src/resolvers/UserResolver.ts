import {
  Resolver,
  FieldResolver,
  Mutation,
  Arg,
  Root,
  Ctx,
  Authorized,
} from "type-graphql";

//
import { User, Todo } from "../entity";
import { UserService, TodoService } from "../services";
import { TodoStatus } from "../enum";

// DTO
import * as inputDTO from "../dto/inputDTO";
import * as outputDTO from "../dto/outputDTO";

// Context 변수 보관소
import { ApolloContextInterface } from "../context/ApolloContext";

@Resolver(() => User) // User를 명시하는 것은 이 Resolver가 무엇을 위한 것인지 알려주는 것이고, 이를 통해 Parent를 User로 사용할 수 있다.
export class UserResolver {
  @FieldResolver((returns) => [Todo]!) // @FieldResolver를 쓰는 이유 : Filed에서 또 Resolver를 쓰기 위해서.
  async todolist(
    @Root() user: User,
    @Arg("cursor") cursor: number,
    @Arg("status", (type) => TodoStatus) status?: TodoStatus
  ) {
    const { uno } = user; // user의 auto_increment이기 때문에 가능.

    /*
      Todo Part
    */
    if (!status) {
      return await TodoService.findAllByUserId(cursor, uno);
    } else {
      return await TodoService.findAllByUserIdAndStatus(uno, status, cursor);
    }
  }

  // 회원가입하는 뮤테이션
  @Mutation((returns) => outputDTO.SignUpUserOutput, {
    description: "SingUp User Resolver",
  })
  async signUp(
    @Arg("signUpUserInput") signUpUserInput: inputDTO.SignUpUserInput
  ): Promise<outputDTO.SignUpUserOutput> {
    return await UserService.signUp(signUpUserInput);
  }

  // 로그인하는 뮤테이션
  @Mutation((returns) => outputDTO.SignInUserOutput, {
    description: "SignIn User Resolver",
  })
  async login(
    @Arg("signInUserInput") signInUserInput: inputDTO.SignInUserInput
  ): Promise<outputDTO.SignInUserOutput> {
    return await UserService.singIn(signInUserInput);
  }

  // 회원을 삭제하는 뮤테이션
  @Authorized()
  @Mutation((returns) => Boolean, { description: "Delete User Resolver" })
  async removeUser(
    @Ctx() apolloContext: ApolloContextInterface
  ): Promise<Boolean> {
    return await UserService.deleteUser(apolloContext.user.email);
  }

  // 회원을 업데이트하는 뮤테이션
  @Authorized()
  @Mutation((returns) => outputDTO.UpdateUserOutput, {
    description: "Update User Name Resolver",
  })
  async updateUserName(
    @Arg("name") name: string,
    @Ctx() apolloContext: ApolloContextInterface
  ): Promise<outputDTO.UpdateUserOutput> {
    return await UserService.updateUserName(name, apolloContext.user.email);
  }

  // 비밀번호를 변경하는 뮤테이션
  @Authorized()
  @Mutation((returns) => Boolean, {
    description: "Update User Password Resolver",
  })
  async updateUserPassword(
    @Arg("password") password: string,
    @Ctx() apolloContext: ApolloContextInterface
  ): Promise<Boolean> {
    return await UserService.updateUserPassword(
      password,
      apolloContext.user.email
    );
  }
}
