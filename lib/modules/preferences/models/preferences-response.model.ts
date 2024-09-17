import {
  QuickBooksQueryResponseModel,
  QuickBooksResponseModel,
} from "../../common/models";
import { QuickBooksPreferences } from "./preferences.model";

export interface QuickBooksPreferencesResponseModel {
  Item: QuickBooksPreferences;
}

export interface QuickBooksPreferencesQueryResponseModel
  extends QuickBooksResponseModel {
  QueryResponse: QuickBooksQueryResponseModel & {
    Preferences: QuickBooksPreferences;
  };
}
