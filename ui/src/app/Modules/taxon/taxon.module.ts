import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../mat/mat.module';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AreaComponent } from 'src/app/query/taxon/area/area.component';
import { BibliographyComponent } from 'src/app/query/taxon/bibliography/bibliography.component';
import { DefinitionComponent } from 'src/app/query/taxon/definition/definition.component';
import { DiagnosticComponent } from 'src/app/query/taxon/diagnostic/diagnostic.component';
import { GroupComponent } from 'src/app/query/taxon/group/group.component';
import { IconsComponent } from 'src/app/query/taxon/icons/icons.component';
import { StratigraphyComponent } from 'src/app/query/taxon/stratigraphy/stratigraphy.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { StratDialogComponent } from 'src/app/dialogs/stratigraphy/stratigraphy.component';


@NgModule({
  declarations: [
    AreaComponent,
    BibliographyComponent,
    DefinitionComponent,
    DiagnosticComponent,
    GroupComponent,
    IconsComponent,
    StratigraphyComponent,
    SearchPipe,
    StratDialogComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule
  ],
  exports: [
    AreaComponent,
    BibliographyComponent,
    DefinitionComponent,
    DiagnosticComponent,
    GroupComponent,
    IconsComponent,
    StratigraphyComponent,
    StratDialogComponent,
    NgxDatatableModule
  ]
})
export class TaxonModule { }
