import { BoxValue, LabelValue } from '@app/models';

export interface Picture {
  file: string;
  data: string;
  boxes: BoxValue[];
  labels: LabelValue[];
}
