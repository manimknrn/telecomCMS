import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormConfigService } from '../../../services/form-config.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'tcms-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule, MatFormFieldModule, MatCardModule, CommonModule, MatSelectModule, MatInputModule, MatRadioModule],
  standalone: true
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  @Input() formConfig: any;

  constructor(private fb: FormBuilder, private formConfigService: FormConfigService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    !!this.formConfig && this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
  }

  createForm() {
    const group: { [key: string]: FormControl } = {};
    this.formConfig.fields.forEach((field: any) => {
      const control = this.fb.control(
        '',
        this.bindValidations(field.validations || [])
      );
      group[field?.name] = control;
    });
    this.form = this.fb.group(group);
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: (ValidatorFn | null | undefined)[] = [];
      validations.forEach((valid: { validator: string; pattern: string | RegExp; }) => {
        if (valid.validator === 'required') {
          validList.push(Validators.required);
        } else if (valid.validator === 'pattern') {
          validList.push(Validators.pattern(valid.pattern));
        } else if (valid.validator === 'email') {
          validList.push(Validators.email);
        }
      });
      return Validators.compose(validList);
    }
    return null;
  }

  getErrorMessage(fieldName: any): string {
    const field = this.form.get(fieldName?.name);
    if (field?.hasError('required')) {
      return `${fieldName.validations[0].message}`;
    } else if (field?.hasError('pattern')) {
      return `Invalid ${fieldName?.label}`;
    } else if (field?.hasError('email')) {
      return `Invalid Email`;
    }
    return '';
  }

  patchFormValues(data: any): void {
    if (this.form) {
      this.form.patchValue(data);
    }
  }

}
