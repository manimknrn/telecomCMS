import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableColumn } from '../../models/table.column';
import { TableBtn } from '../../models/table-button';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'tcms-general-table',
  styleUrls: ['general-table.component.scss'],
  templateUrl: 'general-table.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule, PortalModule, MatPaginatorModule, MatIconModule, MatTooltipModule, MatMenuModule],
})
export class GeneralTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableBtn[] = [];
  @Input() data: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Input() currentPage!: number;
  @Output() loadData = new EventEmitter<any>();
  @Input() totalDataCount: any;
  @Input() pagination: number[] = [];
  @Input() pageSize!: number;
  @Input() tableMinWidth: number = 550;
  @Input() tableMinHeight: number = 48;
  @Input() actionHeader: string = '';
  @Output() buttonClick = new EventEmitter<string[]>();
  @Input() actionFeatureLabel: string = '';
  @Input() actionFeatureFlag = false;
  @Output() actionFeature = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (changes?.['data']) {
        this.refreshData();

        this.displayedColumns = [...this.columns.map(c => c.columnDef)];
        let buttonActionEnable = this.buttons.find(res => res.enable == true);
        if (this.buttons.length > 0 && buttonActionEnable) this.displayedColumns = [...this.displayedColumns, 'actions'];
      }
    }
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalDataCount;
      }
    })
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    const pagination = {
      currentPage: this.pageSize * event.pageIndex,
      pageSize: this.pageSize
    }
    this.loadData.emit(pagination);
  }
}
