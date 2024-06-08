export interface TableBtn {
    styleClass: string;
    icon: string;
    payload: (arg0: any) => string;
    action: string;
    tooltip?: string;
    isDisabled?: (arg0: any) => string;
    enable?: boolean;
    hide?:(arg0: any) => string;
  }