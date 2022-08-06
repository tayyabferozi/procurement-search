export type SearchRecordsRequest = {
  buyerID?: string;
  textSearch?: string;
  limit: number;
  offset: number;
};

export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  stage: string;
  value: number | null;
  close_date: string | null;
  award_date: string | null;
  buyer: {
    id: string;
    name: string;
  };
};

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

export interface buyer {
  name: string;
  id: string;
}

export type SearchFilters = {
  query: string;
};
