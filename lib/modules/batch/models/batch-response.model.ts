export interface FaultError {
  Message: string;
  code: string;
  Detail: string;
  element: string;
}

export interface FaultResponse {
  bId: string;
  Error: FaultError[];
}

export interface QueryResponse {
  startPosition: number;
  maxResults: number;
  [key: string]: any;
}

export interface BatchItemResponse {
  bId: string;
  QueryResponse?: QueryResponse;
  Fault?: FaultResponse;
}

export interface QuickBooksBatchResponse {
  BatchItemResponse: BatchItemResponse[];
  time: string;
}
