export type BatchOperation = "create" | "update" | "delete";

export interface BatchItem {
  bId: string;
  operation?: BatchOperation;
  Query?: string;
  ReportQuery?: string;
  [key: string]: any;
}

export interface CreateQuickBooksBatchDto {
  BatchItemRequest: BatchItem[];
}
