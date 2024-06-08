export interface Plan {
    planName: string;
    planCost: 499 | 299 | 199;
    validity: 365 | 180 | 90;
    status: 'Active' | 'Inactive';
  }
  
  export interface Customer {
    id?: number;
    name: string;
    dob: Date;
    email: string;
    adharNumber: string;
    registrationDate?: Date;
    assignedMobileNumber: string;
    plan: Plan;
    renewalDate?: Date;
  }
  