import * as crypto from "crypto";
import { uuid } from "../types/genericos";

export class UserUtils {
  public static generatePassword(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  public static generateUUID(): uuid {
    return crypto.randomUUID();
  }
}
