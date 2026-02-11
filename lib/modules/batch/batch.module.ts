import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { QuickBooksBatchService } from "./services/batch.service";

@Module({
  imports: [HttpModule, ConfigModule, QuickBooksAuthModule],
  providers: [QuickBooksBatchService],
  exports: [QuickBooksBatchService],
})
export class QuickBooksBatchModule {}
