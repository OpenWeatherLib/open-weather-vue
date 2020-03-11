import { any } from "@/helper/array.helper";

describe("any", () => {
  test.each([
    ["should return true for filled number array", true, [0, 1, 2, 3, 4]],
    ["should return false for empty array", false, []]
  ])("%s", (_, expected, array) => {
    // Arrange & Act
    const actual: boolean = any(array as any[]);

    // Assert
    expect(actual).toBe(expected);
  });
});
