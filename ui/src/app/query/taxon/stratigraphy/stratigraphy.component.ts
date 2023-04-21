import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StratigraphicAge, StratigraphicBiozone, StratigraphicData, StratigraphicSubject, typesEqual } from 'src/app/Models/TaxonFilter';
import { StratDialogComponent } from 'src/app/dialogs/stratigraphy/stratigraphy.component';
import { YesNoComponent } from 'src/app/dialogs/yes-no/yes-no.component';

@Component({
  selector: 'app-stratigraphy',
  templateUrl: './stratigraphy.component.html',
  styleUrls: ['./stratigraphy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StratigraphyComponent implements OnInit {

  @Input() resetTrigger!: Observable<boolean>;
  @Output() LimitChange = new EventEmitter<StratigraphicData>();
  searchData!: StratigraphicData
 
  constructor (public dialog: MatDialog) {
    this.searchData = new StratigraphicData();
  }

  ngOnInit(): void {
    this.resetTrigger.subscribe(r => {
      if(r)
        this.reset();
    })
  }

  openStratigraphyDialog(st: string) {

    this.dialog.open(StratDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        searchType: this.searchData.searchSubject,
        Top: this.searchData.Top.top,
        Bottom: this.searchData.Bottom.bottom
      }
    }).afterClosed()
      .subscribe(res => {
        this.setStratigraphy(res, st);
        this.checkLimit();
      });
  }

  setStratigraphy(strObj: StratigraphicAge | StratigraphicBiozone, boundary: string) {
    if(strObj){
      if(boundary == 'top') {
        this.searchData.Top = strObj;

        if(!typesEqual(this.searchData.Top, this.searchData.Bottom))
          this.searchData.Bottom = <StratigraphicAge> {};

      } else if(boundary == 'bottom') {
        this.searchData.Bottom = strObj;

        if(!typesEqual(this.searchData.Top, this.searchData.Bottom))
          this.searchData.Top = <StratigraphicAge> {};
      }

    }
  }

  reset(){
    this.resetTop();
    this.resetBottom();
    this.searchData.searchSubject = 'AGES';
    this.searchData.restrictedValues = false;
    this.searchData.searchLimit = 'INTERVAL';
  }

  resetTop() {
    this.searchData.Top = <StratigraphicAge>{}
  }

  resetBottom(){
    this.searchData.Bottom = <StratigraphicAge>{}
  }

  checkLimit(){
    if(this.searchData.isDefined)
      this.LimitChange.emit(this.searchData);
  }

  checkSubjectChange(ev: MatButtonToggleChange) {
    if( (this.searchData.searchLimit == 'TOPLIMIT' && this.searchData.Top.top != null)
        || (this.searchData.searchLimit == 'BOTTOMLIMIT' && this.searchData.Bottom.bottom != null)
        || (this.searchData.searchLimit == 'INTERVAL' && (this.searchData.Bottom.bottom != null || this.searchData.Top.top != null)))
      this.openConfirmChangeSubject(ev);
  }

  openConfirmChangeSubject(ev: MatButtonToggleChange){
    this.dialog.open(YesNoComponent, {
      height: '200px',
      width: '300px',
      data: {
        message: 'Are you sure you want to change selection subject? this will reset the values chosen'
      }
    }).afterClosed()
      .subscribe({
        next: (value: boolean) => {
          if(value){
            this.searchData.Top = <StratigraphicAge>{}
            this.searchData.Bottom = <StratigraphicAge>{}
          } else {
            this.searchData.searchSubject = 
              ev.value == 'AGES' ? 'BIOZONES': 'AGES';
          }
        }
      })
  }

  log(){
    console.log(this.searchData);
  }
}
