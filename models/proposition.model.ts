import type { User } from "./user.model";
type DEFAULT_STATE = 0;
type REJECTED_STATE = 1;
type PENDING_ACCEPTED_STATE = 2;
type CONFIRMED_ACCEPTED_STATE = 3;
export type PROPOSITION_STATUS = // 0 default, 1 rejected, 2 pending-accepted, 3 confirmed-accepted,

    | DEFAULT_STATE
    | REJECTED_STATE
    | PENDING_ACCEPTED_STATE
    | CONFIRMED_ACCEPTED_STATE;

export interface Proposition {
  description: string;
  _id: string;
  budget: number;
  status: PROPOSITION_STATUS;
  deadline: number; // number of days as for now
  user?: User;
  gigId?: string;
}
