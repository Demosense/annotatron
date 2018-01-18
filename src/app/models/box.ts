export interface Box {
  id: number;
  name: string;
  color: string;
}

export interface BoxValue {
  id: number;
  points: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
}
