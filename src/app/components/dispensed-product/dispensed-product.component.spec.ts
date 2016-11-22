/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DispensedProductComponent } from './dispensed-product.component';
import { InventoryService } from '../../services/inventory/inventory.service';
import { InitialInventory } from '../../services/inventory/initial-inventory';

describe('DispensedProductComponent', () => {
  let component: DispensedProductComponent;
  let fixture: ComponentFixture<DispensedProductComponent>;

  // TODO: Add mocks for InventoryService and InitialInventory

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensedProductComponent ],
      providers: [ 
        InventoryService,
        InitialInventory 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
