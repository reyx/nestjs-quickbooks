import {
  QuickBooksLinkedTxnDto,
  QuickBooksMarkupInfoDto,
  QuickBooksPhysicalAddressDto,
  QuickBooksRefDto,
  QuickBooksTxnTaxDetailDto,
} from "../../common/dto";
import {
  QuickBooksBillableStatusesEnum,
  QuickBooksGlobalTaxCalculationsEnum,
} from "../../common/enums";
import { QuickBooksMetadata, QuickBooksRefModel } from "../../common/models";
import { QuickBooksPurchasePaymentTypeEnum } from "../enums/payment-type.enum";

export interface QuickBooksPurchasesDto {
  PaymentType: QuickBooksPurchasePaymentTypeEnum;
  AccountRef?: QuickBooksRefModel;
  SyncToken?: string;
  CurrencyRef?: QuickBooksRefDto;
  TxnDate?: string;
  PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
  RemitToAddr?: QuickBooksPhysicalAddressDto;
  TxnSource?: string;
  LinkedTxn?: QuickBooksLinkedTxnDto[];
  GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
  TransactionLocationType?: string;
  MetaData?: QuickBooksMetadata;
  DocNumber?: string;
  PrivateNote?: string;
  Credit?: boolean;
  TxnTaxDetail?: QuickBooksTxnTaxDetailDto;
  PaymentMethodRef?: QuickBooksRefModel;
  PurchaseEx?: any[];
  ExchangeRate?: number;
  DepartmentRef?: QuickBooksRefDto;
  EntityRef?: QuickBooksRefModel;
  IncludeInAnnualTPAR?: boolean;
  TotalAmt?: number;
  RecurDataRef?: QuickBooksRefModel;
}

export interface CreateQuickBooksPurchaseItemBasedExpenseLineDto {
  DetailType: "ItemBasedExpenseLineDetail";
  ItemBasedExpenseLineDetail: {
    TaxInclusiveAmt?: number;
    ItemRef?: QuickBooksRefDto;
    CustomerRef?: QuickBooksRefDto;
    PriceLevelRef?: QuickBooksRefDto;
    ClassRef?: QuickBooksRefDto;
    TaxCodeRef?: QuickBooksRefDto;
    MarkupInfo?: QuickBooksMarkupInfoDto;
    BillableStatus?: QuickBooksBillableStatusesEnum;
    Qty?: number;
    UnitPrice?: number;
  };
  Amount: number;
  LinkedTxn?: QuickBooksLinkedTxnDto[];
  Description?: string;
  LineNum?: number;
}

export interface CreateQuickBooksPurchaseAccountBasedExpenseLineDto {
  DetailType: "AccountBasedExpenseLineDetail";
  AccountBasedExpenseLineDetail: {
    AccountRef?: QuickBooksRefModel;
    TaxAmount?: number;
    TaxInclusiveAmt?: number;
    ClassRef?: QuickBooksRefModel;
    TaxCodeRef?: QuickBooksRefModel;
    MarkupInfo?: QuickBooksMarkupInfoDto;
    BillableStatus?: QuickBooksBillableStatusesEnum;
    CustomerRef?: QuickBooksRefModel;
  };
  Amount: number;
  ProjectRef?: QuickBooksRefModel;
  Description?: string;
  LineNum?: number;
}

export type CreateQuickBooksPurchaseLines =
  | CreateQuickBooksPurchaseItemBasedExpenseLineDto
  | CreateQuickBooksPurchaseAccountBasedExpenseLineDto;

export interface CreateQuickBooksPurchasesDto extends QuickBooksPurchasesDto {
  Line: CreateQuickBooksPurchaseLines[];
}

export interface UpdateQuickBooksPurchaseItemBasedExpenseLineDto
  extends CreateQuickBooksPurchaseItemBasedExpenseLineDto {
  Id: string;
}

export interface UpdateQuickBooksPurchaseAccountBasedExpenseLineDto
  extends CreateQuickBooksPurchaseAccountBasedExpenseLineDto {
  Id: string;
}

export type UpdateQuickBooksPurchaseLines =
  | UpdateQuickBooksPurchaseItemBasedExpenseLineDto
  | UpdateQuickBooksPurchaseAccountBasedExpenseLineDto;

export interface FullUpdateQuickBooksPurchasesDto
  extends QuickBooksPurchasesDto {
  CustomerRef: QuickBooksRefDto;
  Line: UpdateQuickBooksPurchaseLines[];
}

export interface SparseUpdateQuickBooksPurchasesDto
  extends QuickBooksPurchasesDto {
  CustomerRef?: QuickBooksRefDto;
  Line?: UpdateQuickBooksPurchaseLines[];
}
