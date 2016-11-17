/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

// Services
import { CoinReturnService } from './services/coin-return/coin-return.service';
import { MessageDisplayService } from './services/message-display/message-display.service';
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

describe('App: VendingMachineKataA2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CoinSlotComponent,
        CoinComponent
      ],
      providers: [
        CoinReturnService,
        MessageDisplayService,
        InitialInventory,
        InventoryService,
        BankService,
        InitialBankCoins,
        InsertedCoinsService,
        PurchaseService
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
