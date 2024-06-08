export interface TableColumn {
    columnDef: string;
    header: string;
    cell: (arg0: any) => string;
    sortingDisabled?: boolean;
    width?: string;
    isLink?: boolean;
    isCurrency?: boolean;
    caseSensitive? : string;
    align?: string;
    headerAlign?: boolean;
    isBullet?: boolean;
  }