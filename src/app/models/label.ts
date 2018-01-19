export interface Label {
  id: number;
  name: string;
  type: LabelTypes;
  range: string[];
}

export interface LabelValue {
  id: number;
  value: string;
}

export enum LabelTypes {
  Range = 'range',
  Category = 'category',
}
