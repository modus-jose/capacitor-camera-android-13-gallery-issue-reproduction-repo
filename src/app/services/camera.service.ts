import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import {
  Camera,
  ImageOptions,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

export interface CameraTranslations {
  cancel: string;
  pictureLibrary: string;
  takePicture: string;
}

@Injectable()
export class CameraService {
  constructor(public actionSheetController: ActionSheetController) {}

  public async openActionSheetController(
    callback: any,
    reject: any
  ): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          handler: async () => {
            try {
              const photoUrl = await this.takePicture(false);
              callback(photoUrl);
            } catch (error) {
              reject(error);
            } finally {
              actionSheet.dismiss();
            }
          },
          text: 'Take picture',
          cssClass: 'camera-service-button',
        },
        {
          handler: async () => {
            try {
              const photoUrl = await this.takePicture(true);
              callback(photoUrl);
            } catch (error) {
              reject(error);
            } finally {
              actionSheet.dismiss();
            }
          },
          text: 'Picture library',
          cssClass: 'camera-service-button',
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'camera-service-button',
        },
      ],
    });

    await actionSheet.present();
  }

  public async savePhoto(): Promise<SafeResourceUrl> {
    return new Promise((resolve, reject) => {
      this.openActionSheetController(resolve, reject);
    });
  }

  public takePicture(useAlbum: boolean): Promise<SafeResourceUrl> {
    const options: ImageOptions = {
      allowEditing: false,
      quality: 70,
      width: 168,
      height: 168,
      resultType: CameraResultType.Base64,
      source: useAlbum ? CameraSource.Photos : CameraSource.Camera,
    };

    return new Promise((resolve, reject) => {
      Camera.getPhoto(options)
        .then((result) => {
          resolve(`data:image/jpeg;base64, ${result.base64String}`);
        })
        .catch((error) => reject(error));
    });
  }
}
