import { BaseQueryApi } from "@reduxjs/toolkit/query";

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface IError {
  success: boolean;
  message: string;
  errorMessages: TErrorMessages;
}

export interface IResponse<T> {
  data?: T;
  error?: IError;
  meta?: IMeta;
  success: boolean;
  message: string;
}

export type TResponseRedux<T> = IResponse<T> & BaseQueryApi;

export type TErrorMessages = {
  path: string | number;
  message: string;
}[];

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
