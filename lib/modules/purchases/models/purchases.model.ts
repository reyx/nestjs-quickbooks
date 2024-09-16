import {
  QuickBooksBillableStatusesEnum,
  QuickBooksGlobalTaxCalculationsEnum,
} from "../../common/enums";
import {
  QuickBooksLinkedTxnModel,
  QuickBooksMarkupInfoModel,
  QuickBooksMetadata,
  QuickBooksModel,
  QuickBooksPhysicalAddressModel,
  QuickBooksRefModel,
  QuickBooksTxnTaxDetailModel,
} from "../../common/models";
import { QuickBooksPurchasePaymentTypeEnum } from "../enums/payment-type.enum";

export interface QuickBooksBasePurchaseLinesModel {
  Id: string;
  DetailType: "ItemBasedExpenseLineDetail" | "AccountBasedExpenseLineDetail";
  Amount: number;
  LinkedTxn?: QuickBooksLinkedTxnModel[];
  Description?: string;
  LineNum?: number;
}

export interface QuickBooksPurchaseItemBasedExpenseLineModel
  extends QuickBooksBasePurchaseLinesModel {
  DetailType: "ItemBasedExpenseLineDetail";
  ItemBasedExpenseLineDetail: {
    TaxInclusiveAmt?: number;
    ItemRef?: QuickBooksRefModel;
    CustomerRef?: QuickBooksRefModel;
    PriceLevelRef?: QuickBooksRefModel;
    ClassRef?: QuickBooksRefModel;
    TaxCodeRef?: QuickBooksRefModel;
    MarkupInfo?: QuickBooksMarkupInfoModel;
    BillableStatus?: QuickBooksBillableStatusesEnum;
    Qty?: number;
    UnitPrice?: number;
  };
}

export interface QuickBooksPurchaseAccountBasedExpenseLineModel
  extends QuickBooksBasePurchaseLinesModel {
  DetailType: "AccountBasedExpenseLineDetail";
  AccountBasedExpenseLineDetail: {
    AccountRef?: QuickBooksRefModel;
    TaxAmount?: number;
    TaxInclusiveAmt?: number;
    ClassRef?: QuickBooksRefModel;
    TaxCodeRef?: QuickBooksRefModel;
    MarkupInfo?: QuickBooksMarkupInfoModel;
    BillableStatus?: QuickBooksBillableStatusesEnum;
    CustomerRef?: QuickBooksRefModel;
  };
  ProjectRef?: QuickBooksRefModel;
}

export type QuickBooksPurchaseLinesModel =
  | QuickBooksPurchaseItemBasedExpenseLineModel
  | QuickBooksPurchaseAccountBasedExpenseLineModel;

export interface QuickBooksPurchases extends QuickBooksModel {
  Line: QuickBooksPurchaseLinesModel[];
  PaymentType: QuickBooksPurchasePaymentTypeEnum;
  AccountRef?: QuickBooksRefModel;
  SyncToken: string;
  CurrencyRef?: QuickBooksRefModel;
  TxnDate?: string;
  PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
  RemitToAddr?: QuickBooksPhysicalAddressModel;
  TxnSource?: string;
  LinkedTxn?: QuickBooksLinkedTxnModel[];
  GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
  TransactionLocationType?: string;
  MetaData?: QuickBooksMetadata;
  DocNumber?: string;
  PrivateNote?: string;
  Credit?: boolean;
  TxnTaxDetail?: QuickBooksTxnTaxDetailModel;
  PaymentMethodRef?: QuickBooksRefModel;
  PurchaseEx?: any[];
  ExchangeRate?: number;
  DepartmentRef?: QuickBooksRefModel;
  EntityRef?: QuickBooksRefModel;
  IncludeInAnnualTPAR?: boolean;
  TotalAmt?: number;
  RecurDataRef?: QuickBooksRefModel;
}
