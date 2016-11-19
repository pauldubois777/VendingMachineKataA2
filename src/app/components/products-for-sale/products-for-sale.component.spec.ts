/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ProductsForSaleComponent } from './products-for-sale.component';
import { InventoryService } from '../../services/inventory/inventory.service';
import { InitialInventory } from '../../services/inventory/initial-inventory';
import { MessageService } from '../../services/message/message.service';
import { InsertedCoinsService } from '../../services/inserted-coins/inserted-coins.service';
import { BankService } from '../../services/bank/bank.service';
import { CoinReturnService } from '../../services/coin-return/coin-return.service';
import { InitialBankCoins } from '../../services/bank/initial-bank-coins';
import { PurchaseService } from '../../services/purchase/purchase.service';

describe('Component: ProductsForSale', () => {
  it('should create an instance', () => {
    let messageService: MessageService;
    let inventoryService: InventoryService;
    let insertedCoinsService: InsertedCoinsService;
    let bankService: BankService;
    let coinReturnService: CoinReturnService;
    let purchaseService: PurchaseService;

    inventoryService = new InventoryService(new InitialInventory());
    coinReturnService = new CoinReturnService();
    bankService = new BankService(new InitialBankCoins(), coinReturnService);
    messageService = new MessageService(bankService);
    insertedCoinsService = new InsertedCoinsService(coinReturnService, bankService, messageService);
    purchaseService = new PurchaseService(messageService, inventoryService, insertedCoinsService);

    let component = new ProductsForSaleComponent(inventoryService, purchaseService);
    expect(component).toBeTruthy();
  });
});
