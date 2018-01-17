export interface Box {
  id: string;
  name: string;
  color: string;
}

export interface BoxValue {
  id: string;
  points: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
}