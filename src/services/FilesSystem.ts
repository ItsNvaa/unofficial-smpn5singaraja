import fs from "fs";
import logger from "../libs/logger";

class FilesSystem {
  isExist(path: string): null | boolean {
    try {
      const isExist = fs.existsSync(path);

      return isExist;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
  deleteFile(path: string): null | boolean | void {
    try {
      if (this.isExist(path)) {
        const deleteFile = fs.unlinkSync(path);

        return deleteFile;
      }

      logger.error("Cannot delete the file");
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
}

export default FilesSystem;
