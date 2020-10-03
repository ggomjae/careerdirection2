// 암호화를 위한 모듈
import * as bcrypt from "bcrypt";
import { saltRounds } from "../config/jwt";

export class Encryption {
  // 암호화 하는 메소드
  public static hashPassword(userpassword: string): string {
    return bcrypt.hashSync(userpassword, saltRounds);
  }

  // 암호화된 코드를 확인하는 메소드
  public static passwordIsValid(unencryptedPassword: string, password: string) {
    return bcrypt.compareSync(unencryptedPassword, password);
  }
}
