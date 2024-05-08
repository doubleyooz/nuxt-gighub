import type { User } from "./user.model";

export interface Proposition {
  description: string;
  _id: string;
  budget: number;
  rejected: boolean;
  accepted: boolean;
  deadline: number; // number of days as for now
  user?: User;
  gigId?: string;
}
