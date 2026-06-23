import * as ImageManipulator from "expo-image-manipulator";


export const compressImage = async (uri: string, width: number, compressFactor: number) => {
    const result = await ImageManipulator.manipulateAsync(
        uri,
        [
            {
                resize: {
                    width, 
                },
            },
        ],
        {
            compress: compressFactor, 
            format: ImageManipulator.SaveFormat.JPEG,
        }
    );

    return result.uri;
};