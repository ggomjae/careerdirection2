import { User } from "../entity";

// Token을 생성하는 모듈
import * as JwtFactory from "jsonwebtoken";
import { secretKey } from "../config/jwt";

// DTO
import * as inputDTO from "../dto/inputDTO";
import * as outputDTO from "../dto/outputDTO";
import * as errorDTO from "../dto/errorDTO";

// Encryption
import { Encryption } from "./EncryptionService";

export class UserService {
  // 회원가입 하는 메소드
  public static async signUp(
    makeUserInput: inputDTO.SignUpUserInput
  ): Promise<outputDTO.SignUpUserOutput> {
    try {
      let user = await User.findOne({ email: makeUserInput.email });

      // 이미 똑같은 이메일이 있다면 에러
      if (user !== undefined) {
        throw new errorDTO.ServiceError(false, "이미 존재하는 아이디 입니다.");
      }

      const newUser = new User();
      newUser.email = makeUserInput.email;
      newUser.password = await Encryption.hashPassword(makeUserInput.password);
      newUser.name = makeUserInput.name;
      user = await User.save(newUser);

      // 클라이언트에서 필요로 하는 정보를 따로 정의하여 넘기는 코드
      let result: outputDTO.SignUpUserOutput = {
        name: user.name,
        email: user.email,
        status: true,
      };

      return result;
    } catch (e) {
      return e;
    }
  }

  // 로그인하는 메소드
  public static async singIn(
    loginUserInput: inputDTO.SignInUserInput
  ): Promise<outputDTO.SignInUserOutput> {
    try {
      // 이메일을 이용해서 DB에 저장된 유저 추출
      const user = await User.findOne({ email: loginUserInput.email });

      // 만약 해당하지 않은 email로 인해 user에 undefined가 있거나, 비밀번호가 맞지 않다면
      if (
        user === undefined ||
        !(await Encryption.passwordIsValid(
          loginUserInput.password,
          user.password
        ))
      ) {
        // 보안상 비밀번호, 존재하지않은 경우를 같이 묶어서 에러를 보냄
        throw new errorDTO.ServiceError(
          false,
          "존재하지 않거나 비밀번호가 틀렸습니다."
        );
      }

      // 비밀번호가 맞다면 Token 값을 만들어서 넘겨줌. Token을 만들고 반환
      const token = JwtFactory.sign(
        { email: loginUserInput.email }, // payload 구간
        secretKey, // config에 저장되어있는 secretKey
        {
          expiresIn: "1h", // 만료 기간을 잡는 옵션
          issuer: "gomjae", // 토큰 발급자
          subject: "tokenTitle", // 토큰 제목
        }
      );

      let result: outputDTO.SignInUserOutput = {
        token: token,
        email: loginUserInput.email,
        status: true,
      };

      return result;
    } catch (e) {
      return e;
    }
  }

  // 회원을 탈퇴하는 메소드
  public static async deleteUser(email: string): Promise<Boolean> {
    try {
      // 탈퇴하려는 회원을 추출하는 메소드
      const user = await User.findOne({ email: email });

      // 만약 이메일이 존재하지 않는 경우
      if (user === undefined) {
        return false;
      }

      // remove는 엔티티 배열이 포함된 경우, delete는 상태를 알고 있는 경우.
      await User.remove(user);

      return true;
    } catch (e) {
      return e;
    }
  }

  // 회원의 Name을 수정하는 메소드
  public static async updateUserName(
    name: string,
    email: string
  ): Promise<outputDTO.UpdateUserOutput> {
    try {
      const user = await User.findOne({ email: email });

      // 만약 바꾸려는 name이 같다면
      if (user.name === name) {
        throw new errorDTO.ServiceError(false, "같은 값입니다.");
      }

      user.name = name;

      // typeorm - save : 만약 엔티티가 데이터베이스에 존재하지 않다면 삽입시켜주고 아니면 업데이트를 시켜주는 메소드
      const userInfo: User = await User.save(user);

      // 업데이트 후 클라이언트가 필요로 하는 정보를 반환
      const result: outputDTO.UpdateUserOutput = {
        name: userInfo.name,
        email: userInfo.email,
        status: true,
      };

      return result;
    } catch (e) {
      return e;
    }
  }

  // 회원의 패스워드 속성을 수정하는 메소드
  public static async updateUserPassword(
    password: string,
    email: string
  ): Promise<Boolean> {
    try {
      const user = await User.findOne({ email: email });

      // 모듈[ bcypt ]를 이용하여 password 암호화
      user.password = await Encryption.hashPassword(password);

      // 바뀐 암호의 객체를 저장하는 메소드
      await User.save(user);

      return true;
    } catch (e) {
      return e;
    }
  }
}
