export class Utility {
  public static deep<T extends object>(source: T): T {
    return JSON.parse(JSON.stringify(source))
  }
}
