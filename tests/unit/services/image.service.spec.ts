import { imageService as classToTest } from "@/services/image.service";

describe("ImageService", () => {
    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    describe("loadImagePictureUrl", () => {
        test.todo("should call apiService and return a url");
    });
});
