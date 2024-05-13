import type { ServerImage } from "./image.model";

export interface User {
  email: string;
  name: string;
  title: string;
  picture: ServerImage;
  _id: string;
  description: string;
  wallet: string | null;
}
