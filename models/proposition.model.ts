import type { User } from "./user.model";

export interface Proposition {
  description: string;

  budget: number;
  deadline: number; // number of days as for now
  user?: User;
  gigId?: string;
}
