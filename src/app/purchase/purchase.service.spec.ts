/* tslint:disable:no-unused-variable */

import { PurchaseService } from './purchase.service';
import { MessageDisplayService } from '../message-display/message-display.service';
import { InventoryService } from '../inventory/inventory.service';
import { InitialInventory } from '../inventory/initial-inventory';
import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';
import { StringConstants } from '../shared/string-constants';
import { InsertedCoinsService } from '../inserted-coins/inserted-coins.service';
import { BankService } from '../bank/bank.service';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { InitialBankCoins } from '../bank/initial-bank-coins';

let service: PurchaseService;
let messageDisplayService: MessageDisplayService;
let inventoryService: InventoryService;
let insertedCoinService: InsertedCoinsService;
let bankService: BankService;
let coinReturnService: CoinReturnService;
let initialInventory: InitialInventory;
let setTempMessageSpy: jasmine.Spy;

describe('Service: Purchase', () => {
  beforeEach(() => {
    messageDisplayService = new MessageDisplayService();
    setTempMessageSpy = spyOn(messageDisplayService, 'setTempMessage');

    initialInventory = new InitialInventory();
    initialInventory.inventory = [
      new InventoryItem (new Product(1, 'Fruit Chews', 75), 0),
      new InventoryItem (new Product(6, 'Cola', 60), 5),
    ];
    inventoryService = new InventoryService(initialInventory);

    coinReturnService = new CoinReturnService();
    bankService = new BankService(new InitialBankCoins(), coinReturnService);
    insertedCoinService = new InsertedCoinsService(coinReturnService, bankService, messageDisplayService);

    service = new PurchaseService(messageDisplayService, inventoryService, insertedCoinService);
  });

  it('purchase product with 0 qty available calls service to display temp message sold out', () => {
    let retValue = service.purchase(initialInventory.inventory[0].product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.SOLD_OUT_MESSAGE);
  });

  it('purchase invalid product calls service to display temp message error', () => {
    let retValue = service.purchase(new Product(123321, 'Product not in inventory', 123));

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.UNKNOWN_PRODUCT_MESSAGE);
  });

  it('purchase product when no coins inserted, calls service to display price message ', () => {
    // No money has been inserted
    let retValue = service.purchase(initialInventory.inventory[1].product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(
      StringConstants.PRICE_MESSAGE_PREFIX + ' ' + (initialInventory.inventory[1].product.costCents / 100)
    );
  });

});
