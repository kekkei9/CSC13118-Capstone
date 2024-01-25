export interface  BaseResponse<T> {
  message: string;
  data: T;
  statusCode?: number;
}

export interface BaseResponseList<T> {
  message: string;
  data: {
    count: number;
    rows: T[];
  };
}
