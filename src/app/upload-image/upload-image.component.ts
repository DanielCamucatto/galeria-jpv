import { Component } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['../app.component.scss']
})
export class UploadImageComponent {
  public uploader: FileUploader = new FileUploader({ url: 'your-upload-url' });
  public imagePreviewUrl: string | undefined;
  selectedFileName: any;

  constructor() {
    this.uploader.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      this.imagePreviewUrl = this.createObjectURL(item._file);
    };

    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number) => {
      console.log('Upload complete:', item, status);
      if (status === 200) {
        this.saveImageToSessionStorage();
      }
    };
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploader.clearQueue();
      this.uploader.addToQueue([file]);
    }
  }

  uploadImage(): void {
    if (this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
    }
  }

  createObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  saveImageToSessionStorage(): void {
    if (this.imagePreviewUrl) {
      // Converte a imagem em base64 e salva na sessionStorage
      sessionStorage.setItem('uploadedImage', this.imagePreviewUrl);
      alert('Imagem salva na sessionStorage!');
    }
  }
}
