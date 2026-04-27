import {
	type ImagePickerAsset,
	type ImagePickerOptions,
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

interface PickImageResponseFailure {
	status: "error";
	message?: string;
}

interface PickImageResponseSuccess {
	status: "success";
	assets: ImagePickerAsset[];
}

export async function pickImage(
	writeOnly: boolean = false,
	options?: ImagePickerOptions,
): Promise<PickImageResponseFailure | PickImageResponseSuccess> {
	const request = await requestMediaLibraryPermissionsAsync(writeOnly);
	if (!request.granted) {
		return { status: "error", message: "Acess to media library is denied" };
	}
	const assets = await launchImageLibraryAsync(options);
	if (assets.canceled) {
		return { status: "error", message: "Media library was cancelled" };
	}
	return { status: "success", assets: assets.assets };
}