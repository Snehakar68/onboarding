import { Platform, PermissionsAndroid } from "react-native";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

export async function pickImage(): Promise<{ uri: string; name: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        assetRepresentationMode: 'compatible',
        quality: 1,
        selectionLimit: 1,
      };

      if (Platform.OS === 'android') {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Permission Needed',
          message: 'This app needs access to your photo library to select images.',
          buttonPositive: 'OK',
        });

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission denied');
          resolve({ uri: '', name: '' }); // Resolve with an empty result if permission is denied
          return;
        }
      }

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          resolve({ uri: '', name: '' });
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          reject(new Error(response.errorMessage ?? 'Unknown error'));
        } else if (response.assets && response.assets.length > 0) {
          const { uri, fileName } = response.assets[0];
          console.log(uri, 'uri selected');
          resolve({
            uri: uri ?? '',
            name: fileName ?? '',
          });
        } else {
          resolve({ uri: '', name: '' });
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
