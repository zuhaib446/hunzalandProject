export type Property = {
  _id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured?: boolean;
  region: string;
  createdAt: Date;
  updatedAt: Date;
};