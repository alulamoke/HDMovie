import { LucideIcon } from "lucide-react";

export type TCustomError = {
  response: {
    data: {
      message: string;
    };
  };
};

export type TInternalError = {
  message: string;
};

export type TSidebar = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type TUser = {
  _id: string;
  fullname: string;
  email: string;
  imageurl: string;
  createdAt: Date;
};

export type TGenre = {
  _id: string;
  name: string;
};

export type TCast = {
  _id: string;
  fullname: string;
  imageurl: string;
  birthday: Date;
  deathday?: Date;
  biography: string;
};

export type TCustomers = {
  _id: string;
  fullname: string;
  phone: string;
  plan: string;
  paymentStatus: {
    amount: string;
    status: string;
    duration: Date;
  };
  status: string;
  createdAt: Date;
};
