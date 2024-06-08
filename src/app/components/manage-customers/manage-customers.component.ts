import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { GeneralTableComponent } from '../../shared/components/general-table/general-table.component';
import { TableBtn } from '../../shared/models/table-button';
import { TableColumn } from '../../shared/models/table.column';
import { Router } from '@angular/router';

@Component({
  selector: 'tcms-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
  imports: [MatTableModule, GeneralTableComponent, FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true
})
export class ManageCustomersComponent implements OnInit {
  data!: Customer[]
  pageList = {
    currentPage: 0,
    pageSize: 10
  };
  currentPage = 0;
  totalDataCount = 0;
  sortColumn = '';
  sortDirection = 'asc';
  columns!: TableColumn[];
  buttons!: TableBtn[];
  actionHeader: string = '';
  filterPlaceholder: string = '';
  dataSource = [];

  constructor(private customerService: CustomerService, public dialog: MatDialog, readonly router: Router) {
    this.render(this.pageList, '');
    this.columns = [
      { columnDef: 'id', header: 'ID', cell: (element: Customer) => `${element.id}` },
      { columnDef: 'name', header: 'Name', cell: (element: Customer) => `${element.name}` },
      { columnDef: 'dob', header: 'DOB', cell: (element: Customer) => `${element.dob}` },
      { columnDef: 'createdOn', header: 'Email', cell: (element: Customer) => `${element.email}` },
      { columnDef: 'adharNumber', header: 'Adhar number', cell: (element: Customer) => `${element.adharNumber}` },
      { columnDef: 'registrationDate', header: 'Registration Date', cell: (element: Customer) => `${element.registrationDate}` },
      { columnDef: 'assignedMobileNumber', header: 'Mobile Number', cell: (element: Customer) => `${element.assignedMobileNumber}` },
      { columnDef: 'planName', header: 'Plan Name', cell: (element: Customer) => `${element.plan?.planName}` },
      { columnDef: 'planCost', header: 'Plan Cost', cell: (element: Customer) => `${element.plan?.planCost}` },
      { columnDef: 'validity', header: 'Validity (Days)', cell: (element: Customer) => `${element.plan?.validity}` },
      { columnDef: 'status', header: 'Status', cell: (element: Customer) => `${element.plan?.status}` },
      { columnDef: 'renewalDate', header: 'Renewal Date', cell: (element: Customer) => `${element.renewalDate}` }
    ];

    this.buttons = [
      { styleClass: 'submit', icon: 'edit', payload: (element: Customer) => `${element.id}`, action: 'edit', tooltip: 'Edit', enable: true },
      { styleClass: 'submit', icon: 'delete', payload: (element: Customer) => `${element.id}`, action: 'delete', tooltip: 'Delete', enable: true },
    ]

    this.actionHeader = 'Register Customer';
  }

  ngOnInit(): void {
  }

  render(value: any, searchFilter?: string) {
    this.customerService.getCustomers().subscribe((res: any) => {
      this.data = !!res ? res.data : [];
      this.totalDataCount = res.totalRecords;
    });
  }

  loadData(value: any) {
    let val = {
      currentPage: value.currentPage,
      pageSize: value.pageSize
    }
    this.pageList.pageSize = value.pageSize;
    this.render(val, '')
  }

  buttonClick(result: string[]) {
    if (result[0] == 'delete') {
      this.deleteCustomer(+result[1]);
    } else if (result[0] == 'edit') {
      this.editCustomer(+result[1]);
    }
  }

  deleteCustomer(id: number): void {
    this.data = this.data.filter(customer => customer.id !== id); //this is just to show the removal as mock
    this.customerService.registerCustomer(id).subscribe(response => {
      console.log(`Customer with id ${id} deleted.`, response);
    }, error => {
      console.error('Error while removing customer', error);
    })
  }

  editCustomer(id: number): void {
    this.router.navigate([`/register-customer`, id]);
  }

  actionFeature(event: any) {
    this.router.navigateByUrl('/register-customer');
  }
}
