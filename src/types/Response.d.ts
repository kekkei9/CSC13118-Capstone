export type Response<T> = {
  data: T;
  isSuccess: boolean;
};

export type PaginationResponse<T> = {
  data: {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPage: number;
  };
  isSuccess: boolean;
};

export type LogInResponse = {
  user: User;
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
};
