import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import {
  CreateQuickBooksPurchasesDto,
  FullUpdateQuickBooksPurchasesDto,
  QuickBooksPurchases,
  QuickBooksPurchasesQueryModel,
  SparseUpdateQuickBooksPurchasesDto,
} from "..";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import {
  QuickBooksPurchasesDeleteResponseModel,
  QuickBooksPurchasesQueryResponseModel,
  QuickBooksPurchasesResponseModel,
} from "../models/purchases-response.model";

@Injectable()
export class QuickBooksPurchasesService {
  constructor(
    private readonly authService: QuickBooksAuthService,
    private readonly http: HttpService,
    private readonly store: QuickBooksStore
  ) {}

  public async withDefaultCompany(): Promise<QuickBooksCompanyPurchasesService> {
    return this.forCompany(await this.store.getDefaultCompany());
  }

  public forCompany(realm: string): QuickBooksCompanyPurchasesService {
    return new QuickBooksCompanyPurchasesService(
      realm,
      this.authService,
      this.http
    );
  }
}

export class QuickBooksCompanyPurchasesService extends BaseService<
  QuickBooksPurchasesResponseModel,
  QuickBooksPurchasesQueryModel,
  QuickBooksPurchasesQueryResponseModel
> {
  constructor(
    realm: string,
    authService: QuickBooksAuthService,
    http: HttpService
  ) {
    super(realm, "purchase", authService, http);
  }

  public create(
    dto: CreateQuickBooksPurchasesDto
  ): Observable<QuickBooksPurchasesResponseModel> {
    return this.post(dto);
  }

  public readById(id: string): Observable<QuickBooksPurchasesResponseModel> {
    return this.get(id);
  }

  public fullUpdate(
    id: string,
    token: string,
    dto: FullUpdateQuickBooksPurchasesDto
  ): Observable<QuickBooksPurchasesResponseModel>;
  public fullUpdate(
    purchase: QuickBooksPurchases,
    dto: FullUpdateQuickBooksPurchasesDto
  ): Observable<QuickBooksPurchasesResponseModel>;
  public fullUpdate(
    ...args: [
      string | QuickBooksPurchases,
      string | FullUpdateQuickBooksPurchasesDto,
      FullUpdateQuickBooksPurchasesDto?
    ]
  ): Observable<QuickBooksPurchasesResponseModel> {
    const [id, token, dto] =
      QuickBooksCompanyPurchasesService.getUpdateArguments(args);
    return this.post({
      ...dto,
      Id: id,
      SyncToken: token,
    });
  }

  public sparseUpdate(
    id: string,
    token: string,
    dto: SparseUpdateQuickBooksPurchasesDto
  ): Observable<QuickBooksPurchasesResponseModel>;
  public sparseUpdate(
    purchase: QuickBooksPurchases,
    dto: SparseUpdateQuickBooksPurchasesDto
  ): Observable<QuickBooksPurchasesResponseModel>;
  public sparseUpdate(
    ...args: [
      string | QuickBooksPurchases,
      string | SparseUpdateQuickBooksPurchasesDto,
      SparseUpdateQuickBooksPurchasesDto?
    ]
  ): Observable<QuickBooksPurchasesResponseModel> {
    const [id, token, dto] =
      QuickBooksCompanyPurchasesService.getUpdateArguments(args);
    return this.post({
      ...dto,
      Id: id,
      SyncToken: token,
      sparse: true,
    });
  }

  public delete(
    id: string,
    token: string
  ): Observable<QuickBooksPurchasesDeleteResponseModel>;
  public delete(
    purchase: QuickBooksPurchases
  ): Observable<QuickBooksPurchasesDeleteResponseModel>;
  public delete(
    ...args: [string | QuickBooksPurchases, string?]
  ): Observable<QuickBooksPurchasesDeleteResponseModel> {
    const [id, token] =
      QuickBooksCompanyPurchasesService.getOperationArguments(args);
    return this.post(
      {
        Id: id,
        SyncToken: token,
      },
      "",
      {
        operation: "delete",
      }
    );
  }

  public void(
    id: string,
    token: string
  ): Observable<QuickBooksPurchasesResponseModel>;
  public void(
    purchase: QuickBooksPurchases
  ): Observable<QuickBooksPurchasesResponseModel>;
  public void(
    ...args: [string | QuickBooksPurchases, string?]
  ): Observable<QuickBooksPurchasesResponseModel> {
    const [id, token] =
      QuickBooksCompanyPurchasesService.getOperationArguments(args);
    return this.post(
      {
        Id: id,
        SyncToken: token,
      },
      "",
      {
        operation: "void",
      }
    );
  }

  private static getUpdateArguments<DTO>(
    args: [string | QuickBooksPurchases, string | DTO, DTO?]
  ): [string, string, DTO] {
    const [idOrPurchase, tokenOrDto, dto] = args;
    if (dto) {
      return [idOrPurchase as string, tokenOrDto as string, dto];
    }

    const purchase = idOrPurchase as QuickBooksPurchases;
    return [purchase.Id, purchase.SyncToken, tokenOrDto as DTO];
  }

  private static getOperationArguments(
    args: [string | QuickBooksPurchases, string?]
  ): [string, string] {
    const [idOrPurchase, token] = args;
    if (token) {
      return [idOrPurchase as string, token];
    }

    const purchase = idOrPurchase as QuickBooksPurchases;
    return [purchase.Id, purchase.SyncToken];
  }
}
