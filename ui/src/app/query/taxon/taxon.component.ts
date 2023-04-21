import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';
import { Area, BibliographicSearch, BibliographicSource, DiagnosticCharacter, Icon, StratigraphicData, TaxonClass, TaxonFilter } from 'src/app/Models/TaxonFilter';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-taxon',
  templateUrl: './taxon.component.html',
  styleUrls: ['./taxon.component.scss']
})
export class TaxonComponent {

  @ViewChild('tabs') tabs!: MatTabGroup;
  
  public filter: TaxonFilter

  public subgroups!: TaxonClass[];
  public genus: TaxonClass[] = [];
  public species: TaxonClass[] = [];
  public subspecies: TaxonClass[] = [];
  public areas: Area[] = [];
  public diagnostics: DiagnosticCharacter[] = [];
  public icons: Icon[] = [];
  public bibliographies: BibliographicSource[] = [];

  private resetFilter = new BehaviorSubject<boolean>(false);
  resetFilter$ = this.resetFilter.asObservable();

  constructor(private apiService: ApiService) {
    this.filter = new TaxonFilter();
  }

  resetDefinition(){
    this.subgroups = [];
    this.genus = [];
    this.species = [];
    this.subspecies = [];
    this.resetFilter.next(true);
  }

  setGroup(group: string){
    this.filter.reset(group);
    this.resetDefinition();
    this.getGroupTabData(group);
  }

  getGroupTabData(group: string){
    this.getSubGroups(group);
    this.getAreas();
  }

  getSubGroups(group: string){
    this.apiService.getAllSubgroups(group)
      .subscribe(res => {
        this.subgroups = res;
        this.tabs.selectedIndex = 1;
      });
  }

  setSubGroup(subgroup: string) {
    this.filter.definition.subgroups = subgroup;
    this.getGenus(
      this.filter.definition.group!, 
      subgroup);
      this.getSubgroupTabData();
  }

  getSubgroupTabData() {
    this.getDiagnostics();
    this.getIcons();
    this.getBibliography();
    //this.getStratigraphy()
  }

  getGenus(groupId: string, subgroupId: string) {
    this.apiService.getAllGenus(groupId, subgroupId)
      .subscribe(res => {
        this.genus = res;
      });
  }

  setGenus(genus: string) {
    this.filter.definition.genuses = genus;
    this.getSpecies(
      this.filter.definition.group!, 
      this.filter.definition.subgroups!, 
      genus)
  }

  getSpecies(groupId: string, subgroupId: string, genusId: string) {
    this.apiService.getAllSpecies(groupId, subgroupId, genusId)
      .subscribe(res => {
        this.species = res;
      });
  }

  setSpecies(species: string) {
    this.filter.definition.species = species;
    this.getSubspecies(
      this.filter.definition.group!, 
      this.filter.definition.subgroups!, 
      this.filter.definition.genuses!, 
      species);
  }

  getSubspecies(groupId: string, subgroupId: string, genusId: string, speciesId: string) {
    this.apiService.getAllSubspecies(groupId, subgroupId, genusId, speciesId)
      .subscribe(res => {
        this.subspecies = res;
      });
  }

  setSubspecies(subspecies: string) {
    this.filter.definition.subspecies = subspecies;
  }

  getAreas() {
    this.apiService.getAreas()
    .subscribe(res => this.areas = res);
  }

  setAreas(areas: Area[]){
    this.filter.areas = areas;
  }

  getDiagnostics() {
    this.apiService.getDiagnosticCharacters(
      this.filter.definition.group!, this.filter.definition.subgroups!)
        .subscribe(res => this.diagnostics = res);
  }

  setDiagnostics(diagnostics: DiagnosticCharacter[]) {
    this.filter.diagnostics = diagnostics;
  }

  getIcons() {
    this.apiService.getIcons(this.filter.definition.group!, this.filter.definition.subgroups!)
      .subscribe(res => this.icons = res);
  }

  setIcons(icons: Icon[]) {
    this.filter.icons = icons;
  }

  getBibliography(bibliographicSearch?: BibliographicSearch){
    if(bibliographicSearch?.hasValue)
      this.apiService.getBibliographicSources(bibliographicSearch)
        .subscribe(res => {
          this.bibliographies = res
        });
    else 
        this.bibliographies = [];
  }

  setBibliography(biblio: BibliographicSource){
    this.filter.bibliographicSource = biblio;
  }

  setStratigraphy(stratigraphy: StratigraphicData) {
    this.filter.stratigraphy = stratigraphy;
  }

  get groupDefined(): boolean {
    return  this.filter.definition.group != null;
  }

  get diagnosticsEnabled(): boolean {
    return this.filter.definition.group == 'M';
  }

  get subgroupDefined(): boolean {
    return this.filter.definition.subgroups != null;
  }

  get areaDefined(): boolean {
    return this.filter.areas.length > 0;
  }

  get diagnosticsDefined() : boolean {
    return this.filter.diagnostics.length > 0;
  }

  get iconsDefined(): boolean {
    return this.filter.icons.length > 0;
  }

  get bibliographyDefined(): boolean {
    return this.filter.bibliographicSource?.code != undefined;
  }

  get stratigraphyDefined(): boolean {
    return this.filter.stratigraphy?.isDefined;
  }
}
