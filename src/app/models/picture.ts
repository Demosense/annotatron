import { BoxValue, LabelValue } from '@app/models';

export interface Picture {
  id?: string;
  file: string;
  width: number;
  height: number;
  boxes: BoxValue[];
  labels: LabelValue[];
}

