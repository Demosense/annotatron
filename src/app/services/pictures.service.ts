import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Picture } from '@app/models';

@Injectable()
export class PicturesService {
  private stream: BehaviorSubject<string[]>;

  constructor() {
    this.stream = new BehaviorSubject<string[]>([]);
  }

  public setPictureData(data: string[]) {
    this.stream.next(data);
  }

  public getPictureData(): Observable<string[]> {
    return this.stream.asObservable();
  }

  public uploadPictures(
    files: FileList
  ): Promise<{ data: string; picture: Picture }[]> {
    const validImageTypes = ['image/jpeg', 'image/png'];
    const uploads: Promise<{ data: string; picture: Picture }>[] = Array.from(
      files
    )
      .filter(file => validImageTypes.includes(file.type))
      .map((file: any) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = () =>
              resolve({
                data: e.target.result,
                picture: {
                  file: file.name,
                  width: image.width,
                  height: image.height,
                  labels: [],
                  boxes: [],
                },
              });
          };
          reader.onerror = err => reject(err);
          reader.readAsDataURL(file);
        });
      });

    return Promise.all(uploads);
  }
}
