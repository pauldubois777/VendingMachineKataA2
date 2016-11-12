import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoinReturnService } from './coin-return/coin-return.service';
import { MessageDisplayService } from './message-display/message-display.service';
import { InitialInventory } from './inventory/initial-inventory';
import { InventoryService } from './inventory/inventory.service';
import { InitialBankCoins } from './bank/initial-bank-coins';
import { BankService } from './bank/bank.service';
import { InsertedCoinsService } from './inserted-coins/inserted-coins.service';

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
    InitialInventory,
    InventoryService,
    BankService,
    InitialBankCoins,
    InsertedCoinsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
