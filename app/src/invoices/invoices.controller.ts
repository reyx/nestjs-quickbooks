import {
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Put,
  Res,
} from "@nestjs/common";
import * as fs from "fs/promises";
import * as path from "path";
import { lastValueFrom } from "rxjs";
import {
  QuickBooksAttachablesService,
  QuickBooksAttachablesUploadResponseModel,
  QuickBooksEstimatesService,
  QuickBooksInvoicesService,
  QuickBooksPaymentsService,
} from "../../../lib";

@Controller("invoice")
export class InvoicesController {
  constructor(
    private readonly attachablesService: QuickBooksAttachablesService,
    private readonly estimatesService: QuickBooksEstimatesService,
    private readonly invoicesService: QuickBooksInvoicesService,
    private readonly paymentsService: QuickBooksPaymentsService,
  ) {}

  @Get()
  public async getAll() {
    const service = await this.invoicesService.withDefaultCompany();
    return lastValueFrom(
      service.query({
        /*MetaData: {
                LastUpdatedTime: {
                    [Op.gt]: "2015-03-01"
                }
            }*/
      }),
    ).then((x) => x.QueryResponse.Invoice);
  }

  @Get("pdf/:id")
  @Header("Content-Type", "application/pdf")
  public async getPdf(@Param("id") id: string, @Res() res): Promise<Buffer> {
    const invoiceService = await this.invoicesService.withDefaultCompany();
    return lastValueFrom(invoiceService.getPdf(id));
  }

  @Put(":id/attachable")
  public async uploadAttachable(
    @Param("id") id: string,
  ): Promise<QuickBooksAttachablesUploadResponseModel> {
    const attachableService =
      await this.attachablesService.withDefaultCompany();
    const file = await fs.readFile(
      path.join(__dirname, "../../../../", "test.pdf"),
    );
    return lastValueFrom(
      attachableService.upload({
        FileName: "worklog.pdf",
        ContentType: "application/pdf",
        File: file,
        AttachableRef: [
          {
            IncludeOnSend: true,
            EntityRef: {
              type: "Invoice",
              value: id,
            },
          },
        ],
      }),
    );
  }

  @Patch(":id/customer")
  public async updateCustomer(@Param("id") id: string): Promise<void> {
    const estimateService = await this.estimatesService.withDefaultCompany();
    const estimate = await lastValueFrom(estimateService.readById("213"));
    await lastValueFrom(
      estimateService.sparseUpdate(estimate.Estimate, {
        CustomerRef: {
          value: "70",
        },
      }),
    );

    const paymentService = await this.paymentsService.withDefaultCompany();
    const payment = await lastValueFrom(paymentService.readById("215"));
    const p = await lastValueFrom(
      paymentService.fullUpdate(payment.Payment, {
        ...payment.Payment,
        CustomerRef: {
          value: "70",
        },
        Line: [],
      }),
    );

    const invoiceService = await this.invoicesService.withDefaultCompany();
    const invoice = await lastValueFrom(invoiceService.readById(id));
    await lastValueFrom(
      invoiceService.sparseUpdate(invoice.Invoice, {
        CustomerRef: {
          value: "70",
        },
        LinkedTxn: [
          {
            TxnType: "Payment",
            TxnId: p.Payment.Id,
          } as any,
        ],
      }),
    );
  }
}
