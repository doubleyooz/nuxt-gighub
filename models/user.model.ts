import type { ServerImage } from "./image.model";
import type { Skill } from "./skill.model";

export interface User {
  email: string;
  name: string;
  title: string;
  picture: ServerImage;
  _id: string;
  skills: string[];
  description: string;
  wallet: string | null;
}

export interface LooseUser {
  email?: string;
  name?: string;
  title?: string;
  picture?: ServerImage;
  _id?: string;
  skills?: Skill[];
  description?: string;
  wallet?: string | null;
}
