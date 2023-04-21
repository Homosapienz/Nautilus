import { Component, Input,  EventEmitter, Output, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, debounceTime } from 'rxjs';
import { TaxonClass } from 'src/app/Models/TaxonFilter';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefinitionComponent implements OnInit {

  @Input() subgroups!:    TaxonClass[];
  @Input() genus!:        TaxonClass[];
  @Input() species!:      TaxonClass[];
  @Input() subspecies!:   TaxonClass[];
  @Input() resetTrigger!: Observable<boolean>;

  @Output() subgroupChanged   = new EventEmitter<string>();
  @Output() genusChanged      = new EventEmitter<string>();
  @Output() speciesChanged    = new EventEmitter<string>();
  @Output() subspeciesChanged = new EventEmitter<string>();

  @ViewChild('#selsubgroup')    selSubgroup!: MatSelect;
  @ViewChild('#selgenus')       selGenus!: MatSelect;
  @ViewChild('#selspecies')     selSpecies!: MatSelect;
  @ViewChild('#selsubspecies')  selSubSpecies!: MatSelect;
  
  searchsubgroup  = new FormControl('');
  searchgenus     = new FormControl('');
  searchspecies   = new FormControl('');
  searchsubs      = new FormControl('');

  searchsg$ = this.searchsubgroup.valueChanges.pipe(debounceTime(500));
  searchge$ = this.searchgenus.valueChanges.pipe(debounceTime(500));
  searchsp$ = this.searchspecies.valueChanges.pipe(debounceTime(500));
  searchss$ = this.searchsubs.valueChanges.pipe(debounceTime(500));

  ngOnInit(): void{
    this.resetDefinition();
    this.resetTrigger.subscribe(trigger => {
      if(trigger)
        this.resetDefinition();
    });
  }

  resetDefinition() {
    this.subgroups = [];
    this.genus = [];
    this.species = [];
    this.subspecies = [];
    this.selSubgroup?.options?.forEach(o => o.deselect());
    this.selGenus?.options?.forEach(o => o.deselect());
    this.selSpecies?.options?.forEach(o => o.deselect());
    this.selSubSpecies?.options?.forEach(o => o.deselect());
  }

  changeSubgroup(ev: MatSelectChange){
    this.subgroupChanged.emit(ev.value);
  }

  changeGenus(ev: MatSelectChange){
    this.genusChanged.emit(ev.value);
  }

  changeSpecies(ev: MatSelectChange){
    this.speciesChanged.emit(ev.value);
  }

  changeSubspecies(ev: MatSelectChange){
    this.subspeciesChanged.emit(ev.value);
  }

}
