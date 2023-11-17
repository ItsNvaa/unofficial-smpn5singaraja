import logger from "../libs/logger";

class Argon2 {
  hash(password: string): string {
    try {
      const hash = Bun.password.hashSync(password, { algorithm: "argon2id" });

      return hash;
    } catch (err) {
      logger.error(err);
      throw new Error("Hashing failed.");
    }
  }
}

export default Argon2;
