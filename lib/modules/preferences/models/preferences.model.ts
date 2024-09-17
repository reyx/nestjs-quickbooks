import {
  QuickBooksCustomFieldModel,
  QuickBooksModel,
  QuickBooksRefModel,
} from "../../common/models";

export interface QuickBooksSalesFormsPrefsModel {
  CustomField: { CustomField: QuickBooksCustomFieldModel[] }[];
  ETransactionPaymentEnabled: boolean;
  CustomTxnNumbers: boolean;
  AllowShipping: boolean;
  AllowServiceDate: boolean;
  ETransactionEnabledStatus: string;
  DefaultCustomerMessage: string;
  EmailCopyToCompany: boolean;
  AllowEstimates: boolean;
  DefaultTerms: QuickBooksRefModel;
  AllowDiscount: boolean;
  DefaultDiscountAccount: string;
  AllowDeposit: boolean;
  AutoApplyPayments: boolean;
  IPNSupportEnabled: boolean;
  AutoApplyCredit: boolean;
  UsingPriceLevels: boolean;
  ETransactionAttachPDF: boolean;
}

export interface QuickBooksAccountingInfoPrefsModel {
  FirstMonthOfFiscalYear: string;
  UseAccountNumbers: boolean;
  TaxYearMonth: string;
  ClassTrackingPerTxn: boolean;
  TrackDepartments: boolean;
  TaxForm: string;
  CustomerTerminology: string;
  BookCloseDate: Date;
  DepartmentTerminology: string;
  ClassTrackingPerTxnLine: boolean;
}

export interface QuickBooksPreferences extends QuickBooksModel {
  domain: string;
  SyncToken: string;
  AccountingInforPrefs?: QuickBooksAccountingInfoPrefsModel;
  SalesFormsPrefs?: QuickBooksSalesFormsPrefsModel;
}
