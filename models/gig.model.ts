export interface Gig {
  title: string;
  description: string;
  createdAt: Date;
  budget: number;
  preferredTechnologies: string[];
  type: string;
  userId?: string;
  _id: string;
}
