import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { FormConfigService } from '../../services/form-config.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tcms-register-customer',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, MatCardModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.scss'
})
export class RegisterCustomerComponent {

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  formConfig: any;
  customerId!: number;
  isEditMode: boolean = false;


  constructor(private customerService: CustomerService, readonly cdr: ChangeDetectorRef, readonly formConfigService: FormConfigService, private route: ActivatedRoute,
    readonly router: Router) {
    this.formConfigService.getFormConfig().subscribe(config => {
      this.formConfig = config;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.customerId = params['id'];
        this.isEditMode = true;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.isEditMode && this.customerId) {
      this.loadCustomerData(this.customerId);
    }
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.dynamicFormComponent.form.valid) {
      const formData = this.dynamicFormComponent.form.value;
      formData.registrationDate = new Date().toISOString().split('T')[0];
      if (this.isEditMode) {
        // Update existing customer
        console.log('Updating customer:', formData);
      } else {
        this.customerService.registerCustomer(formData).subscribe(response => {
          console.log('Customer registered', response);
        }, error => {
          console.error('Error registering customer', error);
        })
      }
      this.router.navigate(['/manage-customers']);
    }
  }

  loadCustomerData(id: number): void {
    // Mock customer data; replace with a service call
    const customerData = {
      name: 'John Doe',
      dob: '1990-01-01',
      email: 'amit.singh@example.com',
      aadharNumber: '123456789012',
      registrationDate: '2020-01-01',
      assignedMobileNumber: '9876543210',
      plan: 'Gold180'
    };
    this.dynamicFormComponent.patchFormValues(customerData);
  }
}
