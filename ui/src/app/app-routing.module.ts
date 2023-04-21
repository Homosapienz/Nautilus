import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QueryComponent } from './query/query.component';
import { TaxonComponent } from './query/taxon/taxon.component';

/*
const routes: Routes = [
  {
    path: '',
    component: QueryComponent, 
    data: {
      breadcrumb: 'Home'
    },
    children: [
      { 
        path: 'Query', 
        component: QueryComponent, 
        data: { 
          breadcrumb: 'Query' 
        },
        children: [
          {
            path: 'Taxon',
            component: TaxonComponent,
            data: {
              breadcrumb: 'Taxonomy'
            }
          },
          {
            path: 'Assemblage',
            component: QueryComponent, 
            data: {
              breadcrumb: 'Assemblage'
            }
          },
          {
            path: 'Bibliography',
            component: QueryComponent, 
            data: {
              breadcrumb: 'Bibliography'
            }
          }
        ]
      },
      {
        path: 'Utilities',
        component: QueryComponent,
        data: {
          breadcrumb: 'Utilities'
        }
      }
    ]
  },
  
];
*/

const routes: Routes = [
	{
		path: '',
		component: HomeComponent, 
		data: {
			breadcrumb: 'Home'
		}
	},
	{ 
    path: 'query', 
    component: QueryComponent, 
    data: { 
      breadcrumb: 'Query' 
    },
    children: [
    {
        path: 'taxon',
        component: TaxonComponent,
        data: {
          breadcrumb: 'Taxonomy'
        }
    },
    {
        path: 'assemblage',
        component: TaxonComponent, 
        data: {
          breadcrumb: 'Assemblage'
        }
    },
    {
        path: 'bibliography',
        component: TaxonComponent, 
        data: {
          breadcrumb: 'Bibliography'
        }
    }]
  },
	{
		path: 'utilities',
		component: QueryComponent,
		data: {
			breadcrumb: 'Utilities'
		}
	}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
