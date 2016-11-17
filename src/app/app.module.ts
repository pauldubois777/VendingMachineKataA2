import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Services
import { CoinReturnService } from './services/coin-return/coin-return.service';
import { MessageService } from './services/message/message.service';
import { InitialInventory } from './services/inventory/initial-inventory';
import { InventoryService } from './services/inventory/inventory.service';
import { InitialBankCoins } from './services/bank/initial-bank-coins';
import { BankService } from './services/bank/bank.service';
import { InsertedCoinsService } from './services/inserted-coins/inserted-coins.service';
import { PurchaseService } from './services/purchase/purchase.service';

// Components
import { AppComponent } from './app.component';
import { CoinSlotComponent } from './components/coin-slot/coin-slot.component';
import { CoinComponent } from './components/coin/coin.component';
import { MessageDisplayComponent } from './components/message-display/message-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinSlotComponent,
    CoinComponent,
    MessageDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CoinReturnService,
    MessageService,
    InitialInventory,
    InventoryService,
    BankService,
    InitialBankCoins,
    InsertedCoinsService,
    PurchaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
