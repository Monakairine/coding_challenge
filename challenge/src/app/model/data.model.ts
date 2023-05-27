export interface BillsModel {
  id: number;
  title: string;
  primary_sponsor: number;
}

export interface LegislatorsModel {
  id: number;
  name: string;
}

export interface VotesModel {
  id: number;
  bill_id: number;
}

export interface VoteResultsModel {
  id: number;
  legislator_id: number;
  vote_id: number;
  vote_type: number;
}

export interface LegislatorOutputModel {
  id: number;
  name: string;
  num_supported_bills: number;
  num_opposed_bills: number;
}

export interface BillOutputModel {
  id: number;
  title: string;
  supporter_count: number;
  opposer_count: number;
  primary_sponsor: string;
}
