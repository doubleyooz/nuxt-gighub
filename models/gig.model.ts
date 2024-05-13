import type { User } from "./user.model";

export interface Gig {
  title: string;
  description: string;
  contractAddress: string;
  createdAt: Date;
  budget: number;
  preferredTechnologies: string[];
  type: string;
  user?: User;
  _id: string;
}
