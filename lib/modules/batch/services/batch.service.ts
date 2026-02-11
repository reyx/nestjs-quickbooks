import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store";
import { BatchItem, CreateQuickBooksBatchDto } from "../dto/create-batch.dto";
import { QuickBooksBatchResponse } from "../models/batch-response.model";

@Injectable()
export class QuickBooksBatchService {
  constructor(
    private readonly authService: QuickBooksAuthService,
    private readonly http: HttpService,
    private readonly store: QuickBooksStore,
  ) {}

  public async withDefaultCompany(): Promise<QuickBooksCompanyBatchService> {
    return this.forCompany(await this.store.getDefaultCompany());
  }

  public forCompany(realm: string): QuickBooksCompanyBatchService {
    return new QuickBooksCompanyBatchService(
      realm,
      this.authService,
      this.http,
    );
  }
}

export class QuickBooksCompanyBatchService extends BaseService<
  QuickBooksBatchResponse,
  any,
  any
> {
  constructor(
    realm: string,
    authService: QuickBooksAuthService,
    http: HttpService,
  ) {
    super(realm, "batch", authService, http);
  }

  public process(items: BatchItem[]): Observable<QuickBooksBatchResponse> {
    return this.post(
      {
        BatchItemRequest: items,
      },
      "",
    );
  }

  public processDto(
    dto: CreateQuickBooksBatchDto,
  ): Observable<QuickBooksBatchResponse> {
    return this.post(dto, "");
  }
}
