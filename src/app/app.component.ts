import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CameraService } from './services/camera.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public cameraService: CameraService,
    private alertController: AlertController
  ) {}

  public async takePicture(): Promise<void> {
    this.cameraService
      .savePhoto()
      .then(async (photoUrl) => {
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Photo saved to gallery',
          buttons: ['OK'],
        });
        alert.present();
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error,
          buttons: ['OK'],
        });

        await alert.present();
      });
  }
}
