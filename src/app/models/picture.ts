import { BoxValue, LabelValue } from '@app/models';

export interface Picture {
  id?: number;
  file: string;
  width: number;
  height: number;
  boxes: BoxValue[];
  labels: LabelValue[];
}

