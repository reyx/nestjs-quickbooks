import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
  QuickBooksPreferencesQueryModel,
  QuickBooksPreferencesQueryResponseModel,
  QuickBooksPreferencesResponseModel,
} from "..";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";

@Injectable()
export class QuickBooksPreferencesService {
  constructor(
    private readonly authService: QuickBooksAuthService,
    private readonly http: HttpService,
    private readonly store: QuickBooksStore
  ) {}

  public async withDefaultCompany(): Promise<QuickBooksCompanyPreferencesService> {
    return this.forCompany(await this.store.getDefaultCompany());
  }

  public forCompany(realm: string): QuickBooksCompanyPreferencesService {
    return new QuickBooksCompanyPreferencesService(
      realm,
      this.authService,
      this.http
    );
  }
}

export class QuickBooksCompanyPreferencesService extends BaseService<
  QuickBooksPreferencesResponseModel,
  QuickBooksPreferencesQueryModel,
  QuickBooksPreferencesQueryResponseModel
> {
  constructor(
    realm: string,
    authService: QuickBooksAuthService,
    http: HttpService
  ) {
    super(realm, "preference", authService, http);
  }
}
