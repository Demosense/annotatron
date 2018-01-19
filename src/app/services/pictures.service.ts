import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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
}
