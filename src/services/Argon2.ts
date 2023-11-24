import TUser from "../app/v1/users/interfaces/types/UserTypes";
import logger from "../libs/logger";

class Argon2 {
  hash(password: string): string | null {
    try {
      const hash = Bun.password.hashSync(password, { algorithm: "argon2id" });

      return hash;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
  verify(input: TUser, password: string): boolean {
    try {
      const verifyPassword = Bun.password.verifySync(input.password, password);

      return verifyPassword;
    } catch (err) {
      logger.error(err);
      throw new Error("Password does not match!");
    }
  }
}

export default Argon2;
