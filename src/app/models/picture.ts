import { BoxValue, LabelValue } from '@app/models';

export interface Picture {
  id: number;
  file: string;
  data: string;
  boxes: BoxValue[];
  labels: LabelValue[];
}
