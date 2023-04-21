import { Component, Input, ViewChild, EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, debounceTime } from 'rxjs';
import { Area } from 'src/app/Models/TaxonFilter';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AreaComponent implements OnInit {

  @Input() areas!: Area[];
  @Input() resetTrigger!: Observable<boolean>;
  @ViewChild('selAreas') areaSelectionElement!: MatSelect;
  @Output() selectionChanged = new EventEmitter<Area[]>();

  selectedAreas: Set<Area> = new Set<Area>();
  searchinput = new FormControl('');
  search$ = this.searchinput.valueChanges.pipe(debounceTime(500));
  
  ngOnInit(): void {
    this.resetTrigger.subscribe(trigger => {
      if(trigger){
        this.areaSelectionElement.options.forEach(o => o.deselect());
        this.selectedAreas.clear();
      }
        
    })
  }

  onSelectArea(ev: MatSelectChange){
    let codes: string[] = ev.value;
    let selectedOptions: Area[] = [];

    codes.map(c => {
      var a = this.findCountryByCode(c);
      if(a) {
        selectedOptions.push(a);
      } 
      else if (this.findRegionByCode(c)){
        this.findCountriesByRegion(c)
          .forEach(cnt => selectedOptions.push(cnt));
      }
    });

    selectedOptions.forEach(so => {
      this.selectedAreas.add(so);
    });

    this.selectionChanged.emit(
      Array.from(this.selectedAreas.values()));
  }

  isSelected(code: string){
    let area: Area = this.Countries.find(a => a.countryCode == code)!;
    return area ? this.selectedAreas.has(area): false;
  }

  deleteAllSelection() {
    this.selectedAreas.forEach(sa => {
      this.deleteFromSelection(sa)
    });
  }

  deleteFromSelection(area: Area){

    this.areaSelectionElement.options
      .find(opt => opt.viewValue == area.countryName)?.deselect();
    this.areaSelectionElement.options
      .find(opt => opt.viewValue == area.regionName)?.deselect();

    this.selectedAreas.delete(area);
    this.selectionChanged.emit(
      Array.from(this.selectedAreas.values()));
  }

  findCountryByCode(countryCode: string): Area | undefined {
    return this.Countries.find(a => a.countryCode == countryCode);
  }

  findRegionByCode(regionCode: string): Area | undefined {
    return this.Regions.find(r => r.regionCode == regionCode);
  }

  findCountriesByRegion(regionCode: string): Area[] {
    return this.Countries.filter(c => c.regionCode == regionCode);
  }

  get Regions(): Area[] {
    return this.areas.filter(a => a.countryCode === '');
  }

  get Countries(): Area[] {
    return this.areas.filter(a => a.countryCode !== '')
  }
}
