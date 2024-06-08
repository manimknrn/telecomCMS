
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterCustomerComponent } from './register-customer.component';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';

describe('RegisterCustomerComponent', () => {
  let component: RegisterCustomerComponent;
  let fixture: ComponentFixture<RegisterCustomerComponent>;
  let httpMock: HttpTestingController;
  let routeStub: any;
  let formGroup: FormGroup;
  let formControl: FormControl;

  beforeEach(async () => {
    routeStub = { params: of({ id: '123' }) };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HttpClient, HttpHandler,
        { provide: ActivatedRoute, useValue: routeStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCustomerComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    const httpClient = TestBed.inject(HttpClient);
    httpClient.get('assets/form-config.json').subscribe((fields: any) => {
      component.formConfig.fields = fields;

      component.formConfig.fields.forEach((field: { name: any; validations: any[]; }) => {
        formGroup.addControl(field.name, new FormControl(''));
        if (field.validations) {
          const validators: any[] = [];
          field.validations.forEach((validation: { type: string; }) => {
            if (validation.type === 'required') {
              validators.push(Validators.required);
            }

          });
          formGroup.get(field.name)?.setValidators(validators);
          formControl.setValidators(validators);
        }
        formGroup.addControl(field.name, formControl);
      });
      fixture.detectChanges();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form configuration on init', fakeAsync(() => {
    const mockFormConfig = [
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

    fixture.detectChanges();

    tick();

    expect(component.formConfig).toEqual(mockFormConfig);
  }));

  it('should patch form values in edit mode', fakeAsync(() => {
    const mockFormConfig = {
      fields: [
        { name: 'name', validations: [{ name: 'required' }] },
        { name: 'dob', validations: [{ dob: 'required' }] },
        { name: 'email', validations: [{ email: 'required' }] },
        { name: 'aadharNumber', validations: [{ aadharNumber: 'required' }] },
        { name: 'assignedMobileNumber', validations: [{ assignedMobileNumber: 'required' }] },
        { name: 'plan', validations: [{ plan: 'required' }] }
      ]
    };

    const req = httpMock.expectOne('assets/form-config.json');
    req.flush(mockFormConfig);
    tick();
    fixture.detectChanges();

    const customerData = {
      name: 'John Doe',
      dob: '1990-01-01',
      email: 'amit.singh@example.com',
      aadharNumber: '123456789012',
      registrationDate: '2020-01-01',
      assignedMobileNumber: '9876543210',
      plan: 'Gold180'
    };

    spyOn(component.dynamicFormComponent, 'patchFormValues');

    component.ngAfterViewInit();
    component.cdr.detectChanges();

    expect(component.dynamicFormComponent.patchFormValues).toHaveBeenCalledWith(customerData);
  }));

  it('should handle form submission', fakeAsync(() => {
    const mockFormConfig = {
      fields: [
        { name: 'name', validations: [{ name: 'required' }] },
        { name: 'dob', validations: [{ dob: 'required' }] },
        { name: 'email', validations: [{ email: 'required' }] },
        { name: 'aadharNumber', validations: [{ aadharNumber: 'required' }] },
        { name: 'assignedMobileNumber', validations: [{ assignedMobileNumber: 'required' }] },
        { name: 'plan', validations: [{ plan: 'required' }] }
      ]
    };

    component.dynamicFormComponent.form.setValue({
      name: 'Jane Doe',
      dob: '1995-02-01',
      email: 'jane.doe@example.com',
      aadharNumber: '987654321098',
      // registrationDate: '2021-01-01',
      assignedMobileNumber: '8765432109',
      plan: 'Silver90'
    });

    spyOn(console, 'log');
    spyOn(component.router, 'navigate');

    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('Registering new customer:', {
      name: 'Jane Doe',
      dob: '1995-02-01',
      email: 'jane.doe@example.com',
      aadharNumber: '987654321098',
      // registrationDate: '2021-01-01',
      assignedMobileNumber: '8765432109',
      plan: 'Silver90'
    });
    expect(component.router.navigate).toHaveBeenCalledWith(['/manage-customers']);
  }));
});

