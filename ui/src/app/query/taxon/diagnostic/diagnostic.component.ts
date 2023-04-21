import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, debounceTime } from 'rxjs';
import { DiagnosticCharacter } from 'src/app/Models/TaxonFilter';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {

  @Input() diagnostics!: DiagnosticCharacter[];
  @Input() resetTrigger!: Observable<boolean>;
  @ViewChild('selDiags') diagSelectionElement!: MatSelect
  @Output() selectionChanged = new EventEmitter<DiagnosticCharacter[]>

  selectedDiagnostics: Set<DiagnosticCharacter> = new Set<DiagnosticCharacter>();
  searchinput = new FormControl('');
  search$ = this.searchinput.valueChanges.pipe(debounceTime(500));

  ngOnInit(): void {
    this.resetTrigger.subscribe(trigger => {
      if(trigger)
        this.selectedDiagnostics.clear();
    })
  }

  onSelectDiagnostic(ev: MatSelectChange){
    let codes: string[] = ev.value;
    let selectedOptions: DiagnosticCharacter[] = [];

    codes.map(c => {
      var a = this.findDiagnosticByCode(c);
      if(a) {
        selectedOptions.push(a);
      } 
    });

    selectedOptions.forEach(so => {
      this.selectedDiagnostics.add(so);
    });

    this.selectionChanged.emit(
      Array.from(this.selectedDiagnostics.values()));
  }

  findDiagnosticByCode(code: string){
    return this.diagnostics.find(d => d.code == code);
  }

  deleteAllSelection() {
    this.selectedDiagnostics.forEach(sa => {
      this.deleteFromSelection(sa)
    });
  }

  deleteFromSelection(diag: DiagnosticCharacter){

    this.diagSelectionElement.options
      .find(opt => opt.value == diag.code)?.deselect();

    this.selectedDiagnostics.delete(diag);
    this.selectionChanged.emit(
      Array.from(this.selectedDiagnostics.values()));

  }

  isSelected(code: string){
    let area: DiagnosticCharacter = this.diagnostics.find(d => d.code == code)!;
    return area ? this.selectedDiagnostics.has(area): false;
  }

}
