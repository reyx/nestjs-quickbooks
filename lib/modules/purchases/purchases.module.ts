import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksPurchasesService } from "./services/purchases.service";

@Module({
  imports: [QuickBooksAuthModule, HttpModule],
  providers: [QuickBooksPurchasesService],
  exports: [QuickBooksPurchasesService],
})
export class QuickBooksPurchasesModule {}
