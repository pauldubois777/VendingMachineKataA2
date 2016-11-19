/* tslint:disable:no-unused-variable */

import { PurchaseService } from './purchase.service';
import { MessageService } from '../message/message.service';
import { InventoryService } from '../inventory/inventory.service';
import { InitialInventory } from '../inventory/initial-inventory';
import { InventoryItem } from '../../models/inventory-item';
import { Product } from '../../models/product';
import { StringConstants } from '../../shared/string-constants';
import { InsertedCoinsService } from '../inserted-coins/inserted-coins.service';
import { BankService } from '../bank/bank.service';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { InitialBankCoins } from '../bank/initial-bank-coins';
import { formatPrice } from '../../shared/helpers';

let service: PurchaseService;
let messageService: MessageService;
let inventoryService: InventoryService;
let insertedCoinsService: InsertedCoinsService;
let bankService: BankService;
let coinReturnService: CoinReturnService;
let initialInventory: InitialInventory;
let setTempMessageSpy: jasmine.Spy;
let purchaseSpy: jasmine.Spy;
let dispenseSpy: jasmine.Spy;
let getItemSpy: jasmine.Spy;
let getValueInCentsSpy: jasmine.Spy;
let product: Product;
let inventoryItem: InventoryItem;

describe('Service: Purchase', () => {
  beforeEach(() => {
    product = new Product(99, 'Fake Product', 40);
    inventoryItem = new InventoryItem(product, 6);

    inventoryService = new InventoryService(new InitialInventory());
    dispenseSpy = spyOn(inventoryService, 'dispense');
    getItemSpy = spyOn(inventoryService, 'getItem');

    coinReturnService = new CoinReturnService();
    bankService = new BankService(new InitialBankCoins(), coinReturnService);

    messageService = new MessageService(bankService);
    setTempMessageSpy = spyOn(messageService, 'setTempMessage');

    insertedCoinsService = new InsertedCoinsService(coinReturnService, bankService, messageService);
    purchaseSpy = spyOn(insertedCoinsService, 'purchase');
    getValueInCentsSpy = spyOn(insertedCoinsService, 'getValueInCents');

    service = new PurchaseService(messageService, inventoryService, insertedCoinsService);
  });

  it('purchase product with 0 qty available calls service to display temp message sold out', () => {
    inventoryItem.qty = 0;
    getItemSpy.and.returnValue(inventoryItem);

    let retValue = service.purchase(inventoryItem.product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.SOLD_OUT_MESSAGE);
  });

  it('purchase invalid product calls service to display temp message error', () => {
    getItemSpy.and.returnValue(null);

    let retValue = service.purchase(inventoryItem.product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.UNKNOWN_PRODUCT_MESSAGE);
  });

  it('purchase product when no coins inserted, calls service to display price message ', () => {
    getItemSpy.and.returnValue(inventoryItem);
    getValueInCentsSpy.and.returnValue(0);

    let retValue = service.purchase(inventoryItem.product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(
      StringConstants.PRICE_MESSAGE_PREFIX + ' ' + formatPrice(inventoryItem.product.costCents)
    );
  });

  it('purchase product when coins inserted less than cost, calls service to display price message ', () => {
    getItemSpy.and.returnValue(inventoryItem);
    getValueInCentsSpy.and.returnValue(inventoryItem.product.costCents - 10);

    let retValue = service.purchase(inventoryItem.product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(
      StringConstants.PRICE_MESSAGE_PREFIX + ' ' + formatPrice(inventoryItem.product.costCents)
    );
  });

  it(`purchase product when coins inserted equals cost,  
      calls inventory service to dispense product, 
      calls inserted coins service to purchase,
      and display thank you message`, () => {

    getItemSpy.and.returnValue(inventoryItem);
    getValueInCentsSpy.and.returnValue(inventoryItem.product.costCents);
    dispenseSpy.and.returnValue(true); // Successful dispense

    let retValue = service.purchase(inventoryItem.product);

    expect(retValue).toEqual(true);
    expect(dispenseSpy).toHaveBeenCalledWith(inventoryItem.product);
    expect(purchaseSpy).toHaveBeenCalledWith(inventoryItem.product.costCents);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.THANK_YOU_MESSAGE);
  });

  it(`purchase product when coins inserted greater than cost,  
      calls inventory service to dispense product, 
      calls inserted coins service to purchase,
      and display thank you message`, () => {

    getItemSpy.and.returnValue(inventoryItem);
    getValueInCentsSpy.and.returnValue(inventoryItem.product.costCents + 25);
    dispenseSpy.and.returnValue(true);

    let retValue = service.purchase(inventoryItem.product);

    expect(retValue).toEqual(true);
    expect(dispenseSpy).toHaveBeenCalledWith(inventoryItem.product);
    expect(purchaseSpy).toHaveBeenCalledWith(inventoryItem.product.costCents);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.THANK_YOU_MESSAGE);
  });

it(`purchase product when coins inserted greater than cost but unsuccessful dispense,  
      calls service to display dispense error message`, () => {

    getItemSpy.and.returnValue(inventoryItem);
    getValueInCentsSpy.and.returnValue(inventoryItem.product.costCents + 25);
    dispenseSpy.and.returnValue(false); // Unsuccessful dispense

    let retValue = service.purchase(product);

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.UNABLE_TO_DISPENSE_MESSAGE);
  });
});
