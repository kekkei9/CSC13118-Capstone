export interface  BaseResponse<T> {
  message: string;
  data: T;
}

export interface BaseResponseList<T> {
  message: string;
  data: {
    count: number;
    rows: T[];
  };
}
