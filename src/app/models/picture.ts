import { BoxValue, LabelValue } from '@app/models';

export interface Picture {
  id: string;
  data: string;
  boxes: BoxValue[];
  labels: LabelValue[];
}
