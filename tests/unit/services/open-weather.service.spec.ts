import { openWeatherService as classToTest } from "@/services/open-weather.service";

describe("OpenWeatherService", () => {
    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    describe("loadCarbonMonoxide", () => {
        test.todo("should call apiService and return defined data");
    });

    describe("loadNitrogenDioxide", () => {
        test.todo("should call apiService and return defined data");
    });

    describe("loadOzone", () => {
        test.todo("should call apiService and return defined data");
    });

    describe("loadSulfurDioxide", () => {
        test.todo("should call apiService and return defined data");
    });

    describe("loadUvIndex", () => {
        test.todo("should call apiService and return defined data");
    });

    describe("loadWeatherCurrent", () => {
        test.todo("should call apiService and return defined data");
    });

    describe("loadWeatherForecast", () => {
        test.todo("should call apiService and return defined data");
    });
});
