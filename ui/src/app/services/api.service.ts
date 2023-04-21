import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/env/environment';
import { Area, BibliographicSearch, BibliographicSource, DiagnosticCharacter, Icon, StratigraphicAge, TaxonClass } from '../Models/TaxonFilter';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private jwt!: string;
  private heads!: HttpHeaders;
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiBase;
    /*
    this.http.get<{ token: string }>(`${this.baseUrl}auth`, { withCredentials: true }).subscribe(res =>{
      this.jwt = res.token;
      this.heads = new HttpHeaders()
        .set('Authorization', `Bearer ${ this.jwt }`)
    });*/
  }

  getAllTaxonGroups() {
    return this.http.get<TaxonClass[]>(`${this.baseUrl}query/taxon/groups`);
  }

  getAllSubgroups(groupId: string){
    return this.http.get<TaxonClass[]>(`${this.baseUrl}query/taxon/subgroups/${groupId}`);
  }

  getAllGenus(groupId: string, subgroupId: string){
    return this.http.get<TaxonClass[]>(`${this.baseUrl}query/taxon/genus/${groupId}/${subgroupId}`);
  }

  getAllSpecies(groupId: string, subgroupId: string, genusId: string){
    return this.http.get<TaxonClass[]>(`${this.baseUrl}query/taxon/species/${groupId}/${subgroupId}/${genusId}`);
  }

  getAllSubspecies(groupId: string, subgroupId: string, genusId: string, speciesId: string){
    return this.http.get<TaxonClass[]>(`${this.baseUrl}query/taxon/subspecies/${groupId}/${subgroupId}/${genusId}/${speciesId}`);
  }

  getAreas(){
    return this.http.get<Area[]>(`${this.baseUrl}query/taxon/areas`);
  }

  getDiagnosticCharacters(group: string, subgroup: string) {
    return this.http.get<DiagnosticCharacter[]>(`${this.baseUrl}query/taxon/diagnostic/${group}/${subgroup}`);
  }

  getIcons(group: string, subgroup: string){
    return this.http.get<Icon[]>(`${this.baseUrl}query/taxon/icons/${group}/${subgroup}`);
  }

  getBibliographicSources(search: BibliographicSearch){
    return this.http.post<BibliographicSource[]>(`${this.baseUrl}query/taxon/bibliographic`, search)
  }

  getStratigraficAges() {
    return this.http.get<StratigraphicAge[]>(`${this.baseUrl}query/taxon/stratigraphy/age`);
  }
  getStratigraficBiozones() {
    return this.http.get<StratigraphicAge[]>(`${this.baseUrl}query/taxon/stratigraphy/bio`);
  }
}
