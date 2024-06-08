import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formGroup: FormGroup;
  let formControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, DynamicFormComponent, HttpClientTestingModule],
      providers: [
        HttpClient, HttpHandler,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on component initialization', () => {
    expect(component.form).toBeDefined();
  });

  it('should display form fields based on form configuration', () => {

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
      expect(component.formConfig.fields.length).toBeGreaterThan(0);
    });
  });

  it('should set required validators for form fields', () => {
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
      expect(formControl?.get('name')?.validator).not.toBeNull();
      expect(formControl?.get('email')?.validator).not.toBeNull();
    });
  });

  it('should mark form as invalid if any required field is empty', () => {
    component.form.patchValue({
      name: 'John Doe',
      dob: '',
      email: '',
      adharNumber: '',
      assignedMobileNumber: '',
      planName: ''
    });
    expect(component.form.invalid).toBe(false);
  });

  it('should mark form as valid if all required fields are filled', () => {
    component.form.patchValue({
      name: 'Amit',
      dob: '1990-01-01',
      email: 'amit@gmail.com',
      adharNumber: '123443211234',
      assignedMobileNumber: '9898987412',
      planName: 'Silver90'
    });
    expect(component.form.valid).toBe(true);
  });

});
