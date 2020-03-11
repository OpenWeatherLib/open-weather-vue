import { cityService as classToTest } from "@/services/city.service";

describe("CityService", () => {
  test("should be created", () => {
    // Assert
    expect(classToTest).toBeTruthy();
  });

  describe("loadCityData", () => {
    test.todo("should call apiService and return a url");
  });
});
