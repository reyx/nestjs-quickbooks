import { QuickBooksCustomFieldDto } from "lib/modules/common";
import { QuickBooksRefDto } from "../../common/dto/ref.dto";

export interface QuickBooksSalesFormsPrefs {
  CustomField: { CustomField: QuickBooksCustomFieldDto[] }[];
  ETransactionPaymentEnabled: boolean;
  CustomTxnNumbers: boolean;
  AllowShipping: boolean;
  AllowServiceDate: boolean;
  ETransactionEnabledStatus: string;
  DefaultCustomerMessage: string;
  EmailCopyToCompany: boolean;
  AllowEstimates: boolean;
  DefaultTerms: QuickBooksRefDto;
  AllowDiscount: boolean;
  DefaultDiscountAccount: string;
  AllowDeposit: boolean;
  AutoApplyPayments: boolean;
  IPNSupportEnabled: boolean;
  AutoApplyCredit: boolean;
  UsingPriceLevels: boolean;
  ETransactionAttachPDF: boolean;
}

export interface QuickBooksAccountingInfoPrefs {
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

export interface QuickBooksPreferencesDto {
  domain: string;
  SyncToken: string;
  AccountingInforPrefs?: QuickBooksAccountingInfoPrefs;
  SalesFormsPrefs?: QuickBooksSalesFormsPrefs;
}
