import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoinReturnService } from './coin-return/coin-return.service'
import { MessageDisplayService } from './message-display/message-display.service'
import { InventoryService } from './inventory/inventory.service'
import { BankService } from './bank/bank.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CoinReturnService,
    MessageDisplayService,
    InventoryService,
    BankService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
