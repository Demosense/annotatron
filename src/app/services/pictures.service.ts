import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Picture } from '@app/models';

@Injectable()
export class PicturesService {

  constructor() { }

  public getPictures(uploadFiles: Array<{ name: string, data: string }>): Picture[] {
    console.log(uploadFiles);
    // Create Pictures
    // for (const f of files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(f);
    //   reader.onload = (e) => {
    //     console.log(e.target.result);
    //   };
    // }
    return [];
  }
}
