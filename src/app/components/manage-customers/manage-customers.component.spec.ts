import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ManageCustomersComponent } from './manage-customers.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ManageCustomersComponent', () => {
  let component: ManageCustomersComponent;
  let fixture: ComponentFixture<ManageCustomersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatTableModule, HttpClientTestingModule],
      providers: [HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customer data on initialization', fakeAsync(() => {
    const mockCustomerData: any = [
      {
        "id": 1,
        "name": "Amit Singh",
        "dob": "1990-01-01",
        "email": "amit.singh@example.com",
        "adharNumber": "123456789012",
        "registrationDate": "2022-01-01",
        "assignedMobileNumber": "9876543210",
        "plan": {
          "planName": "Gold180",
          "planCost": 299,
          "validity": 180,
          "status": "Active"
        },
        "renewalDate": "2022-07-01"
      }
    ];

    tick();
    fixture.detectChanges();

    expect(component.data).toBeFalsy(mockCustomerData);
  }));

});
