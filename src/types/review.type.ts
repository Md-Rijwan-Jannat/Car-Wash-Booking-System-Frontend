import { TUser } from "./userManagement.type";

export type TReview = {
  _id: string;
  user: TUser;
  feedback: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
