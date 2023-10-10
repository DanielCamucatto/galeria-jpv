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
      if (status === 200 && this.imagePreviewUrl) {
        this.convertImageToBase64(this.imagePreviewUrl);
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

  convertImageToBase64(imageUrl: string): void {
    const image = new Image();
    image.crossOrigin = 'Anonymous'; 
  
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
  
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
  
        const base64data = canvas.toDataURL('image/jpeg');
  
        sessionStorage.setItem('uploadedImage', base64data);
        alert('Imagem salva!');
      }
    };
  
    image.src = imageUrl;
  }

  saveImageToSessionStorage(): void {
    if (this.imagePreviewUrl) {
      sessionStorage.setItem('uploadedImage', this.imagePreviewUrl);
      alert('Imagem salva na sessionStorage!');
    }
  }
}
