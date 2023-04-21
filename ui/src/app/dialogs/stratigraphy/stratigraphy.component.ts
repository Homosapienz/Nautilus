import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StratigraphicAge, StratigraphicBiozone, StratigraphicSubject } from 'src/app/Models/TaxonFilter';
import { ApiService } from 'src/app/services/api.service';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-strat-dialog',
  templateUrl: './stratigraphy.component.html',
  styleUrls: ['./stratigraphy.component.scss']
})
export class StratDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StratDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiService: ApiService
  ) {
    this.searchType = this.data.searchType;
    this.topValue = this.data.Top;
    this.bottomValue = this.data.Bottom;
  }

  //rows!: Observable<StratigraphicAge[] | StratigraphicBiozone[]>
  rows: StratigraphicAge[] | StratigraphicBiozone[] = [];
  searchType: StratigraphicSubject = 'AGES';
  topValue: number;
  bottomValue: number;
  selection!: StratigraphicAge | StratigraphicBiozone | null;
  
  selectionType = SelectionType;
  columnMode = ColumnMode;

  ngOnInit(): void {
    if(this.searchType == 'AGES') 
      this.apiService.getStratigraficAges()
        .subscribe(res => this.rows = this.filterRows(res));
    else if(this.searchType == 'BIOZONES') 
      this.apiService.getStratigraficBiozones()
        .subscribe(res => this.rows = this.filterRows(res));
  }

  filterRows(rows: any[] ) {
    var filtered: any[] = rows;
    if(this.topValue){
      filtered = rows.filter(r => Number(r.bottom) > this.topValue)
    }

    if(this.bottomValue){
      filtered = rows.filter(r => Number(r.top) < this.bottomValue)
    }

    return filtered;
  }

  onSelect(ev: any) {
    this.selection = ev.selected[0];
  }
}
