import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
// import { GROUP_DATA } from 'src/app/Models/TaxonFilter';
import { ApiService } from 'src/app/services/api.service';
import { TaxonClass } from 'src/app/Models/TaxonFilter';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  
  @Output() groupChanged = new EventEmitter<string>()
  groups!: Set<TaxonClass>;
  selectedGroup!: TaxonClass;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(){
    this.apiService.getAllTaxonGroups()
      .subscribe(res => this.groups = new Set<TaxonClass>(res))
  }

  changeGroup(group: TaxonClass) {
    if(this.selectedGroup != group) {
      this.selectedGroup = group;
      this.groupChanged.emit(group.id);
    }
  }

}
