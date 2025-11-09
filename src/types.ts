// src/types.ts
export type Course = {
  id: string;
  name: string;
  price: number;
  image: any;
  short: string;
  bullets?: string[];
  duration: '6-month' | '6-week';
};

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: any;
};
