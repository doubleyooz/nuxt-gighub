import type { User } from "./user.model";

type DEFAULT_STATE = 0;
type REJECTED_STATE = 1;
type PENDING_HIRER_APPROVAL_STATE = 2;
type PENDING_FREELANCER_APPROVAL_STATE = 3;
type PENDING_FINAL_APPROVAL_STATE = 4;
type ON_GOING_STATE = 5;
type FULFILLED_STATE = 6;
type CANCELLED_STATE = 7;

export type PROPOSAL_STATUS =
  | DEFAULT_STATE
  | REJECTED_STATE
  | PENDING_HIRER_APPROVAL_STATE
  | PENDING_FREELANCER_APPROVAL_STATE
  | PENDING_FINAL_APPROVAL_STATE
  | ON_GOING_STATE
  | FULFILLED_STATE
  | CANCELLED_STATE;

export interface Proposal {
  description: string;
  _id: string;
  budget: number;
  status: PROPOSAL_STATUS;
  deadline: number; // number of days as for now
  user: User;
  gigId?: string;
}
