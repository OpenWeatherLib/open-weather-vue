import { apiService as classToTest } from "@/services/api.service";

describe("ApiService", () => {
  test("should be created", () => {
    // Assert
    expect(classToTest).toBeTruthy();
  });

  describe("get", () => {
    test.todo("currentWeather should return expected json");

    test.todo("forecastWeather should return expected json");

    test.todo("uvIndex should return expected json");

    test.todo("error should return undefined");
  });
});
