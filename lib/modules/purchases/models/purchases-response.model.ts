import {
  QuickBooksDeleteResponseModel,
  QuickBooksQueryResponseModel,
  QuickBooksResponseModel,
} from "../../common/models";
import { QuickBooksPurchases } from "./purchases.model";

export interface QuickBooksPurchasesResponseModel
  extends QuickBooksResponseModel {
  Purchase: QuickBooksPurchases;
}

export interface QuickBooksPurchasesQueryResponseModel
  extends QuickBooksResponseModel {
  QueryResponse: QuickBooksQueryResponseModel & {
    Purchase: QuickBooksPurchases[];
  };
}

export interface QuickBooksPurchasesDeleteResponseModel
  extends QuickBooksResponseModel {
  Purchase: QuickBooksDeleteResponseModel;
}
