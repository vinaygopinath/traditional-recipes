export class RandomUtils {

  public static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
}