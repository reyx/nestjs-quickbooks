import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksPreferencesService } from "./services/preferences.service";

@Module({
  imports: [QuickBooksAuthModule, HttpModule],
  providers: [QuickBooksPreferencesService],
  exports: [QuickBooksPreferencesService],
})
export class QuickBooksPreferencesModule {}
