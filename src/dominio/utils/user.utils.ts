export class UserUtils {
  public static generatePassword(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
