import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  progressFormData = 0;
  progressNg2 = 0;
  downloadLinkFormData: string;
  downloadLinkNg2: string;
  uploader: FileUploader;
  ng2File: File;

  constructor(private service: AppService) {}

  ngOnInit() {
    this.uploader = new FileUploader({
      disableMultipart: false,
      itemAlias: 'file',
      url: 'http://localhost:8080/upload/send'
    });

    this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
    this.uploader.onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
    this.uploader.onSuccessItem = this.onSuccessItem.bind(this);
    this.uploader.onProgressItem = this.onProgressItem.bind(this);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFormData() {
    this.progressFormData = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.service.uploadFormData(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressFormData = Math.round((100 * event.loaded) / event.total);
      } else if (event instanceof HttpResponse) {
        this.downloadLinkFormData = `http://localhost:8080/upload/load/${this.currentFileUpload.name}`;
      }
    });
  }

  onAfterAddingFile(fileItem) {
    this.ng2File = fileItem.file;
  }

  onBeforeUploadItem(item) {
    item.withCredentials = false;
  }

  onSuccessItem(item) {
    this.downloadLinkNg2 = `http://localhost:8080/upload/load/${this.ng2File.name}`;
  }

  onProgressItem(progress) {
    this.progressNg2 = progress['progress'];
  }

  getDownloadLinkFormData() {
    return this.downloadLinkFormData;
  }

  getDownloadLinkNg2() {
    return this.downloadLinkNg2;
  }
}
